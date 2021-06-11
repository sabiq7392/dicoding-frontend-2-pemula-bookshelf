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