import { Base } from './entities/base.entity';
import { Mapper } from '@automapper/core';
import { Dto } from './dto/base.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseMapper<TEntity extends Base, TDto extends Dto> {
  private readonly _mapper: Mapper;
  constructor(mapper: Mapper) {
    this._mapper = mapper;
  }

  mapToDto(entity: TEntity): TDto {
    return this._mapper.map<TEntity, TDto>(entity, null, null);
  }

  mapToEntity(dto: TDto): TEntity {
    return this._mapper.map<TDto, TEntity>(dto, null, null);
  }

  arrayMapToDto(entity: TEntity[]): TDto[] {
    return this._mapper.mapArray<TEntity, TDto>(entity, null, null);
  }

  arrayMapToEntity(dto: TDto[]): TEntity[] {
    return this._mapper.mapArray<TDto, TEntity>(dto, null, null);
  }
}
