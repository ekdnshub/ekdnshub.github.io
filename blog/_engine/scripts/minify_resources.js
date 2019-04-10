/*
아래 모듈에 의존성 가짐
https://github.com/srod/node-minify

$ npm install @node-minify/core
$ npm install @node-minify/google-closure-compiler
$ npm install @node-minify/clean-css

이 스크립트는 블로그에서 사용하는 모든 css/스크립트를 minify 하기 위한 용도로 제작 되었다.
*/

const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');
const cleanCSS = require('@node-minify/clean-css');

var resourcesMinify = (function() {

    var execute = function(type) {

        if (type == "all" || type == "common") {
            console.log("사이트 전체 커먼 css 미니파이 시작...");
            minify({
              compressor: cleanCSS,
              input: [
                  "../resources/common/common.css"
              ],
              output: "../../../css/common.min.css",
              callback: function(err, min) {
                if (err) {
                  console.log("error:", err);
                }
                  console.log("사이트 전체 커먼 css 미니파이 완료!");
              }
            });
        }

        if (type == "all" || type == "meta") {
            console.log("블로그 포스트 정보 미니파이 시작...");
            minify({
              compressor: gcc,
              input: [
                  "../resources/meta/posts.js",
                  "../resources/meta/ArchiveGroup.js",
              ],
              output: '../../scripts/posts.min.js',
              options: {
                compilationLevel: 'WHITESPACE_ONLY'
              },
              callback: function(err, min) {
                if (err) {
                  console.log("error:", err);
                }
                  console.log("블로그 포스트 정보 미니파이 완료!");
              }
            });
        }

        if (type == "all" || type == "view") {
            console.log("블로그 본문용 css 미니파이 시작...");
            minify({
              compressor: cleanCSS,
              input: [
                  "../resources/common/common.css",
                  "../resources/view/view.css"
              ],
              output: "../../css/view.min.css",
              callback: function(err, min) {
                if (err) {
                  console.log("error:", err);
                }
                  console.log("블로그 본문용 css 미니파이 완료!");
              }
            });
            minify({
              compressor: gcc,
              input: [
                  "../resources/common/core.js",
                  "../resources/view/bottom.js",
                  "../resources/view/comment.js",
                  "../resources/view/copyright.js",
                  "../resources/view/postHandler.js",
              ],
              output: '../../scripts/view.min.js',
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
            console.log("블로그 메인용 css 미니파이 시작...");
            minify({
              compressor: cleanCSS,
              input: [
                  "../resources/common/common.css",
                  "../resources/main/main.css"
              ],
              output: "../../css/main.min.css",
              callback: function(err, min) {
                if (err) {
                  console.log("error:", err);
                }
                  console.log("블로그 메인용 css 미니파이 완료!");
              }
            });
            console.log("블로그 메인용 리소스 미니파이 시작...");
            minify({
              compressor: gcc,
              input: [
                  "../resources/common/core.js",
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