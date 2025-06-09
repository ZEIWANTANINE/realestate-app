import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTransactionTables1749134962560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'transactions',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'property_id', type: 'int', isNullable: true },
                        { name: 'buyer_id', type: 'int', isNullable: true },
                        { name: 'amount', type: 'decimal', precision: 15, scale: 2, isNullable: true },
                        { name: 'status', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'currency', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'payment_gateway', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'payment_method', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'response_code', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'message', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'transaction_reference', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'order_id', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'ipn_received', type: 'bit', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKeys('transactions', [
                          new TableForeignKey({
                            columnNames: ['property_id'],
                            referencedTableName: 'properties',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                          new TableForeignKey({
                            columnNames: ['buyer_id'],
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                  ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions')
    }

}
