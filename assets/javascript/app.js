
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPEKcEoEBV7HxvJt87pl0R_Th5_JrD9zs",
    authDomain: "train-d10be.firebaseapp.com",
    databaseURL: "https://train-d10be.firebaseio.com",
    projectId: "train-d10be",
    storageBucket: "",
    messagingSenderId: "841280019518"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var tName = '';
  var tDestination = '';
  var firstTime = '03:30';
  var tFrequency = 0;

// Button for adding trains
$('#add-train').on('click', function(event) {
    // Prevent page from refreshing 
    event.preventDefault();

    // Grabs user input
    var tName = $('#name-input').val().trim();
    var tDestination = $('#destination-input').val().trim();
    var firstTime = moment($('#start-input').val().trim(), 'DD/MM/YY').format('X');
    var tFrequency = $('#frequency-input').val().trim();
    
   
    // creates local 'temp' object for holding data

    database.ref().push({
        name: tName,
        destination: tDestination, 
        start: firstTime, 
        frequency: tFrequency
    });
});

    // uploads train data to the database

//     // alert 

//     alert('Train succesfully added');

//     // clears all of the text boxes
//     $('#train-name-input').val('');
//     $('#destination-input').val('');
//     $('#first-train-input').val('');
//     $('#frequency-input').val('');

// });

// // 3. create firebase event for adding train to the database and a row in the html when user adds entry

database.ref().on('child_added', function(snapshot) {
    var newTrain = snapshot.val();

//     database.ref().push(newTrain);

//     // logs everything to console

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);

$('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + firstTime + '</td><td>' + tFrequency + '</td></tr>');
      
    }, function(errorObject) {
        console.log('Errors handled: ' + errorObject.code);
    });      
    
    
// console.log(childSnapshot.val());

// //     // store everything into a variable
//     var tName = childSnapshot.val().name;
//     var tDestination = childSnapshot.val().destination;
//     var firstTime = childSnapshot.val().start;
//     var tFrequency = childSnapshot.val().frequency;

//     // train info
//     console.log(tName);
//     console.log(tDestination);
//     console.log(firstTime);
//     console.log(tFrequency);











// // print changes to the console and html
//     database.ref().on('value', function(snapshot) {
//         console.log(snapshot.val());

//         console.log(snapshot.val().tName);
//         console.log(snapshot.val().tDestination);
//         console.log(snapshot.val().firstTime);
//         console.log(snapshot.val().tFrequency);

//     
   








    // prettify the employee start

//     var empStartPretty = moment.unix(firstTime).format('MM/DD/YY');

    

//     // add each train's data into the table
//     $('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + empStartPretty + '</td><td>' + tFrequency + '</td></tr>');
// });