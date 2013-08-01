/*!
 *
 * Copyright (c) 2013 Sebastian Golasch
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

'use strict';

// ext. libs
var Q = require('q');
var spawn = require('child_process').spawn;
var phantomjs = require('phantomjs');

/**
 * This module is a browser plugin for [DalekJS](//github.com/dalekjs/dalek).
 * It provides a browser launcher as well the PhantomJS browser itself.
 *
 * The browser plugin comes bundled with the DalekJS base framework.
 *
 * You can use the browser plugin beside others (it is the default)
 * by adding a config option to the your Dalekfile:
 *
 * ```javascript
 * "browsers": ["phantomjs", "chrome"]
 * ```
 *
 * Or you can tell Dalek that it should test in this & another browser via the command line:
 *
 * ```bash
 * $ dalek mytest.js -b phantomjs,chrome
 * ```
 *
 * @module DalekJS
 * @class PhantomJSDriver
 * @namespace Browser
 * @part PhantomJS
 * @api
 */

var PhantomJSDriver = {

  /**
   * Verbose version of the browser name
   *
   * @property
   * @type string
   * @default PhantomJS
   */

  longName: 'PhantomJS',

  /**
   * Default port of the PhantomJSDriver
   * The port may change, cause the port conflict resultion
   * tool might pick another one, if the default one is blocked
   *
   * @property
   * @type integer
   * @default 9001
   */

  port: 9001,

  /**
   * Default host of the PhantomJSDriver
   * The host may be overriden with
   * a user configured value
   *
   * @property
   * @type string
   * @default localhost
   */

  host: 'localhost',

  /**
   * Root path of the PhantomJSDriver
   *
   * @property
   * @type string
   * @default /wd/hub
   */

	path: '/wd/hub',

  /**
   * Child process instance of the PhantomJS browser
   *
   * @property
   * @type null|Object
   */

	spawned: null,

  /**
   * Resolves the driver port
   *
   * @method getPort
   * @return integer
   */

  getPort: function () {
    return this.port;
  },

  /**
   * Returns the driver host
   *
   * @method getHost
   * @type string
   */

  getHost: function () {
    return this.host;
  },

  /**
   * Launches the PhantomJSDriver
   *
   * @method launch
   * @return Q.promise
   */

	launch: function () {
		var deferred = Q.defer();
		var stream = '';
    this.spawned = spawn(phantomjs.path, ['--webdriver', '9001']);

    this.spawned.stdout.on('data', function (data) {
      var dataStr = data + '';
      stream += dataStr;
      if (stream.search('GhostDriver - Main - running') !== -1) {
        deferred.resolve();
      }
    });
    return deferred.promise;
	},

  /**
   * Kills the PhantomJSDriver processe
   *
   * @method kill
   * @chainable
   */

	kill: function () {
		this.spawned.kill('SIGTERM');
	}
};

module.exports = PhantomJSDriver;
