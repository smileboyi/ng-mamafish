import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { WeatherService } from '@services/weather/weather.service';
import { Province } from './common.interface';

@Injectable()
export class CommonService {
  constructor(
    @InjectModel('province') private readonly provinceModel: Model<Province>,
    private readonly weatherService: WeatherService,
  ) {}

  async getRegionProvince(): Promise<Province[]> {
    const provinces: Province[] = await this.provinceModel.find().exec();
    if (provinces.length) {
      return await provinces;
    }

    const result: string[] = await this.weatherService.getRegionProvince();
    result.forEach((item: string) => {
      const [name, code] = item.split(',');
      const province = new this.provinceModel({ name, code });
      provinces.push(province);
    });

    return await this.provinceModel.insertMany(provinces);
  }

  async getSupportCityDataset(code: string): Promise<Province> {
    const result: any[] = await this.weatherService.getSupportCityDataset(code);
    if (!result.length) {
      // 如果参数错误查询不到
      throw new NotFoundException('Not found');
    }

    const children = [];
    result.forEach(({ CityID, CityName }) => {
      children.push({
        code: CityID,
        name: CityName,
      });
    });
    return await this.provinceModel.findOneAndUpdate(
      { code },
      { children },
      { new: true },
    );
  }

  async getWeather(code: string): Promise<string[]> {
    const result = await this.weatherService.getWeather(code);
    if (result.length === 1) {
      // [ '查询结果为空。http://www.webxml.com.cn/' ]
      throw new NotFoundException('Not found');
    }
    return await result;
  }
}
