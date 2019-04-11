var Bottom = (function(){
  /*
    maxPostsCnt : 최대 포스트 개수
  */
  var init = function(){
    var body = `
        <!-- bottom 영역 -->
        <div class="col-md-12" id="sidebar" role="navigation">
  				<!-- 1단 -->
  				<div class="col-md-6">
  					<!-- 프로필 -->
  					<div class="panel">
  						<div class="panel-heading">
  							<p class="panel-title">Blog Photo</p>
  						</div>	
  						<div class="panel-body">
  							<p><img id="profile_img" class="img-responsive img-rounded" src="/blog/images/profile_1.jpg" alt="프로필 이미지"></p>
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
  			</div>`;

    $("#left_wrap").append(body);
    
    /* 포스트 총 개수 출력 */
	  $("#content_total").html(PostProvider.getPostMaxCount());
	  
	  /* 카테고리 메뉴 출력 */
	  var template = `
	        <li class="right_menu sub"><a href="{{seq}}"><span><i class="fa fa-angle-double-right"></i> {{name}}<span class="mycolor1">({{count}})</span></span></a></li>`;
	  $("#right_category").html("");
    var html = "";
    var categoryMap = PostProvider.getCategoriesMap();
    var categoryNames = Object.keys(categoryMap).sort();

    var firstOrders = ["My Story", "Dev Story", "Design Patterns", "Java", "Spring"].reverse();
    var lastOrders = ["ETC"];
    firstOrders.forEach(order => insertFirst(categoryNames, order));
    lastOrders.forEach(order => insertLast(categoryNames, order));

    categoryNames.forEach((category) => {
        const data = categoryMap[category];
        const obj = {};
        obj["name"] = category;
        obj["count"] = data.length;
        obj["seq"] = data[data.length-1].postNumber;
        html += o.mapper.toHtml( template, obj );
    });

    $("#right_category").html(html);
  };

    function insertFirst(array, name) {
        if (array.indexOf(name) < 0) return;
        array.splice(array.indexOf(name), 1);
        array.unshift(name);
    };

    function insertLast(array, name) {
        if (array.indexOf(name) < 0) return;
        array.splice(array.indexOf(name), 1);
        array.push(name);
    };
  
  return {
    init:init
  }
})();
