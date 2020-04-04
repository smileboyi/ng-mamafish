import { Injectable } from '@nestjs/common';
import { createClientAsync, Client } from 'soap';

/**
 * 天气WebService: http://ws.webxml.com.cn/WebServices/WeatherWS.asmx
 * 天气图标：http://www.webxml.com.cn/zh_cn/weather_icon.aspx
 */

@Injectable()
export class WeatherService {
  private client: Client;

  constructor() {
    this.initClient();
  }

  async initClient() {
    this.client = await createClientAsync(
      'http://ws.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl',
    );
  }

  async getRegionProvince(): Promise<string[]> {
    const response = await this.client.getRegionProvinceAsync();
    return response[0].getRegionProvinceResult.string;
  }

  async getSupportCityDataset(theRegionCode: string): Promise<any[]> {
    const response = await this.client.getSupportCityDatasetAsync({
      theRegionCode,
    });
    const diffgram = response[0].getSupportCityDatasetResult.diffgram;
    if (diffgram) {
      return await diffgram.Region.City;
    } else {
      return await [];
    }
  }

  async getWeather(theCityCode): Promise<string[]> {
    const response = await this.client.getWeatherAsync({
      theCityCode,
    });
    return await response[0].getWeatherResult.string;
  }
}
