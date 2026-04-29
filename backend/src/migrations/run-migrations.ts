import AppDataSource from '../config/data-source';

async function main() {
    try {
        console.log('Initializing datasource...');
        await AppDataSource.initialize();

        console.log('Datasource initialized');
        console.log('Running migrations...');

        const migrations = await AppDataSource.runMigrations();

        console.log(
            'Migrations executed:',
            migrations.map((migration) => migration.name),
        );

        await AppDataSource.destroy();
        console.log('Done');
    } catch (error) {
        console.error('Migration failed:', error);

        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }

        process.exit(1);
    }
}

main();