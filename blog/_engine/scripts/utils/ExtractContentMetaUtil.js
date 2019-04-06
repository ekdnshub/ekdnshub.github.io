var fs = require("fs");
var CONTENTS_PATH = "../../contents/v2";

var extractContentMetaUtil = (function() {

    var CHK_KEYS = [
        { name: "title", type: "string" },
        { name: "created", type: "string" },
        { name: "ad", type: "boolean"},
        { name: "category", type: "string" },
        { name: "tags", type: "array" }
    ];

    var execute = function (seq) {
        return new Promise((resolve, reject) => {
            var infoFlag = false;
            var data = { seq: seq };
            var chkKeyCnt = 0;
            fs.readFile(CONTENTS_PATH+"/"+seq, 'utf8', (err, body) => {
                if (err) reject(new Error("[" + seq + "]번 파일이 없습니다."));
                body.toString().split('\n').forEach((line) => {
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
                          if (!value) {
                              reject(new Error(`[${seq}]번 ${name} 필드가 비었습니다.`));
                          }
                          switch (key.type) {
                              case "array":
                                  data[name] = value.split(",").map(val => val.trim());
                              break;
                              case "boolean":
                                  if (value !== "true" && value !== "false") {
                                    reject(new Error(`[${seq}]번 ${name} 필드는 true, false만 가능합니다.`));
                                  }
                                  data[name] = value === "true" ? true : false;
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
                    reject(new Error("[" + seq + "]번 메타 정보가 누락되어 있습니다."));
                } else {
                    resolve(data);
                }
            });
        });
    };

    return {
        execute: execute
    }
})();


// for node.js require
try{
  exports.getIns = function() { return extractContentMetaUtil; }
}catch(ex){

}