import { Module } from '@nestjs/common';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
