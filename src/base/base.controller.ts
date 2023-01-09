import { ValidatorBase } from './base.validator';
import { Base } from './entities/base.entity';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { Dto } from './dto/base.dto';
import { BaseMapper } from './base.mapper';
import {
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { isEmptyObject } from './utils/empty-object.util';

export class BaseController<TDto extends Dto, TEntity extends Base> {
  private readonly _mapper: BaseMapper<TEntity, TDto>;
  private readonly _validator: ValidatorBase<TEntity>;
  constructor(
    mapper: BaseMapper<TEntity, TDto>,
    validator: ValidatorBase<TEntity>,
    private readonly baseService: BaseService<TEntity>,
  ) {
    this._mapper = mapper;
    this._validator = validator;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  create(@Body() dto: TDto) {
    try {
      const entity: TEntity = this._mapper.mapToEntity(dto);
      const validationErrors = this._validator.validate(entity);
      if (!isEmptyObject(validationErrors))
        throw new HttpException(
          {
            reason: 'Required fields were not provided.',
            fields: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      return this.baseService.create(entity);
    } catch (ex) {
      return ex;
    }
  }

  @Get()
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async findAll(): Promise<TDto[]> {
    try {
      const data = await this.baseService
        .findAll()
        .then((res) => {
          return this._mapper.arrayMapToDto(res);
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
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findOne(@Param('id') id: string): Promise<TDto> {
    try {
      const data = await this.baseService
        .findOne(+id)
        .then((res) => {
          console.log(res);
          return this._mapper.mapToDto(res);
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

  @Patch(':id')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() dto: TDto) {
    try {
      const entity: TEntity = this._mapper.mapToEntity(dto);
      const validationErrors = this._validator.validate(entity);
      if (!isEmptyObject(validationErrors))
        throw new HttpException(
          {
            reason: 'Required fields were not provided.',
            fields: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      return this.baseService.update(+id, entity);
    } catch (ex) {
      return ex;
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
