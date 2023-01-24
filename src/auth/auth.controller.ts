import { Request, Controller, Post, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from '../config/guards/jwt-auth.guard';
import { Roles } from 'src/config/decorators/roles.decorator';
import { Role } from 'src/config/enums/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('changePassword')
  async changePassword(@Request() req: any) {
    return this.authService.changePassword(req);
  }

  @Roles(Role.Super, Role.Admin)
  @Patch('resetPassword/:id')
  async resetPassword(@Request() req: any) {
    return this.authService.resetPassword(req);
  }
}
