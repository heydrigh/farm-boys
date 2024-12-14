import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the producer' })
  id: string;

  @Column()
  @ApiProperty({ description: 'CPF or CNPJ of the producer' })
  cpfCnpj: string;

  @Column()
  @ApiProperty({ description: 'Name of the producer' })
  name: string;
}
