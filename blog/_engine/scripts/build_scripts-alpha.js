/*
스크립트 미니파이를 위해 테스트 중
아래 모듈에 의존성 가짐
$ npm install node-minify
실행은 아래처럼
$ node js_merge_and_minify.js
*/

var fs = require("fs");
var compressor = require('node-minify');

var SCRIPTS_PATH = "scripts/";
var MERGE_PATH = "scripts.min.js";


var files = fs.readdirSync(SCRIPTS_PATH);


compressor.minify({
  compressor: 'yui-js',
  publicFolder: SCRIPTS_PATH,
  input: files,
  output: MERGE_PATH,
  callback: function(err, min) {
  	if (err != null) {
  		console.log(err);
  	}
    console.log(min);
  }
});
