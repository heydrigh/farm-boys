import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { DataSource } from 'typeorm';
import { configurationService } from './config.service';

const dataSourceOptions = configurationService.getTypeOrmConfig();

export default new DataSource(dataSourceOptions);
