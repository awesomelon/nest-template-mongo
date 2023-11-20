// core
import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

// config
import { DB_CONNECTION_KEY } from 'src/database/consts';

// lib
import { Connection } from 'mongoose';

@ApiTags('health')
@Controller('')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
    @InjectConnection(DB_CONNECTION_KEY) private connection: Connection
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.mongooseHealth.pingCheck(`${DB_CONNECTION_KEY} DB`, {
          connection: this.connection,
        }),
    ]);
  }
}
