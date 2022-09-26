import { Entity, Column, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Product } from './product';
import { Store } from './store';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    name: 'url',
  })
  url: string;

  @Column('varchar', {
    name: 'image_url',
  })
  imageUrl: string;

  @Column('int', {
    name: 'store_id',
  })
  storeId: number;

  @ManyToOne(() => Store, (store) => store.categories)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
