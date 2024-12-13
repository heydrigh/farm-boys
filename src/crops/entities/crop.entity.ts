import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the crop' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Name of the crop' })
  name: string;
}
