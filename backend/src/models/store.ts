import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Category } from '.';

@Entity({ name: 'stores' })
export class Store {
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
    name: 'address',
  })
  address: string;

  @Column('varchar', {
    name: 'city',
  })
  city: string;

  @Column('varchar', {
    name: 'state',
  })
  state: string;

  @Column('varchar', {
    name: 'country',
  })
  country: string;

  @Column('varchar', {
    name: 'image_url',
  })
  imageUrl?: string;

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];
}
