import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThanOrEqual } from 'typeorm';

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
    const order = Object.assign({}, orderFinded, data, { active: false });
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async cancelOrder(data: any): Promise<any> {
    // console.log(data);
    const orderFinded = await this.getOrder(data.orderId);
    if (!orderFinded.active) return;
    const order = Object.assign({}, orderFinded, data, { active: false });
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async getOrders(getOrdersQuery): Promise<any> {
    return await this.orderRepository.find({
      where: getOrdersQuery,
      order: { blockNumber: 'DESC' },
    });
  }

  async getMatchingOrders(params): Promise<any> {
    const amountA =
      parseInt(params.amountA) == 0
        ? await this.orderRepository
            .findOne({
              select: ['amountA'],
              where: {
                tokenA: params.tokenA,
                tokenB: params.tokenB,
                status: 'OrderMatched',
              },
              order: { blockNumber: 'DESC' },
            })
            .then((e) => e.amountA)
        : parseInt(params.amountA);

    const query = {
      tokenA: params.tokenA,
      tokenB: params.tokenB,
      amountA: MoreThanOrEqual(amountA),
      amountB: MoreThanOrEqual(parseInt(params.amountB)),
      active: true,
    };

    const orderIds = await this.orderRepository.find({
      select: ['orderId'],
      where: query,
      order: { blockNumber: 'DESC' },
    });

    return orderIds.map((e) => e.orderId);
  }

  async getOrder(id: string): Promise<any> {
    return await this.orderRepository.findOne({
      orderId: id,
    });
  }
}
