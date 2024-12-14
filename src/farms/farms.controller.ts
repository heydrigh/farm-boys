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
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';

@ApiTags('Farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new farm' })
  @ApiResponse({
    status: 201,
    description: 'Farm created successfully',
    type: Farm,
  })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all farms' })
  @ApiResponse({ status: 200, description: 'List of farms', type: [Farm] })
  findAll() {
    return this.farmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a farm by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the farm',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Farm details', type: Farm })
  findOne(@Param('id') id: string) {
    return this.farmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a farm by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the farm',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Farm updated successfully',
    type: Farm,
  })
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmsService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farm by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the farm',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Farm deleted successfully' })
  remove(@Param('id') id: string) {
    return this.farmsService.remove(id);
  }
}
