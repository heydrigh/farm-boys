import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from '../farms/entities/farm.entity';
import { Crop } from '../crops/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Crop])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
