import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropDto {
  @ApiProperty({ description: 'Name of the crop' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
