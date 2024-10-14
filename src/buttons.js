// Event listener for the "Generate JSON" button
const generateJSONButton = document.getElementById("generate-json-button");
generateJSONButton.addEventListener("click", generateJSON);
// Function to generate JSON from input values
function generateJSON() {
    const inputs = document.querySelectorAll(".input-box");
    const jsonData = {};
  
    for (const input of inputs) {
      const key = input.previousElementSibling.textContent.replace(/"/g, '').replace(':', '');
      const value = input.textContent;
      jsonData[key] = value;
    }
  
    const jsonPreviewElement = document.getElementById("json-preview");
    jsonPreviewElement.textContent = JSON.stringify(jsonData, null, 2); // Beautify JSON with indentation
  
    // Show the download and "Scroll to Top of JSON" button
    document.getElementById("download-json-button").style.display = 'inline-block';
    document.getElementById("scroll-to-json-top").style.display = 'inline-block';
  }
  
// Event listener for the "Download JSON" button
const downloadJSONButton = document.getElementById("download-json-button");
downloadJSONButton.addEventListener("click", downloadJSON);
// Function to download JSON as a file
function downloadJSON() {
    const jsonPreviewElement = document.getElementById("json-preview").textContent;
    const jsonBlob = new Blob([jsonPreviewElement], { type: "application/json" });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const downloadLink = document.createElement("a");
    const fileName = document.getElementById("rename-input").value || "generated_data.json";
    downloadLink.href = jsonUrl;
    downloadLink.download = fileName;
    downloadLink.click();
    URL.revokeObjectURL(jsonUrl);
  }
  
// Event listener for the "Revert" button
const revertButton = document.getElementById("revert-button");
revertButton.addEventListener("click", revertData);
// Functions to confirm reverting to original data
async function confirmDialog(a) {
  return window.DTNexposedAPI.showConfirmationBox(a);
}
function revertInputsToOriginal() {
  const inputs = document.querySelectorAll(".input-box");
  for (const input of inputs) {
    const key = input.previousElementSibling.textContent.replace(/"/g, '').replace(':', '');
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

// Function to generate JSON from input values
function generateJSON() {
  const inputs = document.querySelectorAll(".input-box");
  const jsonData = {};

  for (const input of inputs) {
    const key = input.previousElementSibling.textContent.replace(/"/g, '').replace(':', '');
    const value = input.textContent;
    jsonData[key] = value;
  }

  const jsonPreviewElement = document.getElementById("json-preview");
  jsonPreviewElement.textContent = JSON.stringify(jsonData, null, 2); // Beautify JSON with indentation

  // Show the download and "Scroll to Top of JSON" button
  document.getElementById("download-json-button").style.display = 'inline-block';
  document.getElementById("scroll-to-json-top").style.display = 'inline-block';
}
// Hide the Download Json button when revert is clicked
document.getElementById("revert-button").addEventListener("click", () => {
    document.getElementById("download-json-button").style.display = 'none';
  });

// Scroll functions
const scrollTo = (element, behavior = 'smooth') => element.scrollIntoView({ behavior });
document.getElementById("scroll-to-json-top").addEventListener("click", () => scrollTo(document.getElementById("json-preview")));
document.getElementById("scroll-to-top").addEventListener("click", () => scrollTo(document.body));
document.getElementById("scroll-to-bottom").addEventListener("click", () => window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
}));

// Function to toggle the original translation on and off
document.getElementById("toggle-og-translation-button").style.opacity = 0;
document.getElementById("file-upload").addEventListener("change", () => {
  document.getElementById("toggle-og-translation-button").style.opacity = 1;
  document.getElementById("toggle-og-translation-button").addEventListener("click", () => {
    const originalTranslation = document.querySelector(".original-translation");
    if (originalData) { // Show only when the user uploads a file
      if (originalTranslation.style.opacity === '0') {
        originalTranslation.style.transition = 'opacity 0.3s ease-in-out';
        originalTranslation.style.opacity = 1;
        document.getElementById("toggle-og-translation-button").textContent = 'Hide Original Translation';
      } else {
        originalTranslation.style.transition = 'opacity 0.3s ease-in-out';
        originalTranslation.style.opacity = 0;
        document.getElementById("toggle-og-translation-button").textContent = 'Show Original Translation';
      }
    }
  });
});
