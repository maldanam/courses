window.onload = init;

var counter = 1;
var boxes = [];

function init()  {
    var generateButton = document.getElementById("generateButton");
    generateButton.onclick = generate;

    var clearButton = document.getElementById("clearButton");
    clearButton.onclick = clear;
}

function Box(id, name, color, offsetWidth, offsetHeight) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.x = Math.floor(Math.random() * (offsetWidth-101));
  this.y = Math.floor(Math.random() * (offsetHeight-101));
}

function clear() {
  clearForm();
  var sceneDiv = document.getElementById("scene");
  while (sceneDiv.firstChild) {
      sceneDiv.removeChild(sceneDiv.firstChild);
  }
  boxes.splice(0, boxes.length);
  counter = 1;
}

function clearForm() {
  var form = document.getElementById("data");
  form.reset();
}

function generate() {
  // Form validations
  var boxName = document.getElementById("name");
  if (boxName.value == null || boxName.value == "") {
    alert("The name is necessary.");
    return false;
  }
  var boxColor = document.getElementById("color");
  var radios = document.getElementsByName("amount");
  var amount = 0;
  for (i=0; i < radios.length; i++ ) {
    if (radios[i].checked) {
      amount = radios[i].value;
    }
  }
  if (amount == 0) {
    alert("Please choose a number of boxes!");
    return false;
  }
  // Boxes generation
  for (i=0; i<amount; i++) {
    var sceneDiv = document.getElementById("scene");
    var boxDiv = generateBox(counter++, boxName.value, boxColor.value, sceneDiv.offsetWidth, sceneDiv.offsetHeight);

    sceneDiv.appendChild(boxDiv);
  }
  clearForm();
}

function generateBox(id, name, color, offsetWidth, offsetHeight) {

  var aBox = new Box(id, name, color, offsetWidth, offsetHeight);
  boxes.push(aBox);

  var boxDiv = document.createElement("div");
  boxDiv.style.left = aBox.x + "px";
  boxDiv.style.top = aBox.y + "px";
  boxDiv.style.backgroundColor = aBox.color;
  boxDiv.setAttribute("class", "box");
  boxDiv.id = aBox.id;
  boxDiv.innerHTML = aBox.name;
  boxDiv.onclick = display;

  return boxDiv;
}

function display(e) {
  var box = e.target;
  var boxId = box.id;
  var boxName = box.innerHTML;
  var boxColor = box.style.backgroundColor;
  // We get the absolute position of the box
  var boxRectangle = box.getBoundingClientRect();
  var boxPositionX = boxRectangle.left;
  var boxPositionY = boxRectangle.top;

  alert("You clicked on a box with id " + boxId + ", named '" + boxName + "'" +
        ", whose color is " + boxColor + ", at position " + boxPositionX + ", " + boxPositionY);
}
