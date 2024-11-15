$(document).ready(function(){
		$("#trainInner").css("width",1400*$("#trainInner  ul.room").size()+"px");
		$(".room:last").prependTo("#trainInner");	
		$("#trainInner").css("margin-left","-1400px");
		
		$("#pre").click(function(){   
				  $("#trainInner").animate({
						marginLeft:parseInt($("#trainInner").css("margin-left"))+1400+"px"  },"slow","swing",function(){ 
						 $(".room:last").prependTo("#trainInner");
						 $("#trainInner").css("margin-left","-1400px");
				  });	
			});
		
		$("#next").click(function(){
			$("#trainInner").animate({
			marginLeft:parseInt($("#trainInner").css("margin-left"))-1400+"px" },"slow","swing", function(){ 
			$(".room:first").appendTo("#trainInner");
			$("#trainInner").css("margin-left","-1400px"); 
					});
				});
				
		var  timerId  = setInterval(function(){$("#next").click();   },3000);

		
		});