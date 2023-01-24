import { ValidatorBase } from './base.validator';
import { Base, Auditable } from './entities/base.entity';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
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
  create(@Request() req: any, @Body() dto: TDto) {
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

      const audit: Auditable = {
        createdBy: req.user.userId,
        createdDate: new Date(),
      };
      entity.audit = audit;
      return this.baseService.create(entity);
    } catch (ex) {
      console.error(ex);
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
        .findById(id)
        .then((res) => {
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
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: TDto,
  ) {
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

      const audit: Auditable = {
        modifiedBy: req.user.userId,
        modifiedDate: new Date(),
      };
      entity.audit = audit;
      return this.baseService.update(id, entity);
    } catch (ex) {
      return ex;
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async remove(@Param('id') id: string, @Request() req: any) {
    return await this.baseService.remove(id);
  }
}
