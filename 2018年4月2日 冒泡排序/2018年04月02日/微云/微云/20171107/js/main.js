const wy = {
  fsContainer: document.getElementById('fsContainer'),
  fsItems: document.getElementById('fsContainer').children,
  breadCrumb: document.getElementById('breadCrumb'),
  checkAllBox: document.getElementById('checkAllBox'),
  checkedFileNum: document.getElementById('checkedFileNum'),
  reName: document.getElementById('reName'),
  alertInfo: document.getElementById('alertInfo'),
  currentListId: 0,
  checkedBuffer: {length: 0},
  currentBuffer: [],
  parentsBuffer: []
};

// 初始化
intoFolder(wy.currentListId);

// 进入新的界面
function intoFolder(currentListId){
  wy.checkedBuffer = {length: 0};
  wy.currentBuffer = createFileList(db, currentListId);
  wy.parentsBuffer = createBreadCrumList(db, currentListId);
}

// 生成文件列表
function createFileList(db, id){
  wy.fsContainer.innerHTML = '';
  let data = getChildrenById(db, id);
  data.forEach(function(item, i) {
    wy.fsContainer.appendChild(createFileNode(item));
  });
  return data;
}

// 生成面包削导航
function createBreadCrumList(db, id){
  wy.breadCrumb.innerHTML = '';
  var data = getAllParents(db, id);
  data.forEach(function(item, i) {
    wy.breadCrumb.appendChild(createBreadCrumbNode(item))
  });
  return data;
}

// 进入文件夹和选中文件夹
wy.fsContainer.addEventListener('click', function (e){
  const target = e.target;
  if(target.classList.contains('file-img') || target.classList.contains('file-wrap')){
    intoFolder(wy.currentListId = target.fileId);
  }
  if(target.classList.contains('file-check-click')){
    checkNodeData(target);
  }
});

// 面包削导航跳转
wy.breadCrumb.addEventListener('click', function (e){
  const target = e.target;
  if(target.fileId !== undefined && wy.currentListId !== target.fileId){
    intoFolder(wy.currentListId = target.fileId);
  }
});

// 单选和全选
function checkNodeData(checkNode){
  const targetParent = checkNode.parentNode;
  const {fileId} = targetParent;
  const checked = targetParent.classList.toggle('checked');
  const {checkedBuffer, checkAllBox, checkedFileNum, fsItems} = wy;
  const len = fsItems.length;
  
  if(checked){
    checkedBuffer[fileId] = targetParent;
    checkedBuffer.length++;
  }else{
    delete checkedBuffer[fileId];
    checkedBuffer.length--;
  }
  
  const checkedLen = checkedFileNum.innerHTML = checkedBuffer.length;

  checkAllBox.classList.toggle('checked', checkedLen === len);
}

// 全选功能
checkAllBox.addEventListener('click', function (e){
  const isChecked = this.classList.toggle('checked');
  
  const {fsContainer, checkedBuffer, checkedFileNum, fsItems} = wy;
  
  const len = fsItems.length;
  
  if(isChecked){
    checkedBuffer.length = checkedFileNum.innerHTML = len;
  }else{
    wy.checkedBuffer = {length: 0};
    checkedFileNum.innerHTML = 0;
  }
  
  for(let i=0; i<len; i++){
    const fileItem = fsItems[i].querySelector('.file-wrap');  // 当前循环的这个文件结构
    const {fileId} = fileItem;  // const fileId = fileItem.fileId
    fileItem.classList.toggle('checked', isChecked);
    if(!checkedBuffer[fileId] && isChecked){
      checkedBuffer[fileId] = fileItem;
    }
  }
  
});

// 重名功能
wy.reName.addEventListener('click', function (e){
  const {checkedBuffer} = wy;
  const len = checkedBuffer.length;
  
  if(len > 1){
    return alertMessage('只能选中一个文件', 'error');
  }
  if(!len){
    return alertMessage('尚未选中文件', 'error');
  }
  setFileItemName(checkedBuffer);
});

function setFileItemName(checkedBuffer){
  const checkedEles = getCheckedFileFromBuffer(checkedBuffer)[0];
  const {fileId, fileNode} = checkedEles;
  
  const nameText = fileNode.querySelector('.name-text');
  const nameInput = fileNode.querySelector('.name-input');
  
  dblSetCls(nameInput, nameText, 'show');
  
  const oldName = nameInput.value = nameText.innerHTML;
  nameInput.focus();
  
  nameInput.onblur = function (){
    let newName = this.value.trim();
    if(!newName){
      dblSetCls(nameText, nameInput, 'show');
      this.onblur = null;
      return alertMessage('取消重命名', 'error');
    }
    if(newName === oldName){
      dblSetCls(nameText, nameInput, 'show');
      this.onblur = null;
      return;
    }
    if(!nameCanUse(db, wy.currentListId, newName)){
      this.select();
      return alertMessage('命名冲突', 'error');
    }
    nameText.innerHTML = newName;
    dblSetCls(nameText, nameInput, 'show');
    
    setItemById(db, fileId, {name: newName});
    
    alertMessage('命名成功', 'success');
    this.onblur = null;
  };
  
  window.onkeyup = function (e){
    if(e.keyCode === 13){
      nameInput.blur();
      this.onkeyup = null;
    }
  };
};

function dblSetCls(show, hidden, cls){
  show.classList.add(cls);
  hidden.classList.remove(cls);
}

// 将选中的元素缓存转成数组
function getCheckedFileFromBuffer(checkedBuffer){
  let data = [];
  for(let key in checkedBuffer){
    if(key !== 'length'){
      const currentItem = checkedBuffer[key];
      data.push({
        fileId: key,
        fileNode: currentItem
      });
    }
  }
  return data;
}


// 信息提示功能
function alertMessage(text, type){
  clearTimeout(alertMessage.timer);
  const {alertInfo} = wy;
  alertInfo.innerHTML = text;
  alertInfo.classList.add(type);
  shake({
    el: alertInfo,
    times: 10,
    cb(){
      alertMessage.timer = setTimeout(function() {
        alertInfo.innerHTML = '';
        alertInfo.classList.remove(type);
      }, 2000);
    }
  });
}





