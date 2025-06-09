import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddPropertyFeatureForeignKeys1749200615297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'property_features',
            new TableForeignKey({
                columnNames: ['property_id'],
                referencedTableName: 'properties',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('property_features');
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('property_id') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('property_features', foreignKey);
            }
        }
    }

}
