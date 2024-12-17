import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';

@ApiTags('Producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiResponse({
    status: 201,
    description: 'Producer created successfully',
    type: Producer,
  })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all producers' })
  @ApiResponse({
    status: 200,
    description: 'List of producers',
    type: [Producer],
  })
  findAll() {
    return this.producersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a producer by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the producer',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Producer details', type: Producer })
  findOne(@Param('id') id: string) {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a producer by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the producer',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Producer updated successfully',
    type: Producer,
  })
  update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a producer by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the producer',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Producer deleted successfully' })
  remove(@Param('id') id: string) {
    return this.producersService.remove(id);
  }
}
