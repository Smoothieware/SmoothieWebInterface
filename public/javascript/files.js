// Format bytes into human readable values
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

class Files{
  constructor(parent){
    this.machine = parent;
  }

  // List the files in a given path
  list(path){
    // Remove any trailing /
    path = path.replace(/\/$/g, '');
    var that = this;
    return new Promise(function(resolve, reject){
      // Get file list from server
      var files = [];
      var id = 0;
      that.machine.communication.command(["ls -s " + path]).then(function(data){
        if( data.match(/^Could/g) ){reject(data);}
        $.each(data.split('\n'), function(index) {
          id++;
          var item = this.trim().split(' ');
          var name = item[0].replace(/\/$/, '');
          var folder = false;
          if( item[0] != name ){ folder = true; }
          var bytes = item[1];
          var size = formatBytes(item[1]);
          var full_path = path + '/' + name;
          if( folder ){ size = '--'; }
          var file = {'name': name, 'size': size, 'id': id, 'folder': folder, bytes: bytes, path: full_path};
          if( name != '' ){
            // To return at the end of this function
            files.push(file);

            // Also save file data in local storage for easier retrieval
            var file_info = storage.read('file_info');
            if( file_info == undefined ){ file_info = {}; }
            file_info[file.path] = file;
            storage.write('file_info', file_info);
          }
        });
        resolve(files);
      }).catch(function(error){
        reject(error);
      });
    });
  }
}
