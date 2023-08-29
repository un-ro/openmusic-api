const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const {albumMapper} = require("../../utils");

class AlbumService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = 'album-' + nanoid(8);

        const query = {
            text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
            values: [id, name, year]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Album gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAlbumById(id) {
        const query = {
            text: 'SELECT id, name, year FROM albums WHERE id = $1',
            values: [id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan')
        }

        return result.rows[0];
    }

    async editAlbumById(id, {name, year}) {
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, updated_at = now() WHERE id = $3 RETURNING id',
            values: [name, year, id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Error');
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album gagal dihapus')
        }
    }
}

module.exports = AlbumService;
