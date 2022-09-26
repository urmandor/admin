import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1664140035227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE products (' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'category_id int NOT NULL,' +
        'name varchar(255) NOT NULL,' +
        'url varchar(255) NOT NULL,' +
        'description text(500),' +
        'price int(11) NOT NULL,' +
        'image_url varchar(255),' +
        'CONSTRAINT PK_product PRIMARY KEY (id),' +
        'FOREIGN KEY (category_id) REFERENCES categories(id),' +
        'CONSTRAINT UC_product_url UNIQUE (category_id, url),' +
        'CONSTRAINT UC_product_name UNIQUE (category_id, name)' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE products`);
  }
}
