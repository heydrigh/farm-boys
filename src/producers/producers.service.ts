import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Crop } from 'src/crops/entities/crop.entity';
import { Farm } from 'src/farms/entities/farm.entity';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const { farm: farmData, ...producerData } = createProducerDto;

    const crops = await this.cropRepository.findBy({
      id: In(farmData.cropIds),
    });

    const farm = this.farmRepository.create({
      ...farmData,
      crops,
    });

    const producer = this.producerRepository.create({
      ...producerData,
      farm,
    });

    return this.producerRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepository.find();
  }

  async findOne(id: string): Promise<Producer> {
    return this.producerRepository.findOneOrFail({
      where: { id },
      relations: ['farm', 'farm.crops'],
    });
  }

  async update(
    id: string,
    updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    const producer = await this.findOne(id);

    const { farm: farmData, ...producerUpdates } = updateProducerDto;

    const crops = await this.cropRepository.findBy({
      id: In(farmData.cropIds),
    });

    producer.farm = {
      ...producer.farm,
      ...farmData,
      crops,
    };

    const updatedProducer = {
      ...producer,
      ...producerUpdates,
    };

    return this.producerRepository.save(updatedProducer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);
    await this.producerRepository.remove(producer);
  }
}
