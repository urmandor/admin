import { fileUploadOptions } from '@server/config/fileUpload';
import { Product } from '@server/models';
import { Body, Get, JsonController, Param, Post, QueryParam, UploadedFile } from 'routing-controllers';
import { categoryRepository, productRepository } from '../repositories';

interface IPostProductRequest {
  name: string;
  url: string;
  description: string;
  price: number;
  categoryId: number;
}

@JsonController()
export class ProductController {
  @Get('/stores/:store/categories/:category/products')
  public async getAll(
    @Param('category') categoryUrl: string,
    @Param('store') storeUrl: string,
    @QueryParam('limit', { validate: { always: true } }) limit = 10,
    @QueryParam('offset', { validate: { always: true } }) offset = 0,
  ): Promise<{ data: Product[]; count: number }> {
    const [data, count] = await productRepository.findAndCount({
      where: { category: { url: categoryUrl, store: { url: storeUrl } } },
      skip: offset,
      take: limit,
      order: { id: 'DESC' },
    });
    return { data, count };
  }

  @Post('/stores/:store/categories/:category/products')
  public async post(
    @Body() product: IPostProductRequest,
    @Param('category') categoryUrl: string,
    @Param('store') storeUrl: string,
    @UploadedFile('file', { options: fileUploadOptions() }) file: Express.Multer.File,
  ): Promise<Product> {
    const { name, description, url, price } = product;
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.url = url;
    newProduct.price = price;
    if (file) {
      newProduct.imageUrl = '/uploads/' + file.filename;
    }

    const category = await categoryRepository.findOneBy({ url: categoryUrl, store: { url: storeUrl } });
    if (!category) {
      throw new Error('Category not found');
    }

    newProduct.category = category;

    return productRepository.save(newProduct);
  }
}
