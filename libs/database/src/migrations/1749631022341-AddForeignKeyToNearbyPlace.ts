import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyToNearbyPlace1749631022341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'nearby_places',
            new TableForeignKey({
                columnNames: ['property_id'],
                referencedTableName: 'properties',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('nearby_places');
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('property_id') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('nearby_places', foreignKey);
            }
        }
    }

}
