import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';
import { DataSensor } from 'src/data-sensor/data-sensor.entity';
import { Repository } from 'typeorm';
import { ControlDto } from './control.dto';
import { ActionHistory } from 'src/action-history/action-history.entity';

@Injectable()
export class DashboardService {
  private client: mqtt.MqttClient;

  constructor(
    @InjectRepository(DataSensor)
    private DataSensorRepository: Repository<DataSensor>,

    @InjectRepository(DataSensor)
    private ActionHistoryRepository: Repository<ActionHistory>,
  ) {
    const options: mqtt.IClientOptions = {
      username: 'luanpd',
      password: 'luanpd',
    };

    this.client = mqtt.connect('mqtt://localhost:2705', options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.getDataFromHardware();
    });

    this.client.on('error', () => {
      console.log('Cannot connect to MQTT broker');
    });
  }

  // get data from hardware and save to database
  private getDataFromHardware(): void {
    const topic = 'data';
    // Subcribe to `data` topic
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('Error subscribing to topic:', topic, err);
      } else {
        console.log('Subscribed to topic:', topic);
      }
    });

    this.client.on('message', async (receivedTopic, message) => {
      if (receivedTopic === topic) {
        const dataString: string = message.toString();
        // Biểu thức chính quy để tìm các số
        const regex =
          /Temp:\s*(\d+\.\d+)\s*---\s*Hum:\s*(\d+\.\d+)\s*---\s*Light:\s*(\d+)/;

        // Sử dụng phương thức match để trích xuất các số từ chuỗi dữ liệu
        const matches = dataString.match(regex);

        if (matches && matches.length === 4) {
          const temp = parseFloat(matches[1]); // Chuyển đổi chuỗi thành số thực
          const hum = parseFloat(matches[2]); // Chuyển đổi chuỗi thành số thực
          const light = parseInt(matches[3], 10); // Chuyển đổi chuỗi thành số nguyên

          try {
            const datasensor = this.DataSensorRepository.create({
              temp,
              hum,
              light,
            });

            await this.DataSensorRepository.save(datasensor);
            console.log('Data saved to database:', datasensor);
          } catch (error) {
            console.error('Error saving data to database:', error);
          }
        } else {
          console.error('Invalid data format:', dataString);
        }
      }
    });
  }

  // control led/fan
  async controlDevice(controlDto: ControlDto) {
    const action = this.ActionHistoryRepository.create({
      device: controlDto.topic,
      action: controlDto.message,
    });

    await this.ActionHistoryRepository.save(action);

    this.client.publish(controlDto.topic, controlDto.message);

    return new Promise((resolve, reject) => {
      const topic = controlDto.topic === 'led' ? 'stt/led' : 'stt/fan';
      const handleData = (data: unknown) => {
        this.client.unsubscribe(topic);
        resolve(data);
      };

      this.client.subscribe(topic, (err) => {
        if (err) {
          reject(err);
        } else {
          this.client.on('message', (_topic, message) => {
            handleData(message.toString());
          });
        }
      });
    });
  }
}
