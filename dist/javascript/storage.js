class Storage{
  read(value_name){
    var data = localStorage.getItem(value_name);
    if( data == "undefined" ){ data = '""'; }
    return(JSON.parse(data));
  }

  write(value_name, value){
    return localStorage.setItem(value_name, JSON.stringify(value));
  }

}

const storage = new Storage();
