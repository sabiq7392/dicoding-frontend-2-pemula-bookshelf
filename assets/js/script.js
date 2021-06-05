document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("inputBookIsComplete").checked = false;
    
    const formInputBook = document.getElementById("inputBook");
    const formSearchBook = document.getElementById("searchBook");
    formInputBook.addEventListener("submit", (event) => {
        event.preventDefault();
        makeBook();
    });

    formSearchBook.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});