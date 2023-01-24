import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';
import { UserMapper } from './mapper/user.mapper';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from './mapper/user.profile';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserMapper,
    UserProfile,
    UserValidator,
    UserRepository,
  ],
})
export class UserModule {}
