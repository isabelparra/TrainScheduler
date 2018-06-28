// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPEKcEoEBV7HxvJt87pl0R_Th5_JrD9zs",
    authDomain: "train-d10be.firebaseapp.com",
    databaseURL: "https://train-d10be.firebaseio.com",
    projectId: "train-d10be",
    storageBucket: "train-d10be.appspot.com",
    messagingSenderId: "841280019518"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var tName = '';
  var tDestination = '';
  var firstTime = '';
  var tFrequency = '';
  var minutesTillTrains = 0;

//clock
function displayTime() {
    setInterval(function() {
        $('.current-time').html(moment().format('hh:mm A'))
    }, 1000);
}

displayTime();

// 2. Button for adding trains
$('#add-train').on('click', function(event) {
    // Prevent page from refreshing 
    event.preventDefault();

    // Grabs user input
    var tName = $('#name-input').val().trim();
    var tDestination = $('#destination-input').val().trim();
    var firstTime = $('#first-train-input').val().trim();
    var tFrequency = $('#frequency-input').val().trim();

    console.log(tName);
    console.log(tDestination);
    console.log(firstTime);
    console.log(tFrequency);

    // if (tName === '' || tDestination === '' || firstTime === '' || tFrequency === '') {

    // }

 // prettify first time 

 var firstTimeConverted = moment(firstTime, 'hh:mm').subtract(1, 'years');
 console.log(firstTimeConverted);

 // current time

 var currentTime = moment();
 console.log('current time: ' + moment(currentTime).format('hh:mm'));

 // diff
 var timeDiff = moment().diff(moment(firstTimeConverted), 'minutes');
 console.log('diff in time: ' + timeDiff);

 //remainder
 var tRemainder = timeDiff % tFrequency;
 console.log(tRemainder);

 // min until next train

 var tMinutesTillTrain = tFrequency - tRemainder;
 console.log('MINUTES TILL TRAIN: ' + tMinutesTillTrain);


 // next train
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('hh:mm A');
 console.log('ARRIVAL TIME: ' + moment(nextTrain).format('hh:mm'));


    // creates local 'temp' object for holding data
     var newTrain = {
        name: tName,
        destination: tDestination, 
        start: firstTime, 
        frequency: tFrequency,
        nextTrain: nextTrain,
        tMinutesTillTrain: tMinutesTillTrain,
        currentTime: currentTime.format('hh:mm A')
    };

    // uploads train data to the database

    database.ref().push(newTrain);

    //log everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    console.log('next train in database: ' + newTrain.nextTrain);
    console.log('minutes away: ' + newTrain.tMinutesTillTrain);
    console.log('current time: ' + newTrain.currentTime);

    // alert 

    alert('Train succesfully added');

    // clears all of the text boxes
    $('#name-input').val('');
    $('#destination-input').val('');
    $('#first-train-input').val('');
    $('#frequency-input').val('');

});

// 3. create firebase event for adding train to the database and a row in the html when user adds entry

database.ref().on('child_added', function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
    console.log(prevChildKey);

    // store everything into a variable
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().start;
    var tFrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextTrain;
    var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
    var currentTime = childSnapshot.val().time;

    // train info
    console.log(tName);
    console.log(tDestination);
    console.log(firstTime);
    console.log(tFrequency);
    console.log(nextTrain);
    console.log(tMinutesTillTrain);
    console.log(currentTime);

   

   
    
   
    // var minutesAway = moment().diff(moment(firstTime, 'X'), 'minutes');
    // console.log(minutesAway);

    // add each train's data into table

$('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + tFrequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');
      
    }, function(errorObject) {
        console.log('Errors handled: ' + errorObject.code);
    });      
    










// // print changes to the console and html
//     database.ref().on('value', function(snapshot) {
//         console.log(snapshot.val());

//         console.log(snapshot.val().tName);
//         console.log(snapshot.val().tDestination);
//         console.log(snapshot.val().firstTime);
//         console.log(snapshot.val().tFrequency);










    

//     // add each train's data into the table
//     $('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + empStartPretty + '</td><td>' + tFrequency + '</td></tr>');
// });