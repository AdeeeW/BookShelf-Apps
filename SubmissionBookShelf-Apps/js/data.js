const STORAGE_KEY = 'BOOKSHELF_APPS';

let books = [];
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookShelfObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(BookId) {
  for (Book of books) {
    if (Book.id === BookId) return Book;
  }
  return null;
}

function findBookIndex(BookId) {
  let index = 0;
  for (Book of books) {
    if (Book.id === BookId) return index;

    index++;
  }

  return -1;
}
