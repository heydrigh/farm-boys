import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';

@ApiTags('Crops')
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new crop' })
  @ApiResponse({
    status: 201,
    description: 'Crop created successfully',
    type: Crop,
  })
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all crops' })
  @ApiResponse({ status: 200, description: 'List of crops', type: [Crop] })
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a crop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the crop',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Crop details', type: Crop })
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a crop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the crop',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Crop updated successfully',
    type: Crop,
  })
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a crop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the crop',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Crop deleted successfully' })
  remove(@Param('id') id: string) {
    return this.cropsService.remove(id);
  }
}
