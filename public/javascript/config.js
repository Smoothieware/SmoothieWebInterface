class Config{
  constructor(){
    this.file_name = '';
    this.file_content = '';

  }

  // Parse a new ( or updated ) configuration file
  parse(file_name, file_content){
    // Save file name and content
    this.file_name = file_name;
    this.file_content = file_content;

    var that = this;
    return new Promise(function(resolve, reject){

      // Empty value storage
      that.root = {};
      that.entries = {};
      that.groups = {};

      // For each line
      that.file_content.split("\n").forEach((line) => {
        // For each entry
        if( line.match(/^(\s*)\#/g) || line == '' || line.match(/^[\s\n]*$/) ){ return; }

        // Separate name from value
        var match = line.match(/^([\w_\-\.]*)\s+(.*?)(?!\S)/);
        if(match === undefined || match === null ){return;}

        var name = match[1];
        var value = match[2];

        // Save raw entry
        that.entries[name] = value;

        // Save extracted entries
        var key_path = name.split('.');
        if( key_path.length == 1 ){
          that.root[key_path[0]] = value;
        }else if(key_path.length == 2 ){
          if( that.groups[key_path[0]] == undefined ){ that.groups[key_path[0]] = {}; }
          that.groups[key_path[0]][key_path[1]] = value;
        }else if(key_path.length == 3 ){
          if( that.groups[key_path[0]] == undefined ){ that.groups[key_path[0]] = {}; }
          if( that.groups[key_path[0]][key_path[1]] == undefined ){ that.groups[key_path[0]][key_path[1]] = {}; }
          that.groups[key_path[0]][key_path[1]][key_path[2]] = value;
        }

      }, this);

      // Done parsing
      resolve("Done with configuration parsing");

    });


  }
}
