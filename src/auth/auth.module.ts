import { JwtStrategy } from '../config/strategies/jwt.strategy';
import { jwtConstants } from '../config/constants/jwt-constants';
import { UserRepository } from './../users/user.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UserModule } from 'src/users/user.module';
import { LocalStrategy } from '../config/strategies/local.auth';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireTime },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UserRepository, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
