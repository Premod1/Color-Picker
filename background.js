chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "pickColor",
      title: "Pick Up Color",
      contexts: ["all"],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "pickColor") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"], // Inject the color-picking logic
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "captureScreen") {
      chrome.tabs.captureVisibleTab(null, { format: "png" }, (imageData) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          sendResponse({ success: false });
        } else {
          sendResponse({ success: true, imageData: imageData.split(",")[1] });
        }
      });
      return true;
    }
  });
  