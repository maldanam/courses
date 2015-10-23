window.onload = init;

function init() {
    var petsSpan = document.getElementById("pets");
    var landscapeSpan = document.getElementById("landscape");
    var oceanSpan = document.getElementById("ocean");

    petsSpan.onclick = selectPets;
    landscapeSpan.onclick = selectLandscape;
    oceanSpan.onclick = selectOcean;
}

function selectPets() {
    var ul = document.getElementById("petsList");
    //ul.setAttribute("class", "show");
    showHide(ul);
}

function selectLandscape() {
    var ul = document.getElementById("landscapeList");
    //ul.setAttribute("class", "show");
    showHide(ul);
}

function selectOcean() {
    var ul = document.getElementById("oceanList");
    //ul.setAttribute("class", "show");
    showHide(ul);
}

function showHide(el) {
  // hide everything except what we clicked on
  var selectedItems = document.querySelectorAll(".show");
  for (var i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i] != el) {
          selectedItems[i].setAttribute("class", "");
      }
  }

    var ulClass = el.getAttribute("class");
    if (ulClass == "show") {
        // item is selected, so deselect it
        el.setAttribute("class", "");
    }
    else {
        // item is not selected, so select it
        el.setAttribute("class", "show");
    }
}
