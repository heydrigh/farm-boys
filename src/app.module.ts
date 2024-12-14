import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationService } from './config/config.service';
import { CropsModule } from './crops/crops.module';
import { ProducersModule } from './producers/producers.module';
import { FarmsModule } from './farms/farms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfig()),
    CropsModule,
    ProducersModule,
    FarmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
