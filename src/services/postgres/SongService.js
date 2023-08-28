const {Pool} = require("pg");
const {nanoid} = require("nanoid");
const ClientError = require("../../exceptions/ClientError");

class SongService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = 'song-' + nanoid(8);

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, genre, performer, duration, albumId]
        }
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new ClientError('Lagu gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs() {}

    async getSongById(id) {}

    async editSongById(id, { title, year, genre, performer, duration, albumId }) {}

    async deleteSongById(id) {}
}

module.exports = SongService;
