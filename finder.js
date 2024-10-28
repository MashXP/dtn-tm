// Add a finder. Pressing Ctrl+F
let finder = null;
document.addEventListener("keydown", function(event) {
  if (event.key === "f" && event.ctrlKey) {
    event.preventDefault();
    if (finder) {
      finder.remove();
      finder = null;
      const inputs = document.querySelectorAll(".input-container");
      inputs.forEach(input => {
        const label = input.firstElementChild.textContent;
        const content = input.lastElementChild.textContent;
        input.firstElementChild.textContent = label;
        input.lastElementChild.textContent = content;
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
      finder.style.zIndex = 2;
      finder.style.background = "#333";
      finder.style.color = "#f5f5f5";
      finder.style.border = "0";
      document.body.appendChild(finder);
      finder.focus();

      finder.addEventListener("input", function() {
        const keyword = finder.value;
        const inputs = document.querySelectorAll(".input-container");
        inputs.forEach(input => {
          const label = input.firstElementChild.textContent;
          const content = input.lastElementChild.textContent;
          const labelHighlight = label.replace(new RegExp(`(${keyword})`, "g"), `<span style="background-color: #076221">${"$1"}</span>`);
          const contentHighlight = content.replace(new RegExp(`(${keyword})`, "g"), `<span style="background-color: #076221">${"$1"}</span>`);
          input.firstElementChild.innerHTML = labelHighlight;
          input.lastElementChild.innerHTML = contentHighlight;
          if (label.includes(keyword) || content.includes(keyword)) {
            input.style.display = "flex";
          } else {
            input.style.display = "none";
          }
        });
      });

      // Keep the finder active even if the user click somewhere else
      document.addEventListener("click", function(event) {
        const isClickInside = finder.contains(event.target);
        if (!isClickInside) {
          event.stopPropagation();
        }
      });
    }
  }
});