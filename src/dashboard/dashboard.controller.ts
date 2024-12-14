import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import {
  TotalFarmsResponse,
  TotalFarmAreaResponse,
  LandUseDistributionResponse,
  FarmsByStateResponse,
  FarmsByCropResponse,
} from './interfaces/responses';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-farms')
  @ApiOperation({ summary: 'Get the total number of farms' })
  @ApiResponse({
    status: 200,
    description: 'Total number of farms',
    type: TotalFarmsResponse,
  })
  async getTotalFarms(): Promise<TotalFarmsResponse> {
    return this.dashboardService.getTotalFarms();
  }

  @Get('total-farm-area')
  @ApiOperation({ summary: 'Get the total farm area in hectares' })
  @ApiResponse({
    status: 200,
    description: 'Total area of all farms in hectares',
    type: TotalFarmAreaResponse,
  })
  async getTotalFarmArea(): Promise<TotalFarmAreaResponse> {
    return this.dashboardService.getTotalFarmArea();
  }

  @Get('land-use-distribution')
  @ApiOperation({ summary: 'Get the distribution of land use areas' })
  @ApiResponse({
    status: 200,
    description: 'Distribution of land use across all farms',
    type: LandUseDistributionResponse,
  })
  async getLandUseDistribution(): Promise<LandUseDistributionResponse> {
    return this.dashboardService.getLandUseDistribution();
  }

  @Get('farms-by-state')
  @ApiOperation({ summary: 'Get the count of farms grouped by state' })
  @ApiResponse({
    status: 200,
    description: 'List of states with their respective farm counts',
    type: [FarmsByStateResponse],
  })
  async getFarmsByState(): Promise<FarmsByStateResponse[]> {
    return this.dashboardService.getFarmsByState();
  }

  @Get('farms-by-crop')
  @ApiOperation({ summary: 'Get the count of farms grouped by crop type' })
  @ApiResponse({
    status: 200,
    description: 'List of crop types with their respective farm counts',
    type: [FarmsByCropResponse],
  })
  async getFarmsByCrop(): Promise<FarmsByCropResponse[]> {
    return this.dashboardService.getFarmsByCrop();
  }
}
