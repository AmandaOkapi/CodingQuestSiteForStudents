function addParagraph() {
    let container = document.getElementById("REQ-BOX");
    container.style.height = "400px";
    let newPara = document.createElement("p");
    newPara.textContent = "This is a new paragraph!";
    container.appendChild(newPara);
}
