import 'dotenv/config';
import pg from 'pg';
import Postgrator from 'postgrator';

const { Client } = pg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

try {
    await client.connect();

    const postgrator = new Postgrator({
        migrationPattern: 'database/migrations/*',
        driver: 'pg',
        database: 'military_tech',
        schemaTable: 'schemaversion',
        execQuery: (query) => client.query(query),
    });
    const result = await postgrator.migrate();

    console.log('Migrations applied:', result);
} catch (error) {
    console.error(error);
    process.exit(1);
} finally {
    await client.end();
}
