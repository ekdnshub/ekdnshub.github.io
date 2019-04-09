var o = (function($){
    "use strict";
    var document = window.document;

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

        // 익스플로러 지정 버전(포함)보다 낮은지?
        function isLowerIE(version) {
            if (_getIeBrowserVersion() <= version) {
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

        return {
            isLowerIE: isLowerIE,
            isMobile: isMobile
        };
    })();

    /*-----------------------------------------------------------------------*/
    /* 유틸리티                                                              */
    /*-----------------------------------------------------------------------*/
    var util = (function(browser){

        // 페이지 스크롤 마지막 체크
        function isEndScroll(adjust) { // adjust 값이 클수록 미리 캐치한다.
            if ((window.innerHeight + window.scrollY + adjust) >= document.body.offsetHeight) {
                return true;
            }
            return false;
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

        // 현재시간 ex) 1419570486039
        function getTime() {
            var d = new Date();
            var n = d.getTime();
            return n;
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

        // 오브젝트 사이즈 구하기
        // 1.0.2 ~
        function getObjectSize(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };


        function copyToClipboard(str) {
            try {
                var textarea = document.createElement("textarea");
                document.body.appendChild(textarea);
                textarea.value = str;
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            } catch(ex) {
                // nothing...
            }
        };
        
        return{
            multiLine:multiLine,
            isEndScroll:isEndScroll,
            getTime:getTime,
            autoWidth:autoWidth,
            getObjectSize:getObjectSize,
            copyToClipboard:copyToClipboard
        };
    })(browser);

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

    return {
        browser:browser,
        toast:toast,
        util:util,
        popup:popup,
        mapper:mapper
    };
})(jQuery);
