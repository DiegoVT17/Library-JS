const bookForm = document.querySelector("form");
const modal = document.querySelector("dialog");
const btnModal = document.querySelector(".openModal");

function Book(name, author, pages, relYear, isRead, index) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.releaseYear = relYear;
  this.isRead = isRead;
  this.index = index;
}

let myLibrary = [
  {
    name: "Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: "295",
    releaseYear: "1954",
    isRead: false,
  },
  {
    name: "Harry Potter and the Sorcerers Stone",
    author: "J.K. Rowling",
    pages: "315",
    releaseYear: "1997",
    isRead: true,
  },
];

btnModal.addEventListener("click", () => {
  modal.showModal();
  modal.autofocus;
});

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.bookName.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const relYear = form.release.value;
  const isReadInput = form.isRead.value;
  const isRead = isReadInput === "true";

  addBookToLibrary(name, author, pages, relYear, isRead);
  modal.close();
  render(myLibrary);

  form.bookName.value = "";
  form.author.value = "";
  form.pages.value = "";
  form.release.value = "";
  form.isRead.value = "";
}

bookForm.addEventListener("submit", handleSubmit);

function createBookTable(data) {
  const tRow = document.createElement("tr");
  const tName = document.createElement("td");
  const tAuthor = document.createElement("td");
  const tPages = document.createElement("td");
  const tRelYear = document.createElement("td");
  const delBtn = document.createElement("button");
  const tDel = document.createElement("td");
  const tRead = document.createElement("td");
  const isRead = document.createElement("input");

  tName.innerText = data.name;
  tAuthor.innerText = data.author;
  tPages.innerText = data.pages;
  tRelYear.innerText = data.releaseYear;
  delBtn.textContent = "Borrar";
  delBtn.addEventListener("click", () => {
    delBook(data.name);
  });

  isRead.type = "checkbox";
  isRead.checked = data.isRead;

  if (data.isRead) {
    tRow.classList.add("read");
  }

  isRead.addEventListener("change", () => {
    data.isRead = isRead.checked;

    if (data.isRead) {
      tRow.classList.add("read");
    } else {
      tRow.classList.remove("read");
    }
  });

  tRead.append(isRead);
  tDel.append(delBtn);
  tRow.append(tName, tAuthor, tPages, tRelYear, tDel, tRead);

  return tRow;
}

function delBook(name) {
  myLibrary = myLibrary.filter((book) => book.name !== name);
  render();
}

function render() {
  const table = document.querySelector("table");

  table.innerHTML = "";

  const tRow = document.createElement("tr");
  const tName = document.createElement("th");
  const tAuthor = document.createElement("th");
  const tPages = document.createElement("th");
  const tRelYear = document.createElement("th");
  const emptyDel = document.createElement("th");
  const emptyRead = document.createElement("th");

  tName.innerText = "Name";
  tAuthor.innerText = "Author";
  tPages.innerText = "Pages";
  tRelYear.innerText = "Release Year";

  tRow.append(tName, tAuthor, tPages, tRelYear, emptyDel, emptyRead);
  table.append(tRow);

  for (let i = 0; i < myLibrary.length; i++) {
    const newRow = createBookTable(myLibrary[i]);
    table.append(newRow);
  }
}

function addBookToLibrary(...args) {
  const newBook = new Book(...args);
  myLibrary.push(newBook);
}

render(myLibrary);
