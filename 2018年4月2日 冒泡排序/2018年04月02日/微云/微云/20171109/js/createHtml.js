// 生成当前文件节点
function createFileNode(fileData){
  const fileItem = document.createElement('div');
  fileItem.className = `col-lg-2 col-md-3 col-sm-4 col-xs-12 file-item`;
  fileItem.innerHTML = `<div class="file-wrap">
                          <div class="file-check">
                            <span class="glyphicon glyphicon-ok file-check-active"></span>
                          </div>
                          <div class="file-check-click"></div>
                          <div class="file-img"></div>
                          <div class="file-name">
                            <p class="name-text show" title="${fileData.name}">${fileData.name}</p>
                            <input type="text" class="name-input">
                          </div>
                        </div>`;
  
  var addFilesIdItems = fileItem.querySelectorAll('div');
  
  for(var i=0; i<addFilesIdItems.length; i++){
    addFilesIdItems[i].fileId = fileData.id;
  }
  
  return fileItem;
}

// 生成面包削节点
function createBreadCrumbNode(fileData){
  const item = document.createElement('li');
  const href = document.createElement('a');
  href.fileId = fileData.id;
  href.innerHTML = fileData.name;
  href.href = 'javascript:;';
  item.appendChild(href);
  return item;
}

// 生成对话框
function createWarningInfo(message){
  const fsAlert = document.createElement('div');
  fsAlert.className = `fs-alert`;
  fsAlert.innerHTML = `<div class="modal-dialog ">
                    <div class="modal-content">
                      <div class="modal-body clearfix">
                        <h4 class="title modal-title">${message}</h4>
                        <div class="pull-right ">
                          <button type="button" class="btn btn-default cancel-btn">取消</button>
                          <button type="button" class="btn btn-primary sure-btn">确定</button>
                        </div>
                      </div>
                    </div>
                  </div>`;
  return fsAlert;
}
