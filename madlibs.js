const rawStory =
  "adjective[a] canteen. There's a adjective[a] a adjective[a] noun[n] in his mouth right there in front of me in the adjective[a] .";
function parseStory(rawStory) {
  const regex = /\[.]/gi;
  const myStory = rawStory.split(" ").map((word) => {
    const matchedWord = word.match(regex);

    if (matchedWord) {
      const posWord = matchedWord[0];
      const replacer = word.replace(regex, "");

      switch (posWord) {
        case "[n]":
          return { word: replacer, pos: "noun[n]" };
        case "[a]":
          return { word: replacer, pos: "adjective[a]" };
        case "[v]":
          return { word: replacer, pos: "verb[v]" };
      }
    } else
      return {
        word,
      };
  });

  return myStory;
}
console.log(parseStory(rawStory));
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    main(processedStory);
    moveToNextInput();
    prevChanges();
    resetGame();
    // resultBtn();
  });
function main(processedStory) {
  const madlibsEdit = document.querySelector(".madLibsEdit");
  const madLibsPreview = document.querySelector(".madLibsPreview");
  for (let word of processedStory) {
    if (word.pos) {
      const editInput = document.createElement("input");
      editInput.setAttribute("placeholder", word.pos);
      editInput.setAttribute("maxlength", "20");
      madlibsEdit.appendChild(editInput);
      const prvText = document.createElement("span");
      prvText.innerText = " _______ ";
      prvText.classList.add("unTouched");
      prvText.id = editInput.placeholder.toString();
      madLibsPreview.appendChild(prvText);
    } else {
      const simpleTextEdit = document.createElement("span");
      const simpleTextPrv = document.createElement("span");
      simpleTextEdit.innerText = " " + word.word + " ";
      simpleTextPrv.innerText = " " + word.word + " ";
      madlibsEdit.appendChild(simpleTextEdit);
      madLibsPreview.appendChild(simpleTextPrv);
    }
  }
}
function prevChanges() {
  const inputElements = document.querySelectorAll("input");
  const prevElements = document.querySelectorAll("span.unTouched");
  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("input", (e) => {
      if (inputElements[i].value) {
        prevElements[i].innerText = " " + e.target.value + " ";
      } else {
        prevElements[i].innerText = " _______ ";
      }
    });
  }
}
function moveToNextInput() {
  const inputElements = document.querySelectorAll("input");
  console.log("here");
  inputElements.forEach((elm, index) => {
    elm.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const nextIndex = (index + 1) % inputElements.length;
        inputElements[nextIndex].focus();
      }
    });
  });
}
function resetGame() {
  const reset = document.getElementById("resetButton");
  reset.addEventListener("click", () => {
    const inputElements = document.querySelectorAll("input");
    const prevElements = document.querySelectorAll("span.unTouched");
    for (let i = 0; i < inputElements.length; i++) {
      if (inputElements[i].value) {
        inputElements.forEach((elm) => {
          elm.value = elm.defaultValue;
        });
        prevElements.forEach((elm) => {
          elm.innerText = " _______ ";
        });
      }
    }
  });
}
// function resultBtn() {
//   const madLibsPreview = document.querySelector(".madLibsPreview");
//   const clonedDiv = madLibsPreview.cloneNode(true);
//   const myModel = document.createElement('div');
//   const divContant = document.createElement('div');
//   myModel.id = "myModal";
//   divContant.id = "model-content";
//   divContant.appendChild(clonedDiv);
//   myModel.appendChild(divContant);
//   const result = document.getElementById("resultButton");
//   result.addEventListener("click", () => {
//     console.log("resut")
//     myModel.style.display = "block"; // Show the modal
//   });

// }
