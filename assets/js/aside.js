const asideAddBook = document.getElementById("asideAddBook");
const inputSection = document.getElementById("inputSection");
const overlay = document.getElementById("overlay");

asideAddBook.addEventListener("click", () => {

    if (overlay.classList.contains("d-none")){
        overlay.classList.remove("d-none");
        overlay.classList.add("d-grid");
        inputSection.classList.add("visible");

    } else if (overlay.classList.contains("d-grid")){
        overlay.classList.remove("d-grid");
        overlay.classList.add("d-none");
        inputSection.classList.remove("visible");
    }

    document.addEventListener("click", (event) => { // ketika click diluar input element akan otomatis close
        const clickedElement = event.target;
        if (clickedElement != inputSection && clickedElement == overlay && overlay.classList.contains("d-grid")) {
            overlay.classList.remove("d-grid");
            overlay.classList.add("d-none");
        } 
    });
});

// =====================================================================================

document.getElementById("searchBook").addEventListener("submit", (event) => {
    event.preventDefault();

    const inputSearch = document.getElementById("searchBookTitle");
    const bookItem = document.getElementsByClassName("book_item");
    const refreshSubmit = document.getElementById("refreshSubmit");
    
    for (let i = 0; i < bookItem.length; i++) {
        if (bookItem[i].firstChild.textContent.indexOf(inputSearch.value) > -1) {
            bookItem[i].style.display = "block";
        } else {
            bookItem[i].style.display = "none";

        }
    }

    refreshSubmit.classList.add("d-grid");   

    refreshSubmit.addEventListener("click", () => {
        refreshSubmit.classList.remove("d-grid");
        window.location.reload();
        inputSearch.value = null;
    });


});

// =====================================================================================
// const customDialog = document.getElementById("customDialog");
// const deleteAction = document.getElementsByClassName("delete");
// deleteAction.addEventListener("click", () => {
//     customDialog.classList.add("d-grid");
// });
