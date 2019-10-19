// Contact the board periodically to ask for status and data
class WatchDog {
  // Owned by the machine
  constructor(parent) {
    this.machine = parent;
    this.temperatures = {};
    this.work_position = {
      x: 'error',
      y: 'error',
      z: 'error'
    };
    this.machine_position = {
      x: 'error',
      y: 'error',
      z: 'error'
    };
    this.working = false;
  }

  // Start asking the board for answers at a fixed interval
  start_watching() {
    window.setInterval(() => {
      this.tick();
    }, 500);
  }

  // Called at a fixed interval
  tick() {
    // Get the board status
    this.get_board_status();

  }

  // Get status information from the board
  get_board_status() {
    if (this.working) {
      return;
    }
    this.working = true;

    // Get the machine status
    this.machine.communication.get_status().then((data) => {
      // Parse
      var status = data.replace(/(^<|>[\n]*$)/g, '').split('|');

      // Get Idle/Run/Alarm
      this.status = status.shift();

      // Parse any position with this handy tool
      var parse_position = (position) => {
        var pos = position.replace(/^[MW]Pos:/g, '').split(',');
        return {
          x: pos[0],
          y: pos[1],
          z: pos[2]
        };
      };

      // Actually save the positions
      this.machine_position = parse_position(status.shift());
      this.work_position = parse_position(status.shift());

      // Save feedrate
      this.feedrate = status.shift().replace(/^F:/g, '');

      // Save feedrate
      if (status[0].match(/^S:/)) {
        this.speed = status.shift().replace(/^S:/g, '');
      }

      // Now all we are left with is temperatures to parse
      while (status.length) {
        var p = status.shift().match(/([A-Z]):([0-9\.a-z]*),([0-9\.]*)/);
        this.temperatures[p[1]] = {
          temperature: p[2],
          target: p[3]
        };

        // Get max temp for that designator
        if (this.machine.config.groups['temperature_control'] != undefined) {
          Object.keys(this.machine.config.groups['temperature_control']).forEach((key, index) => {
            if (this.machine.config.groups['temperature_control'][key].designator == p[1] && this.machine.config.groups['temperature_control'][key]['max_temp'] != undefined) {
              this.temperatures[p[1]].max_temp = machine.config['temperature_control'][key]['max_temp'];
            }
          });
        }
      }

      // Finally, call the player's tick
      this.machine.player.tick();

      this.working = false;

    }).catch((error) => {
      console.log("Get status get error :");
      console.log(error);
      this.working = false;
    }); //TODO: Handle error

  }

}
