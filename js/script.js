/** Global array to store users books for reading list */
let myReadingList = [];

/** Event listeners for nav-bar buttons */
const navButtons = document.querySelectorAll(".header__nav-item");
navButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    setNavElementToActive(e.target);
    displayPageContent(e.target);
  })
);

/** Change Nav-bar status by changing style classes */
function setNavElementToActive(navElement) {
  navButtons.forEach(
    (button) =>
      (button.className = button.className.replace(
        "header__nav-item--active",
        ""
      ))
  );
  navElement.className += " header__nav-item--active";
}

/** Hide/Un-hide body elements based on nav btn click */
function displayPageContent(navElement) {
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
class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}
/** Get data from from append to array reset from and update table*/
function getFormData() {
  const form = document.querySelector("#form");
  const read = document.getElementById("true");
  addBookToMyReadingList(
    form[0].value,
    form[1].value,
    form[2].value,
    read.checked
  );
  form.reset();
  updateTableContents();
  // document.location.href = "#author-name";
  document.getElementById("author-name").focus();
}

/** Add a book object to array */
function addBookToMyReadingList(author, title, pages, read) {
  myReadingList.push(new Book(author, title, pages, read));
}

/** Loop array and append all items to html table body */
function renderReadingList() {
  /** Creates delete button that deletes the given book index then reloads the table */
  function deleteEntryButton(bookIndex) {
    const btn = document.createElement("button");
    btn.className = "form__btn form__btn--reset form__btn--del";
    btn.textContent = "delete";
    btn.addEventListener("click", deleteBookEntry);
    return btn;
  }
  /** Helper Function that attaches read checkbox and label to row element */
  function attachReadCheckbox(rowItem, read, bookIndex) {
    const label = document.createElement("label");
    label.htmlFor = `read${bookIndex}`;
    label.textContent = "Read";
    rowItem.append(label);

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = `read${bookIndex}`;
    // attach event listener for update array list of true false stats
    checkBox.addEventListener("change", (e) => {
      myReadingList[bookIndex].read = e.target.checked;
      saveArrayLocally();
    });
    checkBox.checked = read;
    rowItem.append(checkBox);
  }
  /** Create and return a row that includes elements from book object items*/
  function createBookRow(book, bookIndex) {
    const row = document.createElement("tr");
    row.className = "flex table__row";
    for (const item in book) {
      const rowItem = document.createElement("td");
      rowItem.className = "table__item";
      if (item === "read") {
        attachReadCheckbox(rowItem, book[item], bookIndex);
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
    const newRow = createBookRow(myReadingList[i], i);
    newRow.dataset.indexNumber = i;
    newRow.appendChild(deleteEntryButton(i));
    if (i % 2 !== 0) newRow.className += " table__row--even";
    table.appendChild(newRow);
  }
}

/** Clears all row elements from the body of table
 * Useful for resetting the table.
 */
function clearEntriesFromReadingList() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerText = "";
}

/** Callback function to handle delete button functionality */
function deleteBookEntry(e) {
  const rowIndex = e.target.parentNode.dataset.indexNumber;
  myReadingList.splice(rowIndex, 1);
  updateTableContents();
}

/** Updates the table to represent latest array data and updates local data*/
function updateTableContents() {
  clearEntriesFromReadingList();
  renderReadingList();
  saveArrayLocally();
}

/** Save reading list array locally whenever the update table function is called */
function saveArrayLocally() {
  localStorage.setItem("myReadingListLocal", JSON.stringify(myReadingList));
}

/** Try to get stored local data if it exists when webpage first loads */
function getLocalData() {
  myReadingList = JSON.parse(
    localStorage.getItem("myReadingListLocal") || "[]"
  );
  updateTableContents();
}

getLocalData();
