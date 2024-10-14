import { ipcRenderer } from "electron";
import { Kumi, openDTNDiscordLink, openDTNPage } from "./kumi";
import { DTNUtils } from "./Util";

let originalData: any = {};
let fetchedData: any = {};

// Function to create input boxes from JSON data
function createInputBoxes(data : any) {
  originalData = JSON.parse(JSON.stringify(data)); // Deep copy of original data
  const container = DTNUtils.element(document, "input-container");
  container.innerHTML = ''; // Clear existing content

  let index = 1;
  for (const key in data) {
    const indexElement = document.createElement("span");
    indexElement.textContent = `${index++}. `;

    const label = document.createElement("label");
    label.textContent = `"${key}":`;

    const input = document.createElement("div");
    input.className = "input-box";
    input.contentEditable = "true"
    input.textContent = data[key];

    // Add event listener to select all content on pressing Tab and move to the next input box
    input.addEventListener("keydown", function(event) {
      if (event.key === 'Tab' && !event.shiftKey) {
        const nextInput = (<HTMLElement> input.parentElement!.nextSibling)
          .querySelector<HTMLInputElement>(".input-box");
        if (nextInput) {
          nextInput.focus();
          selectAllContent(nextInput);
        }
      } else if (event.key === 'Tab' && event.shiftKey) {
        const previousInput = (<HTMLElement> input.parentElement!.previousSibling!)
          .querySelector<HTMLInputElement>(".input-box");
        if (previousInput) {
          previousInput.focus();
          selectAllContent(previousInput);
        }
      }
      if (event.key === 'Tab') {
        event.preventDefault();
      }
    });

    const div = document.createElement("div");
    div.className = "input-container";
    div.appendChild(indexElement);
    div.appendChild(label);
    div.appendChild(input);

    container.appendChild(div);
  }
}

// Function to select all content and place cursor at the end
function selectAllContent(element : any) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
}
// Function to generate JSON from input values
function generateJSON() {
  const inputs = document.querySelectorAll(".input-box");
  const jsonData: any = {};

  for (const input of inputs) {
    const key = input.previousElementSibling!.textContent!.replace(/"/g, '').replace(':', '');
    const value = input.textContent;
    jsonData[key] = value;
  }

  const jsonPreviewElement = DTNUtils.element(document, "json-preview");
  jsonPreviewElement.textContent = JSON.stringify(jsonData, null, 2); // Beautify JSON with indentation

  // Show the download and "Scroll to Top of JSON" button
  DTNUtils.element(document, "download-json-button").style.display = 'inline-block';
  DTNUtils.element(document, "scroll-to-json-top").style.display = 'inline-block';
}

// Function to download JSON as a file
function downloadJSON() {
  const jsonPreviewElement = DTNUtils.element(document, "json-preview").textContent;
  const jsonBlob = new Blob([jsonPreviewElement!], { type: "application/json" });
  const jsonUrl = URL.createObjectURL(jsonBlob);
  const downloadLink = document.createElement("a");
  const fileName = DTNUtils.elementAs<HTMLInputElement>(document, "rename-input").value || "generated_data.json";
  downloadLink.href = jsonUrl;
  downloadLink.download = fileName;
  downloadLink.click();
  URL.revokeObjectURL(jsonUrl);
}

// Functions to confirm reverting to original data
async function confirmDialog(a: string) : Promise<boolean> {
  return ipcRenderer.invoke("showRevertConfirmation", a);
}
function revertInputsToOriginal() {
  const inputs = document.querySelectorAll(".input-box");
  for (const input of inputs) {
    const key = input.previousElementSibling!.textContent!.replace(/"/g, '').replace(':', '');
    input.textContent = originalData[key];
  }
}
function revertData() {
  confirmDialog("Are you sure you want to revert to the original data?")
    .then(result => {
      if (result) {
        revertInputsToOriginal()
      }
    })
}

// Function to handle file upload
DTNUtils.element(document, "file-upload").addEventListener("change", function(event) {
  const file = (<HTMLInputElement> event.target!).files![0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = JSON.parse(e.target!.result!.toString());
      createInputBoxes(data);
      compareJSON(data, fetchedData);
    };
    reader.readAsText(file);
  }
});

// Function to compare uploaded JSON with fetched JSON
function compareJSON(uploadedData: any, fetchedData: any) {
  const container = DTNUtils.element(document, "input-container");
  container.innerHTML = ''; // Clear existing content

  let missingCount = 0;
  let changedCount = 0;

  let index = 1;
  for (const key in fetchedData) {
    const uploadedValue = uploadedData[key];
    const fetchedValue = fetchedData[key];

    const indexElement = document.createElement("span");
    indexElement.textContent = `${index++}. `;

    const label = document.createElement("label");
    label.textContent = `"${key}":`;

    const input = document.createElement("div");
    input.className = "input-box";
    input.contentEditable = "true";
    input.textContent = uploadedValue || '';

    if (uploadedValue === undefined) {
      // Highlight missing entries in red
      label.style.color = 'red';
      indexElement.style.color = 'red';
      input.style.backgroundColor = 'rgb(94 17 17)';
      input.innerHTML = `(Original: ${fetchedValue})`;
      missingCount++;
    } else if (uploadedValue !== fetchedValue) {
      // Highlight changed entries in #ffceac and label in #ff6c00
      input.style.backgroundColor = 'rgb(96 53 12)';
      label.style.color = '#ff6c00';
      indexElement.style.color = '#ff6c00';
      input.dataset.originalValue = fetchedValue; // Store original value in data attribute
      input.dataset.uploadedValue = uploadedValue; // Store uploaded value in data attribute
      input.innerHTML = `${uploadedValue}<br><i style="color: gray;">(Original: ${fetchedValue})</i>`;
      changedCount++;
    }

    const div = document.createElement("div");
    div.className = "input-container";
    div.appendChild(indexElement);
    div.appendChild(label);
    div.appendChild(input);

    container!.appendChild(div);
  }

  // Display the counts of missing and changed entries with checkboxes
  const uploadContainer = document.querySelector(".upload-container");
  let statusDiv = DTNUtils.element(document, "status-div");
  if (!statusDiv) {
    statusDiv = document.createElement("div");
    statusDiv.id = "status-div";
    uploadContainer!.appendChild(statusDiv);
  }
  statusDiv.innerHTML = `
    <label><input type="checkbox" id="filter-missing"> Show missing entries (${missingCount})</label>
    <label><input type="checkbox" id="filter-changed"> Show changed entries (${changedCount})</label>
    <label><input type="checkbox" id="toggle-original"> Disable original translation</label>
  `;
  // Add event listeners for checkboxes to filter entries
  DTNUtils.element(document, "filter-missing").addEventListener("change", function() {
    filterEntries();
  });
  DTNUtils.element(document, "filter-changed").addEventListener("change", function() {
    filterEntries();
  });
  DTNUtils.element(document, "toggle-original").addEventListener("change", function() {
    toggleOriginalTranslation();
  });
  // Fix the bug where the original content is gone when pressing revert
  DTNUtils.element(document, "revert-button").addEventListener("click", function() {
    const originalTranslations = document.querySelectorAll<HTMLElement>('.input-box[data-original-value]');
    for (const input of originalTranslations) {
      input.innerHTML = input.dataset.uploadedValue!;
      input.dataset.uploadedValue = input.textContent!;
    }
  });
}
// Function to filter entries based on checkbox selection
function filterEntries() {
  const showMissing = DTNUtils.elementAs<HTMLInputElement>(document, "filter-missing").checked;
  const showChanged = DTNUtils.elementAs<HTMLInputElement>(document, "filter-changed").checked;
  const inputs = document.querySelectorAll(".input-box");

  inputs.forEach(input => {
    const label = input.previousElementSibling! as HTMLElement;
    const isMissing = label.style.color === 'red';
    const isChanged = label.style.color === 'rgb(255, 108, 0)';

    let parent_element = input.parentElement as HTMLElement;

    if (showMissing && isMissing) {
      parent_element.style.display = 'flex';
    } else if (showChanged && isChanged) {
      parent_element.style.display = 'flex';
    } else if (!showMissing && !showChanged) {
      parent_element.style.display = 'flex';
    } else {
      parent_element.style.display = 'none';
    }
  });
}

function toggleOriginalTranslation() {
  const showOriginal = !DTNUtils.elementAs<HTMLInputElement>(document, "toggle-original").checked;
  document.querySelectorAll(".input-box").forEach(input => {
    if ((input as HTMLElement).dataset.originalValue) {
      (input as HTMLElement).innerHTML = showOriginal
        ? `${(input as HTMLElement).dataset.uploadedValue}<br><i style="color: gray;">(Original: ${(input as HTMLElement).dataset.originalValue})</i>`
        : (input as HTMLElement).dataset.uploadedValue!;
    }
  });
}

// Add rename bar to the HTML
const renameBarHTML = `
  <div id="rename-bar" style="display: none;">
    <label for="rename-input">Rename file: </label>
    <input type="text" id="rename-input" placeholder="generated_data.json">
  </div>
`;
DTNUtils.element(document, "json-preview").insertAdjacentHTML('beforebegin', renameBarHTML);

// Fetch the JSON data from the specified URL
fetch("https://raw.githubusercontent.com/DashieDev/DoggyTalentsNext/1.21-master/src/main/resources/assets/doggytalents/lang/en_us.json")
  .then(response => response.json())
  .then(data => {
    fetchedData = data;
    createInputBoxes(data);
  })
  .catch(error => console.error("Error fetching data:", error));

// Event listener for the "Generate JSON" button
const generateJSONButton = DTNUtils.element(document, "generate-json-button");
generateJSONButton.addEventListener("click", generateJSON);

// Event listener for the "Revert" button
const revertButton = DTNUtils.element(document, "revert-button");
revertButton.addEventListener("click", revertData);

// Event listener for the "Download JSON" button
const downloadJSONButton = DTNUtils.element(document, "download-json-button");
downloadJSONButton.addEventListener("click", downloadJSON);

// Hide the Download Json button when revert is clicked
DTNUtils.element(document, "revert-button").addEventListener("click", () => {
  DTNUtils.element(document, "download-json-button").style.display = 'none';
});

// Scroll to top of JSON function
DTNUtils.element(document, "scroll-to-json-top")!.addEventListener("click", () => {
  const jsonPreviewElement = DTNUtils.element(document, "json-preview");
  jsonPreviewElement.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to top function
DTNUtils.element(document, "scroll-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll to bottom function
DTNUtils.element(document, "scroll-to-bottom").addEventListener("click", () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Function to change background
const backgrounds = [
  "res/images/background/bg4.png", 
  "res/images/background/bg2.png", 
  "res/images/background/bg3.png", 
  "res/images/background/bg.png"
];
let backgroundIndex = 0;

function changeBackgroundImage() {
  document.body.style.backgroundImage = `url('${backgrounds[backgroundIndex++ % backgrounds.length]}')`;
}

// Fetch total entries function
function updateTotalEntries() {
  DTNUtils.element(document, "total-entries").innerText = Object.keys(fetchedData).length.toString();
}

// Call the function when the data is fetched
fetch("https://raw.githubusercontent.com/DashieDev/DoggyTalentsNext/1.21-master/src/main/resources/assets/doggytalents/lang/en_us.json")
  .then(response => response.json())
  .then(data => {
    fetchedData = data;
    updateTotalEntries();
    createInputBoxes(data);
  })
  .catch(error => console.error("Error fetching data:", error));


// Add a finder. Pressing Ctrl+F
let finder : HTMLInputElement | null = null;
document.addEventListener("keydown", function(event) {
  if (event.key === "f" && event.ctrlKey) {
    event.preventDefault();
    if (finder) {
      finder.remove();
      finder = null;
      const inputs = document.querySelectorAll<HTMLElement>(".input-container");
      inputs.forEach(input => {
        const label = input.firstElementChild!.textContent;
        const content = input.lastElementChild!.textContent;
        input.firstElementChild!.textContent = label;
        input.lastElementChild!.textContent = content;
        input.style.display = "flex";
      });
    } else {
      finder = document.createElement("input");
      finder.type = "text";
      finder.placeholder = "Find: ";
      finder.style.position = "fixed";
      finder.style.top = "0";
      finder.style.left = "0";
      finder.style.width = "100%";
      finder.style.padding = "5px";
      finder.style.zIndex = "2";
      finder.style.background = "#333";
      finder.style.color = "#f5f5f5";
      finder.style.border = "0";
      document.body.appendChild(finder);
      finder.focus();

      finder.addEventListener("input", function() {
        const keyword = finder!.value;
        const inputs = document.querySelectorAll<HTMLElement>(".input-container");
        inputs.forEach(input => {
          const label = input.firstElementChild!.textContent;
          const content = input.lastElementChild!.textContent;
          const labelHighlight = label!.replace(new RegExp(`(${keyword})`, "g"), `<span style="background-color: #076221">${"$1"}</span>`);
          const contentHighlight = content!.replace(new RegExp(`(${keyword})`, "g"), `<span style="background-color: #076221">${"$1"}</span>`);
          input.firstElementChild!.innerHTML = labelHighlight;
          input.lastElementChild!.innerHTML = contentHighlight;
          if (label!.includes(keyword) || content!.includes(keyword)) {
            input.style!.display = "flex";
          } else {
            input.style!.display = "none";
          }
        });
      });

      // Keep the finder active even if the user click somewhere else
      document.addEventListener("click", function(event) {
        const isClickInside = finder!.contains(event.target as HTMLElement);
        if (!isClickInside) {
          event.stopPropagation();
        }
      });
    }
  }
});

let kumi = document.getElementsByClassName("kumi")![0] as HTMLElement;
kumi.addEventListener("mouseover", e => {
  Kumi.onHover()
})
kumi.addEventListener("mouseleave", e => {
  Kumi.onMouseOut()
})
kumi.addEventListener("click", e => {
  Kumi.onClick()
})

let dtn_discord = document.getElementsByClassName("dtn_discord_banner")![0] as HTMLElement;
dtn_discord.addEventListener("mouseover", e => {
  Kumi.showQuote('Join our Discord NOW!')
})
dtn_discord.addEventListener("mouseleave", e => {
  Kumi.hideQuote()
})
dtn_discord.addEventListener("click", e => {
  openDTNDiscordLink()
})

let dtn_icon = document.getElementsByClassName("dtn_icon_banner")![0] as HTMLElement;
dtn_icon.addEventListener("mouseover", e => {
  Kumi.showQuote('Download NOW at Curseforge!')
})
dtn_icon.addEventListener("mouseleave", e => {
  Kumi.hideQuote()
})
dtn_icon.addEventListener("click", e => {
  openDTNPage()
})