var Header = (function(){

	var gnb = o.util.multiLine(function(){
		/*!
			<div id="_gnb" class="text-right" style="font-size:0.8em; padding:1px; background-color:#259CE0;">
				<a style="color:white; text-decoration:none;" href="//www.jdm.kr">About</a>│<a style="color:white; text-decoration:none;" href="//blog.jdm.kr">Blog</a>│<a style="color:white; text-decoration:none;" href="//board.jdm.kr">Board</a>│<a style="color:white; text-decoration:none;" href="//guest.jdm.kr">Guestbook</a>│<a style="color:white; text-decoration:none;" href="//lab.jdm.kr">Lab</a>&nbsp;
			</div>
		*/
	});

	var template = o.util.multiLine(function(){
		/*!
			<div id="top_subject" class="jumbotron" style="margin-bottom:2em; padding:1em; background-color:#259CE0; filter:alpha(opacity=80); opacity:0.8; -moz-opacity:0.8; color:white; border-radius: 0;">
				<p style="font-size:3em;" class="text-center">
					<a style="text-decoration: none; color:white; text-shadow:2px 2px 2px #06476C;" href="{{ href }}">{{ title }}</a>
				</p>
				<p style="font-size:0.75em;" class="text-center">
					{{ content }}
				</p>
			</div>
		*/
	});

	function orgTopSubject( type, title, href, content ){
		var map = {};
		map.title = title;
		map.href = href;
		map.content = content;

		var html = o.mapper.toHtml( template, map );

		switch( type ){
			case "direct":
				document.write( html );
				break;
			default:
				$("#_gnb").after(html);
				break;
		}
	};

	// direct로 시작하는 함수는 반드시 출력이 되어야 하는곳에 스크립트를 삽입해야 한다.
	// <script src="./top_bt.js"></script>
	// <script>Top.directGnb();</script>
	function directGnb(){
		document.write( gnb );
	};

	function directTopSubject( title, href, content ){
		orgTopSubject( "direct", title, href, content);
	};

	function printGnb(){
		$("body").prepend( gnb );
	};

	function printTopSubject( title, href, content ){
		orgTopSubject( "", title, href, content);
	};

	return {
		directGnb:directGnb,
		directTopSubject:directTopSubject,
		printGnb:printGnb,
		printTopSubject:printTopSubject
	}
})();