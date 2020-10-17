import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrphanages1602627877283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'db_orphanages',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'latitude',
                        type: 'numeric',
                        scale: 8,
                        precision: 10,
                        isNullable: false
                    },
                    {
                        name: 'longitude',
                        type: 'numeric',
                        scale: 8,
                        precision: 10,
                        isNullable: false
                    },
                    {
                        name: 'about',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'instructions',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'opening_hours',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'open_on_weekends',
                        type: 'boolean',
                        default: false,
                        isNullable: false
                    },
                    {
                        name: 'whatsapp',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('db_orphanages');
    }

}
