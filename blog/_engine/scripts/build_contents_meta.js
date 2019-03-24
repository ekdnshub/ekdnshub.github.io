/*
이 스크립트는 파일 리스팅 이후 특정 구문을 모아 오브젝트에 담습니다.
$ node build_contents_meta.js
*/
var fs = require("fs");

var CONTENTS_PATH = "../../contents/v2";
var CHK_KEYS = [
	{ name: "title", type: "string" },
	{ name: "created", type: "string" },
//	{ name: "category", type: "string" },
//	{ name: "tags", type: "array" }
];


var files = fs.readdirSync(CONTENTS_PATH);
var extractMeta = function (file) {
	return new Promise(resolve => {
		var infoFlag = false;
		var data = { seq: file };
		var chkKeyCnt = 0;
		fs.readFileSync(CONTENTS_PATH+"/"+file).toString().split('\n').forEach(function (line) {
			if (infoFlag && line.startsWith("###")) {
				infoFlag = false;
			}
			if (line.startsWith("###info")) {
				infoFlag = true;
			}
			if (infoFlag) {
				CHK_KEYS.forEach(key => {
					var name = key.name;
					if (line.startsWith(name)) {
						var value = line.replace(name + "=","");
						switch (key.type) {
							case "array":
								data[name] = value.split(",");

							break;
							default:
							case "string":
								data[name] = value;
							break;
						}
						chkKeyCnt++;
					}
				});
			}
		});
		if (chkKeyCnt < CHK_KEYS.length) {
			console.error("ERROR : [" + file + "]번 메타 정보가 누락되어 있습니다.");
		} else {
			resolve(data);
		}
	});
};


var actions = files.map(extractMeta);
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
});
