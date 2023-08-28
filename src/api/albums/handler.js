class AlbumHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postAlbumHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { name, year } = request.payload;

            const albumId = await this._service.addAlbum({ name, year });

            const response = h.response({
                status: 'success',
                message: 'Berhasil tambah',
                data: {
                    albumId
                }
            });
            response.code(201);

            return response;
        } catch (error) {
            return h.response({
                status: 'error',
                message: 'Error: ' + error.message
            }).code(500);
        }
    }

    async getAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbumById(id);

            return {
                status: 'success',
                data: { album }
            };
        } catch (error) {
            return h.response({
                status: 'error',
                message: 'Error: ' + error.message
            }).code(500);
        }
    }

    async putAlbumByIdHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { id } = request.params;

            await this._service.editAlbumById(id, request.payload);

            return {
                status: 'success',
                message: 'Album berhasil diperbarui'
            };
        } catch (error) {
            return h.response({
                status: 'error',
                message: 'Error: ' + error.message
            }).code(500);
        }
    }

    async deleteAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;

            await this._service.deleteAlbumById(id);

            return {
                status: 'success',
                message: 'Album berhasil dihapus'
            };
        } catch (error) {
            return h.response({
                status: 'error',
                message: 'Error: ' + error.message
            }).code(500);
        }
    }
}

module.exports = AlbumHandler;
