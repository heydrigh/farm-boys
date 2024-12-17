import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';
import { ProducersModule } from '../producers/producers.module';
import { Crop } from 'src/crops/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Crop]), ProducersModule],
  controllers: [],
  providers: [FarmsService],
  exports: [FarmsService],
})
export class FarmsModule {}
