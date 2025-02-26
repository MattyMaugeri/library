const booksContainer = document.querySelector('.books-container');
const container = document.querySelector('.container');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function TheHobbit(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

function LordOfTheRings(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

function BlackPanther(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

function HarryPotter(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

Object.setPrototypeOf(TheHobbit.prototype, Book.prototype);
Object.setPrototypeOf(LordOfTheRings.prototype, Book.prototype);
Object.setPrototypeOf(BlackPanther.prototype, Book.prototype);
Object.setPrototypeOf(HarryPotter.prototype, Book.prototype);

Book.prototype.toggleReadStatus = function (event) {
    if (this.read == true) {
        this.read = false;
        event.innerHTML = `${this.title}, ${this.author}, ${this.pages}, ${readBook(this.read)}`;
    } else {
        this.read = true;
        event.innerHTML = `${this.title}, ${this.author}, ${this.pages}, ${readBook(this.read)}`;
    }
}

const theHobbit = new Book('The Hobbit', 'Steven', 2000, true);
const lordOfTheRings = new Book('Lord of The Rings', 'George', 100, false);
const blackPanther = new Book('Black Panther', 'William', 560, false);
const harryPotter = new Book('Harry Potter', 'Rowling', 99999, true);

addBookToLibrary(theHobbit);
addBookToLibrary(lordOfTheRings);
addBookToLibrary(blackPanther);
addBookToLibrary(harryPotter);
console.log(myLibrary);


function readBook(value) {
    if (value === true) {
        return 'has been read';
    } else {
        return 'not read yet';
    }
}

myLibrary.forEach(book => {
    const card = document.createElement('div');
    const cardText = document.createElement('p');
    card.classList.add('card');
    cardText.classList.add('card-text');
    cardText.textContent = `${book.title}, ${book.author}, ${book.pages}, ${readBook(book.read)}`;
    card.appendChild(cardText);
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

const formInput = document.getElementsByClassName('form-input');

const submitBtn = document.querySelector('#submit-button');
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addNewBook(event)
    form.reset();
    dialog.close();
});

// Add remove button and read toggle button to each book
const bookArray = Array.from(document.getElementsByClassName('card'));
for (let i = 0; i < bookArray.length; i++) {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.id = i;
    removeBtn.textContent = 'Remove'
    bookArray[i].appendChild(removeBtn);

    const toggleRead = document.createElement('button');
    toggleRead.classList.add('toggle-read-btn');
    toggleRead.id = i;
    toggleRead.textContent = 'Read Status'
    bookArray[i].appendChild(toggleRead);
}

// Function to remove book from library 
const removeBtnArray = Array.from(document.getElementsByClassName('remove-btn'));
removeBtnArray.forEach((button) => {
    button.addEventListener('click', (event) => {
        const parentDiv = event.target.parentElement;
        parentDiv.remove();
    });
});




// Change read status on each book
const toggleReadBtn = Array.from(document.getElementsByClassName('toggle-read-btn'));
toggleReadBtn.forEach((toggleBtn) => {
    toggleBtn.addEventListener('click', (event) => {
        const currentBook = myLibrary[event.target.id];
        console.log(currentBook);
        currentBook.toggleReadStatus(event.target.parentElement.firstChild);
    });
});