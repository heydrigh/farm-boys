import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

const mockFarm = { id: '1', name: 'Test Farm' };

const mockFarmsService = {
  create: jest.fn().mockResolvedValue(mockFarm),
  findAll: jest.fn().mockResolvedValue([mockFarm]),
  findOne: jest.fn().mockResolvedValue(mockFarm),
  update: jest.fn().mockResolvedValue(mockFarm),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('FarmsController', () => {
  let controller: FarmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmsController],
      providers: [{ provide: FarmsService, useValue: mockFarmsService }],
    }).compile();

    controller = module.get<FarmsController>(FarmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new farm', async () => {
      const createDto: CreateFarmDto = {
        name: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalArea: 100,
        agriculturalArea: 50,
        vegetationArea: 20,
        producerId: '1',
        cropIds: ['1', '2'],
      };
      const result = await controller.create(createDto);
      expect(mockFarmsService.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockFarm);
    });
  });

  describe('findAll', () => {
    it('should return all farms', async () => {
      const result = await controller.findAll();
      expect(mockFarmsService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockFarm]);
    });
  });

  describe('findOne', () => {
    it('should return a farm by ID', async () => {
      const result = await controller.findOne('1');
      expect(mockFarmsService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockFarm);
    });
  });

  describe('update', () => {
    it('should update a farm', async () => {
      const updateDto: UpdateFarmDto = { name: 'Updated Farm' };
      const result = await controller.update('1', updateDto);
      expect(mockFarmsService.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(mockFarm);
    });
  });

  describe('remove', () => {
    it('should remove a farm', async () => {
      const result = await controller.remove('1');
      expect(mockFarmsService.remove).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
