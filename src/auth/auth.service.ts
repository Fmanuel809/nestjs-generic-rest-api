import { comparePassword, hashPassword } from './../shared/utils';
import { UserRepository } from './../users/user.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ username });
    if (!user) return null;
    const passwordValid = await comparePassword(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    if (!user.active) {
      throw new HttpException(
        {
          error: 'Unauthorized',
          reason: 'User is not active',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(req: any) {
    const model = {
      password: await hashPassword(req.body.password),
    };
    return this.userRepository.patch(req.user.userId, model);
  }

  async resetPassword(req: any) {
    const model = {
      password: await hashPassword('Inicio01'),
      resetPassword: true,
    };
    return this.userRepository.patch(req.params.id, model);
  }
}
