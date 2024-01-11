import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('worker')
  async worker(@Query('cpuTimeMilliSeconds') cpuTimeMS: string) {
    return this.appService.worker(parseInt(cpuTimeMS));
  }

  @Get('blocking')
  blocking(@Query('cpuTimeMilliSeconds') cpuTimeMS: string) {
    return this.appService.blocking(parseInt(cpuTimeMS));
  }
}
