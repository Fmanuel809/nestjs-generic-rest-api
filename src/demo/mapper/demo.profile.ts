import { DemoDto } from './../dto/demo.dto';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Demo } from '../entities/demo.entity';

@Injectable()
export class DemoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Demo, DemoDto);
      createMap(mapper, DemoDto, Demo);
    };
  }
}
