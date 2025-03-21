
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

function updateButtonState(child) {
    console.log("hiii");
    const parent = child.parentElement;  // Get the parent element (which should be the button)
    let checkboxes = [];

    // Loop through the child elements of the parent
    for (let i = 0; i < parent.children.length; i++) {
        let childElem = parent.children[i];
        
        // Check if the child element is a checkbox (input type='checkbox')
        if (childElem.tagName === 'DIV') {
            console.log("hiii");

            // Find checkboxes within divs
            let inputs = childElem.getElementsByTagName('input');
            for (let input of inputs) {
                console.log("inputs");

                if (input.type === 'checkbox') {
                    checkboxes.push(input);
                }
            }
        }
    }
    console.log(parent);
    
    // Check if all checkboxes are checked
    let allChecked = checkboxes.every(checkbox => checkbox.checked);

    if (allChecked) {
        console.log("green");
        parent.classList.add("green");  // Add green class
    } else {
        parent.classList.remove("green");  // Remove green class
    }
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
                //make the hints invisible
                newDiv.style.display = "none";
            } else {
                let newLineDiv = document.createElement("div")
                newLineDiv.classList.add("hints-line");
                let newPara = document.createElement("p");
                newPara.textContent = line;

                let newCheckBox = document.createElement("input");
                newCheckBox.type = "checkbox";
                newCheckBox.addEventListener("click", stopPropagation);



                newLineDiv.appendChild(newCheckBox);
                newLineDiv.appendChild(newPara);
                newDiv.appendChild(newLineDiv);

                
                newCheckBox.addEventListener("change", () => {
                    updateButtonState(newDiv);
                });
            }
        }
    } catch (error) {
        console.error("Error reading file:", error);
    }
}
