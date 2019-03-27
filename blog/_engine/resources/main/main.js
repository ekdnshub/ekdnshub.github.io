Header.printGnb();
Header.printTopSubject("JDM's Blog", "/blog", "온갖 테스트 결과가 기록되는 이곳은 JDM's Blog입니다. :3");

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
        var template = `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title"><a href="/blog/{{seq}}" style="">{{title}}</a></h4>
                    <p class="card-text"><small class="text-muted">{{category}} | {{created}}</small></p>
                </div>
            </div>
        `;

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
