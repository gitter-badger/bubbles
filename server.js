var http = require('http');
var path = require('path');
var fs = require('fs');

var PORT = 1337;

function Time () { this.now = new Date(); }

Time.prototype = {
	day: function () {
		var d = this.now.getDate();
		return d < 10 ? '0' + d : d;
	},
	month: function () {
		var m = this.now.getMonth();
		return m < 10 ? '0' + m : m;
	},
	year: function () {
		return this.now.getFullYear();
	},
	hour: function () {
		var hh = this.now.getHours();
		return hh < 10 ? '0' + hh : hh;
	},
	minute: function () {
		var mm = this.now.getMinutes();
		return mm < 10 ? '0' + mm : mm;
	},
	second: function () {
		var ss = this.now.getSeconds();
		return ss < 10 ? '0' + ss : ss;
	}
};

function onRequest ( request, response ) {
	var time = new Time();
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.end("<h1>" + time.day() + "/" + time.month() + "/" + time.year() + " [" + time.hour() + ":" + time.minute() + ":" + time.second() + "]</h1>");
	delete time;
}

http.createServer(onRequest).listen(PORT);

console.log("Server started at \"http://127.0.0.1:" + PORT + "\"");