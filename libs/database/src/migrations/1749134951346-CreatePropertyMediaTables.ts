import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePropertyMediaTables1749134951346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'property_media',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'property_id', type: 'int', isNullable: true },
                        { name: 'media_type', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'media_url', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'caption', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKey(
                    'property_media',
                    new TableForeignKey({
                      columnNames: ['property_id'],
                      referencedTableName: 'properties',
                      referencedColumnNames: ['id'],
                      onDelete: 'SET NULL',
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('property_media')
    }

}
