document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    addBookShelf();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const submitSearch = document.getElementById('searchBook');

submitSearch.addEventListener('submit', function (event) {
  event.preventDefault();
  bookShelfSearch();
});

document.addEventListener('ondatasaved', () => {
  console.log('Data berhasil disimpan.');
});

document.addEventListener('ondataloaded', () => {
  refreshDataFromListBook();
});

function changeBookSubmit() {
  const bookIsComplete = document.getElementById('inputBookIsComplete').checked;
  if (bookIsComplete) {
    document.getElementById('bookSubmit').firstElementChild.innerHTML =
      'Sudah Di Baca';
  } else {
    document.getElementById('bookSubmit').firstElementChild.innerHTML =
      'Belum Di Baca';
  }
}
