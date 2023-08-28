const currentYear = () => new Date().getFullYear();

const albumMapper = ({
    id,
    name,
    year,
    created_at,
    updated_at
}) => ({
    id,
    name,
    year
});

module.exports = { currentYear, albumMapper}
