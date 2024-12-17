import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Producer } from '../../producers/entities/producer.entity';
import { Crop } from '../../crops/entities/crop.entity';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the farm' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the farm' })
  name: string;

  @Column()
  @ApiProperty({ description: 'City where the farm is located' })
  city: string;

  @Column()
  @ApiProperty({ description: 'State where the farm is located' })
  state: string;

  @Column('float')
  @ApiProperty({ description: 'Total area of the farm in hectares' })
  totalArea: number;

  @Column('float')
  @ApiProperty({ description: 'Agricultural area of the farm in hectares' })
  agriculturalArea: number;

  @Column('float')
  @ApiProperty({ description: 'Vegetation area of the farm in hectares' })
  vegetationArea: number;

  @OneToOne(() => Producer, (producer) => producer.farm, {
    onDelete: 'CASCADE',
  })
  producer: Producer;

  @ManyToMany(() => Crop, (crop) => crop.farms, { eager: true, cascade: true })
  @JoinTable()
  @ApiProperty({
    description: 'Crops associated with the farm',
    type: () => [Crop],
  })
  crops: Crop[];
}
