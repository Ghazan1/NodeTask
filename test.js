const { response } = require('express');
var url = require('url');
var adr = 'http://localhost:8080/I/want/title/?address=google.com&address=www.dawn.com/events/';
var q = url.parse(adr, true);

let qData = q.query;
console.log(qData.address[0]);