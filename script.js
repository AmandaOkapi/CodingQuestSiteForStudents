const fs = require('fs');
const readline = require('readline');

function addParagraph() {
    console.log("hiiii");

    let container = document.getElementById("REQ-BOX");
    container.style.height = "400px";
    let newPara = document.createElement("p");
    newPara.textContent = "This is a new paragraph!";
    container.appendChild(newPara);
}


async function makeButtonsFromFile(){
    const endString = "#END";
    const templateLength = 5;

    console.log("hiiii");
    try {
        const response = await fetch('button-titles.txt'); // Ensure example.txt is in the same directory & served by a web server
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()); // Split and trim lines

        let container = document.getElementById("CONTAINER");
        let newButton = null;
        let newDiv = null;

        let templateCnt=0;
        for (let line of lines) {
            if(templateCnt++<templateLength){
                continue;
            }
            if (line === endString) {
                newButton = null; // Reset on #END
                continue;
            }

            if (!newButton) {
                newButton = document.createElement("button");
                newButton.classList.add("requirement-box");
                newButton.textContent = line;
                container.appendChild(newButton);

                newDiv = document.createElement("div");
                newDiv.classList.add("hints-box");
                newButton.appendChild(newDiv);

            } else {
                let newPara = document.createElement("p");
                newPara.textContent = line;
                newDiv.appendChild(newPara);
            }
        }
    } catch (error) {
        console.error("Error reading file:", error);
    }
}
