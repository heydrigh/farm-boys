import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducersService } from './producers.service';
import { Producer } from './entities/producer.entity';
import { Crop } from 'src/crops/entities/crop.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { In } from 'typeorm';
import { UpdateProducerDto } from './dto/update-producer.dto';

// Mock data
const mockCrops = [
  { id: 'crop-1', name: 'Soja' },
  { id: 'crop-2', name: 'Milho' },
];

const mockFarm = {
  id: 'farm-1',
  name: 'Fazenda Teste',
  city: 'Cidade Teste',
  state: 'SP',
  totalArea: 100,
  agriculturalArea: 60,
  vegetationArea: 40,
  crops: mockCrops,
};

const mockProducer = {
  id: 'producer-1',
  cpfCnpj: '12345678901',
  name: 'John Doe',
  farm: mockFarm,
};

// Mock repositories
const mockProducerRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockProducer),
  find: jest.fn().mockResolvedValue([mockProducer]),
  findOneOrFail: jest.fn().mockResolvedValue(mockProducer),
  remove: jest.fn().mockResolvedValue(undefined),
};

const mockFarmRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
};

const mockCropRepository = {
  findBy: jest.fn().mockResolvedValue(mockCrops),
};

describe('ProducersService', () => {
  let service: ProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockProducerRepository,
        },
        {
          provide: getRepositoryToken(Farm),
          useValue: mockFarmRepository,
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a new producer', async () => {
      const createDto = {
        cpfCnpj: '12345678901',
        name: 'John Doe',
        farm: {
          name: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          totalArea: 100,
          agriculturalArea: 60,
          vegetationArea: 40,
          cropIds: ['crop-1', 'crop-2'],
        },
      };

      const result = await service.create(createDto);

      expect(mockCropRepository.findBy).toHaveBeenCalledWith({
        id: In(createDto.farm.cropIds),
      });
      expect(mockFarmRepository.create).toHaveBeenCalledWith({
        ...createDto.farm,
        crops: mockCrops,
      });
      expect(mockProducerRepository.create).toHaveBeenCalled();
      expect(mockProducerRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockProducer);
    });
  });

  describe('findAll', () => {
    it('should return a list of producers', async () => {
      const result = await service.findAll();
      expect(mockProducerRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockProducer]);
    });
  });

  describe('findOne', () => {
    it('should find a producer by its ID', async () => {
      const result = await service.findOne('producer-1');
      expect(mockProducerRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: 'producer-1' },
        relations: ['farm', 'farm.crops'],
      });
      expect(result).toEqual(mockProducer);
    });
  });

  describe('update', () => {
    it('should update an existing producer', async () => {
      const updateDto = {
        name: 'Updated Name',
        cpfCnpj: '123',
        farm: {
          name: 'Updated Farm Name',
          agriculturalArea: 1,
          city: 'city',
          state: 'state',
          totalArea: 2,
          vegetationArea: 1,
          cropIds: ['crop-1'],
        },
      } satisfies UpdateProducerDto;

      mockProducerRepository.findOneOrFail.mockResolvedValueOnce(mockProducer);

      const result = await service.update('producer-1', updateDto);

      expect(mockCropRepository.findBy).toHaveBeenCalledWith({
        id: In(updateDto.farm.cropIds),
      });

      expect(mockProducerRepository.save).toHaveBeenCalledWith({
        ...mockProducer,
        ...updateDto,
        farm: {
          ...mockProducer.farm,
          ...updateDto.farm,
          crops: mockCrops,
        },
      });

      expect(result).toEqual(mockProducer);
    });
  });

  describe('remove', () => {
    it('should delete an existing producer', async () => {
      mockProducerRepository.findOneOrFail.mockResolvedValueOnce(mockProducer);
      await service.remove('producer-1');
      expect(mockProducerRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: 'producer-1' },
        relations: ['farm', 'farm.crops'],
      });
      expect(mockProducerRepository.remove).toHaveBeenCalledWith(mockProducer);
    });
  });
});
