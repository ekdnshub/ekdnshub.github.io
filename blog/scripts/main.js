$(document).ready(function(){

    var totalPostCount = o.util.getObjectSize(postsInfo.getMeta());
    var currentIndex = ++totalPostCount;

    ArchiveGroup.init(totalPostCount);

    function load(count) {
        for(var i = 0 ; i < count; i++){
	        addPost(--currentIndex);
	    }
    };

    function addPost(printingId){
        var html = "";
        var template = o.util.multiLine(function(){
            /*!
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title"><a href="/blog/{{seq}}" style="">{{title}}</a></h4>
                    <p class="card-text"><small class="text-muted">{{category}} | {{created}}</small></p>
                </div>
            </div>
            */
        });

        if( postsMeta[printingId] != null ){
            var data = postsMeta[printingId];
            data.seq = printingId;
            data.category = ArchiveGroup.findName(printingId);
            html = o.mapper.toHtml(template, data);
        }

        $("#list_wrap").append("<div class=\"card-deck\">"+html+"</div>");
    };

    function isEndScroll() {
        if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
            return true;
        }
        return false;
    };

    $(window).scroll(function(){
        if (isEndScroll()) load(6);
    });

    load(15);
});
