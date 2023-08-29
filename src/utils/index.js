const currentYear = () => new Date().getFullYear();

const songDetailMapper = (song) => ({
  id: song.id,
  title: song.title,
  year: song.year,
  performer: song.performer,
  genre: song.genre,
  duration: song.duration,
  albumId: song.album_id,
});

module.exports = {
  currentYear,
  songDetailMapper,
};
