let isPickingColor = false;

const enableColorPicker = () => {
  if (isPickingColor) return;
  isPickingColor = true;

  document.body.style.cursor = "crosshair";

  const handleColorPick = async (event) => {
    event.preventDefault();
    event.stopPropagation(); 

    console.log("Clicked at:", event.clientX, event.clientY);

    document.body.style.cursor = "default";
    isPickingColor = false; 
    document.removeEventListener("click", handleColorPick);

    chrome.runtime.sendMessage({ action: "captureScreen" }, async (response) => {
      if (response && response.imageData) {
        const img = new Image();
        img.src = `data:image/png;base64,${response.imageData}`;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);

          const scaleX = img.width / window.innerWidth;
          const scaleY = img.height / window.innerHeight;
          const x = event.clientX * scaleX;
          const y = event.clientY * scaleY;

          const pixelData = context.getImageData(x, y, 1, 1).data;
          const hexColor = `#${(
            (1 << 24) |
            (pixelData[0] << 16) |
            (pixelData[1] << 8) |
            pixelData[2]
          )
            .toString(16)
            .slice(1)
            .toUpperCase()}`;

          try {
            navigator.clipboard.writeText(hexColor);
            alert(`Color ${hexColor} copied to clipboard!`);
          } catch (err) {
            console.error("Failed to copy color: ", err);
          }
        };
      } else {
        console.error("Failed to capture screen:", response);
      }
    });
  };

  
  document.addEventListener("click", handleColorPick, { once: true });

  const preventHoverStyles = (e) => {
    if (isPickingColor) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  document.addEventListener("mouseover", preventHoverStyles, true);
  document.addEventListener("mouseout", preventHoverStyles, true);

  document.addEventListener("click", () => {
    document.removeEventListener("mouseover", preventHoverStyles, true);
    document.removeEventListener("mouseout", preventHoverStyles, true);
  }, { once: true });
};


const activateColorPicker = () => {
  if (!isPickingColor) enableColorPicker();
};

activateColorPicker();
