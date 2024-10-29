
// Function to toggle modal
function toggleModal() {
  const modal = document.getElementById("modal");
  const backgroundCover = document.querySelector(".background-cover");
  const modalDisplayStyle = modal.style.display;

  modal.style.transition = "opacity 0.3s ease-in-out";
  backgroundCover.style.display = modalDisplayStyle === "flex" ? "none" : "flex";
  setTimeout(() => {
    modal.style.opacity = modalDisplayStyle === "flex" ? 0 : 1;
  }, 0);
  modal.style.display = modalDisplayStyle === "flex" ? "none" : "flex";
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = modalDisplayStyle === "flex" ? "auto" : "hidden";
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