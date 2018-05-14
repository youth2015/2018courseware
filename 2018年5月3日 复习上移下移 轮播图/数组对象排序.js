/*数组排序，num为正数是从小到大，num是负数从大到小*/
	var compare = function (prop,num) {
	    return function (obj1, obj2){
	        var val1 = obj1[prop];
	        var val2 = obj2[prop];
	        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
	            val1 = Number(val1);
	            val2 = Number(val2);
	        }
	        if (val1 < val2) {
	            return -num;
	        } else if (val1 > val2) {
	            return num;
	        } else {
	            return 0;
	        }            
	    } 
	}