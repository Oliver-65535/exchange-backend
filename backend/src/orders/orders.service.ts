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
    if (await this.getOrder(data.orderId)) return;
    const order = Object.assign({}, new OrderEntity(), data);
    return await this.orderRepository.save(order);
  }

  async matchOrder(data: any): Promise<any> {
    const orderFinded = await this.getOrder(data.orderId);
    if (!orderFinded.active) return;
    const order = Object.assign({}, orderFinded, data, { active: false });
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async cancelOrder(data: any): Promise<any> {
    const orderFinded = await this.getOrder(data.orderId);
    if (!orderFinded.active) return;
    const order = Object.assign({}, orderFinded, data, { active: false });
    console.log(order);
    return await this.orderRepository.save(order);
  }

  async getOrders(getOrdersQuery): Promise<any> {
    Object.keys(getOrdersQuery).forEach((key) => {
      if (key !== 'active') {
        getOrdersQuery[key] = ILike(`%${getOrdersQuery[key]}%`);
      }
    });

    return await this.orderRepository.find({
      where: getOrdersQuery,
      order: { blockNumber: 'DESC' },
    });
  }

  async getMatchingOrders(params): Promise<any> {
    const query = {
      tokenA: ILike(`%${params.tokenA}%`),
      tokenB: ILike(`%${params.tokenB}%`),
      amountA: MoreThanOrEqual(parseInt(params.amountA)),
      amountB: MoreThanOrEqual(parseInt(params.amountB)),
    };

    return await this.orderRepository.find({
      where: query,
      order: { blockNumber: 'DESC' },
    });

    // return await this.orderRepository
    //   .createQueryBuilder('order')
    //   .where('order.active = :active', { active: false })
    //   .getRawMany();
  }

  async getOrder(id: string): Promise<any> {
    return await this.orderRepository.findOne({
      orderId: id,
    });
  }
}
