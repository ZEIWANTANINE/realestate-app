import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAgentProfilesProfilesTable1749128008274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'agent_profiles',
                      columns: [
                        {
                          name: 'id',
                          type: 'int',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                        },
                        { name: 'user_id', type: 'int', isNullable: true },
                        { name: 'agency_id', type: 'int', isNullable: true },
                        { name: 'name', type: 'nvarchar', length: '255' },
                        {name: 'phone',type: 'nvarchar',length: '255'},
                        { name: 'license_number', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'agency_name', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'avatar_url', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'bio', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'rating', type: 'decimal', precision: 2, scale: 1, isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                   await queryRunner.createForeignKeys('agent_profiles', [
                          new TableForeignKey({
                            columnNames: ['user_id'],
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                          new TableForeignKey({
                            columnNames: ['agency_id'],
                            referencedTableName: 'agency',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('agent_profiles')
    }

}
