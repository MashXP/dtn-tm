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