import { BlockchainListenerModule } from './blockchain-listener/blockchain-listener.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot(),
    // UserModule,
    BlockchainListenerModule,
    OrdersModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
