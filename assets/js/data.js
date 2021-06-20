const DELETED = [];
let STORAGE = [];

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert("Your browser doesn't support Local Storage, try another browser such Mozilla Firefox or Google Chrome or update your browser");
        return false;
    } 
    return true;
}

function updateDataToStorage(){
    // Data/Value dalam array STORAGE akan diubah menjadi string dan dimasukkan ke dalam
    // WEB STORAGE

    let convertToString = JSON.stringify(STORAGE);
    localStorage.setItem("book", convertToString);
}

function deleteData(clickedBook) {
    let indexOfBookInArray = 0;
    for (myStorage of STORAGE) {
        if(myStorage.id == clickedBook.id) {
            /* Melakukan pengecekan IF untuk mengambil value elemen ini saja
            karena jika tidak melakukan pengcekan seluruh elemen yang mempunyai tombol FINISH valuenya akan diambil */
            STORAGE.splice(indexOfBookInArray, 1);
            console.log(`Book ${clickedBook.firstChild.textContent} has been deleted from web storage`);
        }

        indexOfBookInArray++;
    }
}
