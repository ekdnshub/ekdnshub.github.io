 var owiki2 = (function(){

    // 1. 키워드 프로세스는 중첩형은 처리 가능하지만 복합형은 처리 불가하다. 단 {+...} 형식은 중복 가능.
    // ex) {@{={+help}}} (O), {@...{+help}{$help}} (X)
    // 2. {$...} 같은 링크형식의 경우는 중첩형이라도 불가하다.
    // ex) {$....{+help}...} (X)
    var processKeyword = function(data) {

        // 키워드 리스트 [0] 키워드(정규식), [1] 처리 프로세스
        var keywordList = [
            ["n", function(line){ // check \n
                return line.replace(/\\n[^\w'"]/g, "<br>");
            }],
            ["{+help", function(line){ // check {+help}
                return line.replace(/\{\+help\}/g, "<i class=\"fa fa-check fa-lg\"></i>");
            }],
            ["{+err", function(line){ // error {+err}
                return line.replace(/\{\+err\}/g, "<i class=\"fa fa-ban fa-lg\"></i>");
            }],
            ["{+warn", function(line){ // warn {+warn}
                return line.replace(/\{\+warn\}/g, "<i class=\"fa fa-exclamation-triangle fa-lg\"></i>");
            }],
            ["{@", function(line){ // {@...} => `...` 사용
                const reg = /\{\@([^\{\}]*)\}/g;
                if (reg.test(line)) {
                    console.log("{@...} 명령어는 사용하지 마세요.");
                }
                return line.replace(/\{\@([^\{\}]*)\}/g,"<span class=\"command\">$1</span>")
            }],
            ["`", function(line){ // span.command `...`
                return line.replace(/`([^`]+)`/g,"<span class=\"command\">$1</span>")
            }],
            ["{=", function(line){ // span.refer {=...}
                return line.replace(/\{=([^\{\}]*)\}/g,"<span class=\"refer\">$1</span>");
            }],
            ["{==", function(line){ // span.error {==...}
                return line.replace(/\{==([^\{\}]*)\}/g,"<span class=\"error\">$1</span>");
            }],
            ["{!!", function(line){ // italic {!!...}
                return line.replace(/\{!!([^\{\}]*)\}/g,"<i>$1</i>");
            }],
            ["{!", function(line){ // strong {!...}
                return line.replace(/\{\!([^\{\}]*)\}/g,"<strong>$1</strong>")
            }],
            ["{~~~", function(line){ // blue {~~~...}
                return line.replace(/\{~~~([^\{\}]*)\}/g,"<span class=\"blue\">$1</span>");
            }],
            ["{~~", function(line){ // red {~~...}
                return line.replace(/\{~~([^\{\}]*)\}/g,"<span class=\"red\">$1</span>");
            }],
            ["{~", function(line){ // light {~...}
                return line.replace(/\{~([^\{\}]*)\}/g,"<span class=\"light\">$1</span>");
            }],
            ["{\\$\\$", function(line){ // img {$$link}
                return line.replace(/\{\$\$([^\{\}]*)\}/g,"<img src=\"$1\">");
            }],
            ["{\\$", function(line){ // {$...|...}
                return line.replace(/\{\$([^\{\}\|]*)\|([^\{\}]*)\}/g,"<a href=\"$1\">$2</a>");
            }],
            ["{\\$", function(line){ // {$...}
                return line.replace(/\{\$([^\{\}\|]*)\}/g,"<a href=\"$1\">$1</a>");
            }]
        ];

        var tokens = data.split("\n");
        var convertKeywordData = "";

        for (var _i = 0 ; _i < tokens.length; _i++){
            var token = tokens[_i];

            // 키워드는 순차적으로 매칭하기 때문에 가장 긴 키워드부터 순차적으로 정렬한다.
            keywordList.sort(function(a,b){
                return (b[0].length - a[0].length);
            });

            keywordList.forEach(function(keyword){
                var result = keyword[1](token);
                // console.log(keyword[0], result);
                if (result != null) token = result;
            });

            convertKeywordData += token + "\n";
        }



        return convertKeywordData;
    };


    var processSingleLine = function(data) {
        var convertLineData = "";
        var lines = data.split("\n");


        // 키워드 맵
        // [0] 키워드, [1] 매칭시 처리할 프로세스
        var singleLineKeywordList = [
            ["#p" , function(line){ // #p -> <p>...</p>
                return "<p>"+line.substring(2,line.length).trim()+"</p>";
            }],
            ["#line", function(line){ // #line => <hr>
                return "<hr>";
            }],
            ["#li", function(line){
                return "<li>"+line.substring(3,line.length).trim()+"</li>";
            }],
            ["#cite", function(line){ // #cite ==> <cite>...</cite>
                return "<cite>"+line.substring(5,line.length).trim()+"</cite>";
            }],
            ["#h", function(line){
                var size = line.match(/^#h(.)/)[1];
                return "<h"+size+">"+line.substring(3,line.length).trim()+"</h"+size+">";
            }]
        ];
        // 키워드는 순차적으로 매칭하기 때문에 가장 긴 키워드부터 순차적으로 정렬한다.
        singleLineKeywordList.sort(function(a,b){
            return (b[0].length - a[0].length);
        });
        // 싱글 라인도 한줄에 하나씩이기 때문에 반드시 문자열의 처음에 위치하고 global 옵션은 끈다.
        var singleLineKeywordRex = new RegExp("^"+singleLineKeywordList.map(function(obj){return obj[0];}).join("|^"));


        for (var _i = 0 ; _i < lines.length; _i++){
            var line = lines[_i];
            var singleLine = line.match(singleLineKeywordRex);
            var resultLine = "";
            if (singleLine != null) {
                var findKey = singleLine[0];
                singleLineKeywordList.forEach(function(process){
                    if (process[0] == findKey) {
                        resultLine = process[1](line);
                    }
                });
            } else {
                resultLine = line;
            }
            convertLineData += resultLine +"\n";
        }
        return convertLineData;
    };


    var processMultiLine = function(data) {
        var multiLines = data.split("\n");
        var opStack = [];


        // multi line process
        // [0] 키워드, [1] 블록 진입시 처리할 프로세스, [2] 블록 종료시 처리할 프로세스, [3] 블록 상태 중 처리할 프로세스
        var multiLineKeywordList = [
            ["###fold", function(line){
                var title = line.match(/###fold\.?(.*)/)[1];
                if( title == "" ){
                    title = "펼치기";
                }
                return "<div class='fold' data-title='"+title+"'>";
            }, function(line){ return "</div>"; }, null],
            ["###script", function(line){ return "<script>"; }, function(line){ return "</script>"; }, null],
            ["###ul", function(line){ return "<ul>"; }, function(line){ return "</ul>"; }, null],
            ["###ol", function(line){ return "<ol>"; }, function(line){ return "</ol>"; }, null],
            ["###pre", function(line){ return "<pre>"; }, function(line){ return "</pre>"; }, null],
            ["###include", function(line){ return "<blockquote>"; }, function(line){ return "</blockquote>"; }, null],
            ["###info", function(line){ return ""; }, function(line){ return ""; }, function(line) { return ""; }],
            ["###box", function(line){
                var color = line.match(/###box\.(.*)/)[1];
                return "<div class=\""+color+"\">";
            }, function(line){ return "</div>"; }, null],
            ["###console", function(line){ return "<pre class=\"console\">"; }, function(line){ return "</pre>";
            }, function(line){
                line = line.replace(/</g,"&lt;");
                line = line.replace(/>/g,"&gt;");
                return line;
            }],
            ["###diagram", function(line){ return "<pre class=\"diagram\">"; }, function(line){ return "</pre>"; }, null],
            ["###code", function(line){
                var lang = line.match(/###code\.(.*)/)[1];
                return "<pre class=\"prettyprint lang-"+lang+"\">";
            }, function(line){ return "</pre>"}, function(line){
                line = line.replace(/</g,"&lt;");
                line = line.replace(/>/g,"&gt;");
                return line;
            }],
            ["###p", function(line){ return "<p>"; }, function(line){ return "</p>"; }, function(line){ return line+"<br>"; }],
            ["###tab", function(line){ return "<div class=\"tab\">"; }, function(line){ return "</div>"; }, null],
            ["###", function(line){ // 블록 종료 키워드로 [2],[3] 함수가 존재하지 않는다.
                var prevOp = opStack[opStack.length-1];
                var result = line;
                multiLineKeywordList.forEach(function(obj){
                    if (obj[0] == prevOp) { // 이전 스택 값과 동일한 키일 경우 해당 블록 종료 프로세스를 실행한다.
                        result = obj[2](line);
                        opStack.pop(); // 사용한 op는 스택에서 삭제한다.
                        // console.log(opStack);
                    }
                });
                return result;
            }]
        ];
        // 키워드는 순차적으로 매칭하기 때문에 가장 긴 키워드부터 순차적으로 정렬한다.
        multiLineKeywordList.sort(function(a,b){
            return (b[0].length - a[0].length);
        });
        // 멀티 라인도 한줄에 하나씩이기 때문에 반드시 문자열의 처음에 위치하고 global 옵션은 끈다.
        var multiLineKeywordRex = new RegExp("^"+multiLineKeywordList.map(function(obj){return obj[0];}).join("|^"));


        var convertMultiLineData = "";
        for (var _i = 0 ; _i < multiLines.length; _i++){
            var line = multiLines[_i];
            var resultMultiLine = "";
            var multiLine = line.match(multiLineKeywordRex);
            if (multiLine != null) {
                var findKey = multiLine[0];
                multiLineKeywordList.forEach(function(process){
                    if (process[0] == findKey) {
                        // 블록 종료 키워드는 op스택에 쌓지 않는다.
                        if (findKey != "###") {
                            opStack.push(findKey);
                        }
                        resultMultiLine = process[1](line);
                    }
                });
            } else {
                var prevOp = opStack[opStack.length-1];
                if (prevOp != null) { // 이전 op 값이 존재한다면
                    var findKey = prevOp;
                    var isOnce = false;
                    multiLineKeywordList.forEach(function(process){
                        if (process[0] == findKey && process[3] != null) { // 블록 상태 중 처리할 프로세스를 실행한다.
                            resultMultiLine = process[3](line);
                            isOnce = true;
                        }
                    });
                    if (!isOnce) resultMultiLine = line;
                } else {
                    resultMultiLine = line;
                }
            }
            convertMultiLineData += resultMultiLine + "\n";
        }

        return convertMultiLineData;
    };


    var interpreter = function(data) {
        console.log("위키 인터프리터 변환 시작...");

        // step1. 키워드 변환
        var convertKeywordData = processKeyword(data);

        //console.log(convertKeywordData);

        // step2. 싱글 라인 변환
        var convertLineData = processSingleLine(convertKeywordData);

        // console.log(convertLineData);

        // step3. 멀티 라인 변환
        var convertMultiLineData = processMultiLine(convertLineData);
        // console.log(convertMultiLineData);

        console.log("위키 인터프리터 변환 완료!");
        return convertMultiLineData;
    };


    return {
        version:"2.0",
        interpreter:interpreter
    };
})();
// for node.js require
try{
  exports.getIns = function(){
    return owiki2;
  };
}catch(ex){

}