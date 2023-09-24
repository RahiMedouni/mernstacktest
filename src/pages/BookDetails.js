import React from 'react';
import '../App.css';

const BookDetails = () => {
    const book = {
        title: 'Book Title',
        author: 'Author Name',
        pages: 300,
        isbn: '1234567890',
        description: 'This is the description of the book.',
        year: 2022,
        price: 20.99,
        frontCover: 'frontcover.jpeg',
        backCover: 'backcover.jpeg',
        pdf: 'firstbook.pdf',
      };
  return (
    <div className="book-details">
      <div className="book-covers">
        <img src={book.frontCover} alt={`${book.title} Front Cover`} />
        <img src={book.backCover} alt={`${book.title} Back Cover`} />
      </div>
      <div className="book-info">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Number of Pages: {book.pages}</p>
        <p>ISBN: {book.isbn}</p>
        <p>Description: {book.description}</p>
        <p>Year of Release: {book.year}</p>
        <p>Price: ${book.price}</p>
      </div>
      <div className="pdf-preview">
        <h3>PDF Preview</h3>
        {/* Add a PDF viewer here */}
        <embed src={book.pdf} type="application/pdf" width="100%" height="400px" />
      </div>
    </div>
  );
};

export default BookDetails;

