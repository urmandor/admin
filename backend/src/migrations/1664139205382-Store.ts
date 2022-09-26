import { MigrationInterface, QueryRunner } from 'typeorm';

export class Store1664139205382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE stores (' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'name varchar(255) NOT NULL,' +
        'url varchar(255) NOT NULL,' +
        'address varchar(255) NOT NULL,' +
        'city varchar(255) NOT NULL,' +
        'state varchar(255) NOT NULL,' +
        'country varchar(255) NOT NULL,' +
        'image_url varchar(255),' +
        'CONSTRAINT PK_store PRIMARY KEY (id),' +
        'CONSTRAINT UC_store_url UNIQUE (url),' +
        'CONSTRAINT UC_store_name UNIQUE (name)' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE stores`);
  }
}
