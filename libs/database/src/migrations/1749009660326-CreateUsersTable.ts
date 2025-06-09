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
                { name: 'email', type: 'nvarchar', length: '255', isUnique: true },
                {
                  name: 'password',
                  type: 'nvarchar',
                  length: '255',
                  isNullable: true,
                },
                { name: 'role', type: 'nvarchar', length: '255', isNullable: false },
                { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                { name: 'deleted_at', type: 'datetime', isNullable: true },
              ],
            }),
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
