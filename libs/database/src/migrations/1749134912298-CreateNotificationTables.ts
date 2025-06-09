import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNotificationTables1749134912298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'notifications',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'user_id', type: 'int', isNullable: true },
                        { name: 'title', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'message', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'type', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'is_read', type: 'bit',  isNullable: false },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKey(
                    'notifications',
                    new TableForeignKey({
                      columnNames: ['user_id'],
                      referencedTableName: 'users',
                      referencedColumnNames: ['id'],
                      onDelete: 'SET NULL',
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('notifications')
    }

}
