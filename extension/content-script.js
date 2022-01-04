const context = $("p").text();
chrome.runtime.sendMessage({ context });
