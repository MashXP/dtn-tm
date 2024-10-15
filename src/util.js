
// Function to toggle modal
function toggleModal() {
  const modal = document.getElementById("modal");
  const modalDisplayStyle = modal.style.display;
  modal.style.display = "block";
  modal.style.opacity = 0;
  modal.style.transition = "opacity 0.3s ease-in-out";
  setTimeout(() => {
    modal.style.opacity = modalDisplayStyle === "block" ? 0 : 1;
  }, 0);
  modal.style.display = modalDisplayStyle === "block" ? "none" : "block";
  document.body.style.overflow = modalDisplayStyle === "block" ? "auto" : "hidden";
}

// Event listener for the modal
document.addEventListener("click", function(event) {
  if (event.target === document.getElementById("modal")) {
    toggleModal();
  }
});

// Fetch total entries function
function updateTotalEntries() {
    document.getElementById("total-entries").innerText = Object.keys(fetchedData).length;
  }

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