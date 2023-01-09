import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { Demo } from './entities/demo.entity';

@Injectable()
export class DemoService extends BaseService<Demo> {}
