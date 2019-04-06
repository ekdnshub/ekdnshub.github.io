/*
이 스크립트는 파일 리스팅 이후 특정 구문을 모아 오브젝트에 담습니다.
$ node build_contents_meta.js
*/
var fs = require("fs");
var extractContentMetaUtil = require("./utils/ExtractContentMetaUtil.js").getIns();

var CONTENTS_PATH = "../../contents/v2";
var files = fs.readdirSync(CONTENTS_PATH);

var actions = files.map((seq) => extractContentMetaUtil.execute(seq));
Promise.all(actions)
.then(metas => {
	var _metas = {};
	metas.forEach(function(meta) {
		_metas[meta.seq] = meta;
	});
	return _metas;
})
.then(metas => {
	var tagGroups = {};
	Object.keys(metas).forEach(function(key) {
		var meta = metas[key];
		var tags = meta["tags"];
		tags.forEach(function(tag) {
			if (tagGroups[tag] == null) {
				tagGroups[tag] = [];
			}
			tagGroups[tag].push(key);
		});
	});
	console.log("=========metas=========");
	console.log(metas);
	console.log("=========tags==========");
	console.log(tagGroups);
})
.catch(error => {
    console.error('error:' + error.message);
});
