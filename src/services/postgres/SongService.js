const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const ClientError = require('../../exceptions/ClientError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {songDetailMapper} = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class SongService {
  constructor() { this._pool = new Pool(); }

  async _isAlbumExist(albumId) {
    // Check if albumId is existed on album table
    const isAlbumExist = await this._pool.query({
      text : 'SELECT id FROM albums WHERE id = $1',
      values : [ albumId ],
    });

    if (!isAlbumExist.rows[0]) {
      throw new InvariantError(
          'Lagu gagal ditambahkan, id album tidak ditemukan');
    }
  }

  async addSong({
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }) {
    if (albumId)
      await this._isAlbumExist(albumId);

    const id = `song-${nanoid(8)}`;

    const query = {
      text :
          'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values : [ id, title, year, genre, performer, duration, albumId ],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new ClientError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs({title, performer}) {
    const query = {
      text : 'SELECT id, title, performer FROM songs',
      values : [],
    };

    if (title && performer) {
      query.text += ' WHERE title ILIKE $1 OR performer ILIKE $2';
      query.values.push(`%${title}%`, `%${performer}%`);
    } else if (title) {
      query.text += ' WHERE title ILIKE $1';
      query.values.push(`%${title}%`);
    } else if (performer) {
      query.text += ' WHERE performer ILIKE $1';
      query.values.push(`%${performer}%`);
    }

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text : 'SELECT * FROM songs WHERE id = $1',
      values : [ id ],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(songDetailMapper)[0];
  }

  async editSongById(id, {
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }) {
    if (albumId)
      await this._isAlbumExist(albumId);

    const query = {
      text :
          'UPDATE songs SET title = $2, year = $3, genre = $4, performer = $5, duration = $6, album_id = $7, updated_at = now() WHERE id = $1 RETURNING id',
      values : [ id, title, year, genre, performer, duration, albumId ],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal diedit, id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text : 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values : [ id ],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus, id tidak ditemukan');
    }
  }
}

module.exports = SongService;
