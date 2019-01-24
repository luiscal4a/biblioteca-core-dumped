"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enumerator = require("../middlewares/enumStructures");

const BookSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  synopsis: { type: String },
  publishDate: { type: Number },
  tags: { type: Array },
  language: { type: String },
  publisher: { type: String },
  pageNumber: { type: Number },
  size: { type: Number },
  index: { type: String },
  status: {type: String, enum: enumerator.bookStatus, required: true},
  uploader: { type: Schema.Types.ObjectId, ref: enumerator.modelsName.user },
  links: { type: Array, required: true}
});

module.exports = mongoose.model(
  enumerator.modelsName.user,
  BookSchema
);