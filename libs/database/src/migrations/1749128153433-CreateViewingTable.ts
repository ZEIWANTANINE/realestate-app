import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateViewingTable1749128153433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'viewings',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'property_id', type: 'int', isNullable: true },
                        { name: 'buyer_id', type: 'int', isNullable: true },
                        { name: 'schedule_date', type: 'datetime',  isNullable: true },
                        { name: 'status', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKeys('viewings', [
                          new TableForeignKey({
                            columnNames: ['property_id'],
                            referencedTableName: 'properties',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                          new TableForeignKey({
                            columnNames: ['buyer_id'],
                            referencedTableName: 'buyer_profiles',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                  ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('viewings')
    }

}
