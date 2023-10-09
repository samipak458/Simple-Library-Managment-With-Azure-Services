displayBooks(); //As the browser open it show all the stored books

let libraryForm = document.getElementById("libraryForm");
let name = document.getElementById("bookName");
let author = document.getElementById("author");
let isbn = document.getElementById("isbnno");
let edition = document.getElementById("edition");
let publicationD = document.getElementById("publicationdate");
let read = document.getElementById("read-toggle");

let url = document.getElementById("bookurl");
let favorite = document.getElementById("fav-toggle");
let type;
console.log(favorite);

let fiction = document.getElementById("fiction");
let programming = document.getElementById("programming");
let science = document.getElementById("science");
let others = document.getElementById("other");

let editIndex = -1;

// Adding Books
libraryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };
  if (!isValidUrl(url.value)) {
    alert("Invalid URL ");
    url.value = "";
    return;
  }
  const isValidIsbn = (subject) => {
    subject = subject.replaceAll("-", "");
    console.log(subject.length);
    if (subject.length == 10) {
      let sum = 0;
      for (let i = 9; i >= 0; i--) {
        sum += parseInt(subject[i], 10) * (i + 1);
      }
      if (sum % 11 == 0) {
        return true;
      } else {
        return false;
      }
    } else if (subject.length == 13) {
      subject = subject.replaceAll("-", "");

      let sum = 0;
      for (let i = 0; i < 13; i++) {
        if (i % 2 == 0) {
          sum += parseInt(subject[i], 10) * 1;
        } else {
          sum += parseInt(subject[i], 10) * 3;
        }
      }
      console.log(sum);
      if (sum % 10 == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  if (!isValidIsbn(isbn.value)) {
    alert("Invalid ISBN!");
    return;
  }

  // Checking different types of books
  if (fiction.checked) {
    type = fiction.value;
    programming.unchecked;
    science.unchecked;
  } else if (programming.checked) {
    type = programming.value;
    science.unchecked;
    anime.unchecked;
    fiction.unchecked;
  } else if (science.checked) {
    type = science.value;
    fiction.unchecked;
    programming.unchecked;
    anime.unchecked;
  } else if (anime.checked) {
    type = anime.value;
    fiction.unchecked;
    programming.checked;
    science.unchecked;
  } else if (others.checked) {
    type = newType.value ? newType.value : others.value;
    fiction.unchecked;
    programming.unchecked;
    science.unchecked;
    anime.unchecked;
  } else {
    type = "other";
  }

  let shelf = localStorage.getItem("shelfOfBooks");

  let objOfBook; //object which stores books
  let alreadyAdded = false;

  // Check if the book is already in the library
  if (shelf == null) {
    objOfBook = [];
  } else {
    //We might have multiple books
    objOfBook = JSON.parse(shelf); //By using JSON we convert it into Object

    objOfBook.every((bookObj) => {
      if (author === "") author = "Unknown";
      let curBook = name === bookObj.book;
      let curAuthor = author === bookObj.bookauthor;
      let curBookType = type === bookObj.bookType;

      if (curBook && curAuthor && curBookType) {
        console.log("already added!");
        alreadyAdded = true;
        return false;
      }
      return true;
    });
  }

  if (alreadyAdded === true) {
    alreadyAddedMessage();
    return;
  } else {
    // Book Name is mandatory field
    if (name.value == "") {
      errorMessage();
    } else {
      let myObj;
      if (author.value != "") {
        myObj = {
          book: name.value,
          bookauthor: author.value,
          bookType: type,
          bookurl: url.value == "" ? "/" : url.value,
          bookisbn: isbn.value,
          bookedition: edition.value,
          bookpublication: publicationD.value,
          readStatus: read.checked,
          favorite: favorite.checked,
        };
      } else {
        // Book Author not entered then set it to Unknown
        myObj = {
          book: name.value,
          bookauthor: "Unknown",
          bookType: type,
          bookurl: url.value == "" ? "/" : url.value,
          bookisbn: isbn.value,
          bookedition: edition.value,
          bookpublication: publicationD.value,
          readStatus: read.checked,
          favorite: favorite.checked,
        };
      }

      if (editIndex != -1) {
        objOfBook.splice(editIndex, 1, myObj);
        addMessage(true);
        editIndex = -1;
      } else {
        objOfBook.push(myObj);
        addMessage();
        UpdateBook();
      }
      localStorage.setItem("shelfOfBooks", JSON.stringify(objOfBook));
      name.value = "";
      author.value = "";
      type = "";
      isbn.value = "";
      edition.value = "";
      publicationD.value = "";
    }
    displayBooks();
  }
});

function editBook(index) {
  let bookDetails = JSON.parse(localStorage.getItem("shelfOfBooks"))[index];

  console.log(bookDetails);
  name.value = bookDetails.book;
  author.value = bookDetails.bookauthor;

  switch (bookDetails.bookType) {
    case "other":
      others.checked = true;
      break;
    case "fiction":
      fiction.checked = true;
      break;
    case "programming":
      programming.checked = true;
      break;
    case "science":
      science.checked = true;
      break;
  }

  editIndex = index;
  name.focus();
}

//Function to show elements(books) from LocalStorage
function displayBooks() {
  let books = localStorage.getItem("shelfOfBooks");
  let clearBtn = document.getElementById("clear");
  let objOfBook;

  if (books == null) {
    objOfBook = [];
  } else {
    objOfBook = JSON.parse(books);
  }
  let html = "";
  let index = 0;

  objOfBook.forEach((books) => {
    //index is the length of the array
    if (index == 0) {
      html += `
           <tr class="rows">
           <th scope="row">1</th>
           <td class="name"><a class="bookurl" href=${books.bookurl}> ${
        books.book
      } </a></td>
           <td class="author">${books.bookauthor}</td>
           <td class="type">${books.bookType}</td>
           <td class="isbn">${books.bookisbn}</td>
           <td class="edition">${books.bookedition}</td>
           <td class="publicationdate">${books.bookpublication}</td>
           <td class="type">${
             books.readStatus 
             ? `<label class="switch">
                  <input type="checkbox" checked disabled>
                  <span class="slider round"></span>
            </label>`  
            : `<label class="switch">
                  <input type="checkbox" disabled>
                  <span class="slider round"></span>
            </label>`
           }</td>
           <td class="fav">${
             books.favorite
               ? `<label class="switch">
                        <input type="checkbox" checked disabled>
                        <span class="slider round"></span>
                  </label>`
               : `<label class="switch">
                        <input type="checkbox" disabled>
                        <span class="slider round"></span>
                  </label>`
           }</td>
           <td class="icon"><i class="fa fa-times" aria-hidden="true" onclick="removeBook(${index})"></i></td>
           <td class="icon"><i class="fa fa-edit" aria-hidden="true" onclick="editBook(${index})"></i></td>
           </tr>
        `;
    } else {
      html += `
           <tr class="rows">
           <th scope="row">${index + 1}</th>
           <td class="name"><a class="bookurl" href=${books.bookurl}> ${
        books.book
      } </a></td>
           <td class="author">${books.bookauthor}</td>
           <td class="type">${books.bookType}</td>
           <td class="isbn">${books.bookisbn}</td>
           <td class="edition">${books.bookedition}</td>
           <td class="publicationdate">${books.bookpublication}</td>
           <td class="type">${
             books.readStatus
             ? `<label class="switch">
                      <input type="checkbox" checked disabled>
                      <span class="slider round"></span>
                </label>`
             : `<label class="switch">
                      <input type="checkbox" disabled>
                      <span class="slider round"></span>
                </label>`
           }</td>
           <td class="fav">${
             books.favorite
               ? `<label class="switch">
                        <input type="checkbox" checked disabled>
                        <span class="slider round"></span>
                  </label>`
               : `<label class="switch">
                        <input type="checkbox" disabled>
                        <span class="slider round"></span>
                  </label>`
           }</td>
            <td class="icon"><i class="fa fa-times" aria-hidden="true" onclick="removeBook(${index})"></i></td>
           <td class="icon"><i class="fa fa-edit" aria-hidden="true" onclick="editBook(${index})"></i></td>
           </tr>
        `;
    }

    index++;

    console.log("count " + index);
  });

  let table = document.getElementById("tableBody");
  let noDisplayMsg = document.getElementById("emptyMsg");

  if (objOfBook.length != 0) {
    table.innerHTML = html;
    clearBtn.style.display = "block";
    noDisplayMsg.innerHTML = "";
  } else {
    noDisplayMsg.innerHTML = `Nothing to display! Use "Add book" above to add books`;
  }

  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
}

//Show adding message

function addMessage(edited = false) {
  let message = document.getElementById("message");
  let navbar = document.getElementById("navbar");

  navbar.style.display = "none";

  message.innerHTML = !edited
    ? `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Message:</strong> Your book has been successfully added.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    : `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Message:</strong> Your book has been successfully edited.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

  setTimeout(() => {
    navbar.style.display = "flex";
    message.innerHTML = ``;
  }, 2000);
}

//Show error message
function errorMessage() {
  let message = document.getElementById("message");
  let navbar = document.getElementById("navbar");

  navbar.style.display = "none";
  message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error:</strong> To add book, add name of book.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

  setTimeout(() => {
    navbar.style.display = "flex";
    message.innerHTML = ``;
  }, 2000);
}

//Show alreadyAdded message
function alreadyAddedMessage() {
  let message = document.getElementById("message");
  let navbar = document.getElementById("navbar");

  navbar.style.display = "none";
  message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error:</strong> Book already present!
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>`;

  // clear the library form
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();

  setTimeout(() => {
    navbar.style.display = "flex";
    message.innerHTML = ``;
  }, 2000);
}

//Show clear message
function clearMessage() {
  let message = document.getElementById("message");
  let navbar = document.getElementById("navbar");

  navbar.style.display = "none";

  message.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
    <strong>Message:</strong> Your book shelf is clear! To add more books refresh the browser.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

  setTimeout(() => {
    navbar.style.display = "flex";
    message.innerHTML = ``;
  }, 2000);
}

// Refresh the page
function refreshPage() {
  setTimeout(() => {
    window.location.reload();
  }, 2050);
}

// Update the display of books on deletion
function updateDisplayAfterDelete() {
  localStorage.removeItem("shelfOfBooks");
  localStorage.removeItem("getBookNumber");

  document.getElementById("books").innerHTML = "No. of Books: " + 0;
  let table = document.getElementById("tableBody");
  table.style.display = "none";
  clearBtn.style.display = "none";

  let noDisplayMsg = document.getElementById("emptyMsg");
  noDisplayMsg.innerHTML = `Nothing to display! Use "Add book" above to add books`;

  clearMessage();
  refreshPage();
}

// Clearning shelf (Deleting all books)
let clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
  updateDisplayAfterDelete();
});

// Remove specific book from shelf
function removeBook(index) {
  console.log("Delete book " + index);

  // Decrementing in total number of books
  let getBookNumber = localStorage.getItem("getBookNumber");
  getBookNumber = parseInt(getBookNumber);

  if (getBookNumber) {
    localStorage.setItem("getBookNumber", getBookNumber - 1);
    document.getElementById("books").innerHTML =
      "No. of Books: " + (getBookNumber - 1);
  } else {
    localStorage.setItem("getBookNumber", 0);
    document.getElementById("books").innerHTML = "No. of Books: 0" + 0;
  }

  // Removing book from shelf
  let notes = localStorage.getItem("shelfOfBooks");
  let objOfBook = [];

  if (notes == null) {
    objOfBook = [];
  } else {
    objOfBook = JSON.parse(notes);
  }

  if (getBookNumber == 1) {
    updateDisplayAfterDelete();
  } else {
    objOfBook.splice(index, 1);
    localStorage.setItem("shelfOfBooks", JSON.stringify(objOfBook));
    displayBooks();
  }
}

//Searching book by bookname, author and type
let searchNote = document.getElementById("searchText");
searchNote.addEventListener("input", function () {
  let search = searchNote.value.toLowerCase();

  let tableRows = document.getElementsByClassName("rows");

  Array.from(tableRows).forEach(function (element) {
    let bookName = element
      .getElementsByClassName("name")[0]
      .innerText.toLowerCase();
    let authorName = element
      .getElementsByClassName("author")[0]
      .innerText.toLowerCase();
    let type = element
      .getElementsByClassName("type")[0]
      .innerText.toLowerCase();
    let isbnNo = element.getElementsByClassName("isbn")[0].innerText;
    if (bookName.includes(search)) {
      element.style.display = "table-row";
    } else if (authorName.includes(search)) {
      element.style.display = "table-row";
    } else if (type.includes(search)) {
      element.style.display = "table-row";
    } else if (isbnNo.includes(search)) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});

// Update Number of books in Shelf section
function UpdateBook() {
  const bookNumber = parseInt(localStorage.getItem("getBookNumber"));
  const booksCount = bookNumber ? bookNumber + 1 : 1;
  const updateBooksCountSentence = `No. of books: ${booksCount ?? 1}`;

  localStorage.setItem("getBookNumber", booksCount);
  document.getElementById("books").innerHTML = updateBooksCountSentence;
}

//Show Number of books in Shelf section

const showNumberOfBooks = () => {
  const getBookNumber = parseInt(localStorage.getItem("getBookNumber"));
  document.getElementById("books").innerHTML = `No. of books: ${
    getBookNumber || 0
  }`;
};

// Filter books based on selected attributes from dropdown
let filterDropdown = document.getElementById("filter-books");
function filterBooks() {
  let books = JSON.parse(localStorage.getItem("shelfOfBooks"));
  // let numOfBooks = document.getElementById("books");
  let emptyMsg = document.getElementById("emptyMsg");
  let filterBy = filterDropdown.value;
  let html = "";
  let index = 0;
  let filteredBooks;
  if (filterBy === "all") {
    filteredBooks = books.filter((book) => {
      return (
        book.book.toLowerCase().includes(searchNote.value.toLowerCase()) ||
        book.bookauthor
          .toLowerCase()
          .includes(searchNote.value.toLowerCase()) ||
        book.bookType.toLowerCase().includes(searchNote.value.toLowerCase())
      );
    });
  } else {
    filteredBooks = books.filter((book) => {
      return book[filterBy]
        .toLowerCase()
        .includes(searchNote.value.toLowerCase());
    });
  }

  if (filteredBooks.length > 0) {
    filteredBooks.forEach((filteredBook) => {
      html += `
            <tr class="rows">
            <th scope="row">${index + 1}</th>
            <td class="name">${filteredBook.book}</td>
            <td class="author">${filteredBook.bookauthor}</td>
            <td class="type">${filteredBook.bookType}</td>
            <td class="icon"><i class="fa fa-times" aria-hidden="true" onclick="removeBook(${index})"></i></td>
            </tr>
        `;
      index++;
    });
    emptyMsg.innerHTML = "";
  } else {
    let bookAttr;
    switch (filterBy) {
      case "all":
        bookAttr = "";
        break;
      case "book":
        bookAttr = "name";
        break;
      case "bookauthor":
        bookAttr = "author";
        break;
      case "bookType":
        bookAttr = "type";
        break;
    }
    emptyMsg.innerHTML = `No book ${
      bookAttr !== "" ? "with" : ""
    } ${bookAttr} "${searchNote.value}" found`;
  }

  // ? Does the number of books depends on the search results?
  // numOfBooks.innerHTML = "No. of Books: " + filteredBooks.length;

  let table = document.getElementById("tableBody");
  table.innerHTML = html;
}
// filterDropdown.addEventListener("change", filterBooks);
searchNote.addEventListener("input", filterBooks);

showNumberOfBooks();

const radioButtons = document.querySelectorAll("input[type=radio]");
radioButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const newType = document.getElementById("newType");
    if (e.target.id === "other") {
      newType.hidden = false;
    } else {
      newType.hidden = true;
    }
  });
});

// dark mode
var icon = document.querySelector("#icon");
var head1 = document.getElementById("subHead1");
var head2 = document.getElementById("subHead2");
var tables = document.getElementsByTagName("table");

icon.onclick = ()=>{
  document.body.classList.toggle("dark-theme");
  if(document.body.classList == "dark-theme"){
    icon.innerHTML = `<i class='fas fa-sun'></i>`;
    head1.style.color = "white";
    head2.style.color = "white";
    for (let i = 0; i < tables.length; i++) {
      tables[i].style.color = "white";
    }
  }
  else{
    icon.innerHTML = `<i class='fas fa-moon'></i>`;
    head1.style.color = "black";
    head2.style.color = "black";
    for (let i = 0; i < tables.length; i++) {
      tables[i].style.color = "black";
    }
  }
  console.log(document.body.classList);
}
var acc = document.getElementsByClassName("accordion");
var i;
var len = acc.length;
for (i = 0; i < len; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}