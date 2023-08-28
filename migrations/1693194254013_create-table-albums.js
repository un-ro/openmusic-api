exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('albums', {
        id: { type: 'VARCHAR(50)', primaryKey: true },
        name: {
            type: 'VARCHAR(100)',
            notNull: true,
            unique: true
        },
        year: { type: 'integer', notNull: true },
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

exports.down = pgm => {
    pgm.dropTable('notes');
};
