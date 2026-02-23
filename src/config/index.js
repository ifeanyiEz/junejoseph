import 'dotenv/config';

const config = {
    port: process.env.PORT || 5000,

    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },

    jwtSecret: process.env.JWT_SECRET,
};

export default config;