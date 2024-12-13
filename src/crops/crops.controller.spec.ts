import { Test, TestingModule } from '@nestjs/testing';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

const mockCrop = { id: '1', name: 'soy' };

const mockCropsService = {
  create: jest.fn().mockResolvedValue(mockCrop),
  findAll: jest.fn().mockResolvedValue([mockCrop]),
  findOne: jest.fn().mockResolvedValue(mockCrop),
  update: jest.fn().mockResolvedValue(mockCrop),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('CropsController', () => {
  let controller: CropsController;
  let service: CropsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropsController],
      providers: [
        {
          provide: CropsService,
          useValue: mockCropsService,
        },
      ],
    }).compile();

    controller = module.get<CropsController>(CropsController);
    service = module.get<CropsService>(CropsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new crop', async () => {
      const createDto: CreateCropDto = { name: 'soy' };
      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCrop);
    });
  });

  describe('findAll', () => {
    it('should return an array of crops', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCrop]);
    });
  });

  describe('findOne', () => {
    it('should return a crop by ID', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCrop);
    });
  });

  describe('update', () => {
    it('should update a crop', async () => {
      const updateDto: UpdateCropDto = { name: 'Updated soy' };
      const result = await controller.update('1', updateDto);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(mockCrop);
    });
  });

  describe('remove', () => {
    it('should remove a crop by ID', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
