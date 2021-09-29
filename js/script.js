/** Global array to store users books for reading list */
let myReadingList = [];
// //testList
// addBookToMyReadingList('author1','title1',123,false)
// addBookToMyReadingList('author2','title2',321,true)

/** Constructor for Book Objects*/
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

/** Add a book object to array */
function addBookToMyReadingList(author, title, pages, read) {
  myReadingList.push(new Book(author, title, pages, read));
}

/** Loop array and append all items to html table */
function appendTableFromArray() {
  /** Helper Function that attaches read checkbox and label to row element */
  function attachReadCheckbox(rowItem, read) {
    const label = document.createElement("label");
    // label.htmlFor = ; find a way to create unique ids for read labels
    label.textContent = "Read";
    rowItem.append(label);

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    // checkBox.id = find a way to create unique ids for read labels
    // attach event listener for update array list of true false stats
    checkBox.checked = read;
    rowItem.append(checkBox);
  }
  /** Create and return a row that includes book information given */
  function createBookRow(book) {
    const row = document.createElement("tr");
    row.className = "flex table__row";
    for (const item in book) {
      const rowItem = document.createElement("td");
      rowItem.className = "table__item";
      if (item === "read") {
        attachReadCheckbox(rowItem, book[item]);
        row.appendChild(rowItem);
        continue;
      }
      rowItem.textContent = book[item];
      row.appendChild(rowItem);
    }
    return row;
  }
  const table = document.querySelector("tbody");
  for (let i = 0; i < myReadingList.length; i++) {
    const newRow = createBookRow(myReadingList[i]);
    if (i % 2 !== 0) newRow.className += " table__row--even";
    table.appendChild(newRow);
  }
}
