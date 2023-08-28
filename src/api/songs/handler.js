class SongHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postSongHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { title, year, genre, performer, duration, albumId } = request.payload;

        const songId = await this._service.addSong({
            title, year, genre, performer, duration, albumId
        })

        return h.response({
            status: 'success',
            data: {
                albumId: songId
            }
        }).code(201);
    }

    async getAllSongsHandler(request) {
        const { id } = request.params;
        const album = await this._service.getAlbumById(id);

        return {
            status: 'success',
            data: {
                album: {
                    id: album[0].id,
                    name: album[0].name,
                    year: album[0].year
                }
            }
        }
    }

    async getSongByIdHandler(request) {
        const { id } = request.params;
        const album = await this._service.getAlbumById(id);

        return {
            status: 'success',
            data: {
                album: {
                    id: album[0].id,
                    name: album[0].name,
                    year: album[0].year
                }
            }
        }
    }

    async putSongByIdHandler(request) {
        this._validator.validateSongPayload(request.payload);
        const { id } = request.params;

        await this._service.editAlbumById(id, request.payload);

        return {
            status: 'success',
            message: 'Album berhasil diperbarui'
        };
    }

    async deleteSongByIdHandler(request) {
        const { id } = request.params;

        await this._service.deleteAlbumById(id);

        return {
            status: 'success',
            message: 'Album berhasil dihapus'
        };
    }
}

module.exports = SongHandler;
