import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor() {}

  async PromiseAllArraySeries(arr, fn) {
    return arr.reduce(
      (p, v, i) => p.then((a) => fn(v, i).then((r) => a.concat([r]))),
      Promise.resolve([]),
    );
  }

  convertOrderCreatedData(data: any) {
    const { tokenA, tokenB, user, isMarket, id } = data.returnValues;
    return {
      // amountA: parseInt(amountA),
      // amountB: parseInt(amountB),
      tokenA,
      tokenB,
      user,
      active: true,
      isMarket,
      orderId: id,
      status: data.event,
      blockNumber: data.blockNumber,
    };
  }

  convertOrderMatchedData(data: any) {
    const {
      id,
      matchedId,
      // amountReceived,
      // amountPaid,
      // amountLeftToFill,
      // fee,
      // feeRate,
    } = data.returnValues;
    return {
      matchedId,
      // amountReceived,
      // amountPaid,
      // amountLeftToFill,
      // fee,
      // feeRate,
      active: false,
      orderId: id,
      status: data.event,
      blockNumber: data.blockNumber,
    };
  }

  convertOrderCancelledData(data: any) {
    const { id } = data.returnValues;
    return {
      orderId: id,
      active: false,
      status: data.event,
      blockNumber: data.blockNumber,
    };
  }
}
