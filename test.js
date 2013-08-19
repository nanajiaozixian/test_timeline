/*****添加frame展示   Doris  *******/
window.onload = function(){
  		//timeline功能
	  document.getElementById("show").onclick = function(){
		  var url = document.getElementById("addr").value;
		  $.ajax({
		  	type:"POST",
		  	url:"save.php",
		  	data:{pageurl: url},
		  	//dataType: "json",//希望回调函数返回的数据类型
		  	success:function(json){
		  			document.getElementById("webpage").src = json;
  					document.getElementById("webpage").style.display = "block";
  					addIFrameEvents();
		  		}
		  });
	  } 
  
  function addIFrameEvents(){
  	var iframe = document.getElementById("webpage");
  	if(iframe.attachEvent){
  		iframe.attachEvent("onload", function(){
  			//alert("Local iframe is now loaded.");
  			
  		});
  	}else{
  		iframe.onload = function(){
  			
  			var doc = document.getElementById('webpage').contentDocument;
  			var links_arr = doc.getElementsByTagName("link");
  			var hrefs = new Array();
  			for(var i=0; i<links_arr.length; i++){
  				//console.log(i+" "+links_arr[i].getAttribute("href"));
				hrefs.push(links_arr[i].getAttribute("href"));
				//console.log(hrefs.length);
  			}
			//var json = hrefs.toJSON();

		 $.ajax({
		  	type:"POST",
		  	url:"download.php",
		  	data:{csshref: hrefs},
		  	dataType: "json",//希望回调函数返回的数据类型
		  	success:function(json){
		  			
		  		}
		  });
  			
  			
  		}
  	}
  }
			
}	
				