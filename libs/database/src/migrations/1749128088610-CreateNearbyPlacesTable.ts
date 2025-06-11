import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNearbyPlacesTable1749128068610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'nearby_places',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'property_id', type: 'int', isNullable: true },
                    { name: 'place_type', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'name', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'address', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'latitude', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'longtitude', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'distance', type: 'float', isNullable: true },
                    { name: 'description', type: 'nvarchar', isNullable: true },
                    { name: 'icon_url', type: 'nvarchar', length: '255', isNullable: true },
                    { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
                    { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
                    { name: 'deleted_at', type: 'datetime', isNullable: true },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('nearby_places');
    }
}