import { Role } from '../config/enums/roles.enum';
import {
  Request,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CitizenService } from './citizens.service';
import { Roles } from 'src/config/decorators/roles.decorator';

@Roles(Role.Super, Role.Admin, Role.User)
@Controller('api/citizens')
export class CitizenController {
  constructor(private readonly service: CitizenService) {}

  @Get()
  async findAll(@Request() req: any) {
    try {
      const data = await this.service
        .findAll(req.query)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new HttpException(
            'Error fetching all',
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
              cause: err,
            },
          );
        });

      return data;
    } catch (ex) {
      return ex;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.service
        .findById(id)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new HttpException(
            'Error while retrieving resource',
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
              cause: err,
            },
          );
        });
      return data;
    } catch (ex) {
      return ex;
    }
  }
}
