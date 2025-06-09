import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFavouriteForeignKeys1749200304619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add foreign key for 'user_id' referencing 'users' table
        await queryRunner.createForeignKey('favourites',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );

        // Add foreign key for 'property_id' referencing 'properties' table
        await queryRunner.createForeignKey('favourites',
            new TableForeignKey({
                columnNames: ['property_id'],
                referencedTableName: 'properties',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('favourites');
        if (table) {
            // Drop foreign key for 'user_id'
            const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
            if (userForeignKey) {
                await queryRunner.dropForeignKey('favourites', userForeignKey);
            }

            // Drop foreign key for 'property_id'
            const propertyForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('property_id') !== -1);
            if (propertyForeignKey) {
                await queryRunner.dropForeignKey('favourites', propertyForeignKey);
            }
        }
    }

}
