require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumService');
const AlbumsValidator = require('./validator/albums');
const ClientError = require("./exceptions/ClientError");

const init = async () => {
    const albumsService = new AlbumsService();
    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.register({
        plugin: albums,
        options: {
            service: albumsService,
            validator: AlbumsValidator,
        }
    });

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if (response instanceof Error) {
            if (response instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }
        }

        if (!response.isServer) {
            return h.continue;
        }

        return h.continue;
    })

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

init().then();
