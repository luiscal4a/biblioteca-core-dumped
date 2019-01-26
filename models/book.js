"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enumerator = require("../middlewares/enumStructures");

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  category: { type: String, required: true },
  synopsis: { type: String },
  publishDate: { type: Date },
  tags: { type: Array },
  language: { type: String },
  publisher: { type: String },
  pageNumber: { type: Number },
  index: { type: String },
  status: {type: String, enum: enumerator.bookStatus, required: true},
  uploader: { type: Schema.Types.ObjectId, ref: enumerator.modelsName.user },
  uploads: [
    {
      _id: false,
      link: { type: String },
      format: { type: String, enum: enumerator.formats },
      size: { type: Number }
    }
  ]
});

module.exports = mongoose.model(
  enumerator.modelsName.book,
  BookSchema
);