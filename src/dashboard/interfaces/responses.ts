import { ApiProperty } from '@nestjs/swagger';

export class TotalFarmsResponse {
  @ApiProperty({ description: 'Total number of farms' })
  totalFarms: number;
}

export class TotalFarmAreaResponse {
  @ApiProperty({ description: 'Total area of all farms in hectares' })
  totalFarmArea: number;
}

export class LandUseDistributionResponse {
  @ApiProperty({ description: 'Total agricultural area in hectares' })
  agriculturalArea: number;

  @ApiProperty({ description: 'Total vegetation area in hectares' })
  vegetationArea: number;
}

export class FarmsByStateResponse {
  @ApiProperty({ description: 'State name' })
  state: string;

  @ApiProperty({ description: 'Number of farms in the state' })
  count: number;
}

export class FarmsByCropResponse {
  @ApiProperty({ description: 'Crop name' })
  crop: string;

  @ApiProperty({ description: 'Number of farms growing the crop' })
  count: number;
}
