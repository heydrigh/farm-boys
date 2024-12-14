import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

const mockProducer = { id: '1', cpfCnpj: '12345678901', name: 'John Doe' };

const mockProducersService = {
  create: jest.fn().mockResolvedValue(mockProducer),
  findAll: jest.fn().mockResolvedValue([mockProducer]),
  findOne: jest.fn().mockResolvedValue(mockProducer),
  update: jest.fn().mockResolvedValue(mockProducer),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: ProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: mockProducersService,
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new producer', async () => {
      const createDto: CreateProducerDto = {
        cpfCnpj: '12345678901',
        name: 'John Doe',
      };
      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockProducer);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockProducer]);
    });
  });

  describe('findOne', () => {
    it('should return a producer by ID', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProducer);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const updateDto: UpdateProducerDto = { name: 'Updated Name' };
      const result = await controller.update('1', updateDto);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(mockProducer);
    });
  });

  describe('remove', () => {
    it('should remove a producer by ID', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
