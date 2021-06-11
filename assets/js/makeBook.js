const DELETED = [];
let STORAGE = [];

const CONTAINER_INCOMPLETED = document.getElementById("incompleteBookshelfList");
const CONTAINER_COMPLETED = document.getElementById("completeBookshelfList");

const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear =  document.getElementById("inputBookYear");
const inputBookId_Date = +new Date();

const inputBookIsComplete = document.getElementById("inputBookIsComplete");

//==========

function makeBook(){

    const book = {
        id: +new Date(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: inputBookYear.value,
        isComplete: null
    }

    if (inputBookIsComplete.checked == true){
        book.isComplete = true;
    } else if (inputBookIsComplete.checked == false) {
        book.isComplete = false;
    }

    const containerArticle = document.createElement("article");
    containerArticle.classList.add("book_item");
    containerArticle.id = book.id;
    
    containerArticle.append(
        elementTitle(book.title), 
        elementAuthor(book.author), 
        elementYear(book.year), 
        containerAction(book.isComplete)
    );

    if (book.isComplete == true){
        containerArticle.classList.add("background-finished");
        containerAction().append(unfinishedButton(), deleteButton());
        CONTAINER_COMPLETED.append(containerArticle);  

    } else if (book.isComplete == false) {
        containerArticle.classList.add("background-unfinished");
        containerAction().append(finishButton(), deleteButton());
        CONTAINER_INCOMPLETED.append(containerArticle);
    }

    // Save Data to Storage
    STORAGE.push(book);
}

function elementTitle(bookTitle) {
    const elementTitle = document.createElement("h3");
    elementTitle.innerText = bookTitle;
    elementTitle.classList.add("title");
    return elementTitle;
}

function elementAuthor(bookAuthor) {
    const elementAuthor = document.createElement("p");
    elementAuthor.innerText = "Penulis: " + bookAuthor;
    return elementAuthor;
}

function elementYear(bookYear) {
    const elementYear = document.createElement("p");
    elementYear.innerText = "Tahun: " + bookYear;
    return elementYear;
}

function containerAction(bookIsComplete) {
    const containerAction = document.createElement("div");
    containerAction.classList.add("action");
    if (bookIsComplete == true){
        containerAction.append(unfinishedButton(), deleteButton());
    } else if (bookIsComplete == false) {
        containerAction.append(finishButton(), deleteButton());
    }

    return containerAction;
}

function containerArticle(bookId) {
    const containerArticle = document.createElement("article");
    containerArticle.classList.add("book_item");
    containerArticle.id = bookId;

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

inputBookIsComplete.addEventListener("click", () => {
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

