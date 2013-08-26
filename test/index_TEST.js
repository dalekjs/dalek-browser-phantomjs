'use strict';

var expect = require('chai').expect;
var PhantomJSDriver = require('../index');

describe('dalek-browser-phantomjs', function() {

  it('should get default webdriver port', function(){
    expect(PhantomJSDriver.port).to.equal(9001);
  });

  it('should fail on busy port', function(done){
    PhantomJSDriver.port = 80;
    PhantomJSDriver.launch()
      .fail(function() {
        done();
      });
  });

  it('should launch on port 9006', function(done){
    PhantomJSDriver.port = 9006;
    PhantomJSDriver.launch()
      .then(function() {
        done();
      });
  });

});
