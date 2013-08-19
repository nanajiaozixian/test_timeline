/*****添加frame展示   Doris  *******/
window.onload = function(){
  /*$('#show').click(function(){
  	var url = document.getElementById("addr").value;
  	document.getElementById("webpage").src = url;
  	document.getElementById("webpage").style.display = "block";
  	
  	addIFrameEvents();
  	
  });*/
  
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
  			//alert("Local iframe is now loaded.");
  			//var iframewindow = iframe.contentWindow;
  			var doc = document.getElementById('webpage').contentDocument;
  			var links_arr = doc.getElementsByTagName("link");
  			//var linkss = links_arr.join("|");
  			for(var i=0; i<links_arr.length; i++){
  				console.log(i+" "+links_arr[i]);
  			}
  			
  			//var links_arr = $("#webpage").contents().find("link");
  			//var links_arr = $('link', document.frames('webpage').document);
  			//var hrefs_arr= links_arr.attr('href');
  		}
  	}
  }
			
}	
				