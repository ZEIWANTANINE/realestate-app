import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePropertyTable1749128114996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                      name: 'properties',
                      columns: [
                        {name: 'id',type: 'int',isPrimary: true,isGenerated: true,generationStrategy: 'increment'},
                        { name: 'agent_id', type: 'int', isNullable: true },
                        { name: 'company_id', type: 'int', isNullable: true },
                        { name: 'title', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'description', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'address', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'price', type: 'decimal', precision: 15, scale: 2, isNullable: true },
                        { name: 'city', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'state', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'country', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'zipcode', type: 'nvarchar', isNullable: true },
                        { name: 'latitude', type: 'float',  isNullable: true },
                        { name: 'longtitude', type: 'float', isNullable: true },
                        { name: 'property_type', type: 'nvarchar', length: '255', isNullable: true },
                        { name: 'bedrooms', type: 'int', isNullable: true },
                        { name: 'bathrooms', type: 'int', isNullable: true },
                        { name: 'area_size', type: 'float', isNullable: true },
                        { name: 'year_built', type: 'int', isNullable: true },
                        { name: 'floors', type: 'int', isNullable: true },
                        { name: 'parking_spaces', type: 'int', isNullable: true },
                        { name: 'is_active', type: 'bit',  isNullable: true },
                        { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                        { name: 'deleted_at', type: 'datetime', isNullable: true },
                      ],
                    }),
                  )
                  await queryRunner.createForeignKeys('properties', [
                          new TableForeignKey({
                            columnNames: ['agent_id'],
                            referencedTableName: 'agent_profiles',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                          new TableForeignKey({
                            columnNames: ['company_id'],
                            referencedTableName: 'company',
                            referencedColumnNames: ['id'],
                            onDelete: 'SET NULL',
                          }),
                  ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('properties')
    }

}
