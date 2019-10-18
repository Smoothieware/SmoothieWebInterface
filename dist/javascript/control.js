class Control{
  constructor(parent){
    this.machine = parent;
  }

  jog(p){ // P is parameters
    // Jog the axes
    if( p.direction == '+' ){ p.direction = ''; }
    var command = p.axis + p.direction + p.distance;
    this.machine.communication.command(["M120", "G91", `G0 ${command}`, 'M121'], true, false).then(() => {});
  }

  home(axis){
    // TODO: Make this dependent upon CNC mode or not

  }


}
