import { Product } from '../models';
import { AppDataSource } from '../config/dataSource';

export const productRepository = AppDataSource.getRepository(Product);
