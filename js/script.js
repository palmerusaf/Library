/** Global array to store users books for reading list */
let myReadingList = [];
// //testList
// addBookToMyReadingList('author1','title1',123,false)
// addBookToMyReadingList('author2','title2',321,true)

/** Event listeners for nav-bar buttons */
const navBarButtons = document.querySelectorAll(".header__nav-item");
navBarButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    updateNavBar(e.target);
    updatePageElements(e.target);
  })
);

/** Change Nav-bar status by changing style classes */
function updateNavBar(navElement) {
  navBarButtons.forEach(
    (button) =>
      (button.className = button.className.replace(
        "header__nav-item--selected",
        ""
      ))
  );
  navElement.className += " header__nav-item--selected";
}

/** Hide/Un-hide body elements based on nav btn click */
function updatePageElements(navElement) {
  document.querySelectorAll(".form").forEach((node) => {
    if (!node.className.includes("hide-me")) node.className += " hide-me";
  });
  switch (navElement.id) {
    case "nav-add":
      document.querySelector("#form").className = document
        .querySelector("#form")
        .className.replace(" hide-me", "");
      break;
    case "nav-list":
      document.querySelector("#table").className = document
        .querySelector("#table")
        .className.replace(" hide-me", "");
      break;
    case "nav-about":
      document.querySelector("#about").className = document
        .querySelector("#about")
        .className.replace(" hide-me", "");
      break;
  }
}

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

/** Loop array and append all items to html table body */
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
  /** Create and return a row that includes elements from book object items*/
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
