import { fileUploadOptions } from '@server/config/fileUpload';
import { Category } from '@server/models';
import { Body, Get, JsonController, Param, Post, QueryParam, UploadedFile } from 'routing-controllers';
import { categoryRepository, storeRepository } from '../repositories';

interface IPostCategoryRequest {
  name: string;
  url: string;
}

@JsonController()
export class CategoryController {
  @Get('/stores/:store/categories')
  public async getAll(
    @Param('store') storeUrl: string,
    @QueryParam('limit', { validate: { always: true } }) limit = 10,
    @QueryParam('offset', { validate: { always: true } }) offset = 0,
  ): Promise<{ data: Category[]; count: number }> {
    const [data, count] = await categoryRepository.findAndCount({
      where: { store: { url: storeUrl } },
      skip: offset,
      take: limit,
      order: { id: 'DESC' },
    });
    return { data, count };
  }

  @Post('/stores/:store/categories')
  public async post(
    @Body() category: IPostCategoryRequest,
    @Param('store') storeUrl: string,
    @UploadedFile('file', { options: fileUploadOptions() }) file: Express.Multer.File,
  ): Promise<Category> {
    const { name, url } = category;
    const newCategory = new Category();
    newCategory.name = name;
    newCategory.url = url;
    if (file) {
      newCategory.imageUrl = '/uploads/' + file.filename;
    }

    const store = await storeRepository.findOneBy({ url: storeUrl });
    if (!store) {
      throw new Error('Store not found');
    }

    newCategory.store = store;

    return categoryRepository.save(newCategory);
  }
}
