import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  Headers,
  Res,
  Req,
  Param,
  BadGatewayException,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { CommonService } from '../common/common.service';
import { HttpResultResponse } from '@declares/response.declare';

@ApiUseTags('common')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/region/provinces')
  async regionProvince(@Res() res): Promise<HttpResultResponse> {
    try {
      const result = await this.commonService.getRegionProvince();

      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: result,
        message: 'Find successful',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status) {
        // nest error
        throw error;
      } else {
        // native error
        throw new BadGatewayException(error);
      }
    }
  }

  @Get('/region/citys')
  async getSupportCityDataset(
    @Res() res,
    @Query('provinceCode') provinceCode,
  ): Promise<HttpResultResponse> {
    try {
      provinceCode = String(provinceCode).trim();
      if (!provinceCode && isNaN(Number(provinceCode))) {
        throw new BadRequestException('Query data validation failed');
      }

      const result = await this.commonService.getSupportCityDataset(
        provinceCode,
      );
      let message = 'Find successful';
      if (!result) {
        // 如果没初始化province collection，查询到的citys数据保存不了
        // 可以先在constructor中请求一次commonService.getRegionProvince()
        message = 'Found failed';
      }
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: result,
        message,
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status) {
        throw error;
      } else {
        throw new BadGatewayException(error);
      }
    }
  }

  @Get('/region/weather')
  async getWeather(
    @Res() res,
    @Query('theCityCode') theCityCode,
  ): Promise<HttpResultResponse> {
    try {
      const result: string[] = await this.commonService.getWeather(theCityCode);
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: result,
        message: 'Find successful',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status) {
        throw error;
      } else {
        throw new BadGatewayException(error);
      }
    }
  }
}
