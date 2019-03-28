/*
리소스만 빌드하고 싶은 경우 사용
*/

var resourcesMinify = require("./minify_resources.js");

if (process.argv.length < 3) {
    console.log("need to argument. [all | view | main | post]");
    return;
}

var type = process.argv[2];

resourcesMinify.getIns().execute(type);