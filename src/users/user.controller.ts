import { Role } from '../config/enums/roles.enum';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { BaseController } from './../base/base.controller';
import {
  Request,
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserMapper } from './mapper/user.mapper';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserValidator } from './user.validator';
import { Roles } from 'src/config/decorators/roles.decorator';

@Roles(Role.Super, Role.Admin)
@Controller('api/user')
@ApiTags('User')
export class UserController extends BaseController<UserDto, User> {
  constructor(
    private readonly testMapper: UserMapper,
    private readonly service: UserService,
    private readonly validator: UserValidator,
  ) {
    super(testMapper, validator, service);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  override async remove(@Param('id') id: string, @Request() req: any) {
    try {
      if (req.user.userId === id) {
        throw new HttpException(
          {
            error: 'Forbidden',
            reason: 'You cannot delete your own user account.',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const userForDelete = await this.service.findById(id);
      if (req.user.role !== Role.Super && userForDelete.role === Role.Super) {
        throw new HttpException(
          {
            error: 'Forbidden',
            reason: 'You cannot delete a super user account.',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.service.remove(id);
    } catch (error) {
      return error;
    }
  }
}
