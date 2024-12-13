import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';
import { Repository } from 'typeorm';
import { MqttClient } from 'mqtt';
import { format } from 'date-fns';
import { ActionHistory } from './entity/action-history.entity';
import { DataSensor } from './entity/data-sensor.entity';
import { ControlDto } from './dto/control.dto';

@Injectable()
export class AppService {
  private client: MqttClient;

  constructor(
    @InjectRepository(ActionHistory)
    private actionRepo: Repository<ActionHistory>,
    @InjectRepository(DataSensor)
    private sensorRepo: Repository<DataSensor>,
  ) {
    // Khởi tạo server thì kết nối với mqtt luôn
    this.client = mqtt.connect('mqtt://localhost:2705', {
      username: 'luanpd',
      password: 'luanpd',
    });

    this.client.on('connect', () => {
      // console.log('Connect MQTT success');
      this.subcribeData();
    });

    this.client.on('error', () => {
      // console.log('Connect MQTT failed');
    });

    this.client.setMaxListeners(20);
  }

  private subcribeData(): void {
    this.client.subscribe('data', (err) => {
      if (err) {
        console.error('Subcribe data failed', err);
      } else {
        console.log('Subscribe data success');
      }
    });

    // Mỗi khi nhận được tin nhắn sẽ xử lý dữ liệu và lưu vào db
    this.client.on('message', async (receivedTopic, message) => {
      if (receivedTopic === 'data') {
        const dataString: string = message.toString();
        const regex =
          /Temp:\s*(\d+\.\d+)\s*---\s*Hum:\s*(\d+\.\d+)\s*---\s*Light:\s*(\d+)\s*---\s*Wind:\s*(\d+(?:\.\d+)?)/;
        const matches = dataString.match(regex);

        if (matches && matches.length === 5) {
          const temp = parseFloat(matches[1]);
          const hum = parseFloat(matches[2]);
          const light = parseInt(matches[3], 10);
          const wind = parseInt(matches[4], 10);

          try {
            const data = this.sensorRepo.create({
              temp,
              hum,
              light,
              wind,
            });
            this.sensorRepo.save(data);
            console.log('Data saved to database:', data);
          } catch (error) {
            console.error('Error saving data to database:', error);
          }
        } else {
          console.error('Invalid data format:', dataString);
        }
      }
    });
  }

  async getChartData(): Promise<DataSensor[]> {
    try {
      const data = await this.sensorRepo.find({
        order: {
          id: 'DESC',
        },
        take: 10,
      });
      return data.reverse();
    } catch (error) {
      console.error('Get latest data failed:', error);
      throw error;
    }
  }

  async controlDevice(dto: ControlDto) {
    const action = this.actionRepo.create({
      device: dto.topic,
      action: dto.message,
    });
    await this.actionRepo.save(action);

    this.client.publish(dto.topic, dto.message);

    return new Promise((resolve, reject) => {
      const topic = dto.topic === 'led' ? 'sttLed' : 'sttFan';

      const messageHandler = (receivedTopic: any, message: any) => {
        if (receivedTopic === topic) {
          this.client.unsubscribe(topic, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('led-', message.toString());
              this.client.removeListener('message', messageHandler); // Loại bỏ listener
              resolve(message.toString());
            }
          });
        }
      };

      this.client.subscribe(topic, (err) => {
        if (err) {
          reject(err);
        } else {
          this.client.on('message', messageHandler);
        }
      });
    });
  }

  // Logic search
  // nếu field là temp thì search ở cột temp (search chính xác giá trị)
  // nếu field là hum thì search ở cột temp (search chính xác giá trị)
  // nếu field là light thì search ở cột light (search chính xác giá trị)
  // nếu field là createdAt thì search ở cột createdAt (vì cột này là chuỗi ngày giờ - định dạng DateTime(6) với giá trị mặc định là CURRENT_TIMESTAMP(6) nên chỉ search LIKE)
  // Ví dụ một chuỗi ngày giờ đúng định dạng lưu trong database: 2024-05-19T08:41:45.959Z
  async getDataSensor(
    searchValue: string,
    field: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ) {
    console.log(searchValue, field, page, pageSize, sortBy, sortOrder);

    let query = this.sensorRepo.createQueryBuilder('sensor');

    // Giải mã giá trị searchValue từ URL
    const decodedSearchValue = decodeURIComponent(searchValue);
    console.log(decodedSearchValue);

    // Xử lý tìm kiếm theo trường cụ thể
    if (field && decodedSearchValue) {
      switch (field) {
        case 'temp':
          query = query.where(`sensor.temp = :searchValueLike`, {
            searchValueLike: `${decodedSearchValue}%`,
          });
          break;
        case 'hum':
        case 'light':
          query = query.where(`sensor.${field} = :searchValue`, {
            searchValue: parseFloat(decodedSearchValue),
          });
          break;
        case 'createdAt':
          query = query.where(`sensor.createdAt LIKE :searchValueLike`, {
            searchValueLike: `%${decodedSearchValue}%`,
          });
          break;
        default:
          // Xử lý khi trường không khớp
          break;
      }
    }

    // Xử lý tìm kiếm trên tất cả các trường nếu không chọn trường cụ thể
    if (decodedSearchValue && !field) {
      query = query.where(
        `sensor.temp = :searchValue OR 
             sensor.hum = :searchValue OR 
             sensor.light = :searchValue OR 
             sensor.createdAt LIKE :searchValueLike`,
        {
          searchValue: `${decodedSearchValue}%`,
          searchValueLike: `%${decodedSearchValue}%`,
        },
      );
    }

    // Phân trang và lấy dữ liệu
    const [data, totalRecords] = await query
      .orderBy(`sensor.${sortBy}`, sortOrder)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    // Định dạng lại cột createdAt
    data.forEach((item: any) => {
      item.createdAt = format(
        new Date(item.createdAt),
        'yyyy-MM-dd HH:mm:ss.SSS',
      );
    });

    // Trả về kết quả
    return {
      totalRecords,
      page,
      pageSize,
      data,
    };
  }

  // Xử lý tìm kiếm theo trường cụ thể
  // Logic search
  // nếu field là device thì search ở cột device (search LIKE)
  // nếu field là action thì search ở cột action (search LIKE)
  // nếu field là createdAt thì search ở cột createdAt (vì cột này là chuỗi ngày giờ - định dạng DateTime(6) với giá trị mặc định là CURRENT_TIMESTAMP(6) nên search LIKE)
  // Ví dụ một chuỗi ngày giờ đúng định dạng lưu trong database: 2024-05-19T08:41:45.959Z
  // Nếu có filter thì chỉ lọc các bản ghi có giá trị = filter ở cột device
  async getActionHistory(
    searchValue: string,
    field: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filter: string,
  ) {
    console.log(searchValue, field, page, pageSize, sortBy, sortOrder);
    let query = this.actionRepo.createQueryBuilder('action');

    // Giải mã giá trị searchValue từ URL
    const decodedSearchValue = decodeURIComponent(searchValue);

    // Xử lý tìm kiếm theo trường cụ thể
    if (field && decodedSearchValue) {
      switch (field) {
        case 'device':
        case 'action':
        case 'createdAt':
          query = query.where(`action.${field} LIKE :searchValue`, {
            searchValue: `%${decodedSearchValue}%`,
          });
          break;
        default:
          // Xử lý khi trường không khớp
          break;
      }
    }

    if (decodedSearchValue && !field) {
      query = query.where(
        `action.device LIKE :searchValueLike OR 
        action.action LIKE :searchValueLike OR 
        action.createdAt LIKE :searchValueLike`,
        {
          searchValueLike: `%${decodedSearchValue}%`,
        },
      );
    }

    // Lọc theo device
    if (filter) {
      query = query.andWhere(`action.device = :filter`, { filter });
    }

    // Phân trang và lấy dữ liệu
    const [data, totalRecords] = await query
      .orderBy(`action.${sortBy}`, sortOrder)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    // Định dạng lại cột createdAt
    data.forEach((item: any) => {
      item.createdAt = format(
        new Date(item.createdAt),
        'yyyy-MM-dd HH:mm:ss.SSS',
      );
    });

    // Trả về kết quả
    return {
      totalRecords,
      page,
      pageSize,
      data,
    };
  }
}
