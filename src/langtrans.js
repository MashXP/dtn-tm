// Fetch the JSON data from the specified URL
fetch("https://raw.githubusercontent.com/DashieDev/DoggyTalentsNext/1.21-master/src/main/resources/assets/doggytalents/lang/en_us.json")
  .then(response => response.json())
  .then(data => {
    fetchedData = data;
    updateTotalEntries(); // Update total entries // util.js
    createInputBoxes(data);
  })
  .catch(error => console.error("Error fetching data:", error));

// Function to create input boxes from JSON data
function createInputBoxes(data) {
  originalData = JSON.parse(JSON.stringify(data)); // Deep copy of original data
  const container = document.getElementById("input-container");
  container.innerHTML = ''; // Clear existing content

  let index = 1;
  for (const key in data) {
    const indexElement = document.createElement("span");
    indexElement.textContent = `${index++}. `;

    const label = document.createElement("label");
    label.textContent = `"${key}":`;

    const input = document.createElement("div");
    input.className = "input-box";
    input.contentEditable = true;
    input.textContent = data[key];

    const div = document.createElement("div");
    div.className = "input-container";
    div.appendChild(indexElement);
    div.appendChild(label);
    div.appendChild(input);

    container.appendChild(div);
  }
}

// Add event listener to select all content on pressing Tab and move to the next input box
document.addEventListener("keydown", function(event) {
  const input = event.target.closest(".input-box");
  if (input) {
    if (event.key === 'Tab' && !event.shiftKey) {
      const nextInput = input.parentElement.nextSibling.querySelector(".input-box");
      if (nextInput) {
        nextInput.focus();
        selectAllContent(nextInput);
      }
    } else if (event.key === 'Tab' && event.shiftKey) {
      const previousInput = input.parentElement.previousSibling.querySelector(".input-box");
      if (previousInput) {
        previousInput.focus();
        selectAllContent(previousInput);
      }
    }
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }
});

// Function to select all content and place cursor at the end
function selectAllContent(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

// Function to handle file upload
document.getElementById("file-upload").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = JSON.parse(e.target.result);
      createInputBoxes(data);
      compareJSON(data, fetchedData);
    };
    reader.readAsText(file);
  }
});

// Function to compare uploaded JSON with fetched JSON
function compareJSON(uploadedData, fetchedData) {
  const originalTranslationsBar = document.querySelector(".original-translation");
  originalTranslationsBar.style.display = 'flex'; // Show the bar when a file is uploaded

  const container = document.getElementById("input-container");
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
    input.contentEditable = true;
    input.textContent = uploadedValue || '';

    if (uploadedValue === undefined) {
      // Highlight missing entries in red
      label.style.color = 'red';
      indexElement.style.color = 'red';
      input.style.backgroundColor = 'rgb(94 17 17)';
      input.dataset.originalValue = fetchedValue; // Store original value in data attribute
      missingCount++;
    } else if (uploadedValue !== fetchedValue) {
      // Highlight changed entries in #ffceac and label in #ff6c00
      input.style.backgroundColor = 'rgb(96 53 12)';
      label.style.color = '#ff6c00';
      indexElement.style.color = '#ff6c00';
      input.dataset.originalValue = fetchedValue; // Store original value in data attribute
      input.dataset.uploadedValue = uploadedValue; // Store uploaded value in data attribute
      changedCount++;
    }

    const div = document.createElement("div");
    div.className = "input-container";
    div.appendChild(indexElement);
    div.appendChild(label);
    div.appendChild(input);

    container.appendChild(div);
  }
  // Add event listener to display original translation of the entry that the user is currently selecting
  const inputFocusHandler = function(event) {
    const input = event.target.closest(".input-box");
    if (input) {
      const originalTranslationsText = document.createElement("span");
      originalTranslationsText.textContent = 'Original Translation: ' ;
      const originalValue = input.dataset.originalValue;
      if (originalValue) {
        originalTranslationsText.textContent += originalValue;
        originalTranslationsBar.innerHTML = '';
        originalTranslationsBar.appendChild(originalTranslationsText);
      } else {
        originalTranslationsBar.innerHTML = '';
      }
    }
  };
  document.addEventListener("click", inputFocusHandler);
  document.addEventListener("focusin", inputFocusHandler);
  // Display the counts of missing and changed entries with checkboxes
  const uploadContainer = document.querySelector(".upload-container");
  let statusDiv = document.getElementById("status-div");
  if (!statusDiv) {
    statusDiv = document.createElement("div");
    statusDiv.id = "status-div";
    uploadContainer.appendChild(statusDiv);
  }
  statusDiv.innerHTML = `
    <label><input type="checkbox" id="filter-missing"> Show missing entries (${missingCount})</label>
    <label><input type="checkbox" id="filter-changed"> Show changed entries (${changedCount})</label>
  `;
  // Add event listeners for checkboxes to filter entries
  document.getElementById("filter-missing").addEventListener("change", function() {
    filterEntries();
  });
  document.getElementById("filter-changed").addEventListener("change", function() {
    filterEntries();
  });
}
// Function to filter entries based on checkbox selection
function filterEntries() {
  const showMissing = document.getElementById("filter-missing").checked;
  const showChanged = document.getElementById("filter-changed").checked;
  const inputs = document.querySelectorAll(".input-box");

  inputs.forEach(input => {
    const label = input.previousElementSibling;
    const isMissing = label.style.color === 'red';
    const isChanged = label.style.color === 'rgb(255, 108, 0)';

    if (showMissing && isMissing) {
      input.parentElement.style.display = 'flex';
    } else if (showChanged && isChanged) {
      input.parentElement.style.display = 'flex';
    } else if (!showMissing && !showChanged) {
      input.parentElement.style.display = 'flex';
    } else {
      input.parentElement.style.display = 'none';
    }
  });
}


