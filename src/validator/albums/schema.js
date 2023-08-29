const Joi = require('joi');
const {currentYear} = require('../../utils');

const AlbumPayloadSchema = Joi.object({
  name : Joi.string().required(),
  year : Joi.number().max(currentYear()).required(),
});

module.exports = {AlbumPayloadSchema};
