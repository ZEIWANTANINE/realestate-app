import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateConversationParticipantTables1749134839332 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'conversation_participants',
                columns: [
                    {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                    { name: 'user_id', type: 'int', isNullable: true },
                    { name: 'conversation_id', type: 'int', isNullable: true },
                    { name: 'joined_at', type: 'datetime',  isNullable: true },
                    { name: 'role', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                    { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                    { name: 'deleted_at', type: 'datetime', isNullable: true },
                ],
            }),
        );

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('conversation_participants');
    }
} 