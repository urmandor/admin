import { Store } from '../models';
import { AppDataSource } from '../config/dataSource';

export const storeRepository = AppDataSource.getRepository(Store);
