import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import {
  getOrdersQueryDto,
  getMatchingOrdersQueryDto,
} from './dto/ordersQueryDto';

@Controller('')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('getOrders')
  async findOrders(@Query() getOrdersQuery: getOrdersQueryDto): Promise<any> {
    return await this.ordersService.getOrders(getOrdersQuery);
  }

  @Get('getMatchingOrders')
  async findMatchingOrders(
    @Query() getMatchingOrdersQuery: getMatchingOrdersQueryDto,
  ): Promise<any> {
    return await this.ordersService.getMatchingOrders(getMatchingOrdersQuery);
  }
}
