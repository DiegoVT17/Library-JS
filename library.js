class Book {
  static myLibrary = [
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

  static modal = document.querySelector("dialog");
  static openModalBtn = document.querySelector(".openModal");
  static form = document.querySelector("form");
  static table = document.querySelector("table");

  static createBook({ ...values }) {
    this.myLibrary.push({ ...values });
  }

  static openForm() {
    this.openModalBtn.addEventListener("click", () => {
      this.modal.showModal();
      this.modal.autofocus;
    });
  }

  static handleForm() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const name = form.bookName.value;
      const author = form.author.value;
      const pages = form.pages.value;
      const relYear = form.release.value;
      const isReadInput = form.isRead.value;
      const isRead = isReadInput === "true";

      this.createBook({ name, author, pages, relYear, isRead });
      this.modal.close();
      this.render();

      form.bookName.value = "";
      form.author.value = "";
      form.pages.value = "";
      form.release.value = "";
      form.isRead.value = "";
    });
  }

  static render() {
    this.table.innerHTML = "";

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
    this.table.append(tRow);

    for (let i = 0; i < this.myLibrary.length; i++) {
      const newRow = this.createBookTable(this.myLibrary[i]);
      this.table.append(newRow);
    }
  }

  static createBookTable(data) {
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
      this.delBook(data.name);
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

  static delBook(name) {
    this.myLibrary = this.myLibrary.filter((book) => book.name !== name);
    this.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Book.openForm();
  Book.handleForm();
  Book.render();
});
