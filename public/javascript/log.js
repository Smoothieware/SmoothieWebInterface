class LogItem{
    constructor(text, icon, color = 'default'){
      this.text = text;
      this.icon = icon;
      this.color = color;
    }
}

class Log {
    constructor(){
      this.empty();
    }

    add(text = '', properties = {}){
      this.log_list.push(new LogItem(text, properties.icon, properties.color));
    }

    as_array(){
      return this.log_list;
    }

    empty(){
      this.log_list = [];
    }
}
