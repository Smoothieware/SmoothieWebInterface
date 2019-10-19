class Communication {
  constructor(parent) {
    this.connection_log = new Log();
    this.url = '/';
    this.try_address_list_failed = false;
    this.machine = parent;
    this.connected = false;
    this.on_connected = [];
    this.on_connecting = [];
  }

  // Attempt connection to a given IP address
  attempt_connection(what_to = '', address) {
    return new Promise((resolve, reject) => {

      // Log
      this.connection_log.add(`Attempting connection to ${what_to} <kbd>${address}</kbd>`, {
        icon: 'stethoscope',
        color: 'default'
      });

      // Attempt connection to this given address
      this.command(['version', 'M115'], false, false, address).then((result) => {
        // We reached a board that answered
        this.connection_log.add(`Succesful connection to <kbd>${address}</kbd>`, {
          icon: 'thumbs-up',
          color: 'success'
        });
        resolve(result);
      }).catch((data) => {
        // We got no answer
        this.connection_log.add(`No answer from <kbd>${address}</kbd>`, {
          icon: 'phone-slash',
          color: 'warning'
        });
        reject();
      });

    });
  }

  // Attempt connection to a list of IP addresses
  try_address_list(address_list = []) {
    // Attempt connection to first address
    return new Promise((resolve, reject) => {
      // If there are no more addresses to try
      if (address_list.length === 0) {
        this.try_address_list_failed = true;
        reject("No more addresses to try");

        // If we are not on the "connect" page, we need to go there now
        if (!window.location.pathname.match(/^\/connect\.html/)) {
          // Log
          this.connection_log.add(`Could not connect, going to the connection page to allow user to fix the situation`, {
            icon: 'fighter-jet',
            color: 'default'
          });

          // Go to the actual page
          window.location.replace("/connect.html");
        }

      } else {
        // Note that we have not failed yet
        this.try_address_list_failed = false;

        // Get first address to try
        var target = address_list.shift();

        // Attempt connection to it
        this.attempt_connection(target.to_what, target.address).catch(() => {
          // If connection failed, try the next one
          this.try_address_list(address_list).catch((reason) => {
            reject(reason)
          });
        }).then((result) => {
          if (result == undefined) {
            return;
          }

          // We found a board to talk to !
          this.found_board(target.address, result);

          // Resolve the promise positively
          resolve(result);
        });
      }
    });
  }

  // Attempt connection to a single address
  try_single_address(address = '') {
    // Empty the log
    //TODO: EMPTY THE LOG this.connection_log = new Log();

    // We don't know if we failed yet
    this.try_address_list_failed = false;
    return new Promise((resolve, reject) => {
      // Actually try
      this.try_address_list([{
        address: address,
        to_what: 'user-provided address'
      }]).then((result) => {
        resolve(result);
      }).catch((reason) => {
        reject(reason);
      });
    });

  }

  // Found a board that answered the "version" command, "data" is the answer
  found_board(address, data) {
    console.log(data);
    // Log the discovery
    this.connection_log.add(`<div class="card"><div class="card-header">Responsive board discovered at address <kbd>${address}</kbd> answered : </div><div class="card-body"><pre>${data}</pre></div></div>`, {
      icon: 'code-branch',
      color: 'default'
    });

    // Save this new discovery by saving the previous current address to the history of addresses, then replacing it with this new address
    // First backup the current address so we can overwrite it
    var current_machine_address = storage.read('current_machine_address');

    // Get the log of previous_addresses
    var previous_addresses = new Set(storage.read('previous_addresses'));

    // Add the previous current address
    if (!previous_addresses.has(current_machine_address)) {
      previous_addresses.add(current_machine_address);
    }

    // Save the list
    storage.write('previous_addresses', Array.from(previous_addresses));

    // Overwrite the current machine address
    storage.write('current_machine_address', address);

    // Notice we are now connected
    setTimeout(() => {
      this.connected = true;
      this.on_connected.forEach((callback) => {
        callback.call();
      });
    }, 1000);

    // If this is the "connect" page, move along to another page
    if (window.location.pathname.match(/^\/connect\.html/)) {
      // Configure the machine
      this.machine.configure(address, data).then(() => {
        // Machine was configured correctly

        // Log
        this.connection_log.add(`Going to the interface now`, {
          icon: 'truck-moving',
          color: 'default'
        });

        // Go to the index page
        window.location.replace("/index.html");
      }).catch((reason) => {
        console.log(`ERROR in machine configure ( connect.html ), WTH : ${reason}`);
      });

    } else {
      // We are in a page and actually need to do something

      // Configure the machine
      this.machine.configure(address, data).then(() => {
        // Machine was configured correctly
      }).catch((reason) => {
        // Something went wrong with the configuration phase
        console.log(`ERROR in machine configure ( other page ), WTH : ${reason}`);
      });
    }

  }

  // Get a file
  get_file(file_name = '', base_address = this.url) {
    return new Promise((resolve, reject) => {
      // Format address
      var address = base_address;
      if (base_address != '/') {
        address = `http://${base_address}`;
      } else {
        base_address = '';
      }

      // Get the file
      $.get(address + file_name).done(resolve).fail(reject);
    });
  }

  // Get status
  get_status() {
    return new Promise((resolve, reject) => {
      // Format address
      var address = this.url;
      var base_address = address;
      if (base_address != '/') {
        address = `http://${base_address}`;
      } else {
        base_address = '';
      }

      // Get the status
      $.get(address + "/query").done(resolve).fail(reject);
    });
  }

  // Run a command
  command(commands = [], silent = false, to_log = true, base_address = this.url) {
    // Get the actual command string to send
    var cmd = commands.join("\n") + "\n";

    // Check if this is a play command
    var playing = cmd.match(/^play (.*)/);

    // Format address
    var address = base_address;
    if (base_address != '/') {
      address = `http://${base_address}/`;
    }

    // Add the commands to the log
    machine.log.add(cmd, {
      icon: 'thumbs-up',
      color: 'success'
    });

    // Actually call the command
    return new Promise(function(resolve, reject) {

      // JQuery POST call
      //$.post( address + (silent ? "command_silent" : "command") , cmd + "\n" ).done(( data ) => {
      $.ajax({
        type: 'POST',
        url: address + (silent ? "command_silent" : "command"),
        data: cmd,
        timeout: 60000
      }).done((data) => {
        // Note when we got a good call, so we can remember how long it's been since the last one
        storage.write("last_machine_call_age", Date.now());

        // Preserve the data
        var original_data = data;

        // If this started a play sequence
        if (playing) {
          machine.playing = true;
        }

        // Save to log
        machine.log.add(original_data, {
          icon: 'play-circle',
          color: 'default'
        });

        // Resolve as successfull
        resolve(original_data);

      }).fail((data) => {
        reject(data);
      });
    });

  }

  upload(file, vue) {
    console.log(file);
    // To measure speed and smooth it over
    var last_time = Date.now();
    var last_uploaded = 0;
    var speeds = [];

    var reader = new FileReader();
    reader.readAsBinaryString(file); // alternatively you can use readAsDataURL
    reader.onloadend = (evt) => {
      // create XHR instance
      var xhr = new XMLHttpRequest();

      // send the file through POST
      xhr.open("POST", "http://" + this.url + '/upload', true);
      xhr.setRequestHeader('X-Filename', file.name);

      // make sure we have the sendAsBinary method on all browsers
      XMLHttpRequest.prototype.mySendAsBinary = function(text) {
        var data = new ArrayBuffer(text.length);
        var ui8a = new Uint8Array(data, 0);
        for (var i = 0; i < text.length; i++) ui8a[i] = (text.charCodeAt(i) & 0xff);
        if (typeof window.Blob == "function") {
          var blob = new Blob([data]);
        } else {
          var bb = new(window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
          bb.append(data);
          var blob = bb.getBlob();
        }
        this.send(blob);
      }

      // for formatting
      var formatBytes = function(a, b) {
        if (0 == a) return "0 Bytes";
        var c = 1024,
          d = b || 2,
          e = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
      }

      // let's track upload progress
      var eventSource = xhr.upload || xhr;
      eventSource.addEventListener("progress", function(e) {
        // get percentage of how much of the current file has been sent
        var position = e.position || e.loaded;
        var total = e.totalSize || e.total;
        var percentage = (position / total) * 100;
        vue.upload_status.progress = Math.round(percentage * 100) / 100;

        // Get time passed and bytes uploaded since last "progress" call
        var time_passed = (Date.now() - last_time) / 1000; // In seconds
        last_time = Date.now();
        var uploaded = position - last_uploaded; // In bytes
        last_uploaded = position;
        var speed = uploaded / time_passed;
        speeds.push(speed);
        if (speeds.length > 50) {
          speeds.shift();
        }
        var average = speeds.reduce((total, num) => {
          return total + num;
        }) / speeds.length;

        vue.upload_status.speed = formatBytes(Math.round(average * 100) / 100);


      });

      // state change observer - we need to know when and if the file was successfully uploaded
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            vue.upload_status.state = "done";
          } else {
            vue.upload_status.state = "error";
          }
        }
      };

      // start sending
      vue.upload_status.state = "uploading";
      xhr.mySendAsBinary(evt.target.result);

    };


  }
}
