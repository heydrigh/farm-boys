import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { CreateFarmDto } from 'src/farms/dto/create-farm.dto';

export class CreateProducerDto {
  @ApiProperty({ description: 'CPF or CNPJ of the producer' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'CPF must be 11 digits or CNPJ must be 14 digits',
  })
  cpfCnpj: string;

  @ApiProperty({ description: 'Name of the producer' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Farm associated with the producer',
    type: CreateFarmDto,
  })
  @ValidateNested()
  @Type(() => CreateFarmDto)
  farm: CreateFarmDto;
}
