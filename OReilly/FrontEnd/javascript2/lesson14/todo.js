// To do list application with Search (from the Strings lab)
// You can use this code as your starting point, or continue with
// your own code.
//
function Todo(id, task, who, dueDate, done, location) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = done;
    this.location = location;
}

function Location(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
}

var todos = new Array();
var newTodo = null;
var map = null;
var markers = [];

window.onload = init;

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;

    // get the search term and call the click handler
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentLocation, setDefaultLocation);
    }

    getTodoItems();
}

function setCurrentLocation (position) {
    showMap(new Location(position.coords.latitude, position.coords.longitude));
}

function setDefaultLocation () {
    showMap(new Location(0, 0));
}

function getTodoItems() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "todo") {
                var item = localStorage.getItem(key);
                var todoItem = JSON.parse(item);
                todos.push(new Todo(todoItem.id, todoItem.task, todoItem.who, todoItem.dueDate, todoItem.done, todoItem.location));
            }
        }
        addTodosToPage();
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}

function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    li.setAttribute("id", todoItem.id);

    var spanTodo = document.createElement("span");
    spanTodo.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;

    // Add the todo location if it is has one
    if (todoItem.location) {
        spanTodo.innerHTML = "("+todoItem.location.latitude+", "+todoItem.location.longitude+") " + spanTodo.innerHTML;
    }

    // Calculate task overdue
    try {
      var days = Math.ceil((Date.parse(todoItem.dueDate) - new Date().getTime()) / 1000 / 60 / 60 / 24);
      if (days < 0) {
          spanTodo.innerHTML += " (OVERDUE by " + Math.abs(days) + " days)";
      } else {
          spanTodo.innerHTML += " (" + days + " days)";
      }
      // console.log("item due date: " + Date.parse(todoItem.dueDate));
    } catch (e) {
      console.log("Error calculating task overdue: " + e.message)
    }

    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    // add the click handler to update the done state
    spanDone.onclick = updateDone;

    // add the delete link
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

    // add the click handler to delete
    spanDelete.onclick = deleteItem;

    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);

    return li;
}

function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    // later, process date here
    var dateInMillis = Date.parse(date);
    if (isNaN(dateInMillis)) {
    	alert("Please enter a due date");
    	return;
    }

    var id = (new Date()).getTime();
    var todoItem = new Todo(id, task, who, date, false);
    // Set the current position
    if (navigator.geolocation) {
      newTodo = todoItem;
      navigator.geolocation.getCurrentPosition(setNewTodoItemLocation, locationError);
    } else {
      console.log("No geolocation support.")
      addNewTodo(todoItem);
    }

}

function setNewTodoItemLocation(position) {
    newTodo.location = new Location(position.coords.latitude, position.coords.longitude);
    addNewTodo(newTodo);
}

function addNewTodo(todoItem) {

    todos.push(todoItem);
    addTodoToPage(todoItem);
    saveTodoItem(todoItem);

    // hide search results
    hideSearchResults();
}

function locationError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    console.log(errorMessage);
    alert(errorMessage);

    addNewTodo(newTodo);

}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function saveTodoItem(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function updateDone(e) {
    var span = e.target;
    var id = span.parentElement.id;
    var item;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            item = todos[i];
            break;
        }
    }
    if (item.done == false) {
        item.done = true;
        span.setAttribute("class", "done");
        span.innerHTML = "&nbsp;&#10004;&nbsp;";
    }
    else if (item.done == true) {
        item.done = false;
        span.setAttribute("class", "notDone");
        span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    var itemJson = JSON.stringify(item);
    var key = "todo" + id;
    localStorage.setItem(key, itemJson);
}

function deleteItem(e) {
    var span = e.target;
    var id = span.parentElement.id;

    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem(key);

    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }

    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

    // hide search results
    hideSearchResults();
}

// Search
function searchTodos() {
    // new search, so clear previous results
    clearSearchResultsList();
    // get the text to search for
    var searchTerm = document.getElementById("searchTerm").value;
    var count = 0;
    // check all the todos in the list
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        // make a regular expression to match the search term, regardless of case
        var re = new RegExp(searchTerm, "i");
        // try matching the expression with the task and the who from the to do item
        // in this case, we don't need the match results array; we just need to know
        // it exists for this to do item. If there is no match results, then the
        // result of match is null, so the "if" test will fail.
        if (todoItem.task.match(re) || todoItem.who.match(re)) {
            // if we find a match, add the to do item to the search results
            addSearchResultToPage(todoItem);
            // keep a count of the number of items we match
            count++;
        }
    }
    // if we don't match any items, display "no results" in the search results list
    if (count == 0) {
        var ul = document.getElementById("searchResultsList");
        var li = document.createElement("li");
        li.innerHTML = "No results!";
        ul.appendChild(li);
    }
    // show the search results
    showSearchResults();
}

// add a search result to the search results list in the page
function addSearchResultToPage(todoItem) {
    var ul = document.getElementById("searchResultsList");
    var li = document.createElement("li");
    li.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
    ul.appendChild(li);

    if (todoItem.location) {
      showMap(todoItem.location);
      addMarker(todoItem);
    }

}

function showMap(location) {
    var googleLatLong = new google.maps.LatLng(location.latitude, location.longitude);
    if (!map) {
        var mapOptions = {
            zoom: 20,
            center: googleLatLong,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var mapDiv = document.getElementById("map");
        map = new google.maps.Map(mapDiv, mapOptions);
    }
    map.panTo(googleLatLong);
}
function addMarker(todoItem) {
    var googleLatLong = new google.maps.LatLng(todoItem.location.latitude, todoItem.location.longitude);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate
    };
    var marker = new google.maps.Marker(markerOptions);
    markers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      content: todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
}

// clear the previous search results by removing all the children of the "searchResultsList" ul element
function clearSearchResultsList() {
    var ul = document.getElementById("searchResultsList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (var i=0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// This is just a nifty trick to show/hide the search results, so we don't show anything
// unless the user's just searched. Extra credit! :-)
function hideSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "none";
    var map = document.getElementById("map");
    map.style.display = "none";

    clearSearchResultsList();
}

function showSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "block";
    var map = document.getElementById("map");
    map.style.display = "block";

    document.forms[0].reset();
}
