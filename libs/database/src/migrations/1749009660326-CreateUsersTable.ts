import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1749009660326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                { name: 'name', type: 'nvarchar', length: '255' },
                { name: 'email', type: 'nvarchar', length: '255', isUnique: true },
                { name: 'phone', type: 'nvarchar', length: '20', isUnique: true },
                { name: 'gender', type: 'nvarchar', length: '10' },
                {
                  name: 'password',
                  type: 'nvarchar',
                  length: '255',
                  isNullable: true,
                },
                { name: 'organization_id', type: 'int', isNullable: true },
                // { name: 'role_id', type: 'int', isNullable: true },
                { name: 'role', type: 'nvarchar', length: '255', isNullable: false },
                { name: 'code', type: 'nvarchar', length: '100', isNullable: false, isUnique: true },
                { name: 'level', type: 'nvarchar', length: '50', isNullable: true },
                { name: 'hour_target', type: 'float', isNullable: true },
                { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                { name: 'deleted_at', type: 'datetime', isNullable: true },
              ],
            }),
          )
          await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
              columnNames: ['organization_id'],
              referencedTableName: 'organizations',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            }),
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
