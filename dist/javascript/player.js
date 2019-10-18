class Progress{
  constructor(){
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  set(hours, minutes, seconds){
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  plusone(){
    // Increase elapsed time
    this.seconds = Number(this.seconds)+1;
    if( this.seconds < 10 ){ this.seconds = '0' + this.seconds; }
    if( this.seconds >= 60 ){
      this.seconds = '00';
      this.minutes = Number(this.minutes)+1;
      if( this.minutes < 10 ){ this.minutes = '0' + this.minutes; }
      if( this.minutes >= 60 ){
        this.hours = Number(this.hours)+1;
        if( this.hours < 10 ){ this.hours = '0' + this.hours; }
      }
    }
  }
}

class Player{
  constructor(parent){
    this.machine = parent;
    this.playing = false;
    this.progress = '';
    this.status = {
      file: '',
      percent: 0,
      elapsed: new Progress(),
      estimated: new Progress()
    };
    this.counter = 0;
  }

  tick(){

    // Update play status as needed
    if( this.machine.watchdog.status == 'Run' ){
      if( !this.playing ){
        this.playing = true;
        // Play status changed : stopped playing
      }
    }else{
      if( this.playing ){
        this.playing = false;
        // Play status changed : started playing
      }
    }

    // If we are playing
    if( this.playing ){

        // If at beginning of loop, get status
        // But only once in a set period
        if( this.counter == 0 ){

          // Ask the board for progress
          this.machine.communication.command(["progress"], false, false).then((data) => {
            // Parse answer
            var answers = data.split('\n');
            var progress_answer = answers[0].trim();
            this.progress = progress_answer;
            if( progress_answer.match(/Not.currently.playing/) ){
              this.playing = false;
            }else{
              this.playing = true;
              // Parse data
              if( progress_answer.match(/est time/)){
                var found = progress_answer.match(/file: (.+?), (\d+) % complete, elapsed time: (\d+):(\d+):(\d+), est time: (\d+):(\d+):(\d+)/);
                this.status.file = found[1];
                this.status.percent = found[2];
                this.status.elapsed.set(found[3], found[4], found[5]);
                this.status.estimated.set(found[6], found[7], found[8]);
              }else{
                var found = progress_answer.match(/file: (.+?), (\d+) % complete, elapsed time: (\d+):(\d+):(\d+)/);
                this.status.file = found[1];
                this.status.percent = found[2];
                this.status.elapsed.set(found[3], found[4], found[5]);
                this.status.estimated.set('00', '00', '00');
              }
            }
          }).catch((reason) => {
            //TODO: Better catch
            console.log("Error: " + reason);
          });
        }


        // Loop
        this.counter++;
        if( this.counter >= 30 ){ this.counter=0;}

        // Increase elapsed time
        this.status.elapsed.plusone();

    }


  }

}
