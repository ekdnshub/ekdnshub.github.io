var ReferencePost = (function(PostProvider) {
    var referencePostTemplate = `
         <li id="toplist_{{postNumber}}">
         <a href="/blog/{{postNumber}}">
         <span class="toplist_main_span">{{title}}<span class="pull-right hidden-xs"><span>{{category}}</span>│<span class="mycolor1">{{created}}</span></span></span>
         </a>
         </li>`;

    // order : true면 상단, false면 하단에 삽입
    function addReferencePost(post){
        var html = o.mapper.toHtml(referencePostTemplate, post);
        $("#top_list ul").append(html);
    };

    function initReferencePost(){
        var initBody = `
<hr>
<h3 id="reference_head">관련 포스트</h3>
<a href="javascript:;" id="top_more_after"><span class="more text-center">▲최신글</span></a>
<ul class="list-unstyled">
</ul>
<a href="javascript:;" id="top_more_before"><span class="more text-center">▼이전글</span></a>
`;
        $("#top_list").html(initBody);

        $("#top_more_after").click(function(){
            $("#top_list ul li").each(function(){
                if( $(this).css("display") != "none" ){
                    for( var i = 0; i <= 5; i++ ){
                        showAnimationForReferenecePost($(this), "prev", i, i*40);
                    }
                }
            });
        });
        $("#top_more_before").click(function(){
            $($("#top_list ul li").get().reverse()).each(function(){
                if( $(this).css("display") != "none" ){
                    for( var i = 0; i <= 5; i++ ){
                        showAnimationForReferenecePost($(this), "next", i, i*40);
                    }
                }
            });
        });
    };

    function makeReferencePost(post){
        var seq = post.postNumber;
        $("#top_list ul").html("");
        var data = PostProvider.getPostArrayByCategory(post.category);
        if( data == null ) return;
        for(var i = data.length-1; i >= 0 ; i--){
            addReferencePost(data[i]);
        }

        // 현재글 마크업 조작
        $("#toplist_"+seq).data("current", true);
        $("#toplist_"+seq).html($("#toplist_"+seq+" a").html());
        $("#toplist_"+seq+">span").wrap("<strong>");
        $("#toplist_"+seq+">strong>span").prepend("[현재글] ");

        $("#top_list ul li").each(function(){
            if( $(this).data("current") ){
                $("#top_list ul li").hide();

                showAnimationForReferenecePost($(this), "prev", 3, null);
                showAnimationForReferenecePost($(this), "prev", 2, null);
                showAnimationForReferenecePost($(this), "prev", 1, null);
                showAnimationForReferenecePost($(this), "prev", 0, null);
                showAnimationForReferenecePost($(this), "next", 1, null);
                showAnimationForReferenecePost($(this), "next", 2, null);
                showAnimationForReferenecePost($(this), "next", 3, null);

                if($(this).prev().prev().prev().prev().length > 0 ){
                    $("#top_more_after").show();
                }
                if($(this).next().next().next().next().length > 0 ){
                    $("#top_more_before").show();
                }
            }
        });

        $("#top_list").slideDown(250, 'linear', function(){});
    };

    function nextItemByOrder(order, obj) {
        if (order == "next") {
            return obj.next();
        } else {
            return obj.prev();
        }
    };

    function hideMoreButton(order) {
        if (order == "next") {
            $("#top_more_before").hide();
        } else {
            $("#top_more_after").hide();
        }
    };

    function showAnimationForReferenecePost( _obj, order, loopCnt, delay ){
        var obj = _obj;
        for( var i = 0 ; i < loopCnt; i++ ){
            obj = nextItemByOrder(order, obj);
        }
        var nextObj = nextItemByOrder(order, obj);

        if ($(obj).length > 0) {
            var _delay = 250;
            if( delay != null ){
                _delay = delay;
            }
            $(obj).delay(_delay).fadeIn("slow");
        } else {
            hideMoreButton(order);
        }

        if ($(nextObj).length <= 0) {
            hideMoreButton(order);
        }
    };
    return {
        init: function(post) {
            initReferencePost();
            makeReferencePost(post);
        }
    }
})(PostProvider);