$( document ).ready(function(){

    ArchiveGroup.init(o.util.getObjectSize(postsInfo.getMeta()));

	// smooth wheel
	o.wheel.init(200,800);

	for( var i = 0 ; i < 10; i++ ){
	    addPost();
	}

    /* scroll end event catch */
    $(window).scroll(function() {
        if ( o.util.isEndScroll() ) {
            addPost();
        }
    });

    /* scroll check */
    setInterval(function(){
        if ( o.util.isEndScroll() ) {
            addPost();
        }
    }, 1000);

    function addPost(){
        var lastId;

        try{
            lastId = $("#list_wrap>div:last>div:last").attr("id").split("_")[1];
        } catch( ex ){
            lastId = getSize(postsMeta) + 1;
        }


        var printingId = lastId - 1;

        var html = "";
        var template = o.util.multiLine(function(){
            /*!
                <div id="doc_{{seq}}" class="col-md-12">
                    <div class="item_wrap">
                        <span>{{created}} ┃ {{category}}</span>
                        <h4><a href="/blog/{{seq}}">{{title}}</a></h4>
                    </div>
                </div>
            */
        });

        if( postsMeta[printingId] != null ){
            var data = postsMeta[printingId];
            data.seq = printingId;
            data.category = ArchiveGroup.findName(printingId);
            html = o.mapper.toHtml(template, data);
            html = "<div class=\"row\">"+html+"</div>";
        }
        $("#list_wrap").append(html);
    };

    function getSize(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
});
