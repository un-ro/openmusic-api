const { nanoid } = require('nanoid');
const { Pool } = require('pg');

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
            throw new Error('Album gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAlbumById(id) {
        const query = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error('Album tidak ditemukan')
        }

        return result.rows;
    }

    async editAlbumById(id, {name, year}) {
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, updated_at = now() WHERE id = $3 RETURNING id',
            values: [name, year, id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error('Error');
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error('Gagal')
        }
    }
}

module.exports = AlbumService;
