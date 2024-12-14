import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

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
}
