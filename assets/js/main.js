const DELETED = [];
const STORAGE = [];

function makeBook(){

    let book = {
        id: +new Date(),
        title: document.getElementById("inputBookTitle").value,
        author: document.getElementById("inputBookAuthor").value,
        year: document.getElementById("inputBookYear").value,
        isComplete: null,
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

    if (document.getElementById("inputBookIsComplete").checked){
        book.isComplete = true;
        containerAction.append(unfinishedButton(), deleteButton());
        document.getElementById("completeBookshelfList").append(containerArticle);  
    } else {
        book.isComplete = false;
        containerAction.append(finishButton(), deleteButton());
        document.getElementById("incompleteBookshelfList").append(containerArticle);
    }

    STORAGE.push(book);
    // Save Data to Storage
    // let i = 0
    // let convertToString = JSON.stringify(book);
    // localStorage.setItem("book", convertToString);
    // document.dispatchEvent(new Event("ondatasaved"));
    //
}

document.getElementById("inputBookIsComplete").addEventListener("click", () => {
    if(document.getElementById("inputBookIsComplete").checked === true) {
        document.getElementById("finish-unfinished").innerText = "shelf finished"
    } else {
        document.getElementById("finish-unfinished").innerText = "shelf unfinished"
    }
});

function unfinishedButton(){

    const button = document.createElement("button");
    button.classList.add("green");
    button.innerText = "Belum selesai dibaca";
    button.addEventListener("click", (event) => {
        const containerIncompleted = document.getElementById("incompleteBookshelfList");
        const containerCompleted = document.getElementById("completeBookshelfList");

        if (event.target.innerText == "Belum selesai dibaca") {
            event.target.innerText = "Selesai dibaca";
            containerIncompleted.insertBefore(event.target.parentElement.parentElement, containerIncompleted.firstChild);

        } else {
            event.target.innerText = "Belum selesai dibaca";
            containerCompleted.insertBefore(event.target.parentElement.parentElement, containerCompleted.firstChild);
        }
    });
    return button;
}

function finishButton(){

    const button = document.createElement("button");
    button.classList.add("green");
    button.innerText = "Selesai dibaca";
    button.addEventListener("click", (event) => {
        const containerCompleted = document.getElementById("completeBookshelfList");
        const containerIncompleted = document.getElementById("incompleteBookshelfList");

        if (event.target.innerText == "Selesai dibaca") {
            event.target.innerText = "Belum selesai dibaca";
            // containerUncompleted.append(event.target.parentElement.parentElement);
            containerCompleted.insertBefore(event.target.parentElement.parentElement, containerCompleted.firstChild)

        } else {
            event.target.innerText = "Selesai dibaca";
            //containerCompleted.append(event.target.parentElement.parentElement);
            containerIncompleted.insertBefore(event.target.parentElement.parentElement, containerIncompleted.firstChild)

        }
    });
    return button;
}

function deleteButton(){

    const button = document.createElement("button");
    button.classList.add("red");
    button.innerText = "Hapus Buku";
    button.addEventListener("click", (event) => {
        DELETED.push(event.target.parentElement.parentElement);
        event.target.parentElement.parentElement.remove();
    });
    return button;
}

const formSearchBook = document.getElementById("searchBook");
const title = document.getElementsByClassName("title");

formSearchBook.addEventListener("submit", () => {

    let inputSearch = document.getElementById("searchBookTitle");
    if (inputSearch.value === title[0].textContent) {
        document.getElementById("demo").scrollIntoView();
    } 
});






