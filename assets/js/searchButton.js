document.getElementById("searchBook").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const title = document.getElementsByClassName("title");
    const inputSearch = document.getElementById("searchBookTitle");
    
    if (inputSearch.value === title[0].textContent) {
        document.getElementById("demo").scrollIntoView();
    } 
});
