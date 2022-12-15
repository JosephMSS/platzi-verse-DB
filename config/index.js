require('dotenv').config();
/**
 * Descripción de configuración
 */
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    engine: process.env.DB_ENGINE,
  },
  mail: {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
  auth: {
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  },
};
module.exports = { config };
