	var arr = ['100px', 'abc' - 6, [], -98765, 34, -2, 0, '300', , function() {
	    alert(1);
	}, null, document, [], true, '200px' - 30, '23.45元', 5, Number('abc'), function() {
	    alert(3);
	}, 'xyz' - 90];
	
	//1.所有的数字是：
		var x="",y=x,z=y;
		var max = -Infinity
		
		for(var i=0;i<arr.length;i++){
			var item=arr[i];
			
			if(typeof item==='number'&& item===item){
				x+=item+' ,';
			}
			
			
			if(parseFloat(item)){
				if(max < parseFloat(item)){
						max = parseFloat(item)
					}
					
					if(typeof item==="string"){
						item='"'+item+'"';
					}
					y+=item+','
			}
			
			if(item!==item){
				z+=i+','
			}	
		}	
		
		console.log("所有数字的是"+x);
		console.log('所有可以转成数字的是: ' + y);
		console.log('可以转成数字的最大值是: ' + max);
		console.log('所有结果是NaN的位置是: ' + z);