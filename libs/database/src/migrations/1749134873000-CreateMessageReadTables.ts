import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMessageReadTables1749134873000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Kiểm tra bảng messages đã tồn tại chưa
        const messagesTableExists = await queryRunner.hasTable('messages');
        if (!messagesTableExists) {
            throw new Error('Messages table does not exist. Please run CreateMessageTables migration first.');
        }

        // Kiểm tra bảng users đã tồn tại chưa
        const usersTableExists = await queryRunner.hasTable('users');
        if (!usersTableExists) {
            throw new Error('Users table does not exist. Please run CreateUsersTable migration first.');
        }

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
        );

        // Tạo foreign key sau khi đảm bảo các bảng đã tồn tại
        await queryRunner.createForeignKeys('message_reads', [
            new TableForeignKey({
                columnNames: ['message_id'],
                referencedTableName: 'messages',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message_reads');
    }
}