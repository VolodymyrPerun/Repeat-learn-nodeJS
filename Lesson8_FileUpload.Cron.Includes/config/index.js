module.exports = {
    PORT: process.env.PORT || 5000,

    JWT_SECRET: process.env.JWT_REFRESH_SECRET || '$2b$10$Gg91pyMdkpIwT2MRMl7xxObPSOAQpS2Gnt29indH8Q4jxpiSfPup2',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '$2b$10$m6z7akGidsLTGt5hFcIKJuPIaseru7aQNnsZ1rDdw.OMtHkHXNjFq',
    JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '1110d',
    JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '1110d',

    DB_NAME: process.env.DB_NAME || 'shop',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',

    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    ROOT_EMAIL_LOGIN: process.env.ROOT_EMAIL_LOGIN || 'misterbin700007@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '700007misterbin700007',

     SITE: process.env.SITE || 'https://volodymyrperun.github.io/upqode-task-master/',

    FRONT_END_URL: process.env.FRONT_END_URL || 'http://localhost:3000',

    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 0 * * *',

}
