import { Category } from '../models';
import { AppDataSource } from '../config/dataSource';

export const categoryRepository = AppDataSource.getRepository(Category);
