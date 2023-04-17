import dotenv from 'dotenv';

dotenv.config({path: `.${process.env.NODE_ENV}.env`});

const cfg = {
  APP_PORT: process.env.APP_PORT,

  APP_POSTGRES_HOST: process.env.APP_POSTGRES_HOST,
  APP_POSTGRES_PORT: Number(process.env.APP_POSTGRES_PORT),
  APP_POSTGRES_USERNAME: process.env.APP_POSTGRES_USERNAME,
  APP_POSTGRES_PASSWORD: process.env.APP_POSTGRES_PASSWORD,
  APP_POSTGRES_DATABASE: process.env.APP_POSTGRES_DATABASE,
  APP_POSTGRES_LOGGING: process.env.APP_POSTGRES_LOGGING,

  APP_JWT_SECRET_KEY: `${process.env.APP_JWT_SECRET_KEY}`,
  APP_JWT_EXPIRATION_TIME: process.env.APP_JWT_EXPIRATION_TIME,
};

export default cfg;
