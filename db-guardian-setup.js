// ===========================================
// NeverlostDB — Auto-generated Setup
// ===========================================
const { DBGuardian } = require('neverlost-db');
require('dotenv').config();

// ---- Database Connections ----
const databases = [
  {
    name: "db1",
    type: "supabase",
    url: process.env.DB1_URL,
    role: "primary",
  },
  {
    name: "db2",
    type: "mongodb",
    url: process.env.DB2_URL,
    role: "secondary",
  }
];

// ---- Backup Settings ----
const backupConfig = {
  interval: "1h",
  mode: "merge",
};

// ---- Keep-Alive Settings ----
const keepAliveConfig = {
  databases: {
    enabled: true,
  },
};

// ---- Initialize DB Guardian ----
const guardian = new DBGuardian({
  databases,
  backup: backupConfig,
  keepAlive: keepAliveConfig,
});

// ---- Start Protection ----
guardian.start()
  .then(() => {
    console.log('DB Guardian is now protecting your databases!');
    console.log('Backup interval: 1h');
    console.log('Backup mode: merge');
    console.log('Databases connected: 2');
  })
  .catch((err) => {
    console.error('Failed to start DB Guardian:', err.message);
    process.exit(1);
  });

// ---- Graceful Shutdown ----
process.on('SIGINT', async () => {
  console.log('Shutting down DB Guardian...');
  await guardian.stop();
  process.exit(0);
});
