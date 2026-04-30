/**
 * PM2 ecosystem for production on srv.csweb.com.tr.
 *
 * Deployed under the `akonbutik` cPanel user. WHM Application Manager
 * sets up Apache mod_proxy in front of these processes.
 */
module.exports = {
  apps: [
    {
      name: 'akonbutik-web',
      cwd: '/home/akonbutik/apps/web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 4,
      exec_mode: 'cluster',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '512M',
      error_file: '/home/akonbutik/logs/web.err.log',
      out_file: '/home/akonbutik/logs/web.out.log',
      time: true,
    },
    {
      name: 'akonbutik-admin',
      cwd: '/home/akonbutik/apps/admin',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3100',
      instances: 1,
      exec_mode: 'cluster',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '256M',
      error_file: '/home/akonbutik/logs/admin.err.log',
      out_file: '/home/akonbutik/logs/admin.out.log',
      time: true,
    },
    {
      name: 'akonbutik-api',
      cwd: '/home/akonbutik/apps/api',
      script: 'dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '512M',
      error_file: '/home/akonbutik/logs/api.err.log',
      out_file: '/home/akonbutik/logs/api.out.log',
      time: true,
    },
  ],
};
