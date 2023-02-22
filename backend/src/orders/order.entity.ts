import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('Orders')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  blockNumber: number;

  @Column()
  orderId: string;

  // @Column({ type: 'decimal', precision: 30, default: 0 })
  // amountA: number;

  // @Column({ type: 'decimal', precision: 30, default: 0 })
  // amountB: number;

  @Column({ nullable: true })
  tokenA: string;

  @Column({ nullable: true })
  tokenB: string;

  @Column({ nullable: true })
  user: string;

  @Column({ nullable: true })
  isMarket: boolean;

  @Column({ nullable: false })
  active: boolean;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  matchedId: string;

  // @Column({ nullable: true })
  // amountReceived: string;

  // @Column({ nullable: true })
  // amountPaid: string;

  // @Column({ nullable: true })
  // amountLeftToFill: string;

  // @Column({ nullable: true })
  // fee: string;

  // @Column({ nullable: true })
  // feeRate: string;
}
