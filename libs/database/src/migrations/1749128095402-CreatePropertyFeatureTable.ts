import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePropertyFeatureTable1749128095402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'property_features',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'property_id', type: 'int', isNullable: true },
                        { name: 'heating_type', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'cooling_type', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'furnished', type: 'bit', isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('property_features')
    }

}
