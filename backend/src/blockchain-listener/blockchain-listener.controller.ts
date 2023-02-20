import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { BlockchainListenerService } from './blockchain-listener.service';

@Controller('test')
export class BlockchainListenerController {}
