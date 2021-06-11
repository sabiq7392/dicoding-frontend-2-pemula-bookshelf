document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("inputImportant").checked = true;
    inputBookIsComplete.checked = false;
    
    const formInputBook = document.getElementById("inputBook");
    formInputBook.addEventListener("submit", (event) => {

        event.preventDefault();
        makeBook();
        saveDataToStorage();

    });
    
    if (isStorageExist()){
        const getDataInStorage = localStorage.getItem("book");
        let theData = JSON.parse(getDataInStorage);

        if (theData !== null) {
            STORAGE = theData; 
        }

        for (myStorage of STORAGE) {
            const savedBook = {
                id: myStorage.id,
                title: myStorage.title,
                author: myStorage.author,
                year: myStorage.year,
                isComplete: myStorage.isComplete
            }
            
            containerArticle(
                savedBook.id, 
                savedBook.title, 
                savedBook.author, 
                savedBook.year, 
                savedBook.isComplete
            );
            
        }
    }

});