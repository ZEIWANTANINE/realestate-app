import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePropertyPriceHistoryTable1749128140814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'property_price_history',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'property_id', type: 'int', isNullable: true },
                        { name: 'price', type: 'decimal', precision: 15, scale: 2, isNullable: true },
                        { name: 'recorded_at', type: 'datetime', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKey(
                    'property_price_history',
                    new TableForeignKey({
                      columnNames: ['property_id'],
                      referencedTableName: 'properties',
                      referencedColumnNames: ['id'],
                      onDelete: 'SET NULL',
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('property_price_history')
    }

}
