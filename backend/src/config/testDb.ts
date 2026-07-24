import { dbPool } from './db';

export async function testDatabaseConnection() {
  console.log('[Database Test]: Testing mysql2 connection pool structure...');

  try {
    const connection = await dbPool.getConnection();
    console.log('[Database Test]: Connection pool connection acquired successfully!');

    // Test ping query
    const [result] = await connection.query('SELECT 1 + 1 AS pingResult;');
    console.log('[Database Test]: Ping query result:', result);

    // Test query tables in database
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('[Database Test]: Active database tables count:', Array.isArray(tables) ? tables.length : 0);

    connection.release();
    console.log('[Database Test]: Connection released back to pool.');
    return true;
  } catch (error: any) {
    console.error('[Database Test Error]: Connection failed:', error.message);
    return false;
  }
}

// Execute if run directly via CLI
if (require.main === module) {
  testDatabaseConnection()
    .then(success => {
      if (success) {
        console.log('[Database Test]: Connection Test PASSED.');
        process.exit(0);
      } else {
        console.error('[Database Test]: Connection Test FAILED.');
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('[Database Test Execution Error]:', err);
      process.exit(1);
    });
}
