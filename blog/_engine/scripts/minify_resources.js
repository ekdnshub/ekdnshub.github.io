/*
아래 모듈에 의존성 가짐
https://github.com/srod/node-minify

$ npm install @node-minify/core
$ npm install @node-minify/uglify-js

이 스크립트는 블로그에서 사용하는 모든 스크립트를 minify 하기 위한 용도로 제작 되었다.
아직은 multiline 이슈가 해결 되지 않아 core.js 파일만을 minify 한다.
*/

const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');

minify({
  compressor: uglifyJS,
  input: ["../resources/core.js", "../../scripts/posts.js"],
  output: '../../scripts/resources.min.js',
  callback: function(err, min) {
      console.log("error:", err);
  }
});
