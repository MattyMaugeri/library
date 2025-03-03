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

function GameOfThrones(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

function LordOfTheRings(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

function Mockingbird(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

function HarryPotter(title, author, pages, read) {
    Book.call(this, title, author, pages, read);
}

Object.setPrototypeOf(GameOfThrones.prototype, Book.prototype);
Object.setPrototypeOf(LordOfTheRings.prototype, Book.prototype);
Object.setPrototypeOf(Mockingbird.prototype, Book.prototype);
Object.setPrototypeOf(HarryPotter.prototype, Book.prototype);

Book.prototype.toggleReadStatus = function (event) {
    const tick = event.parentElement.lastChild;
    console.log(tick);
    
    if (this.read == true) {
        this.read = false;
        tick.style.visibility = 'hidden';
    } else {
        this.read = true;
        tick.style.visibility = 'visible';
    }
}

const gameOfThrones = new Book('A Game of Thrones', 'George, R', 2000 + ' pages', false);
const lordOfTheRings = new Book('The Lord of the Rings', 'John, T', 5000 + ' pages', false);
const mockingbird = new Book('To Kill a Mockingbird', 'Harper, L', 560 + ' pages', false);
const harryPotter = new Book('Harry Potter', 'J.K Rowling', 12093 + ' pages', false);

addBookToLibrary(gameOfThrones);
addBookToLibrary(lordOfTheRings);
addBookToLibrary(mockingbird);
addBookToLibrary(harryPotter);

let bookCounter = 0;


myLibrary.forEach(book => {
    createCard(book);
});


function createCard(book) {
    const block = document.createElement('div');
    const card = document.createElement('div');
    const cardText = document.createElement('p');
    const tickContainer = document.createElement('div');

    tickContainer.classList.add('tick-container');
    block.classList.add('block');
    card.classList.add('card');
    card.id = book.title.replaceAll(' ', '');
    cardText.classList.add('card-text');
    cardText.textContent = `${book.title}, ${book.author}, ${book.pages}`;

    tickContainer.textContent = '✔';
    block.appendChild(card);
    card.appendChild(cardText);
    card.appendChild(tickContainer);
    booksContainer.appendChild(block);

    addBookButtons();
}

// Add remove button and read toggle button to each book
function addBookButtons() {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.id = bookCounter;
    removeBtn.textContent = 'Remove';

    const toggleRead = document.createElement('button');
    toggleRead.classList.add('toggle-read-btn');
    toggleRead.id = bookCounter;
    toggleRead.textContent = 'Read Status';

    const blockArray = Array.from(document.getElementsByClassName('block'));
    const btnsContainer = document.createElement('div');

    btnsContainer.classList.add('btns-container');
    btnsContainer.appendChild(toggleRead);
    btnsContainer.appendChild(removeBtn);
    blockArray[bookCounter].appendChild(btnsContainer);
    bookCounter++;
}

// Adding new book to library
const form = document.querySelector('#new-book-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewBook(event);
    form.reset();
    dialog.close();
})

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
    let parent = target.parentElement.parentElement;
    let bookText = parent.firstChild.firstChild.innerHTML;
    let bookTitle = bookText.substring(0, bookText.indexOf(','));
    let bookIndex = myLibrary.findIndex(book => book.title === bookTitle);    
    
    const currentBook = myLibrary[bookIndex];

    if (target.classList.contains('remove-btn')) {                     
        myLibrary.splice(bookIndex, 1);        
        bookCounter--;
        parent.remove();
        console.log(myLibrary);
    }
    if (target.classList.contains('toggle-read-btn')) {
        currentBook.toggleReadStatus(parent.firstChild.firstChild);        
    }
});

// Display dialog form with button click 
const dialog = document.getElementById('form-dialog');
const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});