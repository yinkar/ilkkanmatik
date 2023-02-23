<script setup>
import { ref } from 'vue';

// Element references
const ilkkan = ref(null);
const player = ref(null);
const audioSource = ref(null);

// Variable references
const talking = ref(false);

// Say an idiom function
function ozdeyisle() {
  if (!talking.value) {
    ilkkan.value.classList.add('konus');
    talking.value = true;
  }
  else {
    ilkkan.value.classList.remove('konus');
    talking.value = false;
  }
}
</script>

<template>
  <button @click="ozdeyisle()" class="ilkkan" ref="ilkkan">
    <img src="../assets/ilkkan.png" alt="İlkkan">
  </button>

  <audio controls="controls" id="player" ref="player" v-show="false">
    <source id="audio-source" ref="audioSource" src="" />
  </audio>
</template>

<style scoped>
  .ilkkan {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: 433px;
    height: 376px;
    transform-origin: bottom left;
  }

  .konus {
    animation: konusuyor 1s linear infinite;
  }

  @keyframes konusuyor {
    0% {
      transform: translate(0, 0) rotate(0);
    }
    10% {
      transform: translate(-8px, -3px) rotate(2deg);
    }
    20% {
      transform: translate(5px, 1px) rotate(-4deg);
    }
    30% {
      transform: translate(3px, 6px) rotate(3deg);
    }
    35% {
      transform: translate(0, -2px) rotate(0);
    }
    35% {
      transform: translate(-4px, -4px) rotate(4deg);
    }
    40% {
      transform: translate(-8px, 8px) rotate(-1deg);
    }
    50% {
      transform: translate(5px, -8px) rotate(-3deg);
    }
    60% {
      transform: translate(-5px, 8px) rotate(-2deg);
    }
    70% {
      transform: translate(2px, -3px) rotate(2deg);
    }
    80% {
      transform: translate(-2px, -3px) rotate(5deg);
    }
    80% {
      transform: translate(-10px, 0) rotate(-1deg);
    }
    90% {
      transform: translate(3px, -1px) rotate(-6deg);
    }
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }
</style>
