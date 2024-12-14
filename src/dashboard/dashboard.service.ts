import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../farms/entities/farm.entity';
import { Crop } from '../crops/entities/crop.entity';
import {
  FarmsByCropResponse,
  FarmsByStateResponse,
  LandUseDistributionResponse,
  TotalFarmsResponse,
  TotalFarmAreaResponse,
} from './interfaces/responses';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async getTotalFarms(): Promise<TotalFarmsResponse> {
    const count = await this.farmRepository.count();
    return { totalFarms: count };
  }

  async getTotalFarmArea(): Promise<TotalFarmAreaResponse> {
    const { totalArea } = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'totalArea')
      .getRawOne();

    return { totalFarmArea: totalArea || 0 };
  }

  async getLandUseDistribution(): Promise<LandUseDistributionResponse> {
    const { agriculturalArea, vegetationArea } = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.agriculturalArea)', 'agriculturalArea')
      .addSelect('SUM(farm.vegetationArea)', 'vegetationArea')
      .getRawOne();

    return {
      agriculturalArea: agriculturalArea || 0,
      vegetationArea: vegetationArea || 0,
    };
  }

  async getFarmsByState(): Promise<FarmsByStateResponse[]> {
    const rawResult = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(farm.id)', 'count')
      .groupBy('farm.state')
      .getRawMany();

    return rawResult.map((row) => ({
      state: row.state,
      count: Number(row.count),
    }));
  }

  async getFarmsByCrop(): Promise<FarmsByCropResponse[]> {
    const crops = await this.cropRepository.find({
      relations: ['farms'],
    });

    return crops.map((crop) => ({
      crop: crop.name,
      count: crop.farms.length,
    }));
  }
}
