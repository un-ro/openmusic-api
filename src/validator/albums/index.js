const {AlbumPayloadSchema} = require("./schema");

const AlbumsValidator = {
    validateAlbumPayload: (payload) => {
        const result = AlbumPayloadSchema.validate(payload);

        if (result.error) {
            throw new Error(result.error.message);
        }
    }
}

module.exports = AlbumsValidator;
