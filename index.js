// Create express app
let express = require('express');
let app = express();


// Enable CORS
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })) // For legacy browsers that don't support 204

// Add static middleware
app.use(express.static('public'));

// Index route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API
// If no date provided
app.get('/api/', function (req, res) {
    res.json({
        unix: Date.now(),
        utc: new Date().toUTCString()
    });
})
  
// If date provided
app.get("/api/:date", function (req, res) {

    // Get date from URL Params
    let dateParam = req.params.date;

    // If valid number
    if (/^\d+$/.test(dateParam)) {
        const date = new Date(parseInt(dateParam));
        res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
        })
    }
    // If valid date
    else if (Date.parse(dateParam)) {
        const date = new Date(dateParam);
        res.json({ 
        unix: date.getTime(),
        utc: date.toUTCString()
        })
    }    
    // If invalid date
    else {
        res.json({
        error: 'Invalid Date'
        })
    }
});


// Listen to requests
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('App is listening to port ' + listener.address().port);
});