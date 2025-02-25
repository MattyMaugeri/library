const booksContainer = document.querySelector('.books-container');
const container = document.querySelector('.container');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary('The Hobbit', 'Steven', 2000, true);
addBookToLibrary('Lord of The Rings', 'George', 100, false);
addBookToLibrary('Black Panther', 'William', 560, false);
addBookToLibrary('Harry Potter', 'Rowling', 99999, true);

function readBook(value) {
    if (value === true) {
        return 'has been read';
    } else {
        return 'not read yet';
    }
}

myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = `${book.title}, ${book.author}, ${book.pages}, ${readBook(book.read)}`;
    booksContainer.appendChild(card);
});

// Adding new book to library

const form = document.querySelector('#new-book-form');
form.addEventListener('submit', addNewBook)

function addNewBook(event) {
    event.preventDefault();
    const title = document.getElementById('title')
    const author = document.getElementById('author')
    const pages = document.getElementById('pages')
    const read = document.getElementById('read');

    addBookToLibrary(title.value, author.value, pages.value, read.checked);

    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = `${title.value}, ${author.value}, ${pages.value}, ${readBook(read.checked)}`;
    booksContainer.appendChild(card);
}

// Display dialog form with button click 

const dialog = document.getElementById('form-dialog');

const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

const submitBtn = document.querySelector('#submit-button');
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addNewBook(event)
    dialog.close();
});