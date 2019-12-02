//start by getting the data from json file
var ourData = forecast;
var dayContainer = document.getElementById("day");
openHome(dayContainer);

//displaying name of the city in file
var title = document.getElementById("Title");
title.innerHTML = `${ourData.city.name} Weather Report`;

//putting the dates into the top nav bar
count = 1;
for(i=0; i<40; i+=7){
  var dateButton = document.getElementById(`day${count}Button`);
  var myDate = new Date(ourData.list[i].dt_txt); //turns the data into a more readable format
  try{
  dateButton.innerHTML = myDate.toDateString();
  count++;}
  catch(err){
    //console.log("incorrect date");
  }
}

//called once home button clicked on
// param container = div container used for the rest of the page
//displays contents for home in div for the rest of the page
function openHome(container) {
  //console.log("home clicked")
  removeHighlight();
  var homeButton = document.getElementById("home");
  homeButton.className = "active";
  var homeText = "<br>Hi User! Click on a date to see the maximum temperature and average humidity";
  container.innerHTML=homeText;
}

//called once one of the date buttons is clicked on
//param data = the data from the json file
//param container = div container used for the rest of the page
//param button = the current button which has just been clicked
/*displays average humidity and maximum temperature
for that day in div for rest of the page*/
function onDateClick(data,container,button){
  //console.log(button.id+" clicked");
  document.getElementById("home").className = "";
  removeHighlight();
  button.className = "active";//highlight date chosen

  maxTemp = 0.00;
  count = 0;
  avgHumidity = 0.00;

  //loops through each item in list
  for (i=0; i<40; i++){
    var newDate = new Date(data.list[i].dt_txt);
    //checks if date in list is equal to chosen date
    //console.log(button.textContent + " compared to "+ newDate.toDateString());
    if (button.textContent == newDate.toDateString()){
      var currentDay = ourData.list[i].main;
      //checks if current temp in list is the biggest for that day
      //console.log("current max temp: "+maxTemp+" compared to "+currentDay.temp_max);
      if (maxTemp<currentDay.temp_max){
        maxTemp = currentDay.temp_max;
      }
      //used to get average humidity for chosen day
      avgHumidity+=currentDay.humidity;
      count+=1;
    }
  }
  //displays answer in div
  var answer = `<br>Average Humidity: ${avgHumidity/count} <br> Maximum temp: ${maxTemp}`;
  container.innerHTML=answer;
}

//unhighlights all the date buttons
function removeHighlight(){
  for (i=1; i<6; i++){
    document.getElementById(`day${i}Button`).className = "";
  }
}
