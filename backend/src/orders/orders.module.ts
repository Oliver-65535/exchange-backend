import { Module } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrdersService],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
