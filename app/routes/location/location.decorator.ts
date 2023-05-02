import { applyDecorators, Get, HttpCode, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UnauthorizedDto, NotFoundDto } from "app/core/models/default-dto";

export function CreateCity() {
    return applyDecorators(
      Post('/create/city'),
      HttpCode(200),
      ApiOperation({ summary: 'Create City' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }

export function GetCity() {
    return applyDecorators(
      Post('/citys'),
      HttpCode(200),
      ApiOperation({ summary: 'Get Citys' }),
      ApiResponse({ status: 200, description: 'OK' }),
      ApiResponse({ status: 401, type: UnauthorizedDto }),
      ApiResponse({ status: 404, type: NotFoundDto }),
    );
  }