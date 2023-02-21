import * as ABI from './contractAbi.json';

import { Injectable, Logger } from '@nestjs/common';

import { OrdersService } from 'src/orders/orders.service';
import { UtilsService } from 'src/utils/utils.service';

const Web3 = require('web3');

@Injectable()
export class BlockchainListenerService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly utilsService: UtilsService,
  ) {}

  private readonly logger = new Logger(BlockchainListenerService.name);

  web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.ETH_NETWORK),
  );
  orderContract = new this.web3.eth.Contract(ABI, process.env.ETH_CONTRACT);

  async onApplicationBootstrap() {
    this.logger.log(
      'Checking all events in the database and recording in the absence of ...',
    );
    await this.runBlockchainListenerEvents();
  }

  async runBlockchainListenerEvents() {
    this.listenOrderCreated();
    this.listenOrderMatched();
    this.listenOrderCancelled();
    await this.recoveryOrdersCreated();
    await this.recoveryOrdersMatched();
    await this.recoveryOrdersCancelled();
  }

  async recoveryOrdersCreated(): Promise<void> {
    const orderCreatedEventsArray = await this.getPastEvents('OrderCreated');
    const saveDataInDB = (element, index) => {
      return new Promise((resolve) => {
        resolve(this.saveDataOrderCreated(element));
      });
    };
    return await this.utilsService.PromiseAllArraySeries(
      orderCreatedEventsArray,
      saveDataInDB,
    );
  }

  async recoveryOrdersMatched(): Promise<void> {
    const orderMatchedEventsArray = await this.getPastEvents('OrderMatched');
    const saveDataInDB = (element, index) => {
      return new Promise((resolve) => {
        resolve(this.saveDataOrderMatched(element));
      });
    };
    return await this.utilsService.PromiseAllArraySeries(
      orderMatchedEventsArray,
      saveDataInDB,
    );
  }

  async recoveryOrdersCancelled(): Promise<void> {
    const orderCancelledEventsArray = await this.getPastEvents(
      'OrderCancelled',
    );
    const saveDataInDB = (element, index) => {
      return new Promise((resolve) => {
        resolve(this.saveDataOrderCancelled(element));
      });
    };
    return await this.utilsService.PromiseAllArraySeries(
      orderCancelledEventsArray,
      saveDataInDB,
    );
  }

  async getPastEvents(eventName: string) {
    return await this.orderContract.getPastEvents(
      eventName,
      {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest',
      },
      () => {},
    );
  }

  async listenOrderCreated() {
    this.orderContract.events.OrderCreated(
      { fromBlock: 'latest' },
      (error, event) => {
        this.saveDataOrderCreated(event);
      },
    );
  }

  async listenOrderMatched() {
    this.orderContract.events.OrderMatched(
      { fromBlock: 'latest' },
      (error, event) => {
        this.saveDataOrderMatched(event);
      },
    );
  }

  async listenOrderCancelled() {
    this.orderContract.events.OrderCancelled(
      { fromBlock: 'latest' },
      (error, event) => {
        this.saveDataOrderCancelled(event);
      },
    );
  }

  async saveDataOrderCreated(e) {
    const data = this.utilsService.convertOrderCreatedData(e);
    return await this.ordersService.createOrder(data);
  }

  async saveDataOrderMatched(e) {
    const data = this.utilsService.convertOrderMatchedData(e);
    return await this.ordersService.matchOrder(data);
  }

  async saveDataOrderCancelled(e) {
    const data = this.utilsService.convertOrderCancelledData(e);
    return await this.ordersService.cancelOrder(data);
  }
}
