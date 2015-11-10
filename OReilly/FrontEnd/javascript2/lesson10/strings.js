window.onload = init;

function init() {
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchText;
}

function searchText() {
    var searchTerm = document.getElementById("searchTerm").value;
    var textToSearch = document.getElementById("textToSearch").value;
    searchTerm = searchTerm.trim();
    textToSearch = textToSearch.trim();
    if (searchTerm == null || searchTerm == "") {
        alert("Please enter a string to search for");
        return;
    }
    if (textToSearch == null || textToSearch == "") {
        alert("Please enter some text to search");
        return;
    }
    // Exercise 1
    // if (searchTerm == textToSearch) {
    //     alert("Found 1 instance of " + searchTerm);
    // }
    // else {
    //     alert("No instance of " + searchTerm + " found!");
    // }
    // Exercise 2
    // var pos = 0;
    // var count = 0;
    // while (pos >= 0) {
    //     pos = textToSearch.toUpperCase().indexOf(searchTerm.toUpperCase(), pos);
    //     if (pos >= 0) {
    //         count++;
    //         pos++;
    //     }
    // }
    // alert("Found " + count + " instances of " + searchTerm);
    // Exercise 3
    // var results = textToSearch.split(" ");
    // var count = 0;
    // for (var i = 0; i < results.length; i++) {
    //     if (searchTerm.toUpperCase() == results[i].toUpperCase()) {
    //         count++;
    //     }
    // }
    // alert("Found " + count + " instances of " + searchTerm + " out of a total of " + results.length + " words!");

    // Exercise 4
    var re = new RegExp(searchTerm, "ig");
    var results = textToSearch.match(re);
    if (results == null) {
        alert("No match found");
    }
    else {
        alert("Found " + results.length + " instances of " + searchTerm);
        // Show the matches in the page
        showResults(results);
    }

}
function clearResultsList(ul) {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function showResults(results) {
    var ul = document.getElementById("matchResultsList");
    clearResultsList(ul);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < results.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = results[i];
        frag.appendChild(li);
    }
    ul.appendChild(frag);
}
