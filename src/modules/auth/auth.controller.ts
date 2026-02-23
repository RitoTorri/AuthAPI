import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import type { Response } from 'express';
import responses from 'src/shared/utils/responses';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const userLogin = await this.authService.login(loginDto);
      console.log("Usuario logueado de manera exitosa");
      console.log(userLogin);
      return responses.responseSuccessful(res, 200, "Usuario logueado de manera exitosa", userLogin);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      switch (errorMessage) {
        case 'User not found':
          return responses.responsefailed(res, 404, "Usuario no encontrado");
        case 'User is inactive':
          return responses.responsefailed(res, 409, "Usuario inactivo");
        case 'Incorrect password':
          return responses.responsefailed(res, 401, "Contraseña incorrecta");
        default:
          return responses.responsefailed(res, 500, errorMessage);
      }
    }
  }
}
