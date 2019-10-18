class Navigation{
  constructor(){

  }

  // Go to a specific page and activity
  goto(page, activity, options){
    window.location.replace(`/${page.toLowerCase()}.html#/${activity.toLowerCase()}/`);
  }
}

var navigation = new Navigation();
