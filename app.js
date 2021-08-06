// Include express module
var express = require('express');

// create node express object
var app = express();
// create controller object
var appRouter = require('./appRoutes');


// Task 1
app.get("/task-1/I/want/title/", appRouter.getTitles);
app.get("/task-2/I/want/title/",appRouter.getTitlesRSVP);




// empty url handling
app.get("*", function (request,response) {
	response.status(404).send('Not found');
});

app.listen(8081);