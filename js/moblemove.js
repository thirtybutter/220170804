var timer=null;
var key=0;
var square=1;
var w=$(".banner>ul>li").eq(1).width();
//添加圆点
$(".banner>ul>li").each(function(){
	$(".banner>ol").append("<li></li>");
})
$(".banner>ol").children().eq(0).remove();
$(".banner>ol").children().eq(1).remove();
$(".banner>ol").children().eq(0).addClass("bannercurrent");
//自动轮播
timer=setInterval(function(){
	a();
},3000);
 function a(){
 	key++;
	square++;
	if(square>$(".banner>ul>li").length-2){
		square=1;
		$(".banner>ul").css("left",-(square-1)*16+"rem");
		key=0;
	}
	if(key>$(".banner>ol>li").length-1){
		key=0;
	}
	$(".banner>ul").animate({left:-square*16+"rem"},600);
	$(".banner>ol>li").eq(key).addClass("bannercurrent").siblings(".banner>ol>li").removeClass("bannercurrent");
 }
//左右滑动
$(".banner>ul").on("touchstart", function(e) {
    e.preventDefault(); 
    startX = e.originalEvent.changedTouches[0].pageX;
    Left=this.offsetLeft;
	window.clearInterval(timer);
    $(".banner>ul").on("touchmove", function(e) {
    	e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        X = moveEndX - startX;
        $(".banner>ul").css("left",(X+Left)+"px");
    });
});
    $(".banner>ul").on("touchend", function(e) {
    	e.preventDefault();
        //you滑
        if ( X > 0 ) {
            key--;
			square--;
    	    if(square<1){
				square=$(".banner>ul>li").length-2;
				$(".banner>ul").css("left",-(square+1)*16+"rem");
				key=$(".banner>ol>li").length-1;
			}
			if(key<0){
				key=$(".banner>ol>li").length-1;
			}
        }
        //zuo滑
        if ( X < 0 ) {
            key++;
			square++;
    	    if(square>$(".banner>ul>li").length-2){
				square=1;
				$(".banner>ul").css("left",-(square-1)*16+"rem");
				key=0;
			}
			if(key>$(".banner>ol>li").length-1){
				key=0;
			}
        } 
        $(".banner>ul").animate({"left":-square*16+"rem"},200);
        $(".banner>ol>li").eq(key).addClass("bannercurrent").siblings(".banner>ol>li").removeClass("bannercurrent");      
        timer=setInterval(function(){
			a();
		},3000);
    });