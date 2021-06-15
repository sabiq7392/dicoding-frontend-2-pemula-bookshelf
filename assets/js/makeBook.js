const CONTAINER_INCOMPLETED = document.getElementById("incompleteBookshelfList");
const CONTAINER_COMPLETED = document.getElementById("completeBookshelfList");

const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear =  document.getElementById("inputBookYear");
const inputBookId_Date = +new Date();

const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputPriority = document.getElementsByName("inputPriority");

//==========

function makeBook(){

    const book = {
        id: +new Date(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: inputBookYear.value,
        isComplete: null,
        priority: null
    }

    if (inputBookIsComplete.checked == true){
        book.isComplete = true;
    } else {
        book.isComplete = false;
    }

    containerArticle(
        book.id, 
        book.title, 
        book.author, 
        book.year, 
        book.isComplete
    );

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
        containerAction.append(cancelButton(), deleteButton());
    } else if (bookIsComplete == false) {
        containerAction.append(finishButton(), deleteButton());
    }

    return containerAction;
}

function containerArticle(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete) {
    const containerArticle = document.createElement("article");
    containerArticle.classList.add("book_item");
    containerArticle.id = bookId;
    
    containerArticle.append(
        elementTitle(bookTitle), 
        elementAuthor(bookAuthor), 
        elementYear(bookYear), 
        containerAction(bookIsComplete)
    );

    if (bookIsComplete == true){
        containerArticle.classList.add("background-finished");
        CONTAINER_COMPLETED.append(containerArticle);  

    } else if (bookIsComplete == false) {
        containerArticle.classList.add("background-unfinished");
        CONTAINER_INCOMPLETED.append(containerArticle);
    }

    return containerArticle
}

function cancelButton(){
    const button = document.createElement("button");

    button.classList.add("finish_or_cancel");
    button.innerText = "Cancel ";
    button.addEventListener("click", (event) => {
        const containerArticle = event.target.parentElement.parentElement;

        if (event.target.innerText == "Cancel") {
            event.target.innerText = "Finished";
            CONTAINER_INCOMPLETED.appendChild(event.target.parentElement.parentElement, CONTAINER_INCOMPLETED.firstChild);
            containerArticle.classList.add("background-unfinished");
            containerArticle.classList.remove("background-finished");

        } else {
            event.target.innerText = "Cancel";
            CONTAINER_COMPLETED.appendChild(event.target.parentElement.parentElement, CONTAINER_COMPLETED.firstChild);
            containerArticle.classList.add("background-finished");
            containerArticle.classList.remove("background-unfinished");
        }

        for (myStorage of STORAGE) {
            // untuk membuka data yang ada di STORAGE menjadi bentuk aslinya {object}
            if(myStorage.id == event.target.parentElement.parentElement.id) { 
                /* Melakukan pengecekan IF untuk mengambil value elemen ini saja
                   karena jika tidak melakukan pengcekan seluruh elemen yang mempunyai tombol FINISH valuenya akan diambil */
                
                if (event.target.innerText == "Cancel") {
                    myStorage.isComplete = true;
                    console.log("Terpindahkan ke Finished List");

                } else if (event.target.innerText == "Finished") {
                    myStorage.isComplete = false;
                    console.log("Terpindahkan ke Unfinished List");
                }
            }
        }

        updateDataToStorage();
    });

    return button;
}

function finishButton(){
    const button = document.createElement("button");
    button.classList.add("finish_or_cancel");
    button.innerText = "Finished";
    button.addEventListener("click", (event) => {
        const containerArticle = event.target.parentElement.parentElement;

        if (event.target.innerText == "Finished") {
            event.target.innerText = "Cancel";
            CONTAINER_COMPLETED.appendChild(event.target.parentElement.parentElement, CONTAINER_COMPLETED.firstChild)
            containerArticle.classList.add("background-finished");
            containerArticle.classList.remove("background-unfinished");

        } else {
            event.target.innerText = "Finished";
            CONTAINER_INCOMPLETED.appendChild(event.target.parentElement.parentElement, CONTAINER_INCOMPLETED.firstChild)
            containerArticle.classList.add("background-unfinished");
            containerArticle.classList.remove("background-finished");
        }

        for (myStorage of STORAGE) {
            // untuk membuka data yang ada di STORAGE menjadi bentuk aslinya {object}
            if(myStorage.id == event.target.parentElement.parentElement.id) { 
                /* Melakukan pengecekan IF untuk mengambil value elemen ini saja
                   karena jika tidak melakukan pengcekan seluruh elemen yang mempunyai tombol FINISH valuenya akan diambil */
                
                if (event.target.innerText == "Finished") {
                    myStorage.isComplete = false;
                    console.log("Terpindahkan ke Unfinished List");

                } else if (event.target.innerText == "Cancel") {
                    myStorage.isComplete = true;
                    console.log("Terpindahkan ke Finished List");
                }
                
            }
        }

        updateDataToStorage();
    });

    return button;
}

function deleteButton(){
    const button = document.createElement("button");
    button.classList.add("delete");
    button.innerText = "Delete";
    button.addEventListener("click", (event) => {
        // DELETED.push(event.target.parentElement.parentElement); // ketika didelete akan tertampung di variabel DELETE 
        event.target.parentElement.parentElement.remove();
        const customDialog = document.getElementById("customDialog");
        const customDialogText = document.getElementById("customDialogText");
        const bookItem = document.getElementsByClassName("book_item");
        
        let indexOfBookInArray = 0
        for (myStorage of STORAGE) {
            if(myStorage.id == event.target.parentElement.parentElement.id) {
                /* Melakukan pengecekan IF untuk mengambil value elemen ini saja
                   karena jika tidak melakukan pengcekan seluruh elemen yang mempunyai tombol FINISH valuenya akan diambil */
                STORAGE.splice(indexOfBookInArray, 1);
                console.log(event.target.parentElement.parentElement.firstChild.textContent + " deleted from local storage");
            }

            indexOfBookInArray++;
        }

        customDialog.classList.add("animation_center_visible");
        customDialogText.innerText = "Buku " + event.target.parentElement.parentElement.firstChild.textContent + " Berhasil di Hapus";
        customDialog.addEventListener("transitionend", () => {
            customDialog.classList.remove("animation_center_visible");
        });

        updateDataToStorage();
    });

    return button;
}

function editButton(){

}

inputBookIsComplete.addEventListener("click", () => {
    const textButtonFinish_unfinished = document.getElementById("textButtonFinish-unfinished");

    if(inputBookIsComplete.checked === true) {
        textButtonFinish_unfinished.innerText = "shelf finished";
        for (let i = 0; i < inputPriority.length; i++){
            inputPriority[i].setAttribute("disabled", true);
        }
    } else {
        for (let i = 0; i < inputPriority.length; i++){
            inputPriority[i].removeAttribute("disabled");
        }
        textButtonFinish_unfinished.innerText = "shelf unfinished";
    }
});