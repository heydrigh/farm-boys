import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { ProducersService } from './producers.service';
import { Repository } from 'typeorm';

const mockProducer = { id: '1', cpfCnpj: '12345678901', name: 'John Doe' };

const mockProducerRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockProducer),
  find: jest.fn().mockResolvedValue([mockProducer]),
  findOneByOrFail: jest.fn().mockResolvedValue(mockProducer),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockProducerRepository,
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    repository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new producer', async () => {
      const createDto = { cpfCnpj: '12345678901', name: 'John Doe' };
      const result = await service.create(createDto);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockProducer);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockProducer]);
    });
  });

  describe('findOne', () => {
    it('should find a producer by ID', async () => {
      const result = await service.findOne('1');
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockProducer);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const updateDto = { name: 'Updated Name' };
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(mockProducer);

      const result = await service.update('1', updateDto);
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockProducer,
        ...updateDto,
      });
      expect(result).toEqual(mockProducer);
    });
  });

  describe('remove', () => {
    it('should remove a producer', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(mockProducer);
      await service.remove('1');
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(repository.remove).toHaveBeenCalledWith(mockProducer);
    });
  });
});
