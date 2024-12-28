const myLibrary = [
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

function createBookTable(data) {
  const tRow = document.createElement("tr")
  const tName = document.createElement("td")
  const tAuthor = document.createElement("td")
  const tPages = document.createElement("td")
  const tRelYear = document.createElement("td")
  
  tName.innerText = data.name
  tAuthor.innerText = data.author
  tPages.innerText = data.pages
  tRelYear.innerText = data.releaseYear

  tRow.append(tName, tAuthor, tPages, tRelYear)

  return tRow
}

function render() {
  const table = document.querySelector("table")

  myLibrary.forEach(book => {
    const newRow = createBookTable(book)

    table.append(newRow)
  })
}

function Book(name, author, pages, imgUrl) {
  this.name = name
  this.author = author
  this.pages = pages
  this.imgUrl = imgUrl
}

function addBookToLibrary(...args) {
  const newBook = new Book(...args)
  myLibrary.push(newBook)
}

render()