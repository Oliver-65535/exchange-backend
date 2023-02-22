import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThanOrEqual, MoreThan, In } from 'typeorm';
import { userInfo } from 'os';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(data: any): Promise<any> {
    // console.log(data);
    if (await this.getOrder(data.orderId)) return;
    const order = Object.assign({}, new OrderEntity(), data);
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async matchOrder(data: any): Promise<any> {
    // console.log(data);
    const orderFinded = await this.getOrder(data.orderId);
    if (!orderFinded.active) return;
    const order = Object.assign({}, orderFinded, data);
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async cancelOrder(data: any): Promise<any> {
    // console.log(data);
    const orderFinded = await this.getOrder(data.orderId);
    if (!orderFinded.active) return;
    const order = Object.assign({}, orderFinded, data);
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async getOrders(params): Promise<any> {
    Object.keys(params).forEach((key) => {
      if (key !== 'active' && key !== 'user') {
        params[key] = In([params.tokenA, params.tokenB]);
      }
    });

    return await this.orderRepository.find({
      where: params,
      order: { blockNumber: 'DESC' },
    });
  }

  async getMatchingOrders(params): Promise<any> {
    const query = {
      tokenA: In([params.tokenA, params.tokenB]),
      tokenB: In([params.tokenA, params.tokenB]),
      active: true,
    };

    const orderIds = await this.orderRepository.find({
      select: ['orderId'],
      where: query,
      order: { blockNumber: 'DESC' },
    });

    return params.amountA >= 0 && params.amountB > 0
      ? orderIds.map((e) => e.orderId)
      : [];
  }

  async getOrder(id: string): Promise<any> {
    return await this.orderRepository.findOne({
      orderId: id,
    });
  }
}
