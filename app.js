var mime = require('./mime-types');
var htst = require('./http-stats');
var http = require('http');
var path = require('path');
var fs = require('fs');

var PORT = 1337;
var IP = '127.0.0.1';

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
	var file = decodeURI(request.url);
	file = file === "/" ? "." + file : file;
}

module.exports.start = function () {
	http.createServer(onRequest).listen(PORT);
	console.log("Server started at \"http://" + IP + ":" + PORT + "\"");
}