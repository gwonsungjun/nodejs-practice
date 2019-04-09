const environment = {
    development: {
        mysql: {
            username: 'root',
            password: 'pass',
            database: 'node_api_codelab_dev',
            logging: console.log
        }
    },

    test: {
        mysql: {
            username: 'root',
            password: 'pass',
            database: 'node_api_codelab_test',
            logging: false
        }
    },

    production: {

    }
};

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environment[nodeEnv];