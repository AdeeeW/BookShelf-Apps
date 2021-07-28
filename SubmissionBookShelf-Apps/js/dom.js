const INCOMPLETED_LIST_BOOKSHELF_ID = 'incompleteBookshelfList';
const COMPLETED_LIST_BOOKSHELF_ID = 'completeBookshelfList';
const BOOKSHELF_ITEM_ID = 'itemId';

function makeBookShelf(title, author, year, isCompleted) {
  const bookTitle = document.createElement('h3');
  bookTitle.setAttribute('id', 'title');
  bookTitle.innerText = title;

  const authorBook = document.createElement('p');
  authorBook.setAttribute('id', 'author');
  authorBook.innerText = author;

  const yearBook = document.createElement('p');
  yearBook.setAttribute('id', 'year');
  yearBook.innerText = year;

  const bookContainer = document.createElement('div');
  bookContainer.classList.add('action');
  bookContainer.append(bookTitle, authorBook, yearBook);

  const container = document.createElement('article');
  container.classList.add('book_item');

  container.append(bookContainer);

  if (isCompleted) {
    container.append(createInCompletedButton(), createHapusButton());
  } else {
    container.append(createCompletedButton(), createHapusButton());
  }

  return container;
}

function addBookShelf() {
  const inCompletedBookList = document.getElementById(
    INCOMPLETED_LIST_BOOKSHELF_ID
  );
  const completeBookList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);

  const titleBook = document.getElementById('inputBookTitle').value;
  const authorBook =
    'Penulis : ' + document.getElementById('inputBookAuthor').value;
  const yearBook = 'Tahun : ' + document.getElementById('inputBookYear').value;
  const isChecked = document.getElementById('inputBookIsComplete').checked;

  const book = makeBookShelf(titleBook, authorBook, yearBook, isChecked);
  const bookObject = composeBookShelfObject(
    titleBook,
    authorBook,
    yearBook,
    isChecked
  );

  book[BOOKSHELF_ITEM_ID] = bookObject.id;
  books.push(bookObject);

  inCompletedBookList.append(book);
  if (isChecked) {
    completeBookList.append(book);
    updateDataToStorage();
  } else {
    inCompletedBookList.append(book);
    updateDataToStorage();
  }
}

function addBookToCompleted(taskElement) {
  if (confirm('Apakah Yakin Ingin Memindah Data Ini??')) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
    const titleBook = taskElement.querySelector(
      '.book_item > .action > #title'
    ).innerText;
    const authorBook = taskElement.querySelector(
      '.book_item > .action > #author'
    ).innerText;
    const yearBook = taskElement.querySelector(
      '.book_item > .action > #year'
    ).innerText;

    const newbook = makeBookShelf(titleBook, authorBook, yearBook, true);
    const book = findBook(taskElement[BOOKSHELF_ITEM_ID]);
    book.isCompleted = true;
    newbook[BOOKSHELF_ITEM_ID] = book.id;

    listCompleted.append(newbook);
    taskElement.remove();

    updateDataToStorage();
  }
}

function undoBookFromInCompleted(taskElement) {
  if (confirm('Apakah Yakin Ingin Memindah Data Ini??')) {
    const listUncompleted = document.getElementById(
      INCOMPLETED_LIST_BOOKSHELF_ID
    );
    const titleBook = taskElement.querySelector(
      '.book_item > .action> #title'
    ).innerText;
    const authorBook = taskElement.querySelector(
      '.book_item > .action > #author'
    ).innerText;
    const yearBook = taskElement.querySelector(
      '.book_item > .action > #year'
    ).innerText;

    const newbook = makeBookShelf(titleBook, authorBook, yearBook, false);

    const book = findBook(taskElement[BOOKSHELF_ITEM_ID]);
    book.isCompleted = false;
    newbook[BOOKSHELF_ITEM_ID] = book.id;

    listUncompleted.append(newbook);
    taskElement.remove();

    updateDataToStorage();
  }
}

function removeBookFromList(taskElement) {
  if (confirm('Apakah Yakin Ingin Hapus Data Ini??')) {
    const bookPosition = findBookIndex(taskElement[BOOKSHELF_ITEM_ID]);
    books.splice(bookPosition, 1);

    taskElement.remove();

    updateDataToStorage();
  }
}

function createButton(buttonTypeClass, buttonInnerText, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = buttonInnerText;
  button.addEventListener('click', function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function createCompletedButton() {
  return createButton('green', 'Selesai di Baca', function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function createHapusButton() {
  return createButton('red', 'Hapus Buku', function (event) {
    removeBookFromList(event.target.parentElement);
  });
}

function createInCompletedButton() {
  return createButton('green', 'Belum Selesai dibaca', function (event) {
    undoBookFromInCompleted(event.target.parentElement);
  });
}

function bookShelfSearch() {
  const searchInput = document
    .getElementById('searchBookTitle')
    .value.toUpperCase();
  const titleList = document.querySelectorAll('article');

  let index = 0;
  for (judul of titleList) {
    let titles = judul.querySelector('h3').innerText.toUpperCase();

    if (titles.indexOf(searchInput) > -1) {
      titleList[index].removeAttribute('hidden');
    } else {
      titleList[index].setAttribute('hidden', 'hidden');
    }
    index++;
  }
}

function refreshDataFromListBook() {
  const listUncompleted = document.getElementById(
    INCOMPLETED_LIST_BOOKSHELF_ID
  );
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);

  for (book of books) {
    const newbook = makeBookShelf(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newbook[BOOKSHELF_ITEM_ID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newbook);
    } else {
      listUncompleted.append(newbook);
    }
  }
}
