var o = (function($){
    "use strict";
    var document = window.document;
    var version = "1.0.3";

    /*-----------------------------------------------------------------------*/
    /* 로거 0.9.11 ~                                                         */
    /*-----------------------------------------------------------------------*/

    var logger = (function(){

        // 디버그 모드는 기본적으로 off
        // 추후 setDebug 함수로 제어 가능하다.
        var debug = false;

        // 디버그 모드 설정
        function setDebug(flag) {
            debug = flag;
        };

        function info(msg) {
            if (debug) console.info(msg);
        };

        function warn(msg) {
            if (debug) console.warn(msg);
        };

        function log(msg){
            if (debug) console.log(msg);
        };

        // 0.9.11 ~
        // error 로그는 debug 플래그와 관계 없이 무조건 노출된다.
        function error(msg){
            console.error(msg);
        };

        return{
            setDebug:setDebug,
            info:info,
            warn:warn,
            log:log,
            error:error
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* 소스로더                                                              */
    /*-----------------------------------------------------------------------*/
    var loader = (function(){

        /* private method */
        function _getDependencyScripts(dependency, index, callback){

            var src = dependency[index];
            var token = src.split(".");

            if (token[token.length-1] == "css") {
                loadCSS(src);
                index++;
                if(index <= dependency.length - 1) {
                    _getDependencyScripts(dependency, index, callback);
                } else {
                    if(callback) callback();
                }
            } else {
                $.getScript(src)
                    .done(function(){
                        index++;
                        if(index <= dependency.length - 1) {
                            _getDependencyScripts(dependency, index, callback);
                        } else {
                            if(callback) callback();
                        }
                    })
                    .fail(function( jqxhr, settings, exception ){
                        logger.error("loading error: " + src);
                        logger.error( exception );
                    });
            }
        };

        /* public method */
        function loadCSS( href ){
            var cssHtml = $("<link rel=\"stylesheet\" type=\"text/css\" href=\""+href+"\">");
            $("head").append(cssHtml);
        };

        function getScript (src, callback) {
            $.getScript( src )
                .done(function(){
                    if (callback != null) callback();
                })
                .fail(function (jqxhr, settings, exception) {
                    logger.error("loading error: " + src);
                    logger.error( exception );
                });
        };

        function loadJS(src) {
            getScript( src, null );
        };

        /**
         * 해당 함수는 입력 받은 배열 순서대로 Javascript or CSS 비동기 호출을 하게 된다.
         * 반드시 순서대로 호출해야 하는 경우에만 사용하자. 예전에 만든거라 성능이 좋지 않다.
         * @param dependency array
         * @param callback 작업 완료후 진행 할 로직
         */
        function getDependencyScripts(dependency, callback) { _getDependencyScripts(dependency, 0, callback); };

        return {
            loadCSS: loadCSS,
            loadJS: loadJS,
            getDS: getDependencyScripts,
            getDependencyScripts:getDependencyScripts,
            getScript: getScript
        };

    })();

    /*-----------------------------------------------------------------------*/
    /* 토스트 메시지                                                         */
    /* bootstrap 에 의존성 있음                                              */
    /*-----------------------------------------------------------------------*/
    var toast = (function(){

        /* private func */
        function _toast(type, content){
            var fontSize = "2em";
            if( browser.isMobile() ){
                fontSize = "1em";
            };

            if( $("#___toast_body").length <= 0 ){
                var html = "<div id=\"___toast_body\" style=\"display:table; position: fixed; z-index: 3333; width:100%; bottom:0\"></div>";
                $("body").prepend(html);
            };

            var backColor = "#33CCFF";
            var iClass = "";
            switch( type ){
                case "error":
                default:
                    backColor = "#CC0000";
                    iClass = "<i class=\"fa fa-exclamation-triangle\"></i>";
                    break;
                case "warning":
                    backColor = "#FFCC00";
                    iClass = "<i class=\"fa fa-exclamation-triangle\"></i>";
                    break;
                case "info":
                    backColor = "#33CCFF";
                    iClass = "<i class=\"fa fa-info-circle\"></i>";
                    break;
            };

            var id = "___toast_" + util.getTime();
            html = "<div id=\""+id+"\" style=\"width:100%; text-align:center; background: "+backColor+"; font-size:"+fontSize+"; color:white; cursor:pointer; font-weight:bold; padding:0.25em;  margin:0.1em;\">"+iClass+" "+content+"</div>";
            $("#___toast_body").append(html);

            $("#" + id).css({'filter':'alpha(opacity=70)', 'zoom':'1', 'opacity':'0.7'});
            $("#" + id).hover(function(){
                $("#" + id).css({'opacity':1});
            }, function(){
                $("#" + id).css({'filter':'alpha(opacity=70)', 'zoom':'1', 'opacity':'0.7'});
            });
            $("#" + id).click(function(){
                $("#" + id).remove();
            });

            $("#" + id).delay(3000).fadeOut(1000, function(){
                $("#" + id).remove();
            });

        };

        /* public method */
        function error(content){ _toast( "error", content ); };
        function warning(content){ _toast( "warning", content ); };
        function info(content){ _toast( "info", content ); };

        return {
            simpleError: error,
            error:error,
            warning:warning,
            info:info
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* 브라우저                                                              */
    /*-----------------------------------------------------------------------*/
    var browser = (function(){

        var ua = navigator.userAgent.toLowerCase();

        /* private */
        // IE 브라우저 버전 체크
        // 0.9.10
        // 외부 공개 함수에서 비공개로 전환됨
        // 이름도 변경됨. getBrowserVersion -> getIeBrowserVersion
        // ie 11버전 체크 가능하게 변경
        function _getIeBrowserVersion(){
            if (/msie/i.test(ua)) {
                var match = /(msie) ([\w.]+)/.exec(ua);
                return  match[2] || "0";
            }
            if (/trident/i.test(ua)) { // 일단 위에서 안잡히면 ie11로 인식시키자.
                return 11;
            }
            return 999;
        };

        /* public */
        // IE인지?
        // 0.9.10
        // ie 11버전 체크 가능하게 변경
        function isIE() {
            if (/msie/i.test(ua)){ return true; }
            if (/trident/i.test(ua)) { return true; } // ie11이 mise 문자열 포함 안하고 있다. trident는 ie 렌더링 엔진명이다.
            return false;
        };

        // 익스플로러 지정 버전(포함)보다 낮은지?
        function isLowerIE(version) {
            if (_getIeBrowserVersion() <= version) {
                return true;
            }
            return false;
        };
        
        // 익스플로러 지정 버전인지?
        function isEqualIE(version) {
            if (_getIeBrowserVersion() == version) {
                return true;
            }
            return false;
        };
        
        // 모바일 체크
        function isMobile(){
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( ua )) {
                return true;
            }
            return false;
        };

        // 크롬인지?
        // 0.9.9 ~
        function isChrome(){
            if (/chrom(e|ium)/i.test( ua )) {
                return true;
            }
            return false;
        };

        // 맥 OS 인지 체크
        // 1.0.1 ~
        function isMac() {
            if(/mac/i.test(ua)) {
                return true;
            }
            return false;
        };

        return {
            isIE: isIE,
            isLowerIE: isLowerIE,
            isEqualIE: isEqualIE,
            isMobile: isMobile,
            isChrome: isChrome,
            isMac: isMac
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* 스무스 마우스휠                                                       */
    /* version : 0.9.9 ~ 1.0.2                                               */
    /* wheel.init(200, 800);                                                 */
    /* 현재 크롬(PC)만 지원                                                  */
    /* Deprecated (1.0.3에서 추가)                                           */
    /*-----------------------------------------------------------------------*/
    var wheel = (function(browser) {
        function init(step, speed){
            if( !browser.isMobile() && browser.isChrome() && !browser.isMac() ){
                try{
                    var $document = $(document);
                    var $window = $(window);
                    var $body = $('html, body');

                    var viewport = $window.height();

                    var top = 0;

                    var scroll = false;

                    $window.on('mousewheel', function(e) {
                        scroll = true;

                        if (e.originalEvent.wheelDeltaY < 0 || e.originalEvent.detail > 0){
                            top = (top + viewport) >= $document.height() ? top : top += step;
                        }
                        if (e.originalEvent.wheelDeltaY > 0 || e.originalEvent.detail < 0){
                            top = top <= 0 ? 0 : top -= step;
                        }

                        $body.stop().animate({ scrollTop: top }, speed, 'wheel', function() {
                            scroll = false;
                        });
                        return false;

                    });

                    $window.on('scroll', function() {
                        if (!scroll){
                            top = $window.scrollTop();
                        }
                    });
                    $window.on('resize', function() {
                        viewport = $window.height();
                    });
                } catch( ex ){
                    console.log(ex);
                }
            }
        };
        $.easing.wheel = function (x,t,b,c,d) {
            var result = -c * ((t=t/d-1)*t*t*t - 1) + b;
            return result;
        };

        return {
            init:init
        };

    })(browser);

    /*-----------------------------------------------------------------------*/
    /* 유틸리티                                                              */
    /*-----------------------------------------------------------------------*/
    var util = (function(browser){

        // 복사 방지
        function limitCopy(){
            var omitformtags=["input", "textarea", "select"];
            omitformtags=omitformtags.join("|");
            function disableselect(e){
                if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1) return false;
            };
            function reEnable(){ return true; };

            if (typeof document.onselectstart!="undefined"){
                document.onselectstart=new Function ("return false");
            }else{
                document.onmousedown=disableselect;
                document.onmouseup=reEnable;
            }
            $( document ).ready(function(){
                document.ondragstart = function(){ return false;};
                document.onselectstart = function(){ return false;};
                document.oncontextmenu = function(){ return false;};
            });
        };

        // 복사시 출처 마지막에 달기 (body 태그가 있는 곳에서 사용할 것)
        // 0.10.0 ~
        function addLink(){
            $(document).on("copy", function(){
                try{
                    $("body").append("<div id='addLink' style='position:absolute; z-index:-9999; bottom:20000px;'></div>");
                    $("#addLink").append(window.getSelection()+"<br>[출처] "+ document.location.href);
                    var selection = window.getSelection();
                    selection.selectAllChildren(document.getElementById("addLink"));
                    setTimeout(function(){
                        $("#addLink").remove();
                    },0);
                } catch ( ex ) {
                    console.log( ex );
                }
            });
        };

        // 현재 문자열 바이트 계산
        function getByteLength(str) {
            var resultSize = 0;
            if (str == null) {
                return 0;
            }
            for (var i = 0; i < str.length; i++) {
                var c = escape(str.charAt(i));
                if (c.length == 1) {
                    resultSize++;
                }
                else if (c.indexOf("%u") != -1) {
                    resultSize += 2;
                }
                else {
                    resultSize++;
                }
            }
            return resultSize;
        };

        // 문자열 바이트 자르기
        function substringByte(str,st,ed){
            var arr = [];
            var b = 0;
            for(var i = 0, m = str.length; i < m; i++){
                if(str.charCodeAt(i) > 127){
                    arr.push(i);
                    arr.push(i);
                }else{
                    arr.push(i);
                }
            }
            if(arr[st]==arr[ed]){
                return false;
            }else{
                if( arr[ed] != null ) {
                    return str.substring(arr[st],arr[ed])+"..";
                }
                return str.substring(arr[st],arr[ed]);
            }
        };

        // html 태그 제거
        function removeHtmlTags( str ){
            return str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/g, "");
        };

        // 페이지 스크롤 마지막 체크
        function isEndScroll() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                return true;
            }
            return false;
        };

        // 빈 팝업에 html 삽입
        // blankPopup({ content:..., width:..., height:... });
        function blankPopup( option ){
            var defaults = {
                content:"",
                width:480,
                height:250
            };
            var opts = $.extend({}, defaults, option);
            var blank = window.open("","blankPopup", "width=" + opts.width + ",height=" + opts.height + ",menubar=0,toolbar=1,status=0,scrollbars=1,resizable=1");
            blank.document.writeln(
                "<html><head><title>Blank Popup</title></head>"
                +"<body onLoad=\"self.focus()\">"
                +opts.content
                +"</body></html>"
            );
            blank.document.close();
        };

        // 멀티라인 문자열
        //multiLine(function(){
        //		/*!
        //			...something
        //		*/
        //});
        function multiLine(func) {
            var matches = func.toString().match(/\*\!?\s*([\s\S]+?)\s*\*\//);
            if (!matches) return false;
            return matches[1];
        };
        
        // 현재시간 출력 2014-12-26 14:9:12
        function getNowTime() {
            var now = new Date();
            var str = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            return str;
        };

        // 랜덤 숫자 getRandom( 1, 10 ) = 1부터 10까지 나옴
        function getRandom(min, max) {
            var result = min + Math.floor(Math.random() * ((max+1)-min));
            return result;
        };

        // 현재시간 ex) 1419570486039
        function getTime() {
            var d = new Date();
            var n = d.getTime();
            return n;
        };

        // paddingString( "000000", "660" ) = "000660"
        function paddingString( pad, str ){
            return pad.substring(0, pad.length - str.length) + str;
        };

        // html querystring parsing
        // 0.9.5 ~
        function getParameter(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        // html string to link
        // 0.9.6 ~
        function linkify(text) {
            var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return text.replace(urlRegex, function(url) {
                return "<a href=\"" + url + "\">" + url + "</a>";
            });
        };

        // find string count
        // findStringCount("aaa2123axcasda", "2"); -> 2 반환
        // 0.9.7 ~
        function findStringCount(text, rexStr){
            var rex = new RegExp(rexStr,"g");
            var count = (text.match( rex ) || []).length;
            return count;
        };
        
        // auto width ( 자식의 크기가 큰 경우에만 부모의 넓이로 맞춤 )
        // autoWidth("#content", "#content iframe"); -> #content width만큼 iframe의 width를 비율대로 맞춤
        // 0.9.7 ~
        function autoWidth (parentWidthSelector, childSelector) {
            var parentBody = $(parentWidthSelector);
            var childList = $(childSelector);

            childList.each(function(){
                var height = $(this).height();
                var width = $(this).width();
                var rate = height / width;
                $(this).data("rate", rate); // 비율
                //console.log($(this).data("rate"));
                //.removeAttr("height").removeAttr("width");
            });

            $(window).resize(function(){
                var width = parentBody.width();
                childList.each(function(){
                    // 자식의 크기가 부모보다 큰 경우 비율대로 축소한다.
                    if( width <= $(this).width() ){
                        $(this).width(width).height(width * $(this).data("rate"));
                    }
                });
            }).resize();
        };

        // 숫자에 컴마 붙이기
        // 1.0.0 ~
        function getCommaString(number) {

            // 현재 ie에선 유효성 체크 제외
            // isInteger가 IE 11에서 지원 안하는거 체크(2015.08.31)
            if( !o.browser.isIE() && !Number.isInteger( number ) ){
                console.log(number+"는 숫자가 아닙니다.");
                return -1;
            }
            var str = String( number );
            var commaStr = "";

            var commaIdx = 0;
            for( i = str.length-1; i >= 0; i-- ){
                var ch = str[i];
                if( ch == undefined ) {
                    return commaStr;
                }

                if( commaIdx % 3 == 0 && i != (str.length-1) ) commaStr = "," + commaStr;
                commaStr = ch + commaStr;
                commaIdx++;
            }

            return commaStr;
        };

        // 오브젝트 사이즈 구하기
        // 1.0.2 ~
        function getObjectSize(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        
        return{
            blankPopup:blankPopup,
            multiLine:multiLine,
            getByteLength:getByteLength,
            substringByte:substringByte,
            removeHtmlTags:removeHtmlTags,
            limitCopy:limitCopy,
            isEndScroll:isEndScroll,
            getNowTime:getNowTime,
            getRandom:getRandom,
            getTime:getTime,
            paddingString:paddingString,
            getParameter:getParameter,
            linkify:linkify,
            findStringCount:findStringCount,
            autoWidth:autoWidth,
            addLink:addLink,
            getCommaString:getCommaString,
            getObjectSize:getObjectSize
        };
    })(browser);

    /*-----------------------------------------------------------------------*/
    /* Ajax ~ 1.0.2                                                          */
    /* Deprecated (1.0.3부터)                                                */
    /*-----------------------------------------------------------------------*/
    var ajax = (function(browser, toast){

        /* private */
        // ajax 전송
        function _send(option) {

            var defaults = {
                type:"GET",
                url:"",
                data:{},
                done:function(){},
                fail:function(){},
                timeout:1000
            };

            var opts = $.extend({}, defaults, option);

            // IE버전이 9 이하면서 post 전송은 실패한다.
            if (opts.type.toLowerCase() == "post" && browser.isLowerIE(9)) {
                toast.simpleError("해당 기능은 IE10 이상부터 지원합니다.");
                opts.fail();
                console.error("o.ajax.send() - Not supported to call this function for Lower IE. (url:"+opts.url+")");
            } else {
                $.ajax({
                    type:opts.type,
                    url:opts.url,
                    data:opts.data,
                    timeout:opts.timeout
                })
                    .done(function(data){
                        opts.done(data);
                    })
                    .fail(function(){
                        opts.fail();
                    });
            }
        };

        /* public */
        function send( option ){ _send(option); };

        return {
            send: send
        };

    })(browser, toast);

    /*-----------------------------------------------------------------------*/
    /* storage                                                               */
    /*-----------------------------------------------------------------------*/
    var storage = (function(){
        function localStorageClear(){
            localStorage.clear();
        };

        function isLocalStorage(){
            if( typeof(Storage) !== "undefined"){
                return true;
            }
            else{
                return false;
            }
        };

        function set(key, val){
            localStorage.setItem(key, val);
        };

        function get(key){
            var val = localStorage.getItem(key);
            if (val == null) {
                return "";
            }
            return val;
        };

        function getStorageJSONStringify() {
            return JSON.stringify(localStorage);
        };

        function setStorageJSONStringify(jsonData) {
            var data = JSON.parse(jsonData);
            for (i in data) {
                localStorage.setItem(i, data[i]);
            }
        };

        return{
            isLocalStorage:isLocalStorage,
            set:set,
            get:get
        }
    })();
    
    /*-----------------------------------------------------------------------*/
    /* popup                                                                 */
    /*-----------------------------------------------------------------------*/
    var popup = (function(){

        /* public func */
        // image popup 생성,
        // selector : img, #img, .img ... (jquery selector와 동일)
        function image( selector ){
            $( selector ).each(function(){
                if( $(this).attr("alt") == null){
                    $(this).attr("alt", "첨부이미지");
                }
                var src = $(this).attr("src");
                $(this).attr("title", "클릭하면 원본 사이즈를 볼 수 있습니다.");
                $(this).css("cursor","pointer");
                $(this).click(function(){
                    window.open( src, "_blank");
                });
            });
        };

        return {
            image:image
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* modal                                                                 */
    /*-----------------------------------------------------------------------*/
    var modal = (function(){

        /* 부트스트랩 모달 */
        var BootstrapModal = (function(){

            /* private */

            function _close(){
                $("#__layer_popup").remove();
                $(".modal-backdrop").remove();
            };

            /*
                open({
                    title:"",
                    color:"",( muted, primary, success, info, warning, danger )
                    buttons:{
                        "a":function(){},
                        "b":function(){}
                    },
                    addScript:function(){...} // 모달 내부에서 처리해야할 스크립트를 삽입한다.
                    content:"..."
                });
            */
            function _open(option){
                if("undefined"==typeof jQuery().modal) throw new Error("requires Bootstrap.js, Bootstrap.css");
                _close(); // 새로운 레이어 팝업 열리기 전에 기존 열린 레이어 팝업을 닫는다.

                /* layer_popup */
                var layer_popup ="";
                layer_popup += "<div class=\"modal fade\" id=\"__layer_popup\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"info_modal_label\" aria-hidden=\"true\">";
                layer_popup += "	<input type=\"hidden\" id=\"info_modal_value\" value=\"\"/>";
                layer_popup += "	<div class=\"modal-dialog\">";
                layer_popup += "		<div class=\"modal-content\">";
                layer_popup += "			<div class=\"modal-header\">";
                layer_popup += "				<h4 class=\"modal-title\"><span class=\"\" id=\"__layer_popup_title\">알림</span></h4>";
                layer_popup += "			</div>";
                layer_popup += "			<div class=\"modal-body\" id=\"__layer_popup_body\"></div>";
                layer_popup += "			<div class=\"modal-footer\" id=\"__layer_btn\">";
                layer_popup += "				<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"__layer_first_btn\">__</button>";
                layer_popup += "				<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"__layer_second_btn\">__</button>";
                layer_popup += "			</div>";
                layer_popup += "		</div>";
                layer_popup += "	</div>";
                layer_popup += "</div>";


                $("body").append(layer_popup);

                var defaults = {
                    title:"알림",
                    color:"info",
                    buttons:{"확인":function(){}},
                    content:"컨텐츠가 비어있습니다.",
                    addScript:function(){}
                };

                var opts = $.extend({}, defaults, option);
                var title = opts.title;
                var color = opts.color;
                var buttons = opts.buttons;
                var content = opts.content;
                var addScript = opts.addScript;

                // title
                $("#__layer_popup_title").text(title);

                // color
                $("#__layer_popup_title").addClass( "text-" + color );

                // button
                var index = 0;
                $.each(buttons, function( name, func ){
                    if( index == 0 ){
                        $("#__layer_first_btn").unbind( "click" );
                        $("#__layer_first_btn").text( name );
                        $("#__layer_first_btn").click( func );
                    }else if( index == 1){
                        $("#__layer_second_btn").unbind( "click" );
                        $("#__layer_second_btn").text( name );
                        $("#__layer_second_btn").click( func );
                    }
                    index++;
                });

                if( $("#__layer_first_btn").text() == "__" ) { // 첫번째 버튼이 빈칸이라면 버튼 옵션은 없는것으로 판단.
                    $("#__layer_btn").hide();
                }
                if( $("#__layer_second_btn").text() == "__" ) $("#__layer_second_btn").hide();

                // content
                $("#__layer_popup_body").html( content );

                // show modal
                $("#__layer_popup").modal("show");

                // add script
                addScript();
            };

            /* public */
            function open(option){ _open(option); };

            function simpleError( content ){
                open({
                    title:"경고",
                    color:"danger",
                    content:content
                });
            };

            function simpleInfo( content ){
                open({
                    title:"알림",
                    color:"info",
                    content:content
                });
            };

            function simple( title, color, content ){
                open({
                    title:title,
                    color:color,
                    content:content
                });
            };

            return {
                open: open,
                simpleError: simpleError,
                simpleInfo: simpleInfo,
                simple: simple
            };
        })();

        return {
            BtModal:BootstrapModal
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* Mapper                                                                */
    /*-----------------------------------------------------------------------*/

    var mapper = (function(){

        /* public */
        function toHtml( template, object ){
            var propMatcher = null;
            var result = template;
            for (var prop in object ) {
                propMatcher = new RegExp("{{\\s*"+prop+"\\s*}}","g");
                result = result.replace( propMatcher, object[prop] );
            };
            return result;
        };

        return{
            toHtml:toHtml
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* loading Bar                                                           */
    /*-----------------------------------------------------------------------*/

    var loading = (function(){
        var myName = "";
        var isStart = false;

        /* private func */
        function _loading( name ){
            if ( isStart ){
                $( "#"+name+" p" ).animate({ opacity: "toggle" }, 1000, "linear", function(){ _loading( name ); });
            }
        };

        function _start( name ){
            if( name == null ) throw new Error("o.loading.start need name.");
            myName = "__loading__" + name;

            if( $("#"+myName).length <= 0 ){

                var html = "<div id=\""+myName+"\" style=\"display:table; position: fixed; background-color: rgba(0,0,0,0.5); z-index: 7777; width:100%; height:100%;\">";
                html += "<p style=\"display:table-cell; text-align:center; vertical-align:middle;font-family:Arial; font-size:3em;color:#ccc;\">";
                html += "Loading...";
                html += "</p>";
                html += "</div>";

                $("body").prepend( html );
            }
            isStart = true;
            $("#"+myName).show();
            _loading( myName );
        };

        function _stop( name ){
            if( name == null ) throw new Error("o.loading.stop need name.");
            myName = "__loading__" + name;
            isStart = false;
            $("#"+myName).hide();
        };

        /* public func */
        function start( name ){	_start(name); };
        function stop( name ){ _stop(name);	};
        function toggle( name, delay ){
            start( name );
            setTimeout(function(){ stop( name ); }, delay);
        };

        return {
            start:start,
            stop:stop,
            toggle:toggle
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* checker                                                               */
    /*-----------------------------------------------------------------------*/

    var checker = (function(){
        // 한글 체크
        function isKoreaLang(str){
            if( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test( str ) ){ return true; }
            return false;
        };

        // 숫자 체크
        function isNumber(str){
            if( /[^0-9]/i.test( str ) ){ return false; }
            return true;
        };

        // 영문 체크
        function isEnglish(str){
            if( /[^a-zA-Z]/i.test( str ) ){ return false; }
            return true;
        };

        return{
            isKoreaLang:isKoreaLang,
            isNumber:isNumber,
            isEnglish:isEnglish
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* Queue                                                                 */
    /* var a = Queue();                                                      */
    /*-----------------------------------------------------------------------*/
    var Queue = function(){
        var array = [];

        // add item
        function add( item ){
            array.unshift( item );
        };

        // get item
        function get(){
            if( isEmpty() ){
                throw new Error("queue is empty.");
            }
            return array.pop();
        };

        // queue size test
        function isEmpty(){
            if( array.length <= 0 ){
                return true;
            }
            return false;
        };

        return{
            add:add,
            get:get,
            isEmpty:isEmpty
        };
    };

    return{
        version: version,
        logger:logger,
        loader:loader,
        browser:browser,
        toast:toast,
        util:util,
        ajax:ajax,
        storage:storage,
        popup:popup,
        modal:modal,
        mapper:mapper,
        loading:loading,
        checker:checker,
        Queue:Queue,
        wheel:wheel
    };
})(jQuery);
