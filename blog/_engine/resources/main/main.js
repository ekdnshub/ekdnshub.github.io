$(document).ready(function(){
    var totalPostCount = PostProvider.getPostMaxCount();
    var currentIndex = ++totalPostCount;
    var postsMap = PostProvider.getMap();

    function load(count) {
        for(var i = 0 ; i < count; i++){
	        addPost(--currentIndex);
	    }
    };

    function addPost(printingId){
        var html = "";
        var template = `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title"><a href="/blog/{{postNumber}}" style="">{{title}}</a></h4>
                    <p class="card-text"><small class="text-muted">{{category}} | {{created}}</small></p>
                </div>
            </div>
        `;

        if( postsMap[printingId] != null ){
            var post = postsMap[printingId];
            html = o.mapper.toHtml(template, post);
        }

        $("#list_wrap").append("<div class=\"card-deck\">"+html+"</div>");
    };

    $(window).scroll(function(){
        if (o.util.isEndScroll(300)) load(6);
    });

    load(15);
});
