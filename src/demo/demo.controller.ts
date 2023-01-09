import { Demo } from './entities/demo.entity';
import { DemoDto } from './dto/demo.dto';
import { BaseController } from './../base/base.controller';
import { Controller } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoMapper } from './mapper/demo.mapper';
import { ApiTags } from '@nestjs/swagger';
import { DemoValidator } from './demo.validator';

@Controller('demo')
@ApiTags('Demo')
export class DemoController extends BaseController<DemoDto, Demo> {
  constructor(
    private readonly testMapper: DemoMapper,
    private readonly service: DemoService,
    private readonly validator: DemoValidator,
  ) {
    super(testMapper, validator, service);
  }
}
