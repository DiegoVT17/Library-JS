const bookForm = document.querySelector("form")
const modal = document.querySelector("dialog")
const btnModal = document.querySelector(".openModal")

function Book(name, author, pages, relYear) {
  this.name = name
  this.author = author
  this.pages = pages
  this.releaseYear = relYear 
}

let myLibrary = [
  {
    name: "Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: "295",
    releaseYear: "1954", 
  },
  {
    name: "Harry Potter and the Sorcerers Stone",
    author: "J.K. Rowling",
    pages: "315",
    releaseYear: "1997", 
  }
]

btnModal.addEventListener("click", () => {
  modal.showModal()
})

function handleSubmit(e) {
  e.preventDefault()
  
  const form = e.target;
  const name = form.bookName.value
  const author = form.author.value
  const pages = form.pages.value
  const relYear = form.release.value

  addBookToLibrary(name, author, pages, relYear)
  modal.close()
  render(myLibrary)

  form.bookName.value = ""
  form.author.value = ""
  form.pages.value = ""
  form.release.value = ""
}

bookForm.addEventListener("submit", handleSubmit)

function createBookTable(data) {
  const tRow = document.createElement("tr")
  const tName = document.createElement("td")
  const tAuthor = document.createElement("td")
  const tPages = document.createElement("td")
  const tRelYear = document.createElement("td")
  const delBtn = document.createElement("button")
  const tDel = document.createElement("td")
  
  tName.innerText = data.name
  tAuthor.innerText = data.author
  tPages.innerText = data.pages
  tRelYear.innerText = data.releaseYear
  delBtn.textContent = "Borrar"
  delBtn.addEventListener("click", () => {
    delBook(data.name)
  })
  tDel.append(delBtn)

  tRow.append(tName, tAuthor, tPages, tRelYear, tDel)

  return tRow
}

function delBook(name) {
  myLibrary = myLibrary.filter(book => book.name !== name)
  render()
}

function render() {
  const table = document.querySelector("table")

  table.innerHTML = ""

  const tRow = document.createElement("tr")
  const tName = document.createElement("th")
  const tAuthor = document.createElement("th")
  const tPages = document.createElement("th")
  const tRelYear = document.createElement("th")
  const empty = document.createElement("th")

  tName.innerText = "Name"
  tAuthor.innerText = "Author"
  tPages.innerText = "Pages"
  tRelYear.innerText = "Release Year"

  tRow.append(tName, tAuthor, tPages, tRelYear, empty)
  table.append(tRow)

  for (let i = 0; i < myLibrary.length; i++) {
    const newRow = createBookTable(myLibrary[i])
    table.append(newRow)
  }
}

function addBookToLibrary(...args) {
  const newBook = new Book(...args)
  myLibrary.push(newBook)
}

render(myLibrary)