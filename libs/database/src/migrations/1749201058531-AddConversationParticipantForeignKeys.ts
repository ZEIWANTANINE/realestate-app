import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddConversationParticipantForeignKeys1749201058531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add foreign key for 'conversation_id' referencing 'conversations' table
        await queryRunner.createForeignKey('conversation_participants',
            new TableForeignKey({
                columnNames: ['converstion_id'], // Lưu ý: có thể là lỗi chính tả, nên là 'conversation_id'
                referencedTableName: 'conversations',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );

        // Add foreign key for 'user_id' referencing 'users' table
        await queryRunner.createForeignKey('conversation_participants',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('conversation_participants');
        if (table) {
            // Drop foreign key for 'conversation_id'
            const conversationForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('converstion_id') !== -1);
            if (conversationForeignKey) {
                await queryRunner.dropForeignKey('conversation_participants', conversationForeignKey);
            }

            // Drop foreign key for 'user_id'
            const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
            if (userForeignKey) {
                await queryRunner.dropForeignKey('conversation_participants', userForeignKey);
            }
        }
    }

}
