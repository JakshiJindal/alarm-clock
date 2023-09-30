// display current time functionality
function formatAMPM(hours,minutes,seconds) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? minutes.toString().length<2?'0'+minutes:minutes : minutes;
    seconds = seconds < 10 ? seconds.toString().length<2?'0'+seconds:seconds : seconds;

    var strTime = hours + ':' + minutes + ':' +seconds+' '+ ampm;
    return strTime;
  }

  // add current time
const element=document.getElementById("currentDate");
setInterval(function () {
    const date=new Date();
    const formatedTime = formatAMPM(date.getHours(),date.getMinutes(),date.getSeconds());
     element.innerText=formatedTime;
    checkList(formatedTime);
  }, 1000);
  // set default time in input
  const currentDate=new Date();
// document.getElementById("addAlarm").value=`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

// delete alarms from list
function deleteAlarm(event){
    event.preventDefault();
    const listID=event.target.id;
    const list=document.querySelector("ul");
    list.removeChild(document.getElementById(listID));
}

// onclick set alarm, add alarm with delete button
function addAlarmToList(event){
    event.preventDefault();
const addAlarmInput=document.getElementById("addAlarm").value;
const addTo=document.querySelector("ul");
const li = document.createElement("li");
// get unique id to add in list attribute
const uniqueID=Date.now();
li.setAttribute("id",uniqueID);
li.style.listStyleType = "none";
// divide alarm input into hours,minutes and seconds
const time=addAlarmInput.split(":");
const formattedTime=formatAMPM(time[0],time[1],time[2]);
const timeData=document.createElement("p");
timeData.innerText=formattedTime;
	li.appendChild(timeData);

    // add delete button with list
    const deleteButton=document.createElement("button");
    deleteButton.innerHTML="Delete";
    deleteButton.setAttribute("id",uniqueID);
    deleteButton.setAttribute("class","delteButton");
    deleteButton.addEventListener("click",function(event){
        deleteAlarm(event);
    });
    li.appendChild(deleteButton);
    // add list to unordered list
	addTo.appendChild(li);
}
document.getElementById("setButton").disabled=true;
// add onclick on set alarm button
document.getElementById("setButton").addEventListener("click", function(event){
    addAlarmToList(event);
  });

  // validate input value otherwise disable set alarm button
  function checkValidation(){
    const addAlarmInput=document.getElementById("addAlarm").value;
        if(addAlarmInput.length>0){
            document.getElementById("setButton").disabled=false;
    }
    else{
        document.getElementById("setButton").disabled=true;
    }
    }

// function to alert user during alert time
function checkList(currentTime){
// collect list times 
const timeInList=[];
const list=document.querySelectorAll("li p");
list.forEach((item)=>{
    timeInList.push(item.innerText);
});
if(timeInList.includes(currentTime)){
    alert(`hey! time came to rise and shine,${currentTime}`);
}
}

