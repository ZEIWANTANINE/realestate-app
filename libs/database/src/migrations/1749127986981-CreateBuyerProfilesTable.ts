import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBuyerProfilesTable1749127986981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'buyer_profiles',
                      columns: [
                        {
                          name: 'id',
                          type: 'int',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                        },
                        { name: 'user_id', type: 'int', isNullable: true },
                        { name: 'name', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'phone', type: 'nvarchar', length: '10', isNullable: true },
                        { name: 'avatar_url', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'prefered_location', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'budget', type: 'decimal',precision: 15, scale: 2, isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                   await queryRunner.createForeignKeys('buyer_profiles', [
                          new TableForeignKey({
                            columnNames: ['user_id'],
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('buyer_profiles')
    }

}
