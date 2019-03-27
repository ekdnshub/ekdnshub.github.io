/*
아래 모듈에 의존성 가짐
https://github.com/srod/node-minify

$ npm install @node-minify/core
$ npm install @node-minify/google-closure-compiler

이 스크립트는 블로그에서 사용하는 모든 스크립트를 minify 하기 위한 용도로 제작 되었다.
아직은 multiline 이슈가 해결 되지 않아 core.js 파일만을 minify 한다.
*/

const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');

var resourcesMinify = (function() {

    var execute = function(type) {

        if (type == "all" || type == "view") {
            console.log("블로그 본문용 리소스 미니파이 시작...");
            minify({
              compressor: gcc,
              input: [
                  "../resources/common/core.js",
                  "../resources/common/header.js",
                  "../../scripts/posts.js",
                  "../../scripts/ArchiveGroup.js"
              ],
              output: '../../scripts/resources.min.js',
              options: {
                compilationLevel: 'SIMPLE'
              },
              callback: function(err, min) {
                if (err) {
                  console.log("error:", err);
                }
                  console.log("블로그 본문용 리소스 미니파이 완료!");
              }
            });
        }
        if (type == "all" || type == "main") {
            console.log("블로그 메인용 리소스 미니파이 시작...");
            minify({
              compressor: gcc,
              input: [
                  "../resources/common/core.js",
                  "../resources/common/header.js",
                  "../../scripts/posts.js",
                  "../../scripts/ArchiveGroup.js",
                  "../resources/main/main.js"
              ],
              output: '../../scripts/main.min.js',
              options: {
                compilationLevel: 'SIMPLE'
              },
              callback: function(err, min) {
                if (err) {
                  console.log("error:", err);
                }
                  console.log("블로그 메인용 리소스 미니파이 완료!");
              }
            });
        }
    }

    return {
        execute: execute
    }
})();

// for node.js require
try{
  exports.getIns = function() { return resourcesMinify; }
}catch(ex){

}