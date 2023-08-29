const currentYear = () => new Date().getFullYear();

const songDetailMapper = ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    album_id
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId: album_id,
});

module.exports = { currentYear, songDetailMapper}
