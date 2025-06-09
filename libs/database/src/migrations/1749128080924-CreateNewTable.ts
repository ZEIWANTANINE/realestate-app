import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNewTable1749128080924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'news',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'user_id', type: 'int', isNullable: true },
                        { name: 'title', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'content', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'thumbnail_url', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'source_url', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'published_at', type: 'datetime', isNullable: true },
                        { name: 'tags', type: 'nvarchar', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKey(
                    'news',
                    new TableForeignKey({
                      columnNames: ['user_id'],
                      referencedTableName: 'users',
                      referencedColumnNames: ['id'],
                      onDelete: 'SET NULL',
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('news')
    }

}
