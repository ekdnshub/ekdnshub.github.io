var fs = require("fs");

const siteMapFilePath = "../../sitemap.html"; // 사이트맵 파일
const htmlDir = "../../"; // html 파일 디렉토리

try {
    fs.unlinkSync(siteMapFilePath);
} catch (e) {
    console.log("삭제할 파일이 없습니다.");
}

var files = fs.readdirSync(htmlDir);

var sitemap = files
.filter((file) => !isNaN(parseInt(file, 10)))
.map((file) => parseInt(file, 10))
.sort((e1, e2) => e1 - e2)
.map((file) => {
    return "https://jdm.kr/blog/" + file;
});

let body = "https://jdm.kr/blog/\n" + sitemap.join("\n");

fs.appendFileSync(siteMapFilePath, body);
