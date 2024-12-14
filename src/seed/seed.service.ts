import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../crops/entities/crop.entity';
import { Producer } from '../producers/entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Seeding database...');
    await this.seedCrops();
    const producers = await this.seedProducers();
    await this.seedFarms(producers);
    this.logger.log('Database seeding completed!');
  }

  private async seedCrops(): Promise<void> {
    const cropNames = ['Soja', 'Milho', 'Café', 'Cana-de-Açúcar', 'Trigo'];
    const crops = cropNames.map((name) => this.cropRepository.create({ name }));
    await this.cropRepository.save(crops);

    this.logger.log(`Seeded crops: ${cropNames.join(', ')}`);
  }

  private async seedProducers(): Promise<Producer[]> {
    const producerData = [
      { cpfCnpj: '11111111111', name: 'João Silva' },
      { cpfCnpj: '22222222222', name: 'Maria Oliveira' },
      { cpfCnpj: '33333333333', name: 'Carlos Santos' },
      { cpfCnpj: '44444444444', name: 'Ana Costa' },
      { cpfCnpj: '55555555555', name: 'Pedro Almeida' },
    ];

    const producers = producerData.map((data) =>
      this.producerRepository.create(data),
    );
    const savedProducers = await this.producerRepository.save(producers);

    this.logger.log(
      `Seeded producers: ${producerData.map((p) => p.name).join(', ')}`,
    );
    return savedProducers;
  }

  private async seedFarms(producers: Producer[]): Promise<void> {
    const farmData = producers.map((producer, index) => ({
      name: `Fazenda ${index + 1}`,
      city: `Cidade ${index + 1}`,
      state: `Estado ${index + 1}`,
      totalArea: 100 + index * 20,
      agriculturalArea: 60 + index * 10,
      vegetationArea: 40 + index * 10,
      producer,
    }));

    const farms = farmData.map((data) => this.farmRepository.create(data));
    const savedFarms = await this.farmRepository.save(farms);

    // Assign crops to farms
    const crops = await this.cropRepository.find();
    savedFarms.forEach((farm) => {
      farm.crops = crops.slice(0, 3); // Assign first 3 crops to each farm
    });
    await this.farmRepository.save(savedFarms);

    this.logger.log(`Seeded farms: ${farmData.map((f) => f.name).join(', ')}`);
  }
}
