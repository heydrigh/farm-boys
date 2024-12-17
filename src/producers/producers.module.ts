import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { Producer } from './entities/producer.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Crop } from 'src/crops/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Crop])],
  controllers: [ProducersController],
  providers: [ProducersService],
  exports: [ProducersService],
})
export class ProducersModule {}
