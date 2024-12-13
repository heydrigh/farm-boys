import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { CropsService } from './crops.service';
import { Repository } from 'typeorm';

const mockCrop = { id: '1', name: 'soy' };

const mockCropRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockCrop),
  find: jest.fn().mockResolvedValue([mockCrop]),
  findOneByOrFail: jest.fn().mockResolvedValue(mockCrop),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('CropsService', () => {
  let service: CropsService;
  let repository: Repository<Crop>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropsService,
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<CropsService>(CropsService);
    repository = module.get<Repository<Crop>>(getRepositoryToken(Crop));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new crop', async () => {
      const createDto = { name: 'soy' };
      const result = await service.create(createDto);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCrop);
    });
  });

  describe('findAll', () => {
    it('should return an array of crops', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockCrop]);
    });
  });

  describe('findOne', () => {
    it('should find a crop by ID', async () => {
      const result = await service.findOne('1');
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockCrop);
    });
  });

  describe('update', () => {
    it('should update a crop', async () => {
      const updateDto = { name: 'Updated soy' };
      mockCropRepository.findOneByOrFail.mockResolvedValueOnce(mockCrop);
      const result = await service.update('1', updateDto);
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockCrop,
        ...updateDto,
      });
      expect(result).toEqual(mockCrop);
    });
  });

  describe('remove', () => {
    it('should remove a crop', async () => {
      mockCropRepository.findOneByOrFail.mockResolvedValueOnce(mockCrop);
      await service.remove('1');
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(repository.remove).toHaveBeenCalledWith(mockCrop);
    });
  });
});
