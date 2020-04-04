import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonService } from './common.service';
import { WeatherService } from '@services/weather/weather.service';
import { CommonController } from './common.controller';
import { ProvinceSchema } from './common.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'province', schema: ProvinceSchema, collection: 'province' },
    ]),
  ],
  controllers: [CommonController],
  providers: [CommonService, WeatherService],
})
export class CommonModule {}
