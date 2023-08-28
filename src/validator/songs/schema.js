const Joi = require("joi");
const {currentYear} = require("../../utils");

const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().max(currentYear()).required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().optional(),
    albumId: Joi.string().optional()
})

module.exports = { SongPayloadSchema }
