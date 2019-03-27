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
        var template = $("#postBody").text();

        if( postsMeta[printingId] != null ){
            var data = postsMeta[printingId];
            data.seq = printingId;
            data.category = ArchiveGroup.findName(printingId);
            html = o.mapper.toHtml(template, data);
        }

        $("#list_wrap").append("<div class=\"card-deck\">"+html+"</div>");
    };

    function isEndScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            return true;
        }
        return false;
    };

    $(window).scroll(function(){
        if (isEndScroll()) load(6);
    });

    load(15);
});
