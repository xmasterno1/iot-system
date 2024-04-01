import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';
import { DataSensor } from 'src/data-sensor/entities/data-sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor(
    @InjectRepository(DataSensor)
    private DataSensorRepository: Repository<DataSensor>,
  ) {
    const options: mqtt.IClientOptions = {
      username: 'luanpd',
      password: 'luanpd',
    };

    // Connect to the MQTT broker with authentication information
    this.client = mqtt.connect('mqtt://localhost:2705', options);

    // Handle the event when connecting successfully
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      // get data from hardware and save to database
      this.getDataFromHardware();
    });

    // Handle the event when connecting failed
    this.client.on('error', () => {
      // console.log('Cannot connect to MQTT broker');
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

        // Sử dụng biểu thức chính quy để tìm các giá trị nhiệt độ, độ ẩm và ánh sáng
        const regex = /Temperature: (\d+) --- Humidity: (\d+) --- Light: (\d+)/;
        const matches = dataString.match(regex);

        if (matches && matches.length === 4) {
          const temperature = parseInt(matches[1], 10);
          const humidity = parseInt(matches[2], 10);
          const light = parseInt(matches[3], 10);

          try {
            const newData = this.DataSensorRepository.create({
              temperature: temperature,
              humidity: humidity,
              light: light,
            });

            await this.DataSensorRepository.save(newData);
            console.log('Data saved to database:', newData);
          } catch (error) {
            console.error('Error saving data to database:', error);
          }
        } else {
          console.error('Invalid data format:', dataString);
        }
      }
    });
  }

  // get 8 latest data using for chart
  async getLatestData(): Promise<DataSensor[]> {
    try {
      const latestData = await this.DataSensorRepository.find({
        order: {
          time: 'DESC',
        },
        take: 8,
      });
      return latestData;
    } catch (error) {
      console.error('Error getting latest data:', error);
      throw error;
    }
  }

  // control device: to be continued...
}
