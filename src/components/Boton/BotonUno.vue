<template>
<div class="caja">
  <button v-on:click="(counter += 1), alerta()">Add 1</button>
  <p>Se ha hecho clic en el botón de arriba {{ counter }} veces.</p>
  <input type="text" v-on:change="printform">
</div>
</template>

<script>
import './BotonUno.css'

export default {
  name: "BotonUno",
  data() {
    return {
      event: "click",
      counter: 0,
    };
  },
  methods: {
    alerta() {
      console.log("Hello!! Thanks for click me!");
    },
    printform(event){
      const value = event.target.value
      setTimeout(()=>{
        console.log(value);
      }, 2000)
    }
  },
};
</script>