import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { ProducersService } from '../producers/producers.service';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    private readonly producersService: ProducersService,
  ) {}

  private validateFarmArea(
    agriculturalArea: number,
    vegetationArea: number,
    totalArea: number,
  ): void {
    if (agriculturalArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'Agricultural area and vegetation area cannot exceed total area',
      );
    }
  }

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const producer = await this.producersService.findOne(
      createFarmDto.producerId,
    );

    if (producer.farm) {
      throw new BadRequestException(
        `Producer with ID ${producer.id} already has a farm`,
      );
    }

    this.validateFarmArea(
      createFarmDto.agriculturalArea,
      createFarmDto.vegetationArea,
      createFarmDto.totalArea,
    );

    const farm = this.farmRepository.create({ ...createFarmDto, producer });
    return this.farmRepository.save(farm);
  }

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find({ relations: ['producer', 'crops'] });
  }

  async findOne(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOneOrFail({
      where: { id },
      relations: ['producer', 'crops'],
    });

    return farm;
  }

  async update(id: string, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    const farm = await this.findOne(id);

    const updatedFarm = { ...farm, ...updateFarmDto };

    this.validateFarmArea(
      updatedFarm.agriculturalArea,
      updatedFarm.vegetationArea,
      updatedFarm.totalArea,
    );

    return this.farmRepository.save(updatedFarm);
  }

  async remove(id: string): Promise<void> {
    const farm = await this.findOne(id);
    await this.farmRepository.remove(farm);
  }
}
