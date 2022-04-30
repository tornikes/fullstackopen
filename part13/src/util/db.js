const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

async function runMigrations() {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
}

async function rollbackMigration() {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
}

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('connected to the database');
  } catch (err) {
    console.log(err);
    console.log('failed to connect to the database');
  }

  return null;
}

module.exports = {
  sequelize,
  connectToDatabase,
  rollbackMigration,
};
