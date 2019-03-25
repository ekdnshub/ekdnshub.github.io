/*
v2 content에서 html을 완성한다.
스크립트 디렉토리에서 실행한다.
ex)
$ node ./20170706_to_v2_from_v1_converter.js {number}
*/

var owiki = require("./owiki2.alpha.js");

var BASE_TEMPLATE = "../../base.html";
var V2_CONTENTS_PATH = "../../contents/v2/";
var HTML_PATH = "../../"
var fs = require("fs");

if (process.argv.length < 3) {
    console.log("need to argument.");
    return;
}

var number = process.argv[2];

var v2content = fs.readFileSync(V2_CONTENTS_PATH + number, "utf8");
var title = v2content.split("\n").filter((line) => line.indexOf("title=") >= 0).map((line) => line.replace("title=", "")).map((line) => line.slice(0, line.length - 1)).reduce((old, _new) => old);

var completeHtmlPath = HTML_PATH + number + ".html";
try {
    fs.unlinkSync(completeHtmlPath);
} catch (e) {
    console.log("삭제할 html 파일이 없습니다.");
}

var baseHtml = fs.readFileSync(BASE_TEMPLATE, "utf8");

var completeHtml = baseHtml.replace("{{body}}", owiki.getIns().interpreter(v2content))
                           .replace("{{title}}", title);

fs.appendFileSync(completeHtmlPath, completeHtml);