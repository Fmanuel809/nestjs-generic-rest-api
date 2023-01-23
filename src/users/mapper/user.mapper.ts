import { UserDto } from './../dto/user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/base/base.mapper';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper extends BaseMapper<User, UserDto> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapToDto(entity: User): UserDto {
    return this.mapper.map<User, UserDto>(entity, User, UserDto);
  }

  override mapToEntity(dto: UserDto): User {
    return this.mapper.map<UserDto, User>(dto, UserDto, User);
  }

  override arrayMapToDto(entity: User[]): UserDto[] {
    return this.mapper.mapArray<User, UserDto>(entity, User, UserDto);
  }

  override arrayMapToEntity(dto: UserDto[]): User[] {
    return this.mapper.mapArray<UserDto, User>(dto, UserDto, User);
  }
}
