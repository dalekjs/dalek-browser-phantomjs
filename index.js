var Q = require('q');
var spawn = require('child_process').spawn;
var phantomjs = require('phantomjs');

module.exports = {
	name: 'PhantomJS',
	version: phantomjs.version,
	port: 9001,
	host: 'localhost',
	path: '/wd/hub',
	spawned: null,
	launch: function () {
		var deferred = Q.defer();
		var stream = '';
	    this.spawned = spawn(phantomjs.path, ['--webdriver', '9001']);

	    this.spawned.stdout.on('data', function (data) {
	        var dataStr = new String(data);
	        stream += dataStr;
	        if (stream.search('GhostDriver - Main - running') !== -1) {
	        	deferred.resolve();
	        }
	    });
	    return deferred.promise;
	},
	kill: function () {
		this.spawned.kill('SIGTERM');
	}
};
