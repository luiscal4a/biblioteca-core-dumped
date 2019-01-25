"use strict";

const User = require("../models/user");
const Book = require("../models/book");
const mongoose = require("mongoose");
const enumerated = require("../middlewares/enumStructures");

function createBook(req, res) {
  let book = new Book();

  book.title = req.body.title;
  book.author = req.body.author;
  book.category = req.body.category;
  book.synopsis = req.body.description;
  book.publishDate = req.body.publishDate;
  book.tags = req.body.tags;
  book.language = req.body.language;
  book.publisher = req.body.publisher;
  book.pageNumber = req.body.pageNumber;
  book.size = req.body.size;
  book.index = req.body.index;
  book.status = req.body.status;
  book.uploader = req.body.uploader;
  book.links = req.body.links;

  console.log(`New book: \n ${book}`);
  book.save((err, BookStored) => {
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
  let bookId = req.params.bookId;

  Book.findById(bookId)
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
  Book.findByIdAndUpdate(bookId, updated, (err, oldBook) => {
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
  getAllBooks,
  getBookByTag,
  getBookByTitle,
  getBookByCategory
};