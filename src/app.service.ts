import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { WORKER_THREAD_FILE_PATH } from './worker/config';

@Injectable()
export class AppService {
  blocking(cpuTimeMS: number) {
    const startTime = Date.now();

    while (Date.now() - startTime < cpuTimeMS) {}
  }

  async worker(cpuTimeMS: number) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(WORKER_THREAD_FILE_PATH, {
        workerData: {
          cpuTimeMS,
        },
      });

      worker.on('message', (message) => {
        console.log('Main thread got message:', message);
        resolve(message);
      });

      worker.on('error', (err) => {
        console.log('Worker threw an error:', err);
        reject(err);
      });

      worker.on('exit', (code) => {
        console.log('Worker did exit with code:', code);
      });
    });
  }
}
