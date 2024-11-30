import { Controller, Get } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { AnalyticsService } from './analytics.service';
import { MonthlyRevenue } from './domain/analytics';

@Controller({
  version: '1',
  path: 'analytics',
})
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('best-selling-products')
  async getBestSellingProducts() {
    return this.analyticsService.getBestSellingProducts();
  }

  @Get('monthly-revenue')
  async getMonthlyRevenue(): Promise<NullableType<MonthlyRevenue>> {
    return this.analyticsService.getMonthlyRevenue();
  }

  @Get('dashboard-metrics')
  async getDashboardMetrics() {
    return this.analyticsService.getDashboardMetrics();
  }
}
