window.onload = init;

function init() {
    // localStorage.setItem("favGenre", "fiction");
    // var favoriteGenre = localStorage.getItem("favGenre");

    // addItem("favGenre", "fiction");
    // addItem("favFlavor", "Vanilla Chocolate Chip");
    // addItem("book", "Head First HTML5 Programming");
    // addItem("browserWidth", 1280);
    // getItem("book");
    // getItem("browserWidth");
    // addItem("favTea", "English Breakfast");

    // removeItem("favFlavor");
    clearAllItems();
    showAllPrefs();
}

function addItem(key, value) {
    localStorage.setItem(key, value);
    // addToList(key, value);
}
function removeItem(key) {
    localStorage.removeItem(key);
}
function clearAllItems() {
    localStorage.clear();
}
function getItem(key) {
    var value = localStorage.getItem(key);
    // alert("Item: " + key + ": " + value);
    alert("Item: " + key + ": " + value + " (" + (typeof value) + ")");
}
function addToList(key, value) {
    var ul = document.getElementById("items");
    var li = document.createElement("li");
    // li.innerHTML = favoriteGenre;
    li.innerHTML = "Key: " + key + ", value: " + value;
    ul.appendChild(li);
}
function showAllPrefs() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        addToList(key, value);
    }
}
