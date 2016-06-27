// smooth wheel
o.wheel.init(200,800);

// select modal type
var myBtModal = o.modal.BtModal;

// ie 사용자에게 크롬 브라우저 사용 유도
(function(){
	$(document).ready(function(){
		if( o.browser.isLowerIE(10) ){
			o.toast.info("IE를 업그레이드 해주시거나 다른 브라우저를 이용하세요.");
		}
	});
})();

// first-letter 처리
var FirstLetter = (function(){
	function init(){
	    $("#content p").each(function(){
	        $(this).prepend("<span style='padding-left:0.5em;'></span>");
	    });
	};
	return{
	    init:init
	}
})();

// 접기(fold) 처리(위키 문법에 추가됨)
var Folder = (function(){
	function init(){
	
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
	};
	
	return{
		init:init
	}
})();

// 블로그 본문 로딩중임을 알림
var BlogLoadingBar = (function(){
	function _loading(){
		$( "#blog_loading_bar p" ).animate({ opacity: "toggle" }, 1000, "linear", function(){ _loading(); });
	};

	function init(){
		var html = "<div id=\"blog_loading_bar\" style=\"z-index: 7777; width:100%; height:100%;\">";
		html += "<p style=\"display:table-cell; text-align:center; vertical-align:middle;font-family:Arial; font-size:3em;color:#ccc;\">";
		html += "Loading...";
		html += "</p>";
		html += "</div>";
		$("#content").html(html);
		_loading();
	};

	function close(){
		$("#blog_loading_bar").remove();
	};

	return{
		init:init,
		close:close
	}
})();

// 데이터 없는 포스트 처리
try{
	var currentSeq = $("#blog_seq").val();
	var postMeta = postsMeta[currentSeq];

	// 이곳에서 null 체크 된 것은 row db에 있는 것이다. 아니면 진짜 데이터가 날아갔거나...
	if( postMeta == null ){
		window.location.href="http://www.jdm.kr/404";
	}
} catch( ex ){
	o.toast.error("parse Error.");
}

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

	// s: 본문 소제목에 번호를 붙이자.
	(function(){
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
	})();
	// e: 본문 소제목에 번호를 붙이자.

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
	
	o.popup.image("#content img"); // image popup...
	FirstLetter.init();
	Folder.init();
};


// s: 추가 기능 버튼
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
// e: 추가 기능 버튼

// s:우측 카테고리 관련

// d3 chart print...
if( !o.browser.isLowerIE(8) ){
	o.loader.getScript( "//d3js.org/d3.v3.js", function(){
		function printBarChart(data) {

			var xName = "dateString";
			var yName = "totalCount";

			var id = "#count_d3";
			$(id).text("");
			var _width = $(id).width();
			var _height = $(id).width(); // 정사각형이므로
			var maxCountValue = D3maxValue(data,yName);

			var margin = {
				top : 20,
				right : 0,
				bottom : 30,
				left : 0
			};
			var padding = 5; // 바 간격

			var width = _width - margin.left - margin.right;
			var height = _height - margin.top - margin.bottom;

			var svg = d3.select(id).append("svg")
				.attr("width",	width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom).append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// 바 생성

			svg.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.transition()
				.attr('x', function (d, i) {
					return i * ((width + padding) / data.length);
				})
				.attr('y', function (d) {
					return height - ((d[yName])*(height/maxCountValue));
				})
				.attr('width', width / data.length - padding)
				.attr('height', function (d) {
					return (d[yName])*(height/maxCountValue);
				});

			// 바 라벨
			svg.selectAll('g')
				.data(data)
				.enter()
				.append('text')
				.transition()
				.text(function (d) {
					return d[yName];
				})
				.attr('x', function (d, i) {
					return i * ((width + padding) / data.length) + (width / data.length - padding) / 2;
				})
				.attr('y', function (d) {
					return height - ((d[yName])*(height/maxCountValue)) + 10;
				})
				.attr('fill', function(d){
					return '#31708f';
				})
				.attr('font-size', '0.75em')
				.attr('text-anchor', 'middle');

			// x축 표시
			svg.selectAll('g')
				.data(data)
				.enter()
				.append('text')
				.transition()
				.text(function (d) {
					var formatData = d[xName]; // 2014-11-11
					return formatData.replace("-","").substring(4,9);
				})
				.attr('x', function (d, i) {
					return i * ((width + padding) / data.length) + (width / data.length - padding) / 2;
				})
				.attr('y', function (d) {
					return height + 10;
				})
				.attr('font-size', '0.75em')
				.attr('fill', function(d){
					var date = new Date(d[xName]);
					var today = new Date();
					if( date.getDay() == 0 ) return "red";
					if( date.getDay() == 6 ) return "blue";
					if( date.getDay() == today.getDay() ) return "black";
					return "gray";
				})
				.attr('text-anchor', 'middle');

			o.ajax.send({
				url:"//xapi.jdm.kr/counter/total",
				type:"get",
				done:function(data){
					var totalCount = o.util.getCommaString( Number(data.tot) );
					var x = $("#count_d3 svg").width();

					// 우측 상단
					svg.append('text')
						.transition()
						.text("현재까지 총 " + totalCount + "명 방문")
						.attr('x', x)
						.attr('y', -10)
						.attr('text-anchor', 'end')
						.attr('font-size', '0.75rem');
					//.attr('fill', 'white');
				}
			});
		}
		function D3maxValue(data, attr){
			var d = $(data);
			var max = 0;

			for( i = 0 ; i < d.length; i++ ){
				if( Number(d[i][attr]) > max ){
					max = Number(d[i][attr]);
				}
			}
			return max;
		}

		o.ajax.send({
			url:"//xapi.jdm.kr/counter/week",
			type:"get",
			done:function(data){
				/*data = data.sort(function(a,b){ return b.dateString.replace(/-/g,"") - a.dateString.replace(/-/g, "") ; });*/
				printBarChart(data);
			}
		});
	});
}else{
	$("#count_d3").parent().hide();
}

// start : ReferencePost
var referencePostTemplate = o.util.multiLine(function(){
	/*!
	 <li id="toplist_{{seq}}">
	 <a href="/{{seq}}">
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

function makeReferencePost(){
	var seq = $("#blog_seq").val();
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
        $(obj).delay(_delay).fadeIn("slow");
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

var SearchRegion = (function(){
    function getSize(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    function go_search(){
        var titleResults = {};
        var bodyResults = {};
        var searchStr = $("#search_str").val();
        searchStr = searchStr.toLowerCase();

        if( $.trim(searchStr) == "" || searchStr.length < 2 ){
            o.toast.error("검색어는 최소 2자 이상 입력해주세요.");
            return;
        }

        // search Title
        $.each( postsInfo.getMeta(), function(i, obj){
            if( obj.title.toLowerCase().indexOf(searchStr) >= 0 ){
                titleResults[obj.title] = obj;
            }
        });

        var childTemplate = o.util.multiLine(function(){
            /*!
                <li>
                    <a href="/{{seq}}">
                        <span style="display:block;">
                        {{title}}
                        <span class="pull-right hidden-xs"><span class="text-muted">{{category}}</span>│<span class="mycolor1">{{created}}</span></span>
                        </span>
                    </a>
                </li>            
            */
        });

        var template = o.util.multiLine(function(){
            /*!
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">" {{searchStr}} " 제목 검색 결과 총 <span class="mycolor1">{{titleCount}}</span>건</h3>
                    </div>
                    <div class="panel-body">
                        <ul class="list-unstyled">
                            {{titleChild}}
                        </ul>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">" {{searchStr}} " 본문 검색 결과 총 <span class="mycolor1">{{bodyCount}}</span>건</h3>
                    </div>
                    <div class="panel-body">
                        <ul class="list-unstyled">
                            {{bodyChild}}
                        </ul>
                    </div> 
                </div>
            */
        });

        var titleChild = "";
        $.each(titleResults, function( name, obj ){
        	obj.category = ArchiveGroup.findName( obj.seq );
            titleChild += o.mapper.toHtml(childTemplate, obj);
        });

        var searchResult = {};
        searchResult.searchStr = searchStr;
        searchResult.titleCount = getSize(titleResults);
        searchResult.titleChild = titleChild;
        searchResult.bodyCount = 0;
        searchResult.bodyChild = "업데이트 준비중입니다. ^^";
        var html = o.mapper.toHtml(template, searchResult);

        $("#left_wrap").html(html);

        // css
        $("#left_wrap .panel li a").css("text-decoration", "none");
        $("#left_wrap .panel li").hover(
            function(){ $(this).css("background", "#eee"); },
            function(){ $(this).css("background", ""); }
        );

    };

    return{
        go_search:go_search
    };

})();

$("#go_search").click(function(){
    SearchRegion.go_search();
});
$("#search_str").keyup(function(event){
    if( event.keyCode == '13' ){
        SearchRegion.go_search();
    }
});

var RightCategory = (function(){

	var template = o.util.multiLine(function(){
	    /*!
	        <li class="right_menu sub"><a href="{{seq}}"><span><i class="fa fa-angle-double-right"></i> {{name}}<span class="mycolor1">({{count}})</span></span></a></li>
	    */
	});
	
	function init(){
	    $("#right_category").html("");
	    var html = "";
	    var names = ArchiveGroup.findNameAll();
	    for( var i = 0; i < names.length; i++ ){
	    	var name = names[i];
	    	var group = ArchiveGroup.findGroupByName(name);
	    	var obj = {};
	    	obj["name"] = name;
	    	obj["count"] = group.length;
	    	obj["seq"] = group[group.length-1];
	    	html += o.mapper.toHtml( template, obj );
	    }

	    $("#right_category").html(html);
	    
	};
	return {
	    init:init
	}
})();

$( document ).ready(function(){
	var maxPostsCnt = o.util.getObjectSize(postsInfo.getMeta()); // 포스트 총 개수
	var currentSeq = $("#blog_seq").val(); // 현재 시퀀스
	
	/* 아카이브 그룹 초기화 */
	ArchiveGroup.init(maxPostsCnt);
	
	/* 본문 이펙트 효과 모음*/
	applyContentEffect();

	/* 카테고리 메뉴 초기화 */
	RightCategory.init();
	
	/* 관련 게시글 목록 생성 */
	makeReferencePost();
	
	/* 포스트 총 개수 출력 */
	$("#content_total").html(maxPostsCnt);
	
	/* 카테고리 이름 출력 */
	$("#content_category").html(ArchiveGroup.findName(currentSeq)).show();
});
