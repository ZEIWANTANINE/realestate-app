import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateConversationTables1749134845141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'conversations',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'created_by', type: 'int', isNullable: true },
                        { name: 'type', type: 'nvarchar', length: '255',  isNullable: true },
                        { name: 'name', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKey(
                    'conversations',
                    new TableForeignKey({
                      columnNames: ['created_by'],
                      referencedTableName: 'users',
                      referencedColumnNames: ['id'],
                      onDelete: 'SET NULL',
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('conversations')
    }

}
