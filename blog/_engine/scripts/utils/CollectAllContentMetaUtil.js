/*
이 스크립트는 파일 리스팅 이후 특정 구문을 모아 오브젝트에 담습니다.
*/
var fs = require("fs");
var path = require('path');

var extractContentMetaUtil = require("./ExtractContentMetaUtil.js").getIns();

var TEMPLATE_PATH = path.resolve(__dirname + "/../template/posts.template.txt");
var CONTENTS_PATH = path.resolve(__dirname + "/../../../contents/v2");
var SAVE_PATH = path.resolve(__dirname + "/../../resources/meta/posts.js");

var collectAllContentMetaUtil = (function() {

    var files = fs.readdirSync(CONTENTS_PATH);

    function execute() {
        var actions = files.map((seq) => extractContentMetaUtil.execute(seq));
        return Promise.all(actions)
        .then(metas => {
            var _metas = {};
            metas.forEach(function(meta) {
                _metas[meta.postNumber] = meta;
            });
            return _metas;
        })
        .then(metas => {
            const result = [];
            Object.keys(metas).forEach(function(key) {
                const meta = metas[key];
                result.push([meta.postNumber, meta.title, meta.created, meta.category, meta.tags]);
            });
            //    console.log(result);

            var template = fs.readFileSync(TEMPLATE_PATH, "utf8");
            template = template.replace("{{{data}}}", JSON.stringify(result));

            fs.unlinkSync(SAVE_PATH);
            fs.appendFileSync(SAVE_PATH, template);
            //	var tagGroups = {};
            //	Object.keys(metas).forEach(function(key) {
            //		var meta = metas[key];
            //		var tags = meta["tags"];
            //		tags.forEach(function(tag) {
            //			if (tagGroups[tag] == null) {
            //				tagGroups[tag] = [];
            //			}
            //			tagGroups[tag].push(key);
            //		});
            //	});
            //	console.log("=========metas=========");
            //	console.log(metas);
            //	console.log("=========tags==========");
            //	console.log(tagGroups);
        })
        .catch(error => {
            console.error('error:' + error.message);
        });

    };

    return {
        execute: execute
    }
})();


// for node.js require
try{
  exports.getIns = function() { return collectAllContentMetaUtil; }
}catch(ex){
  console.log(ex);
}