import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Farm } from 'src/farms/entities/farm.entity';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the crop' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Name of the crop' })
  name: string;

  @ManyToMany(() => Farm, (farm) => farm.crops)
  @ApiProperty({
    description: 'Farms associated with this crop',
    type: () => [Farm],
  })
  farms: Farm[];
}
