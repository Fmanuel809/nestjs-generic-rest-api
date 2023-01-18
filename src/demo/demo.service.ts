import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { Demo } from './entities/demo.entity';
import { DemoRepository } from './demo.repository';

@Injectable()
export class DemoService extends BaseService<Demo> {
  constructor(private readonly repository: DemoRepository) {
    super(repository);
  }
}
