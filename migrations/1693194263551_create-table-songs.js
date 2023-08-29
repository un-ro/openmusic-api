exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    title: { type: 'VARCHAR(100)', notNull: true },
    year: { type: 'INTEGER', notNull: true },
    genre: { type: 'VARCHAR(50)' },
    performer: { type: 'VARCHAR(100)', notNull: true },
    duration: 'integer',
    album_id: {
      type: 'VARCHAR(100)',
      references: '"albums"',
      onDelete: 'cascade',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
