import { Module, forwardRef } from '@nestjs/common';

import { BlockchainListenerController } from './blockchain-listener.controller';
import { BlockchainListenerService } from './blockchain-listener.service';
import { OrdersModule } from 'src/orders/orders.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [OrdersModule, UtilsModule],
  providers: [BlockchainListenerService],
  controllers: [BlockchainListenerController],
})
export class BlockchainListenerModule {}
