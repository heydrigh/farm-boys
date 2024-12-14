import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

const mockDashboardService = {
  getTotalFarms: jest.fn(),
  getTotalFarmArea: jest.fn(),
  getLandUseDistribution: jest.fn(),
  getFarmsByState: jest.fn(),
  getFarmsByCrop: jest.fn(),
};

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTotalFarms', () => {
    it('should return total farms', async () => {
      mockDashboardService.getTotalFarms.mockResolvedValue({ totalFarms: 42 });

      const result = await controller.getTotalFarms();
      expect(mockDashboardService.getTotalFarms).toHaveBeenCalled();
      expect(result).toEqual({ totalFarms: 42 });
    });
  });

  describe('getTotalFarmArea', () => {
    it('should return total farm area', async () => {
      mockDashboardService.getTotalFarmArea.mockResolvedValue({
        totalFarmArea: 10000,
      });

      const result = await controller.getTotalFarmArea();
      expect(mockDashboardService.getTotalFarmArea).toHaveBeenCalled();
      expect(result).toEqual({ totalFarmArea: 10000 });
    });
  });

  describe('getLandUseDistribution', () => {
    it('should return land use distribution', async () => {
      mockDashboardService.getLandUseDistribution.mockResolvedValue({
        agriculturalArea: 6000,
        vegetationArea: 4000,
      });

      const result = await controller.getLandUseDistribution();
      expect(mockDashboardService.getLandUseDistribution).toHaveBeenCalled();
      expect(result).toEqual({
        agriculturalArea: 6000,
        vegetationArea: 4000,
      });
    });
  });

  describe('getFarmsByState', () => {
    it('should return farms grouped by state', async () => {
      mockDashboardService.getFarmsByState.mockResolvedValue([
        { state: 'Bahia', count: 20 },
        { state: 'Ceara', count: 22 },
      ]);

      const result = await controller.getFarmsByState();
      expect(mockDashboardService.getFarmsByState).toHaveBeenCalled();
      expect(result).toEqual([
        { state: 'Bahia', count: 20 },
        { state: 'Ceara', count: 22 },
      ]);
    });
  });

  describe('getFarmsByCrop', () => {
    it('should return farms grouped by crop', async () => {
      mockDashboardService.getFarmsByCrop.mockResolvedValue([
        { crop: 'soy', count: 1 },
        { crop: 'Corn', count: 2 },
      ]);

      const result = await controller.getFarmsByCrop();
      expect(mockDashboardService.getFarmsByCrop).toHaveBeenCalled();
      expect(result).toEqual([
        { crop: 'soy', count: 1 },
        { crop: 'Corn', count: 2 },
      ]);
    });
  });
});
