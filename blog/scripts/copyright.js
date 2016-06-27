var Copyright = (function(){
  var init = function(){
    var body = o.util.multiLine(function(){
      /*!
  			<div id="creativecommons" style="font-size: 0.8rem; color: gray; margin-top:5px;">
  				이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko">저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.
  				<br>This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
  			</div>
  			<div id="trademark-name-owner" style="font-size: 0.8rem; color: gray; margin-top:5px;">
  				모든 제품명 및 상표는 해당 소유주의 자산입니다.<br>
  				All product names and trademarks are the property of their respective owners.
  			</div>
  			<div id="copyright-issues" style="font-size: 0.8rem; color: gray; margin-top:5px;">
  				<strong>저작권 위배</strong> 또는 잘못된 내용이 있으면 부담없이 댓글 또는 메일 부탁드립니다.<br>
  				If there are <strong>copyright issues</strong>, please contact webmaster@jdm.kr or write reply.
  			</div>
      */
    });
    $("#copyright_body").html(body);
  };
  
  return {
    init:init
  };
})();
