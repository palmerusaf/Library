let bookList = [];

const navButtons = document.querySelectorAll(".header__nav-item");
addEventsListenersToNavButtons(navButtons);

function addEventsListenersToNavButtons(navButtons) {
  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      displayPageContent(e);
      setNavButtonToActive(e);
    });
  });

  function setNavButtonToActive(clickEvent) {
    const button = clickEvent.target;
    removeActiveClassFromAllButtons();
    addActiveClassToButton(button);

    function removeActiveClassFromAllButtons() {
      navButtons.forEach((button) =>
        button.classList.remove("header__nav-item--active")
      );
    }

    function addActiveClassToButton(button) {
      button.classList.add("header__nav-item--active");
    }
  }

  function displayPageContent(clickEvent) {
    const contentElements = [...document.querySelectorAll(".content")];
    const contentToDisplay = findContentFromClick(clickEvent);

    hideAllContent();
    contentToDisplay.classList.remove("hide-me");

    function findContentFromClick(clickEvent) {
      const matchingIndex = clickEvent.target.dataset.index;
      const contentToDisplay = contentElements.find(
        (element) => element.dataset.index === matchingIndex
      );
      return contentToDisplay;
    }

    function hideAllContent() {
      contentElements.forEach((element) => element.classList.add("hide-me"));
    }
  }
}

const submitButton = document.getElementsByClassName("form__btn--submit")[0];
submitButton.addEventListener("click", handleSubmitClick);

function handleSubmitClick(clickEvent) {
  clickEvent.preventDefault();
  const form = clickEvent.target.parentNode.parentNode.parentNode;

  if (form.reportValidity()) {
    appendBookListUsingForm(form);
    updateBookListDisplay();

    form.reset();
    moveCursorToTopOfForm();
  }

  function moveCursorToTopOfForm() {
    document.getElementById("author-name").focus();
  }
}

function appendBookListUsingForm(form) {
  const author = form[0].value;
  const title = form[1].value;
  const pages = form[2].value;
  const read = form[3].checked;
  bookList.push(new Book(author, title, pages, read));
}

class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

function updateBookListDisplay() {
  clearBookListDisplay();
  renderBookList();
  saveBookListToLocalStorage();
}

function clearBookListDisplay() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerText = "";
}

function renderBookList() {
  const table = document.querySelector("tbody");
  table.appendChild(make)
  for (let i = 0; i < bookList.length; i++) {
    const newRow = makeReadingListEntry(bookList[i], i);
    newRow.dataset.indexNumber = i;
    newRow.appendChild(makeDeleteEntryButton(i));
    if (i % 2 !== 0) newRow.className += " table__row--even";
    table.appendChild(newRow);
  }

  function makeDeleteEntryButton(bookIndex) {
    const btn = document.createElement("button");
    btn.className = "form__btn form__btn--reset form__btn--del";
    btn.textContent = "delete";
    btn.addEventListener("click", deleteBookEntry);
    return btn;

    function deleteBookEntry(e) {
      const rowIndex = e.target.parentNode.dataset.indexNumber;
      bookList.splice(rowIndex, 1);
      updateBookListDisplay();
    }
  }

  function attachReadCheckbox(rowItem, read, bookIndex) {
    const label = document.createElement("label");
    label.htmlFor = `read${bookIndex}`;
    label.textContent = "Read";
    rowItem.append(label);

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = `read${bookIndex}`;
    checkBox.addEventListener("change", (e) => {
      bookList[bookIndex].read = e.target.checked;
      saveBookListToLocalStorage();
    });
    checkBox.checked = read;
    rowItem.append(checkBox);
  }

  function makeReadingListEntry(book, bookIndex) {
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
}

function saveBookListToLocalStorage() {
  localStorage.setItem("myReadingListLocal", JSON.stringify(bookList));
}

function getBookListFromLocalStorage() {
  bookList = JSON.parse(
    localStorage.getItem("myReadingListLocal") || "[]"
  );
  updateBookListDisplay();
}

getBookListFromLocalStorage();
