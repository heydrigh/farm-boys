import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';
import { ProducersService } from '../producers/producers.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { EntityNotFoundError } from 'typeorm';
import { Crop } from 'src/crops/entities/crop.entity';

const mockFarm = {
  id: '1',
  name: 'Test Farm',
  city: 'Test City',
  state: 'Test State',
  totalArea: 100,
  agriculturalArea: 50,
  vegetationArea: 20,
};

const mockProducer = { id: '1', name: 'John Doe', farm: null };

const mockCrops = [
  { id: 'crop-1', name: 'Soja' },
  { id: 'crop-2', name: 'Milho' },
];

const mockFarmRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockFarm),
  find: jest.fn().mockResolvedValue([mockFarm]),
  findOneOrFail: jest.fn().mockResolvedValue(mockFarm),
  remove: jest.fn().mockResolvedValue(undefined),
};

const mockProducersService = {
  findOne: jest.fn().mockResolvedValue(mockProducer),
};

const mockCropRepository = {
  findBy: jest.fn().mockResolvedValue(mockCrops),
};

describe('FarmsService', () => {
  let service: FarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmsService,
        { provide: getRepositoryToken(Farm), useValue: mockFarmRepository },
        { provide: ProducersService, useValue: mockProducersService },
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<FarmsService>(FarmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if the farm area validation fails', async () => {
      const createDto: CreateFarmDto = {
        name: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalArea: 50,
        agriculturalArea: 30,
        vegetationArea: 30,
        cropIds: ['1', '2'],
      };

      await expect(service.createFarm(createDto)).rejects.toThrow(
        'Agricultural area and vegetation area cannot exceed total area',
      );
    });
  });

  describe('findAll', () => {
    it('should return all farms', async () => {
      const result = await service.findAll();
      expect(mockFarmRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockFarm]);
    });
  });

  describe('findOne', () => {
    it('should return a farm by ID', async () => {
      const result = await service.findOne('1');
      expect(mockFarmRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['producer', 'crops'],
      });
      expect(result).toEqual(mockFarm);
    });

    it('should throw an error if the farm is not found', async () => {
      mockFarmRepository.findOneOrFail.mockRejectedValueOnce(
        new EntityNotFoundError(Farm, { id: '1' }),
      );

      await expect(service.findOne('1')).rejects.toThrow(EntityNotFoundError);
    });
  });

  describe('update', () => {
    it('should update a farm', async () => {
      const updateDto: UpdateFarmDto = { name: 'Updated Farm' };
      const updatedFarm = { ...mockFarm, ...updateDto };

      const result = await service.update('1', updateDto);
      expect(mockFarmRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['producer', 'crops'],
      });
      expect(mockFarmRepository.save).toHaveBeenCalledWith(updatedFarm);
      expect(result).toEqual(mockFarm);
    });

    it('should throw an error if the farm area validation fails', async () => {
      const updateDto: UpdateFarmDto = {
        agriculturalArea: 60,
        vegetationArea: 50,
        totalArea: 100,
      };

      await expect(service.update('1', updateDto)).rejects.toThrow(
        'Agricultural area and vegetation area cannot exceed total area',
      );
    });
  });

  describe('remove', () => {
    it('should remove a farm', async () => {
      await service.remove('1');
      expect(mockFarmRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['producer', 'crops'],
      });
      expect(mockFarmRepository.remove).toHaveBeenCalledWith(mockFarm);
    });

    it('should throw an error if the farm does not exist', async () => {
      mockFarmRepository.findOneOrFail.mockRejectedValueOnce(
        new EntityNotFoundError(Farm, { id: '1' }),
      );

      await expect(service.findOne('1')).rejects.toThrow(EntityNotFoundError);
    });
  });
});
