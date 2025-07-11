module.exports = {
  apps: [
    {
      name: 'bachata-connect-front',
      port: '1299',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      watch: true,
      ignore_watch: ["node_modules", "assets", ".nuxt"],
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}
