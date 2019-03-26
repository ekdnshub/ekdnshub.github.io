/*
v1 content를 v2 content로 변환하는 툴이다.
info 부분의 title과 created 는 별도로 채워줘야 하며 html 완성을 위해 20170706_complete_html_from_v2_contents.js 를 사용
스크립트 디렉토리에서 실행한다.
ex)
$ node ./to_v2_from_v1_converter.js {number}
*/

var V1_CONTENTS_PATH = "../../contents/v1/";
var V2_CONTENTS_PATH = "../../contents/v2/";
var fs = require("fs");

if (process.argv.length < 3) {
    console.log("need to argument.");
    return;
}

var number = process.argv[2];

var result = "";
result += "###info\n";
result += "title=\n";
result += "created=\n";
result += "ad=\n";
result += "###\n";

fs.readFileSync(V1_CONTENTS_PATH + number).toString().split('\n').forEach(function (_line) {
    var line = _line.toString();
    if (line[0] == " ") line = line.substring(1,line.length);
    line = line.replace("<p>", "#p ").replace("</p>", "");
    line = line.replace('<p class="refer">', "#p {=");
    line = line.replace("<h1>", "#h1 ").replace("</h1>", "");
    line = line.replace("<h2>", "#h2 ").replace("</h2>", "");
    line = line.replace("<h3>", "#h3 ").replace("</h3>", "");
    line = line.replace("<h4>", "#h4 ").replace("</h4>", "");
    line = line.replace("<h5>", "#h5 ").replace("</h5>", "");
    line = line.replace("<h5>", "#h5 ").replace("</h5>", "");
    line = line.replace("<li>", "#li ").replace("</li>", "");
    line = line.replace("<ul>", "###ul ");
    line = line.replace("</ul>", "###");
    line = line.replace("<ol>", "###ol ");
    line = line.replace("</ol>", "###");
    line = line.replace("<b>", "{!").replace("</b>", "}");
    line = line.replace(/<strong>/gi, "{!").replace(/<\/strong>/gi, "}");
    line = line.replace(/<span class="command">/gi, "{@");
    line = line.replace(/<span class="refer">/gi, "{=");
    line = line.replace(/<br>/gi, "\n");
    line = line.replace(/<\/span>/gi, "}");
    line = line.replace('<div class="console">', "###console");
    line = line.replace('<pre class="console">', "###console");
    line = line.replace('<div class="box">', "###box.none");
    line = line.replace('<div class="blue">', "###box.blue");
    line = line.replace('<div class="green">', "###box.green");
    line = line.replace('<div class="box">', "###console");
    line = line.replace("<blockquote>", "###include");
    line = line.replace("</blockquote>", "###");
    line = line.replace('<pre class="prettyprint linenums">', "###console");
    line = line.replace('<pre class="prettyprint linenums lang-cpp">', "###code.cpp");
    line = line.replace('<pre class="prettyprint linenums lang-java">', "###code.java");
    line = line.replace('<pre class="prettyprint linenums lang-xml">', "###code.xml");
    line = line.replace('<pre class="prettyprint linenums lang-scala">', "###code.scala");
    line = line.replace('<pre class="prettyprint linenums lang-html">', "###code.html");
    line = line.replace('<pre class="prettyprint linenums lang-js">', "###code.js");
    line = line.replace('<pre class="prettyprint linenums lang-sh">', "###code.sh");


    line = line.replace('<pre class="prettyprint lang-sql">', "###code.sql");

    line = line.replace("</pre>", "###");
    line = line.replace("</div>", "###");
    line = line.replace(/<a href="(.*)">(.*)<\/a>/g, "{__$1|$2}");
    line = line.replace(/\{\_\_/, "{$");

    line = line.replace(/<cite>(.*)<\/cite>/g, "#cite $1");

    if (line.indexOf("<") >= 0) console.log("missing html tag : " + line);
    result += line + "\n";
});
try {
    fs.unlinkSync(V2_CONTENTS_PATH + number);
} catch (e) {
    console.log("삭제할 파일이 없습니다.");
}
fs.appendFileSync(V2_CONTENTS_PATH + number, result);