import { applyDecorators, Post, HttpCode, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UnauthorizedDto, NotFoundDto } from "app/core/models/default-dto";

export function OpenAI() {
    return applyDecorators(
      Post('/deneme'),
      HttpCode(200),
      ApiOperation({ summary: 'Deneme' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }