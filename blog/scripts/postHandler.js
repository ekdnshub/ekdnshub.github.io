function applyContentEffect(){

	// bootstrap class add
	if( !o.browser.isLowerIE(8) ){
		$( "#content img" ).each(function(){
			$(this).addClass("img-responsive");
			$(this).addClass("img-rounded");
			if( $(this).attr("alt") == null){
				$(this).attr("alt", "첨부이미지");
			}
		});
	}

	// 본문 소제목에 번호를 붙이자.
	var map = { "h1":0, "h2":0, "h3":0, "h4":0, "h5":0 };
	$("#content h1,#content h2,#content h3,#content h4,#content h5").each(function(i, obj){
		var tagName = $(obj).prop("tagName").toLowerCase();

		switch( tagName ){
			case "h1": map["h2"] = 0;
			case "h2": map["h3"] = 0;
			case "h3": map["h4"] = 0;
			case "h4": map["h5"] = 0;
		}
		map[tagName]++;

		var subIndex = "";
		if( map["h1"] > 0) subIndex = map["h1"]+".";
		if( map["h2"] > 0) subIndex += map["h2"]+".";
		if( map["h3"] > 0) subIndex += map["h3"]+".";
		if( map["h4"] > 0) subIndex += map["h4"]+".";
		if( map["h5"] > 0) subIndex += map["h5"]+".";

		$(obj).html( subIndex + " " + $(obj).html() );
	});

	// 본문 내 a링크인데 _blank 옵션이 없으면 넣어준다.
	$("#content a").each(function(index, obj){
		var target = obj.getAttribute("target");
		if( target == null || target == "" ){
			obj.setAttribute("target", "_blank");
		}
		// 2015.04.14 봇이 링크를 따라가지 않도록 한다.
		var rel = obj.getAttribute("rel");
		if( rel == null || rel == "" ){
			obj.setAttribute("rel", "nofollow");
		}
	});
	
	// image popup...
	o.popup.image("#content img"); 
	
	// first-letter 처리
	$("#content p").each(function(){
		$(this).prepend("<span style='padding-left:0.5em;'></span>");
	});
	
	// 접기(fold) 처리(위키 문법에 추가됨)
	$("#content .fold").each(function(i, obj){
	
		var id = "fold_"+i;
	
		$(this).attr("id", id);
		var title = $(this).data("title");
	
		if( title == null ){
			title = "펼치기";
		}
	
		$(this).before("<button class=\"btn btn-xs btn-default js-fold\" data-id=\""+id+"\">"+title+"</button>");
	
		$(this).hide();
	});
	$(".js-fold").each(function(i, obj){
		var foldId = $(this).data("id");
		$(this).click(function(){
			$("#"+foldId).show();
			$(this).hide();
		});
	});

	// 본문에 아이프레임이 있으면 너비를 맞춰준다.
	o.util.autoWidth("#content", "#content iframe");
	
	// 본문이 끝나면 처음으로 돌아갈 수 있는 링크 하나를 만들어준다.
	$("#content").after("<p class=\"text-right\"><a href=\"#\">Go Top(문서 처음으로)</a></p>");
};

function addInfoBody(currentSeq){
	var body = o.util.multiLine(function(){
	  /*!
	  	<!-- 추가 정보 -->
		<div id="add_info" style="padding-top:1em;">
			<span id="content_category" class="text-muted" style="display:none;"></span>│<span id="content_created" class="mycolor1">{{created}}</span>
			<div class="btn-group" role="group">
				<button id="bigsize" class="btn btn-default btn-xs"><i id="bigsizeLabel" class="fa fa-expand"> Wide</i></button>
				<button id="up_font_size" class="btn btn-default btn-xs"><i class="fa fa-text-height"></i> 확대</button>
				<button id="down_font_size" class="btn btn-default btn-xs"><i class="fa fa-text-height"></i> 축소</button>
			</div>
		</div>
		<hr>
	  */
	});
	
	body = o.mapper.toHtml(body, { created: postsMeta[currentSeq].created });
	
	$("#content_title").after(body);
	
	// 추가 기능 버튼 리스너
	$("#bigsize").click(function(){
		if( $("#bigsize").hasClass("js-active") ){
			$("#bigsize").removeClass("js-active");
			$("#left_wrap").removeClass();
			$("#left_wrap").addClass("col-md-10 col-md-offset-1");
			$("#bigsizeLabel").addClass("fa-expand");
			$("#bigsizeLabel").removeClass("fa-compress");
		}
		else{
			$("#bigsize").addClass("js-active");
			$("#left_wrap").removeClass();
			$("#left_wrap").addClass("col-md-12");
			$("#bigsizeLabel").addClass("fa-compress");
			$("#bigsizeLabel").removeClass("fa-expand");
		}
	});
	
	$("#up_font_size").click(function(){
		var fontSize = $("html").css("font-size").replace("px","")*1.1;
		$("html").css("font-size", fontSize+"px");
	});
	$("#down_font_size").click(function(){
		var fontSize = $("html").css("font-size").replace("px","")*0.9;
		$("html").css("font-size", fontSize+"px");
	});
	
	// 카테고리 이름 출력
	$("#content_category").html(ArchiveGroup.findName(currentSeq)).show();
};

// s:우측 카테고리 관련
// start : ReferencePost
var referencePostTemplate = o.util.multiLine(function(){
	/*!
	 <li id="toplist_{{seq}}">
	 <a href="/blog/{{seq}}">
	 <span style="display:block;">{{title}}<span class="pull-right hidden-xs"><span>{{category}}</span>│<span class="mycolor1">{{created}}</span></span></span>
	 </a>
	 </li>
	 */
});

// order : true면 상단, false면 하단에 삽입
function addReferencePost(item){
	item["category"] = ArchiveGroup.findName(item["seq"]);
	var html = o.mapper.toHtml(referencePostTemplate, item);
	$("#top_list ul").append(html);

	//$("#toplist_"+seq).hide().delay(500).fadeIn("slow");
};

function initReferencePost(){
	var initBody = o.util.multiLine(function(){
		/*!
			<hr>
			<h3 style="font-size:1.5em; font-weight:bold;">Reference Post</h3>
			<a href="javascript:;" id="top_more_after"><span class="more text-center" style="border-bottom: 1px solid #eee;">▲more</span></a>
			<ul class="list-unstyled" style="margin-bottom: 0px;">	
			</ul>
			<a href="javascript:;" id="top_more_before"><span class="more text-center" style="border-top: 1px solid #eee;">▼more</span></a>
		*/
	});
	$("#top_list").html(initBody);
	
	$("#top_more_after").click(function(){
		$("#top_list ul li").each(function(){				
			if( $(this).css("display") != "none" ){
				for( var i = 0; i <= 5; i++ ){
					showAnimationForReferenecePost($(this), "prev", i, i*100 );
				}
			}
		});
	});
	$("#top_more_before").click(function(){
		$($("#top_list ul li").get().reverse()).each(function(){				
			if( $(this).css("display") != "none" ){
				for( var i = 0; i <= 5; i++ ){
					showAnimationForReferenecePost($(this), "next", i, i*100 );
				}
			}		
		});
	});
};

function makeReferencePost(seq){
	$("#top_list ul").html("");
	var data = ArchiveGroup.findGroup(seq);
	if( data == null ) return;
	var meta = postsInfo.getMeta();
	for(var i = data.length-1; i >= 0 ; i--){
		addReferencePost(meta[data[i]]);
	}

	$("#toplist_"+seq).data("current", true);
	$("#toplist_"+seq).html($("#toplist_"+seq+" a").html());

	$("#top_list ul li").each(function(){
		if( $(this).data("current") ){
			$("#top_list ul li").hide();
			
			showAnimationForReferenecePost($(this), "prev", 3, null);
			showAnimationForReferenecePost($(this), "prev", 2, null);
			showAnimationForReferenecePost($(this), "prev", 1, null);
			showAnimationForReferenecePost($(this), "prev", 0, null);
			showAnimationForReferenecePost($(this), "next", 1, null);
			showAnimationForReferenecePost($(this), "next", 2, null);
			showAnimationForReferenecePost($(this), "next", 3, null);

			if($(this).prev().prev().prev().prev().length > 0 ){
				
				$("#top_more_after").show();
			}
			if($(this).next().next().next().next().length > 0 ){
				$("#top_more_before").show();

			}
		}
	});

	$("#top_list").slideDown(250, 'linear', function(){});
};

function showAnimationForReferenecePost( _obj, order, loopCnt, delay ){
    var obj = _obj;
    for( var i = 0 ; i < loopCnt; i++ ){
        if( order == "next" ){
            obj = obj.next();
        }
        else{
            obj = obj.prev();
        }
    }
    if( $(obj).length > 0 ){
        var _delay = 250;
        if( delay != null ){
            _delay = delay;
        }
        if (o.animate) {
            o.animate.fadeIn(obj.attr("id"), _delay, 600);
        } else {
            // deprecated
            $(obj).delay(_delay).fadeIn("slow");
        }
    } else {
        if( order == "next" ){
            $("#top_more_before").hide();
        }
        else{
            $("#top_more_after").hide();
        }
    }
};
// end : ReferencePost

$( document ).ready(function(){
	var maxPostsCnt = o.util.getObjectSize(postsInfo.getMeta()); // 포스트 총 개수
	
	/* current Seq 처리 */
	var currentLocation = window.location.href;
	currentLocation = currentLocation.replace("#", "");
	currentLocation = currentLocation.replace(".html", "");
	var currentLocationToken = currentLocation.split("/");
	
	var currentSeq = Number(currentLocationToken[currentLocationToken.length-1]);
	
	/* 블로그 부가 효과 선처리 */
	// ie 사용자에게 크롬 브라우저 사용 유도
	if( o.browser.isLowerIE(10) ){
		o.toast.info("IE를 업그레이드 해주시거나 다른 브라우저를 이용하세요.");
	}
	
	/* meta 정보 처리 */
	if ($("head title").length <= 0)
	    $("head").append("<title>"+postsMeta[currentSeq].title+" :: JDM's Blog</title>");
	
	/* header 처리 */
	Header.printGnb();
	Header.printTopSubject( "JDM's Blog", "/blog", "온갖 테스트 결과가 기록되는 이곳은 JDM's Blog입니다. :3");
		
	/* 아카이브 그룹 초기화 */
	ArchiveGroup.init(maxPostsCnt);
	
	/* 본문 상단 템플릿 처리 */
	var title = o.util.multiLine(function(){
		/*!
			<!-- 제목 -->
			<h1 id="content_title">{{title}}</h1>
		*/
	});
	title = o.mapper.toHtml(title, { title: postsMeta[currentSeq].title })
	$("article").prepend(title)
	addInfoBody(currentSeq);
	
	/* 본문 이펙트 효과 모음 */
	applyContentEffect();
	
	/* 본문 하단 공간 */
	var subAreaBody = o.util.multiLine(function(){
	/*!
		<!-- 본문 하단 공간 -->
		<div id="sub_area">
		  <!-- 크리에이티브 커먼즈 & 카피라이트 -->
			<div id="copyright_body"></div>
			<!-- 게시글 목록 -->
			<div id="top_list" style="display:none; margin-bottom:1em;"></div>
		</div>
		<!-- 한줄 공간 -->
		<div id="comment_body" class="tab-content" style="margin-top:1em;"></div>
	*/
	});
	$("article").after(subAreaBody);
	
	/* 카피라이트 문구 처리 */
	Copyright.init();
	
	/* 관련 게시글 목록 생성 */
	initReferencePost();
	makeReferencePost(currentSeq);
	
	/* 코멘트 관련 처리 */
	Comment.init(currentSeq);
	
	/* Bottom 처리(SideBar) */
	Bottom.init(maxPostsCnt);

});
