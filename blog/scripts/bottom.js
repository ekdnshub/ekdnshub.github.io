/*
maxPostsCnt : 최대 포스트 개수
*/
var Bottom = (function(maxPostsCnt){
  var init = function(){
    var body = o.util.multiLine(function(){
      /*!
        <!-- bottom 영역 -->
        <div class="col-md-10 col-md-offset-1" id="sidebar" role="navigation">
  				<!-- 1단 -->
  				<div class="col-md-6">
  					<!-- 프로필 -->
  					<div class="panel">
  						<div class="panel-heading">
  							<p class="panel-title">Blog Photo</p>
  						</div>	
  						<div class="panel-body">
  							<p><img id="profile_img" class="img-responsive img-rounded" src="/img/profile_1.jpg" alt="프로필 이미지"></p>
  							<p style="margin-top:10px;">귀여운 꾸끼, 가끔 날 괴롭히는 고양이...</p>
  						</div>
  					</div>
  					<!-- // 프로필 -->
  				</div>
  				<!-- // 1단 -->
  				<!-- 2단 -->
  				<div class="col-md-6">
  					<div class="panel">
  						<div class="panel-heading">
  							<p class="panel-title">Category <span style="font-size:0.8em;"><i class="fa fa-pencil"></i> <span id="content_total" class="mycolor1"></span></span></p>
  						</div>
  						<div class="panel-body">
  							<div class="right_menu">
  								<ul id="right_category" class="list-unstyled">
  									Loading...
  								</ul>
  							</div>
  						</div>
  					</div>
  				</div>
  				<!-- // 2단 -->
  			</div>
      */
    });

    $("#left_wrap").append(body);
    
    /* 포스트 총 개수 출력 */
	  $("#content_total").html(maxPostsCnt);
	  
	  /* 카테고리 메뉴 출력 */
	  var template = o.util.multiLine(function(){
	    /*!
	        <li class="right_menu sub"><a href="{{seq}}"><span><i class="fa fa-angle-double-right"></i> {{name}}<span class="mycolor1">({{count}})</span></span></a></li>
	    */
	  });
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
})(maxPostsCnt);
