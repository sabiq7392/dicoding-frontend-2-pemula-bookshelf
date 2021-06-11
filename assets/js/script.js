document.addEventListener("DOMContentLoaded", () => {

    inputBookIsComplete.checked = false;
    document.getElementById("inputImportant").checked = true;
    
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
            STORAGE = theData; // Ini biar data ga ketindih
        }

        for (myStorage of STORAGE) {
            const savedBook = {
                id: myStorage.id,
                title: myStorage.title,
                author: myStorage.author,
                year: myStorage.year,
                isComplete: myStorage.isComplete
            }
        
            const containerArticle = document.createElement("article");
            containerArticle.classList.add("book_item");
            containerArticle.id = savedBook.id;
            
            containerArticle.append(
                elementTitle(savedBook.title), 
                elementAuthor(savedBook.author), 
                elementYear(savedBook.year), 
                containerAction(savedBook.isComplete)
            );
        
            if (savedBook.isComplete == true){
                containerArticle.classList.add("background-finished");
                containerAction().append(unfinishedButton(), deleteButton());
                CONTAINER_COMPLETED.append(containerArticle);  
        
            } else if (savedBook.isComplete == false) {
                containerArticle.classList.add("background-unfinished");
                containerAction().append(finishButton(), deleteButton());
                CONTAINER_INCOMPLETED.append(containerArticle);
            }

        }
    }
});