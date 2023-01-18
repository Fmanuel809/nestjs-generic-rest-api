import { Demo, DemoSchema } from './entities/demo.entity';
import { DemoRepository } from './demo.repository';
import { DemoValidator } from './demo.validator';
import { DemoMapper } from './mapper/demo.mapper';
import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { DemoProfile } from './mapper/demo.profile';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Demo.name, schema: DemoSchema }]),
  ],
  controllers: [DemoController],
  providers: [
    DemoService,
    DemoMapper,
    DemoProfile,
    DemoValidator,
    DemoRepository,
  ],
})
export class DemoModule {}
