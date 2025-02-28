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
let bookCounter = 0;


myLibrary.forEach(book => {
    createCard(book);
});
console.log(bookCounter);


function createCard(book) {
    const card = document.createElement('div');
    const cardText = document.createElement('p');
    card.classList.add('card');
    cardText.classList.add('card-text');
    cardText.textContent = `${book.title}, ${book.author}, ${book.pages}, ${readBook(book.read)}`;
    card.appendChild(cardText);
    booksContainer.appendChild(card);

    addBookButtons();
}

// Add remove button and read toggle button to each book
function addBookButtons() {
    const bookArray = Array.from(document.getElementsByClassName('card'));
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.id = bookCounter;
    removeBtn.textContent = 'Remove';
    bookArray[bookCounter].appendChild(removeBtn);


    const toggleRead = document.createElement('button');
    toggleRead.classList.add('toggle-read-btn');
    toggleRead.id = bookCounter;
    toggleRead.textContent = 'Read Status';
    bookArray[bookCounter].appendChild(toggleRead);
    bookCounter++;
}


// Adding new book to library
const form = document.querySelector('#new-book-form');
form.addEventListener('submit', addNewBook)

function addNewBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    createCard(newBook);
}

// Event listeners for buttons including any that are dynamically created
booksContainer.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('remove-btn')) {
        let parentDiv = target.parentElement;
        bookCounter--;
        parentDiv.remove();
    }
    if (target.classList.contains('toggle-read-btn')) {
        let target = event.target.id;
        const currentBook = myLibrary[target];
        console.log(currentBook);
        currentBook.toggleReadStatus(event.target.parentElement.firstChild);
    }
});

// Display dialog form with button click 
const dialog = document.getElementById('form-dialog');
const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

// Dialog submit button
const submitBtn = document.querySelector('#submit-button');
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addNewBook(event);

    form.reset();
    dialog.close();
});