var Comment = (function(){
  var init = function(seq){
    var commentBody = o.util.multiLine(function(){
      /*!
        <div class="tab-pane active" id="DisqusComment">
					<!-- disqus -->
					<div id="disqus_thread"></div>
					<script>
					
					// RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
					// LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
					
					var disqus_config = function () {
					this.page.url = "{{url}}"; // Replace PAGE_URL with your page's canonical URL variable
					this.page.identifier = "{{identifier}}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
					};
					
					(function() { // DON'T EDIT BELOW THIS LINE
					var d = document, s = d.createElement('script');

					s.src = '//jdmsblog.disqus.com/embed.js';

					s.setAttribute('data-timestamp', +new Date());
					(d.head || d.body).appendChild(s);
					})();
					</script>
					<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
					<!-- // disqus -->
				</div>
      */
    });

    var url = "http://jdm.kr/blog/"+seq;
    var identifier = seq;
//    if (seq == 1) {
//    	identifier = "__1";
//    }
    var body = o.mapper.toHtml(commentBody, {url: url, identifier: identifier});
    
    $("#comment_body").html(body);
  };
  
  return {
    init:init
  }
})();
