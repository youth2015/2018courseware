const wy = {
  fsContainer: document.getElementById('fsContainer'),
  breadCrumb: document.getElementById('breadCrumb'),
  currentListId: 0
};

// 初始化
intoFolder(wy.currentListId);

// 进入新的界面
function intoFolder(currentListId){
  createFileList(db, currentListId);
  createBreadCrumList(db, currentListId);
}

// 生成文件列表
function createFileList(db, id){
  fsContainer.innerHTML = '';
  let children = getChildrenById(db, id);
  children.forEach(function(item, i) {
    fsContainer.appendChild(createFileNode(item));
  });
}

// 生成面包削导航
function createBreadCrumList(db, id){
  breadCrumb.innerHTML = '';
  var data = getAllParents(db, id);
  data.forEach(function(item, i) {
    breadCrumb.appendChild(createBreadCrumbNode(item))
  });
}


wy.fsContainer.addEventListener('click', function (e){
  const target = e.target;
  if(target.classList.contains('file-img') || target.classList.contains('file-wrap')){
    intoFolder(wy.currentListId = target.fileId);
  }
});

wy.breadCrumb.addEventListener('click', function (e){
  const target = e.target;
  if(target.fileId !== undefined && wy.currentListId !== target.fileId){
    intoFolder(wy.currentListId = target.fileId);
  }
});












