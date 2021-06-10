document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("inputBookIsComplete").checked = false;
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
            const book = {
                id: myStorage.id,
                title: myStorage.title,
                author: myStorage.author,
                year: myStorage.year,
                isComplete: myStorage.isComplete
            }

            const elementTitle = document.createElement("h3");
            elementTitle.innerText = book.title;
            elementTitle.classList.add("title")
        
            const elementAuthor = document.createElement("p");
            elementAuthor.innerText = "Penulis: " + book.author;
        
            const elementYear = document.createElement("p");
            elementYear.innerText = "Tahun: " + book.year;
        
            const containerAction = document.createElement("div");
            containerAction.classList.add("action");
        
            const containerArticle = document.createElement("article");
            containerArticle.classList.add("book_item");
            containerArticle.id = book.id;
            
            containerArticle.append(elementTitle, elementAuthor, elementYear, containerAction);
        
            if (book.isComplete == true){
                containerArticle.classList.add("background-finished")
                containerAction.append(unfinishedButton(), deleteButton());
                CONTAINER_COMPLETED.append(containerArticle);  
        
            } else if (book.isComplete == false) {
                containerArticle.classList.add("background-unfinished")
                containerAction.append(finishButton(), deleteButton());
                CONTAINER_INCOMPLETED.append(containerArticle);
            }
        }
    }
});