const DELETED = [];
let STORAGE = [];
const CONTAINER_INCOMPLETED = document.getElementById("incompleteBookshelfList");
const CONTAINER_COMPLETED = document.getElementById("completeBookshelfList");

//==========

function makeBook(){

    const book = {
        id: +new Date(),
        title: document.getElementById("inputBookTitle").value,
        author: document.getElementById("inputBookAuthor").value,
        year: document.getElementById("inputBookYear").value,
        isComplete: null
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

    if (document.getElementById("inputBookIsComplete").checked == true){
        book.isComplete = true;
        containerArticle.classList.add("background-finished")
        containerAction.append(unfinishedButton(), deleteButton());
        CONTAINER_COMPLETED.append(containerArticle);  

    } else if (document.getElementById("inputBookIsComplete").checked == false) {
        book.isComplete = false;
        containerArticle.classList.add("background-unfinished")
        containerAction.append(finishButton(), deleteButton());
        CONTAINER_INCOMPLETED.append(containerArticle);
    }

    // STORAGE.push(book);
    // Save Data to Storage
    STORAGE.push(book);
    return containerArticle
}

function unfinishedButton(){
    const button = document.createElement("button");

    button.classList.add("finish_or_not");
    button.innerText = "Unfinished ";
    button.addEventListener("click", (event) => {
        const containerIncompleted = document.getElementById("incompleteBookshelfList");
        const containerCompleted = document.getElementById("completeBookshelfList");
        const containerArticle = event.target.parentElement.parentElement;

        if (event.target.innerText == "Unfinished") {
            event.target.innerText = "Finished";
            containerIncompleted.insertBefore(event.target.parentElement.parentElement, containerIncompleted.firstChild);
            containerArticle.classList.add("background-unfinished");
            containerArticle.classList.remove("background-finished");

        } else {
            event.target.innerText = "Unfinished ";
            containerCompleted.insertBefore(event.target.parentElement.parentElement, containerCompleted.firstChild);
            containerArticle.classList.add("background-finished");
            containerArticle.classList.remove("background-unfinished");
        }
    });
    return button;
}

document.getElementById("inputBookIsComplete").addEventListener("click", () => {
    if(document.getElementById("inputBookIsComplete").checked === true) {
        document.getElementById("textButtonFinish-unfinished").innerText = "shelf finished";
        for (let i = 0; i < document.getElementsByName("inputPriority").length; i++){
            document.getElementsByName("inputPriority")[i].setAttribute("disabled", true);
        }
    } else {
        for (let i = 0; i < document.getElementsByName("inputPriority").length; i++){
            document.getElementsByName("inputPriority")[i].removeAttribute("disabled");
        }
        document.getElementById("textButtonFinish-unfinished").innerText = "shelf unfinished";
    }
});

function finishButton(){
    const button = document.createElement("button");
    button.classList.add("finish_or_not");
    button.innerText = "Finished";
    button.addEventListener("click", (event) => {
        const containerCompleted = document.getElementById("completeBookshelfList");
        const containerIncompleted = document.getElementById("incompleteBookshelfList");
        const containerArticle = event.target.parentElement.parentElement;

        if (event.target.innerText == "Finished") {
            event.target.innerText = "Unfinished ";
            containerCompleted.insertBefore(event.target.parentElement.parentElement, containerCompleted.firstChild)
            containerArticle.classList.add("background-finished");
            containerArticle.classList.remove("background-unfinished");

        } else {
            event.target.innerText = "Finished";
            containerIncompleted.insertBefore(event.target.parentElement.parentElement, containerIncompleted.firstChild)
            containerArticle.classList.add("background-unfinished");
            containerArticle.classList.remove("background-finished");
        }
    });
    return button;
}

function deleteButton(){
    const button = document.createElement("button");
    button.classList.add("delete");
    button.innerText = "Delete";
    button.addEventListener("click", (event) => {
        DELETED.push(event.target.parentElement.parentElement); // ketika didelete akan tertampung di variabel DELETE 
        event.target.parentElement.parentElement.remove();
    });
    return button;
}

function saveDataToStorage(){
    let convertToString = JSON.stringify(STORAGE);
    localStorage.setItem("book", convertToString);
}


// function loadDataFromStorage(){
//     const dataInStorage = localStorage.getItem("book")
//     let data = JSON.parse(dataInStorage);
    
//     if(data !== null) {
//         STORAGE = data;
//     }
// }






