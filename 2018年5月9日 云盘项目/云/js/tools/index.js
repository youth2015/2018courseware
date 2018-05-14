let t = {
    getChild(id){
        let childArr = [];
        for(let attr in data){
            if(data[attr].pid == id){
                childArr.push(data[attr]);
            }
        }
        //如果有子级就返回子级，没有返回null;
        if(childArr.length > 0){
            return childArr;
        }else{
            return null;
        }
    }
}