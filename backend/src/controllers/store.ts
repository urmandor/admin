import { fileUploadOptions } from '@server/config/fileUpload';
import { Store } from '@server/models';
import { Body, Get, JsonController, Post, QueryParam, UploadedFile } from 'routing-controllers';
import { storeRepository } from '../repositories';

interface IPostStoreRequest {
  name: string;
  url: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

@JsonController()
export class StoreController {
  @Get('/stores')
  public async getAll(
    @QueryParam('limit', { validate: { always: true } }) limit = 10,
    @QueryParam('offset', { validate: { always: true } }) offset = 0,
  ): Promise<{ data: Store[]; count: number }> {
    const [data, count] = await storeRepository.findAndCount({ skip: offset, take: limit, order: { id: 'DESC' } });
    return { data, count };
  }

  @Post('/stores')
  public async post(
    @Body({ validate: true, required: true }) store: IPostStoreRequest,
    @UploadedFile('file', { options: fileUploadOptions() }) file: Express.Multer.File,
  ): Promise<Store> {
    const { name, url, address, city, state, country } = store;
    const newStore = new Store();
    newStore.name = name;
    newStore.url = url;
    newStore.address = address;
    newStore.city = city;
    newStore.state = state;
    newStore.country = country;
    if (file) {
      newStore.imageUrl = '/uploads/' + file.filename;
    }
    return storeRepository.save(newStore);
  }
}
