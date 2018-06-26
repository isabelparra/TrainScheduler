// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgKHXlalIyAq1p9F9rI1aDIHega8Sk_cc",
    authDomain: "train-scheduler-f73e1.firebaseapp.com",
    databaseURL: "https://train-scheduler-f73e1.firebaseio.com",
    projectId: "train-scheduler-f73e1",
    storageBucket: "train-scheduler-f73e1.appspot.com",
    messagingSenderId: "216142055388"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var tName = '';
  var tDestination = '';
  var firstTime = '03:30';
  var tFrequency = '';

// Button for adding trains
$('#add-train').on('click', function(event) {
    // Prevent page from refreshing 
    event.preventDefault();

    // Grabs user input
    var tName = $('#train-name-input').val().trim();
    var tDestination = $('#destination-input').val().trim();
    var firstTime = moment($('#first-train-input').val().trim(), 'DD/MM/YY').format('X');
    var tFrequency = $('#frequency-input').val().trim();
    
   
    // creates local 'temp' object for holding data

    database.ref().set({
        name: tName,
        destination: tDestination, 
        start: firstTime, 
        frequency: tFrequency
    });
    return false;
});

// print changes to the console and html
    database.ref().on('value', function(snapshot) {
        console.log(snapshot.val());

        console.log(snapshot.val().tName);
        console.log(snapshot.val().tDestination);
        console.log(snapshot.val().firstTime);
        console.log(snapshot.val().tFrequency);

        $('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + firstTime + '</td><td>' + tFrequency + '</td></tr>');
        
    }, function(errorObject) {
        console.log('the read failed: ' + console.errorObject.code);
    }); 
   






    // uploads train data to the database

//     database.ref().push(newTrain);

//     // logs everything to console

//     console.log(newTrain.name);
//     console.log(newTrain.destination);
//     console.log(newTrain.start);
//     console.log(newTrain.frequency);

//     // alert 

//     alert('Train succesfully added');

//     // clears all of the text boxes
//     $('#train-name-input').val('');
//     $('#destination-input').val('');
//     $('#first-train-input').val('');
//     $('#frequency-input').val('');

// });

// // 3. create firebase event for adding employee to the database and a row in the html when user adds entry

// database.ref().on('child_added', function(childSnapshot, prevChildKey) {
    
//     console.log(childSnapshot.val());

//     // store everything into a variable
//     var tName = childSnapshot.val().name;
//     var tDestination = childSnapshot.val().destination;
//     var firstTime = childSnapshot.val().start;
//     var tFrequency = childSnapshot.val().frequency;

//     // train info
//     console.log(tName);
//     console.log(tDestination);
//     console.log(firstTime);
//     console.log(tFrequency);

    // prettify the employee start

//     var empStartPretty = moment.unix(firstTime).format('MM/DD/YY');

    

//     // add each train's data into the table
//     $('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + empStartPretty + '</td><td>' + tFrequency + '</td></tr>');
// });