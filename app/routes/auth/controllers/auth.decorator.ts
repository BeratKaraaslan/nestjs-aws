import { applyDecorators, Post, HttpCode, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UnauthorizedDto, NotFoundDto } from "app/core/models/default-dto";

export function SignIn() {
    return applyDecorators(
      Post('/signin'),
      HttpCode(200),
      ApiOperation({ summary: 'Kullanıcı girişi' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }

export function SignUp() {
    return applyDecorators(
      Post('/signup'),
      HttpCode(200),
      ApiOperation({ summary: 'Kullanıcı Kaydı' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }

export function GetUsers() {
    return applyDecorators(
      Get('/users'),
      HttpCode(200),
      ApiOperation({ summary: 'Kullanıcı Kayıtları' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }

export function VerifyUser() {
    return applyDecorators(
      Post('/verify/:userid'),
      HttpCode(200),
      ApiOperation({ summary: 'Kullanıcı Doğrulama' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }