/** Global array to store users books for reading list */
let myReadingList = [];

/** Constructor for Book Objects*/
function Book(author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

