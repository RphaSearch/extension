document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("send");
  const input = document.getElementById("input");
  const port = chrome.runtime.connect({ name: "question" });

  button.addEventListener("click", () => {
    const question = input.value;
    port.postMessage({ question });

    const newDiv = document.createElement("div");
    const newP = document.createElement("p");
    const newContent = document.createTextNode(question);
    newDiv.className = "container";
    newP.appendChild(newContent);
    newDiv.appendChild(newP);

    const currentDiv = document.getElementsByClassName("input-container")[0];
    document.body.insertBefore(newDiv, currentDiv);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });
});
