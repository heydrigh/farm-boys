import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = this.cropRepository.create(createCropDto);
    return this.cropRepository.save(crop);
  }

  async findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  async findOne(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOneByOrFail({ id });

    return crop;
  }

  async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
    const crop = await this.findOne(id);
    const updatedCrop = { ...crop, ...updateCropDto };
    return this.cropRepository.save(updatedCrop);
  }

  async remove(id: string): Promise<void> {
    const crop = await this.findOne(id);
    await this.cropRepository.remove(crop);
  }
}
