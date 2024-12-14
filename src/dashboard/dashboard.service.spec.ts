import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { Farm } from '../farms/entities/farm.entity';
import { Crop } from '../crops/entities/crop.entity';

const mockFarmRepository = {
  count: jest.fn(),
  createQueryBuilder: jest.fn(),
};

const mockCropRepository = {
  find: jest.fn(),
};

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getRepositoryToken(Farm), useValue: mockFarmRepository },
        { provide: getRepositoryToken(Crop), useValue: mockCropRepository },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTotalFarms', () => {
    it('should return the total number of farms', async () => {
      mockFarmRepository.count.mockResolvedValue(42);

      const result = await service.getTotalFarms();
      expect(mockFarmRepository.count).toHaveBeenCalled();
      expect(result).toEqual({ totalFarms: 42 });
    });
  });

  describe('getTotalFarmArea', () => {
    it('should return the total farm area', async () => {
      mockFarmRepository.createQueryBuilder.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ totalArea: 10000 }),
      });

      const result = await service.getTotalFarmArea();
      expect(mockFarmRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual({ totalFarmArea: 10000 });
    });
  });

  describe('getLandUseDistribution', () => {
    it('should return the land use distribution', async () => {
      mockFarmRepository.createQueryBuilder.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          agriculturalArea: 6000,
          vegetationArea: 4000,
        }),
      });

      const result = await service.getLandUseDistribution();
      expect(mockFarmRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual({
        agriculturalArea: 6000,
        vegetationArea: 4000,
      });
    });
  });

  describe('getFarmsByState', () => {
    it('should return farms grouped by state', async () => {
      mockFarmRepository.createQueryBuilder.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { state: 'California', count: '20' },
          { state: 'Texas', count: '22' },
        ]),
      });

      const result = await service.getFarmsByState();
      expect(mockFarmRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual([
        { state: 'California', count: 20 },
        { state: 'Texas', count: 22 },
      ]);
    });
  });

  describe('getFarmsByCrop', () => {
    it('should return farms grouped by crop', async () => {
      mockCropRepository.find.mockResolvedValue([
        { name: 'Soybean', farms: [{}] },
        { name: 'Corn', farms: [{}, {}] },
      ]);

      const result = await service.getFarmsByCrop();
      expect(mockCropRepository.find).toHaveBeenCalledWith({
        relations: ['farms'],
      });
      expect(result).toEqual([
        { crop: 'Soybean', count: 1 },
        { crop: 'Corn', count: 2 },
      ]);
    });
  });
});
