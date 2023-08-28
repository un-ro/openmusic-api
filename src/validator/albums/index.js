const {AlbumPayloadSchema} = require("./schema");
const InvariantError = require("../../exceptions/InvariantError");

const AlbumsValidator = {
    validateAlbumPayload: (payload) => {
        const result = AlbumPayloadSchema.validate(payload);

        if (result.error) {
            throw new InvariantError(result.error.message);
        }
    }
}

module.exports = AlbumsValidator;
