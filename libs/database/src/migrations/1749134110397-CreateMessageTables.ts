import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMessageTables1749134110397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Kiểm tra bảng conversations đã tồn tại chưa
        const conversationsTableExists = await queryRunner.hasTable('conversations');
        if (!conversationsTableExists) {
            throw new Error('Conversations table does not exist. Please run CreateConversationTables migration first.');
        }

        // Kiểm tra bảng users đã tồn tại chưa
        const usersTableExists = await queryRunner.hasTable('users');
        if (!usersTableExists) {
            throw new Error('Users table does not exist. Please run CreateUsersTable migration first.');
        }

        await queryRunner.createTable(
                    new Table({
                      name: 'messages',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'conversation_id', type: 'int', isNullable: true },
                        { name: 'sender_id', type: 'int', isNullable: true },
                        { name: 'message', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'message_type', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'media_url', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKeys('messages', [
                          new TableForeignKey({
                            columnNames: ['conversation_id'],
                            referencedTableName: 'conversations',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                          new TableForeignKey({
                            columnNames: ['sender_id'],
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                  ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('messages')
    }

}
