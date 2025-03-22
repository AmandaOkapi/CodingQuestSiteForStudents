
function showHints() {
    let parent = event.currentTarget; // Use the currentTarget to refer to the clicked button
    let newDiv = parent.querySelector(".hints-box");

    if (newDiv) {
        // Toggle visibility of the hints box
        newDiv.style.display = (newDiv.style.display === "none" || newDiv.style.display === "") ? "block" : "none";
    }
    
}

function stopPropagation(event) {
    event.stopPropagation(); // This stops the event from propagating to parent elements
}



async function makeButtonsFromFile(){
    const endString = "#END";
    const templateLength = 5;

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
                newButton.addEventListener("click", showHints);
                container.appendChild(newButton);

                newDiv = document.createElement("div");
                newDiv.classList.add("hints-box");
                newButton.appendChild(newDiv);

                //checkmark data
                newButton.dataset.checkBoxCnt =0;
                newButton.dataset.checkedCnt=0;

                //make the hints invisible
                newDiv.style.display = "none";
            } else {
                let newLineDiv = document.createElement("div")
                newLineDiv.classList.add("hints-line");

                let newPara = document.createElement("p");
                newPara.textContent = line;
                newPara.style.wordBreak = "break-word";
                newPara.style.overflowWrap= "break-word";

                let newCheckBox = document.createElement("input");
                newCheckBox.type = "checkbox";
                newCheckBox.addEventListener("click", stopPropagation);
                
                //checkbox data management
                newButton.dataset.checkBoxCnt++;
                newCheckBox.addEventListener("change", function(){
                    //depenedent on newButton->newDiv->newLine->checkbox hierarchy
                    //this code is fire
                    let box = event.currentTarget;
                    let parent = box.parentElement.parentElement.parentElement;
                    console.log(parent);
                    if(this.checked){
                        parent.dataset.checkedCnt++;
                    }else{
                        parent.dataset.checkedCnt--;
                    }
                    if(parent.dataset.checkBoxCnt <= parent.dataset.checkedCnt){
                        parent.classList.add("green");
                    }else{
                        parent.classList.remove("green");
                    }
                });


                newLineDiv.appendChild(newCheckBox);
                newLineDiv.appendChild(newPara);
                newDiv.appendChild(newLineDiv);

                

            }
        }
    } catch (error) {
        console.error("Error reading file:", error);
    }
}
