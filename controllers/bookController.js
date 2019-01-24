"use strict";

const User = require("../models/user");
const Book = require("../models/book");
const mongoose = require("mongoose");
const enumerated = require("../middlewares/enumStructures");
const utils = require("../middlewares/utils");

function createBook(req, res) {
  let Book = new Book();

  Book.title = req.body.title;
  Book.author = req.body.author;
  Book.category = req.body.category;
  Book.synopsis = req.body.description;
  Book.publishDate = req.body.publishDate;
  Book.tags = req.body.tags;
  Book.language = req.body.language;
  Book.publisher = req.body.publisher;
  Book.pageNumber = req.body.pageNumber;
  Book.size = req.body.size;
  Book.index = req.body.index;
  Book.status = req.body.status;
  Book.uploader = req.body.uploader;
  Book.links = req.body.links;

  Book.save((err, BookStored) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al crear Book: ${err}` });

    User.find(
      { role: enumerated.role[2], role: enumerated.role[3] },
      (err, users) => {
        if (!err && users) {
          users.forEach(u => {
            utils
              .check(u.BooksCollection, BookStored)
              .then(content => {
                u.save((err, uSaved) => {
                  console.log(uSaved);
                });
              });
          });
        }

        res.status(200).send({ message: BookStored });
      }
    );
  });
}

function getAllBooks(req, res) {
  Book.find()
    .populate("author")
    .exec((err, books) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!books)
        return res.status(404).send({ message: "No existen Books" });

      res.status(200).send({ Books });
    });
}

function getBook(req, res) {
  let BookId = req.params.BookId;

  Book.findById(BookId)
    .populate("author")
    .exec((err, book) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!book)
        return res.status(404).send({ message: `El Book no existe` });
      res.status(200).send({ book });
    });
}

function getBookByTag(req, res) {
  let bookTag = req.params.tag;

  Book.find({ week: bookTag })
    .populate("author")
    .exec((err, books) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!books)
        return res
          .status(404)
          .send({ message: "No existen Books con ese tag" });

      res.status(200).send({ books });
    });
}

function getBookByTitle(req, res) {
  let bookTitle = req.params.title;

  Book.find({ title: bookTitle })
    .populate("author")
    .exec((err, books) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!books)
        return res
          .status(404)
          .send({ message: "No existen Books con ese tag" });

      res.status(200).send({ books });
      });
}


function getBookByCategory(req, res) {
  let cat = req.params.category;

  Book.find({ category: cat })
    .populate("author")
    .exec((err, books) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!books)
        return res
          .status(404)
          .send({ message: "No existen Books con esa categoría" });

      res.status(200).send({ books });
    });
}

function updateBook(req, res) {
  let updated = req.body;

  let bookId = req.params.bookId;
  Book.findByIdAndUpdate(BookId, updated, (err, oldBook) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al actualizar Book: ${err}` });
    if (!oldBook)
      return res.status(404).send({ message: "El Book no existe" });
    res.status(200).send({ oldBook });
  });
}

function deleteBook(req, res) {
  let bookId = req.params.bookId;

  Book.findById(bookId, (err, book) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al borrar Book: ${err}` });
    if (!book)
      return res.status(404).send({ message: `El Book no existe` });
    Book.remove(err => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar Book: ${err}` });
      res.status(200).send({ message: "El Book ha sido borrado" });
    });
  });
}

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getBooks,
  getBookByTag,
  getBookByTitle,
  getBookByCategory
};