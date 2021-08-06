
var RSVP = require('rsvp');
const appViews = require("./appViews");

var Utility = require("./Utility");

exports.getTitles = function (request,response) {
	// check if address provided in url or not
	if(request.url.indexOf("address=") == -1){
appViews.addressInUrl(response);
		return;
	}

	// set header
	appViews.header(response);
	appViews.titleHeader(response);

    	// If multiple address given iterate over array
	if(request.query.address instanceof Array){
		var arrayLength = request.query.address.length;
        console.log(arrayLength);
		for(var counter = 0;counter < arrayLength; counter++){
			Utility.requestTitle(request.query.address[counter],function(title){
				// print title
				appViews.title(response,title);
				if(arrayLength == (counter + 1)){
					// set footer title
			appViews.titleFooter(response);
					// set footer
					appViews.footer(response);
				}
			});
		}
    }

	else{
		// use utility module requestTitle function
		Utility.requestTitle(request.query.address,function(title){
			// print title
			appViews.title(response,title);
			// set footer title
			appViews.titleFooter(response);
			// set footer
			appViews.footer(response);
		});  
	}

}

//Using Promises

exports.getTitlesRSVP = function (request,response) {
	// check if address provided in url or not
	if(request.url.indexOf("address=") == -1){
		View.addressInUrl(response);
		return;
	}

	// set header
	appViews.header(response);
	// set header title
	appViews.titleHeader(response);

	// If multiple address given iterate over array
	if(request.query.address instanceof Array){
		var promises = [];
		var arrayLength = request.query.address.length;
		for(var counter = 0;counter < arrayLength; counter++){
			// create promise for url
			promises.push(new RSVP.Promise(function(resolve,reject){
				Utility.requestTitle(request.query.address[counter],function(title){
					resolve(title);
				});
			}));
		}
		
		// Promise.all function takes a list of promises in the given order and returns another promise
		RSVP.all(promises).then(function(responseText){
			responseText.map(function(item){
				appViews.title(response,item);
			});
			appViews.titleFooter(response);
			appViews.footer(response);
		});
	}else{
		// create promise
		var promise = new RSVP.Promise(function(resolve,reject){
			Utility.requestTitle(request.query.address,function(title){
				resolve(title);// reject if promise
			});
		});

		// bind promis with then 
		promise.then(function(responseText){
			appViews.title(response,responseText);
			appViews.titleFooter(response);
			appViews.footer(response);
		});
	}
};