import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Farm } from '../../farms/entities/farm.entity';

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

  @OneToOne(() => Farm, (farm) => farm.producer, { cascade: true, eager: true })
  @JoinColumn()
  @ApiProperty({
    description: 'Farm associated with the producer',
    type: () => Farm,
  })
  farm: Farm;
}
