class Machine {

  // Create a new Machine object representing a Smoothieboard and machine
  constructor() {
    this.communication = new Communication(this);
    this.files = new Files(this);
    this.watchdog = new WatchDog(this);
    this.player = new Player(this);
    this.control = new Control(this);
    this.log = new Log();
    this.config = new Config();
    this.version_data = {}; // How the board version answer was parsed
    this.version_answer = ''; // What the board answered to the "version" command
    this.config_file_name = ''; // Name of file in which config was found
    this.playing = false; // Whether playing or not
  }

  // Obtain configuration from memory or from the SD card, and process it
  configure(address, data) {
    // Remember the address
    this.communication.url = address;

    // Parse the data
    this.parse_version(data);

    // Get configuration from the SD card
    var that = this;
    return new Promise(function(resolve, reject) {
      // First obtain configuration file
      that.log.add("Obtaining configuration", {
        icon: 'sliders-h'
      });

      // What to do if an actual configuration file is found
      var config_found = (file_name, config_file_content) => {
        that.log.add(`Success obtaining configuration file named <kbd>${file_name}</kbd>`, {
          icon: 'thumbs-up',
          color: 'success'
        })

        // Save the content to cache so we don't need to grab it each page load
        storage.write("config_file_cache_age", Date.now());
        storage.write("config_file_cache_filename", file_name);
        storage.write("config_file_cache", config_file_content);

        // Parse the configuration
        that.log.add("Parsing new configuration", {
          icon: "cogs",
          color: 'primary'
        });
        that.config.parse(file_name, config_file_content).then((reaction) => {
          // Configuration parsing went well
          that.log.add(`Success parsing configuration file`, {
            icon: 'thumbs-up',
            color: 'success'
          })
        }).catch((reason) => {
          console.log("failed parsing config " + reason);
        });
      };

      // Attempt to find a previous retreival of the configuration file in local storage
      var config_file_cache_age = storage.read("config_file_cache_age") || 0;
      var age = Math.round((Date.now() - config_file_cache_age) / 1000);
      if (age < 5 * 60) { // If configuration was last grabbed less than 5 minutes ago // TODO: Make configurable
        that.log.add(`Using configuration file saved in cache, ${age} seconds old`, {
          icon: "memory",
          color: 'default'
        });
        var config_file_cache = storage.read("config_file_cache");
        var config_file_cache_filename = storage.read("config_file_cache_filename");
        if (config_file_cache.length > 1) {
          config_found(config_file_cache_filename, config_file_cache);
          resolve("Config found");
          return;
        }
      }

      // Attempt for file named "config.txt"
      machine.communication.get_file('/sd/config.txt').then((response) => {
        config_found("config.txt", response);
        resolve("Config found");
      }).catch((response) => {
        // File named "config.txt" was not found, try just "config" instead
        machine.communication.get_file('/sd/config').then((response) => {
          config_found("config", response);
          resolve("Config found");
        }).catch((response) => {
          that.log.add("No configuration file was found, something is very wrong, check your SD card " + response, {
            icon: 'times',
            color: 'danger'
          });
          reject("Neither config file names were found " + response);
        });
      });

    });
  }

  // Parse the answer to the version and M115 commands
  parse_version(answer) {
    // Save the version string in case we want to skip asking the board for it next time
    storage.write("last_version_answer", answer);

    // Save reply
    this.version_answer = answer;
    var lines = answer.split('\n');
    var that = this;
    lines[2].split(/\,\s*/).forEach(function(element) {
      var cut = element.split(':');
      var key = cut[0];
      var value = cut.slice(1).join(':');
      that.version_data[key] = value;
    });
  };

  // Attempt connection to possible targets, when page is loaded
  try_to_find_machine() {
    // Before we start trying to connect to addresses with actual calls, lets see if possibly we already have a recent connection
    // First let's figure out how recently a good call was made to a machine
    var last_machine_call_age = storage.read("last_machine_call_age") || 0;
    var age = Math.round((Date.now() - last_machine_call_age) / 1000);

    // If a machine answered more recently than 60 seconds
    if (age < 60) {
      // Since we won't be asking the board for it's version strings/commands,
      // get the version answer from local storage instead
      var version_answer = storage.read("last_version_answer");

      // Same thing for the address, the one saved is the latest that worked
      var address = storage.read('current_machine_address');

      // "Simulate" having found a board using data from memory
      this.communication.found_board(address, version_answer);

    } else {
      // Notice ( event ) we are going to try to connect, for example to display log modals and such
      this.communication.on_connecting.forEach((callback) => {
        callback.call();
      });

      // We couldn't remember a connection to avoid a call, lets's start making actual calls now
      // A list of addresses to try
      var addresses_to_try = [];

      // Get the "current" machine address, which should be the address that worked last time
      var current_machine_address = storage.read('current_machine_address');
      if (current_machine_address != null) {
        addresses_to_try.push({
          address: current_machine_address,
          to_what: "last working address"
        });
      }

      // Add the root address, we need to try it no matter what if the current machine address didn't work
      addresses_to_try.push({
        address: '/',
        to_what: "default path"
      });

      // Finally add all the addresses in that ever worked
      var previous = storage.read('previous_addresses');
      if (previous != null) {
        previous.forEach((address) => {
          // But make sure we don't try the current address twice if it's in the "historical" list too
          if (current_machine_address != address) {
            addresses_to_try.push({
              address: address,
              to_what: "historically working address"
            });
          }
        });
      }

      // Try all of these addresses
      machine.communication.try_address_list(addresses_to_try).then((result) => {
        console.log("One address answered in the list: " + result);
      }).catch((reason) => {
        machine.communication.connection_log.add(reason, {
          icon: 'times',
          color: 'danger'
        });
        console.log("Failed try address list, reason: " + reason);
      });

    }

  }

}

var machine = new Machine();
