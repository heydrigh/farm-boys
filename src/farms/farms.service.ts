import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Crop } from 'src/crops/entities/crop.entity';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
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

  async createFarm(createFarmDto: CreateFarmDto): Promise<Farm> {
    this.validateFarmArea(
      createFarmDto.agriculturalArea,
      createFarmDto.vegetationArea,
      createFarmDto.totalArea,
    );

    const crops = await this.cropRepository.findBy({
      id: In(createFarmDto.cropIds),
    });

    if (crops.length !== createFarmDto.cropIds.length) {
      throw new Error('Some crop IDs are invalid or missing');
    }

    const farm = this.farmRepository.create({
      ...createFarmDto,
      crops,
    });

    return this.farmRepository.save(farm);
  }

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find({ relations: ['producer', 'crops'] });
  }

  async findOne(id: string): Promise<Farm> {
    return this.farmRepository.findOneOrFail({
      where: { id },
      relations: ['producer', 'crops'],
    });
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
