document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("inputImportant").checked = true;
    inputBookIsComplete.checked = false;


    
    const formInputBook = document.getElementById("inputBook");
    formInputBook.addEventListener("submit", (event) => {

        event.preventDefault();
        makeBook();
        updateDataToStorage();

    });
    
    if (isStorageExist()){
        const getDataInStorage = localStorage.getItem("book");
        let theData = JSON.parse(getDataInStorage);
        // mengambil data yang berada di dalam WEB STORAGE yang memiliki key "book" 

        if (theData !== null) {
            STORAGE = theData; 
        }

        for (myStorage of STORAGE) {
            const savedBook = {
                id: myStorage.id,
                title: myStorage.title,
                author: myStorage.author,
                year: myStorage.year,
                isComplete: myStorage.isComplete,
                priority: myStorage.priority
            }
            
            containerArticle(
                savedBook.id, 
                savedBook.title, 
                savedBook.author, 
                savedBook.year, 
                savedBook.isComplete,
                savedBook.priority
            );
        }
    }


});