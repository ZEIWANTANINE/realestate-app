import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAgencyTable1749127959414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'agency',
                      columns: [
                        {
                          name: 'id',
                          type: 'int',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                        },
                        { name: 'name', type: 'nvarchar', length: '255' },
                        {name: 'logo_url',type: 'nvarchar',length: '255',isNullable: true,},
                        { name: 'address', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'phone', type: 'nvarchar', length: '10', isNullable: true },
                        { name: 'website', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'description', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('agency')
    }

}
