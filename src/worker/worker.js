import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { parentPort, workerData } from 'worker_threads';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  console.log('Worker thread got data:', workerData);

  appService.blocking(workerData.cpuTimeMS);

  parentPort.postMessage(workerData);
}

run();
