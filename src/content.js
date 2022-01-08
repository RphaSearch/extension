/* global chrome */
const $ = require("jquery");
chrome.runtime.sendMessage({ type: "context", context: $("p").text() });
