window.onload=function(){
	var oP1=document.querySelector(".p1");
	var oP2=document.querySelector(".p2");
	var oP3=document.querySelector(".p3");
	var oP4=document.querySelector(".p4");
	
	var oBtn=document.querySelector(".btn");
	
	var arr = ['100px', 'abc' - 6, [], -98765, 34, -2, 0, '300', , function() {
	    alert(1);
	}, null, document, [], true, '200px' - 30, '23.45元', 5, Number('abc'), function() {
	    alert(3);
	}, 'xyz' - 90];
	
	//1.所有的数字是：
		oP1.innerHTML="";
		var list1="";
		for(var i=0;i<arr.length;i++){
		
			if(typeof(arr[i])=='number'&& !isNaN(arr[i])){
				list1+=arr[i]+' ,';
			}
			
		}	
		
		oP1.innerHTML=list1;
		
		oBtn.onclick=function(){
			oP1.innerHTML=list1;
		}
		
	//2.可转成数字的是：	
	oP2.innerHTML="";
	var listNum2="";
	
	for(var i=0;i<arr.length;i++){
		if(parseFloat(arr[i])||parseInt(arr[i])){
			listNum2+=arr[i]+",";
		}
	}
	oP2.innerHTML=listNum2;
		
	oBtn.onclick=function(){
			oP2.innerHTML=listNum2;
	}
	
	//3.可以转成数字最大的：
	oP3.innerHTML="";
	var listMax=0;
	var arrMax=[];
	for(var i=0;i<arr.length;i++){
		var a1=parseFloat(arr[i]);
		var a2=parseInt(arr[i]);
		
		if(parseFloat(arr[i])||parseInt(arr[i])){
			if(listMax<a1){
				listMax=a1
			}
			if(listMax<a2){
				listMax=a2
			}
		}
	}
	oP3.innerHTML=listMax;
		
	oBtn.onclick=function(){
			oP3.innerHTML=listMax;
	}
	
	//4.所有运算结果是NaN位置
	
	oP4.innerHTML="";
	var listNaN="";
	for(var i=0;i<arr.length;i++){
		if(typeof(arr[i])=='number'&& isNaN(arr[i])){
			listNaN+=i+' ,';
		}
	}
	
	oP4.innerHTML=listNaN;	
	oBtn.onclick=function(){
			oP4.innerHTML=listNaN;
	}
	
}


