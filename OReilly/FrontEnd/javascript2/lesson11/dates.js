window.onload = init;

function init() {
    var datetime = document.getElementById("datetime");
    //Exercise 1
    //var now = new Date();
    //datetime.innerHTML = now.toUTCString();
    //var hoursDiff = (now.getTimezoneOffset()) / 60;
    //datetime.innerHTML += ", " + hoursDiff + " hours difference from me.";

    //Exercise 2
    //var nyd = new Date(2050, 0, 1, 0, 1, 0);
    ////datetime.innerHTML = nyd.toString();
    //datetime.innerHTML = nyd.toLocaleString();

    //Exercise 3
    //var aDate = new Date();
    //aDate.setFullYear(2020);
    //aDate.setHours(13);
    //aDate.setMinutes(3);
    //aDate.setSeconds(59);
    ////datetime.innerHTML = aDate.toLocaleString();
    //var now = new Date();
    //var diff = aDate.getTime() - now.getTime();
    ////var days = Math.floor(diff / 1000 / 60 / 60 / 24);
    //var days = Math.ceil(diff / 1000 / 60 / 60 / 24);
    //datetime.innerHTML = aDate.toLocaleString() + ", " + days + " days from now";

    //Exercise 4
    //var now = new Date();
    //var threeDays = (24 * 60 * 60 * 1000) * 3;
    ////var threeDaysFromNow = new Date(now.getTime() + threeDays);
    ////datetime.innerHTML = now.toLocaleString() + "; 3 days from now: " + threeDaysFromNow.toLocaleString();
    //var threeDaysBeforeNow = new Date(now.getTime() - threeDays);
    //datetime.innerHTML = now.toLocaleString() + "; 3 days before now: " + threeDaysBeforeNow.toLocaleString();

    //Exercise 5
    var submit = document.getElementById("submit");
    submit.onclick = getDate;
}

function getDate() {
  var aDateString = document.getElementById("aDate").value;
  if (aDateString == null || aDateString == "") {
    alert("Please enter a date");
    return;
  }
  var aDateMillis = Date.parse(aDateString);
  alert(aDateMillis);
  var aDate = new Date(aDateMillis);

  var datetime = document.getElementById("datetime");
  datetime.innerHTML = aDate.toLocaleString();
}
