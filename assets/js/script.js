document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("inputBookIsComplete").checked = false;
    document.getElementById("inputImportant").checked = true;
    
    const formInputBook = document.getElementById("inputBook");
    formInputBook.addEventListener("submit", (event) => {
        event.preventDefault();
        makeBook();
    });


});