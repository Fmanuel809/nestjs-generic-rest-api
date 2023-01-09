import { DemoValidator } from './demo.validator';
import { DemoMapper } from './mapper/demo.mapper';
import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { DemoProfile } from './mapper/demo.profile';

@Module({
  controllers: [DemoController],
  providers: [DemoService, DemoMapper, DemoProfile, DemoValidator],
})
export class DemoModule {}
