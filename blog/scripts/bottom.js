var Bottom = (function(){
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
  };
  
  return {
    init:init
  }
})();
