import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Category } from '.';

@Entity({ name: 'products' })
export class Product {
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
    name: 'description',
  })
  description: string;

  @Column('int', {
    name: 'price',
  })
  price: number;

  @Column('varchar', {
    name: 'image_url',
  })
  imageUrl: string;

  @Column('int', {
    name: 'category_id',
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
