module.exports = {
  apps: [
    {
      name: 'joinus_backend',
      script: './dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
