<template>
  <div>
    <i data-fa-symbol="home" class="fas fa-home fa-fw"></i>
    <i data-fa-symbol="arrow-circle-right" class="fas fa-arrow-circle-right fa-fw"></i>
    <i data-fa-symbol="arrow-right" class="fas fa-arrow-right fa-fw"></i>
    <i data-fa-symbol="arrow-left" class="fas fa-arrow-left fa-fw"></i>
    <i data-fa-symbol="arrow-up" class="fas fa-arrow-up fa-fw"></i>
    <i data-fa-symbol="arrow-down" class="fas fa-arrow-down fa-fw"></i>
  <div class="jogwheel center">
    <!-- Re-using a font-awesome icon according to https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols -->


    <!-- SVG Rose wheel for jogging -->
    <svg :width="width" :height="height" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>

        <filter id="f1" x="-1" y="-1" width="300%" height="300%">
          <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>

        <symbol id="HomeIcon" viewBox="0 0 20 18" pointer-events="none">
          <desc>HomeIcon - house</desc>
          <use xlink:href="#home"></use>           <!-- Re-using a font-awesome icon according to https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols -->
        </symbol>

      </defs>

      <g id="JogRose" viewBox="20 -10 260 260" >
        <g id="HomeAll" onmouseup="runCommandSilent('G28')">
          <path class="std" d="M10 182.5 h-10 v57.5 h57.5 v-10 a 125,125 0 0,1 -47.5 -47.5 Z" fill="#444">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </path>
          <use x="3" y="217" width="20" height="18" xlink:href="#HomeIcon" color="white"/>
        </g>

        <g id="HomeX" onmouseup="runCommandSilent('G28 X0')">
          <path class="std" d="M10 57.50 h-10 v-57.5 h57.5 v10 a 125,125 0 0,0 -47.5 47.5 Z" fill="#FFDC00">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </path>
          <use x="3" y="5" width="20" height="18" xlink:href="#HomeIcon" color="white"/>
          <text x="25" y="20" class="home"> X </text>
        </g>
        <g id="HomeY" onmouseup="runCommandSilent('G28 Y0')">
          <path class="std" d="M230 57.50 h10 v-57.5 h-57.5 v10 a 125,125 0 0,1 47.5 47.5 z" fill="#0074D9">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </path>
          <use x="217" y="5" width="20" height="18" xlink:href="#HomeIcon" color="white"/>
          <text x="202" y="20" class="home"> Y </text>
        </g>

        <g id="HomeZ" onmouseup="runCommandSilent('G28 Z0')">
          <path class="std" d="M230 182.5 h10 v57.5 h-57.5 v-10 a 125,125 0 0,0 47.5 -47.5 z" fill="#2ECC40">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </path>
          <use x="217" y="217" width="20" height="18" xlink:href="#HomeIcon"  color="white"/>
          <text x="202" y="232" class="home"> Z </text>
        </g>

        <g id="Jog100" fill="#c0c0c0" class="std">
          <g id="Y+100" v-on:click="jog" transform="translate(120 120)" jog-distance="100" jog-direction="+" jog-axis="Y">
            <path class="std" d="M-60 -67.07 L-75.93,-83 A112.5,112.5 0 0,1 75,-83 L60,-67.07 A90,90 0 0,0 -60.00,-67.07 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X+100" v-on:click="jog" transform="translate(120 120)" jog-distance="100" jog-direction="+" jog-axis="X">
            <path class="std" d="M67.07,-60 L83,-75.93 A112.5,112.5 0 0,1 83,75.93 L67.07,60 A90,90 0 0,0 67.07,-60">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="Y-100" v-on:click="jog" transform="translate(120 120)" jog-distance="100" jog-direction="-" jog-axis="Y">
            <path class="std" d="M-60,67.07 L-75.93,83 A112.5,112.5 0 0,0 75,83 L60,67.07 A90,90 0 0,1 -60.00,67.07 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X-100" v-on:click="jog" transform="translate(120 120)" jog-distance="100" jog-direction="-" jog-axis="X">
            <path class="std" d="M-67.07,-60 L-83,-75.93 A112.5,112.5 0 0,0 -83,75.93 L-67.07,60 A90,90 0 0,1 -67.07,-60 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
        </g>
        <g id="Jog10" fill="#d0d0d0">

          <g id="Y+10" v-on:click="jog" transform="translate(120 120)"  jog-distance="10" jog-direction="+" jog-axis="Y">
            <path class="std" d="M-44.06 -51.13 L-60,-67.07 A90,90 0 0,1 60,-67 L44.06,-51.13 A67.5,67.5 0 0,0 -44.06,-51.13 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X+10" v-on:click="jog" transform="translate(120 120)" jog-distance="10" jog-direction="+" jog-axis="X">
            <path class="std" d="M51.13 44.06 L67.07,60 A90,90 0 0,0 67.07,-60 L51.13,-44.06 A67.5,67.5 0 0,1 51.13,44.06 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="Y-10" v-on:click="jog" transform="translate(120 120)" jog-distance="10" jog-direction="-" jog-axis="Y">
            <path class="std" d="M-44.06 51.13 L-60,67.07 A90,90 0 0,0 60,67 L44.06,51.13 A67.5,67.5 0 0,1 -44.06,51.13 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X-10" v-on:click="jog" transform="translate(120 120)" jog-distance="10" jog-direction="-" jog-axis="X">
            <path class="std" d="M-51.13 44.06 L-67.07,60 A90,90 0 0,1 -67.07,-60 L-51.13,-44.06 A67.5,67.5 0 0,0 -51.13,44.06 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
        </g>

        <g id="Jog1" fill="#e0e0e0">
          <g id="Y+1" v-on:click="jog" transform="translate(120 120)" jog-distance="1" jog-direction="+" jog-axis="Y">
            <path class="std" d="M-28.09 -35.16 L-44.06,-51.13 A67.5,67.5 0 0,1 44.06,-51.13 L28.09,-35.16 A45,45 0 0,0 -28.09,-35.16 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X+1" v-on:click="jog" transform="translate(120 120)" jog-distance="1" jog-direction="+" jog-axis="X">
            <path class="std" d="M35.16 -28.09 L51.13,-44.06 A67.5,67.05 0 0,1 51.13,44.06 L35.16,28.09 A45,45 0 0,0 35.16,-28.09 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="Y-1" v-on:click="jog" transform="translate(120 120)" jog-distance="1" jog-direction="-" jog-axis="Y">
            <path class="std" d="M-28.09 35.16 L-44.06,51.13 A67.5,67.5 0 0,0 44.06,51.13 L28.09,35.16 A45,45 0 0,1 -28.09,35.16 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X-1" v-on:click="jog" transform="translate(120 120)" jog-distance="1" jog-direction="-" jog-axis="X">
            <path class="std" d="M-35.16 -28.09 L-51.13,-44.06 A67.5,67.05 0 0,0 -51.13,44.06 L-35.16,28.09 A45,45 0 0,1 -35.16,-28.09 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
        </g>

        <g id="Jog0_1" fill="#f0f0f0">
          <g id="Y+0.1" v-on:click="jog" transform="translate(120 120)" jog-distance="0.1" jog-direction="+" jog-axis="Y">
            <path class="std" d="M-28.09 -35.16 A45,45 0 0,1 29.09,-35.16 L0,-7.07 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X+0_1" v-on:click="jog" transform="translate(120 120)" jog-distance="0.1" jog-direction="+" jog-axis="X">
            <path class="std" d="M35.16 -28.09 A45,45 0 0,1 35.16,28.09 L7.07,0 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="Y-0_1" v-on:click="jog" transform="translate(120 120)" jog-distance="0.1" jog-direction="-" jog-axis="Y">
            <path class="std" d="M-28.09 35.16 A45,45 0 0,0 29.09,35.16 L0,7.07 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
          <g id="X-0_1" v-on:click="jog" transform="translate(120 120)" jog-distance="0.1" jog-direction="-" jog-axis="X">
            <path class="std" d="M-35.16 -28.09 A45,45 0 0,0 -35.16,28.09 L-7.07,0 z">
              <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
            </path>
          </g>
        </g>

        <g id="RoseScale">
          <g>
            <circle class="scl" cx="144" cy="96" r="9.5" />
            <circle class="scl" cx="159.5" cy="80.5" r="10.5" />
            <circle class="scl" cx="175" cy="65" r="12" />
            <circle class="scl" cx="195" cy="45" r="15" />
            <text class="scl" x="137" y="99" font-size="10"> 0.1 </text>
            <text class="scl" x="155" y="85" font-size="14"> 1 </text>
            <text class="scl" x="166" y="70" font-size="15"> 10 </text>
            <text class="scl" x="182" y="50" font-size="15"> 100 </text>
          </g>
        </g>

        <g id="Decoration" pointer-events="none" font-weight="900" font-size="11" fill-opacity=".8">
          <g transform="translate(160 105)" fill-opacity="1">
            <rect width="60" height="30" rx="15" ry="15" fill="#FFDC00" />
            <use xlink:href="#arrow-right" height="20" width="20" x="30" y="5" color="white"></use>          <!-- Re-using a font-awesome icon according to https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols -->
            <text y="19" x="10" class="axis"> X+ </text>
          </g>
          <g transform="translate(20 105)" fill-opacity="1">
            <rect width="60" height="30" rx="15" ry="15" fill="#FFDC00" />
            <text y="19" x="35" class="axis"> X- </text>
            <use xlink:href="#arrow-left" height="20" width="20" x="10" y="5" color="white"></use>         <!-- Re-using a font-awesome icon according to https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols -->
          </g>
          <g transform="translate(107.5 20)" fill-opacity="1">
            <rect width="30" height="60" rx="15" ry="15" fill="#0074D9" />
            <text y="45" x="10" class="axis"> Y+ </text>
            <use xlink:href="#arrow-up" height="20" width="20" x="5" y="10" color="white"></use>         <!-- Re-using a font-awesome icon according to https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols -->
          </g>
          <g transform="translate(107.5 160)" fill-opacity="1">
            <rect width="30" height="60" rx="15" ry="15" fill="#0074D9" />
            <text y="20" x="10" class="axis"> Y- </text>
            <use xlink:href="#arrow-down" color="white" height="20" width="20" x="5" y="30"></use>         <!-- Re-using a font-awesome icon according to https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols -->
          </g>
        </g>

      </g>

      <g id="JogBar" transform="translate(250 0)" viewBox="20 -10 260 260">
        <desc>JogBar - Z jogging bar</desc>
        <g id="+Z" fill="#444">
          <path class="std" d=" M5,0 h30 a5,5 0 0,1 5,5 v27 h-40 v-27 a5,5 0 0,1 5,-5 z" />
          <path class="std" d="M20,2 l17,17 h-10 v11 h-14 v-11 h-10 z" fill="#2ECC40" />
          <text x="15" y="18" font-size="12" class="axis"> Z+ </text>
        </g>
        <g id="-Z" fill="#444">
          <path class="std" d=" M0,208 h40 v27 a5,5 0 0,1 -5,5 h-30 a5,5 0 0,1 -5,-5 z" />
          <path class="std" d="M20,238 l-17,-17 h10 v-11 h14 v11 h10 z" fill="#2ECC40" />
          <text x="15" y="230" font-size="12" class="axis"> Z- </text>
        </g>
        <g id="Z+10" fill="#d0d0d0" v-on:click="jog" jog-distance="10" jog-direction="+" jog-axis="Z">
          <rect class="std" x="0" y="32" width="40" height="30">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </rect>
          <circle class="scl" cx="20" cy="47" r="13" />
          <text class="scl" x="9" y="53" font-size="18"> 10 </text>
        </g>
        <g id="Z+1" fill="#e0e0e0" v-on:click="jog" jog-distance="1" jog-direction="+" jog-axis="Z">
          <rect class="std" x="0" y="62" width="40" height="26">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </rect>
          <circle class="scl" cx="20" cy="75" r="11" />
          <text class="scl" x="15" y="81.5" font-size="18"> 1 </text>
        </g>
        <g id="Z+0.1" fill="#f0f0f0" v-on:click="jog" jog-distance="0.1" jog-direction="+" jog-axis="Z">
          <rect class="std" x="0" y="88" width="40" height="24">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </rect>
          <circle class="scl" cx="20" cy="100" r="9.5" />
          <text class="scl" x="13" y="103.5" font-size="10"> 0.1 </text>
        </g>
        <g fill="#d0d0d0" v-on:click="jog" jog-distance="0.1" jog-direction="-" jog-axis="Z">
          <rect x="0" y="178" width="40" height="30" class="std">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </rect>
        </g>
        <g id="Z-1" fill="#e0e0e0" v-on:click="jog" jog-distance="1" jog-direction="-" jog-axis="Z">
          <rect class="std" x="0" y="152" width="40" height="26">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </rect>
        </g>
        <g id="Z-10" fill="#f0f0f0" v-on:click="jog" jog-distance="10" jog-direction="-" jog-axis="Z">
          <rect class="std" x="0" y="128" width="40" height="24">
            <set attributeName="fill" to="orange" begin="mouseover" end="mouseout" />
          </rect>
        </g>
        <g id="ZSpace" fill="#000000">
          <rect class="std" x="0" y="112" width="40" height="16" />
        </g>
      </g>

    </svg>
  </div>
</div>
</template>

<script>
export default {
  name: 'JogWheel',
  props: {
    width: {
      type: [Number, String],
      default: 320
    },
    height: {
      type: [Number, String],
      default: 260
    },
    controller: {
      type: Object
    },
  },
  methods: {
    jog: function(event){
      // Call the jog routine with the right parameters
      var c = $(event.target.parentNode);
      this.controller.jog({direction:c.attr("jog-direction"), distance:c.attr("jog-distance"), axis:c.attr("jog-axis")});
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
text {
  font-family: helvetica;
  stroke: black;
  stroke-width: 1;
  //#fill: black;
}
text.home {
  font-family: helvetica;
  stroke: white;
  stroke-width: 1;
  fill: white;
  font-weight: 900;
  font-size: 16;
  pointer-events: none;
}
text.scl {
  font-family: helvetica;
  stroke: white;
  stroke-width: 1;
  fill: white;
  pointer-events: none;
}
circle.scl {
  fill: #444;
  stroke: #FF4136;
  stroke-width: 3;
  //#filter: url(#f1);
  pointer-events: none;
}

text.axis {
  font-family: monospace;
  stroke: white;
  stroke-width: 1;
  fill: white;
  pointer-events: none;
  font-size: 20;
}

path.home {
  stroke: black;
}
path.std {
  stroke: #777;
  stroke-width: 0;
  //#filter: url(#f1);
}
rect.std {
  stroke: #777;
  stroke-width: 0;
  //#filter: url(#f1);
}

.circle-right{
  width:100px;
  height:100px;
}

</style>
