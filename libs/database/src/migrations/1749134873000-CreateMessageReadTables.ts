import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMessageReadTables1749134873000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'message_reads',
                      columns: [
                        {
                          name: 'id',
                          type: 'int',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                        },
                        { name: 'user_id', type: 'int', isNullable: true },
                        { name: 'message_id', type: 'int', isNullable: true },
                        { name: 'read_at', type: 'datetime', isNullable: false },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('message_reads')
    }

}
