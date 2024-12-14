import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ description: 'Name of the farm' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'City where the farm is located' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State where the farm is located' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Total area of the farm in hectares' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty({ description: 'Agricultural area of the farm in hectares' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  agriculturalArea: number;

  @ApiProperty({ description: 'Vegetation area of the farm in hectares' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @ApiProperty({ description: 'ID of the producer who owns the farm' })
  @IsNotEmpty()
  @IsString()
  producerId: string;

  @ApiProperty({
    description: 'List of crop IDs associated with the farm',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  cropIds: string[];
}
