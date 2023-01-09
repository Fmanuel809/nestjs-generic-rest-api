import { DemoDto } from './../dto/demo.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/base/base.mapper';
import { Demo } from '../entities/demo.entity';

@Injectable()
export class DemoMapper extends BaseMapper<Demo, DemoDto> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapToDto(entity: Demo): DemoDto {
    return this.mapper.map<Demo, DemoDto>(entity, Demo, DemoDto);
  }

  override mapToEntity(dto: DemoDto): Demo {
    return this.mapper.map<DemoDto, Demo>(dto, DemoDto, Demo);
  }

  override arrayMapToDto(entity: Demo[]): DemoDto[] {
    console.log(DemoDto);
    return this.mapper.mapArray<Demo, DemoDto>(entity, Demo, DemoDto);
  }

  override arrayMapToEntity(dto: DemoDto[]): Demo[] {
    return this.mapper.mapArray<DemoDto, Demo>(dto, DemoDto, Demo);
  }
}
