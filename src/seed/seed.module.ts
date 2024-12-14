import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Crop } from '../crops/entities/crop.entity';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';
import { ConfigModule } from '@nestjs/config';
import { configurationService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Crop, Producer, Farm]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
