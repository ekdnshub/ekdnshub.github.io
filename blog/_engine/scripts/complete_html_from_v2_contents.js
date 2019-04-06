/*
v2 content에서 html을 완성한다.
스크립트 디렉토리에서 실행한다.
ex)
$ node ./20170706_to_v2_from_v1_converter.js {number}
*/

var owiki = require("./owiki2.alpha.js");
var resourcesMinify = require("./minify_resources.js");
var extractContentMetaUtil = require("./utils/ExtractContentMetaUtil.js").getIns();

var BASE_TEMPLATE = "../../_templates/base.html";
var AD_TEMPLATE = "../../_templates/ad.html";
var V2_CONTENTS_PATH = "../../contents/v2/";
var HTML_PATH = "../../"
var fs = require("fs");

if (process.argv.length < 3) {
    console.log("need to argument.");
    return;
}

var number = process.argv[2];
var newPost = process.argv[3];

var completeHtml = async function(number) {
    console.log(`${number}번 콘텐츠 html 변환 시작`);
    var v2content = fs.readFileSync(V2_CONTENTS_PATH + number, "utf8");

    var meta = await extractContentMetaUtil.execute(number);

    console.log("메타 정보 추출....")
    console.log(meta);

    var completeHtmlPath = HTML_PATH + number + ".html";
    try {
        console.log("기존 파일 삭제 중...")
        fs.unlinkSync(completeHtmlPath);
    } catch (e) {
        console.log("삭제할 html 파일이 없습니다.");
    }

    var baseHtml = fs.readFileSync(BASE_TEMPLATE, "utf8");
    var adHtml = fs.readFileSync(AD_TEMPLATE, "utf8");

    var completeHtml = baseHtml.replace("{{{body}}}", "\n"+owiki.getIns().interpreter(v2content))
                               .replace(/{{{title}}}/g, meta.title)
                               .replace("{{{ad}}}", meta.ad === true ? adHtml : "");

    console.log("신규 파일 저장 중...");
    fs.appendFileSync(completeHtmlPath, completeHtml);
    console.log("신규 파일 저장 완료!")

    if (newPost) {
        console.log("meta 정보 미니파이...");
        resourcesMinify.getIns().execute("meta");
    }
}

if (number == "all") {
    var files = fs.readdirSync(V2_CONTENTS_PATH);
    files.forEach((file) => {
        completeHtml(file);
    });
} else {
    completeHtml(number);
}
