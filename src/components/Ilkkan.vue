<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import voiceList from '../assets/voices.json';
import '@fontsource/quicksand';
import Toggle from '@vueform/toggle';
import '@vueform/toggle/themes/default.css';

// Element references
const ilkkan = ref(null);
const player = ref(null);
const audioSource = ref(null);

// Variable references
const isLoading = ref(false);
const isTalking = ref(false);
const isBegin = ref(true);
const voices = ref([]);
const randomStack = ref(new Set([]));
const selectedItem = ref(null);
const subtitleText = ref('');
const familyFriendly = ref(true);

watchEffect(() => {
  voices.value = familyFriendly.value ? voiceList.filter(v => v.family_friendly) : voiceList;
  randomStack.value.clear();
});

// Say an idiom method
function idiom() {
  // Stop on pressing again
  if (isTalking.value) {
    player.value.pause();
    player.value.currentTime = 0;
    return;
  }

  // Loading state
  isLoading.value = true;

  const random = (max) => {
    return Math.floor(Math.random() * max);
  }

  // Get random voice but prevent same one after another by using a stack
  do {
    const randomKey = random(voices.value.length);

    selectedItem.value = randomKey;

  } while (randomStack.value.has(selectedItem.value));

  randomStack.value.add(selectedItem.value);

  // Clear random stack when stack size reached number of voice files
  if (randomStack.value.size >= voices.value.length) {
    randomStack.value.clear();
  }
  
  audioSource.value.src = `/ilkkanmatik/${voices.value[selectedItem.value].file}`;

  player.value.load();
  player.value.play();
}

// Start to talk method
function talk() {
  subtitleText.value = voices.value[selectedItem.value].description;

  isTalking.value = true;
  isLoading.value = false;
  isBegin.value = false;
}

// Stop to talk method
function silence() {
  isTalking.value = false;
  isLoading.value = false;

  subtitleText.value = '';
}

onMounted(() => {
  voices.value = [...voiceList];

  // Assign keyboard keys to say an idiom
  window.addEventListener('keydown', idiom)
});
</script>

<template>
  <div class="panel">
    <Toggle
      v-model="familyFriendly"
      on-label="Aile Dostu"
      off-label="Gelişine"
    ></Toggle>
  </div>

  <button
    @click="idiom()"
    class="ilkkan"
    ref="ilkkan" 
    :class="{
      talking: isTalking,
      loading: isLoading,
      begin: isBegin
    }"
  >
    <img src="../assets/ilkkan.png" alt="İlkkan">
  </button>

  <audio id="player" ref="player" @ended="silence" @pause="silence" @playing="talk" v-show="false" preload="auto">
    <source id="audio-source" ref="audioSource" src="" type="audio/mp3" />
  </audio>

  <div class="subtitle">{{ subtitleText }}</div>
</template>

<style scoped>
  .panel {
    position: absolute;
    left: 0;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    --toggle-width: 100px;
  }

  .ilkkan {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transform-origin: bottom center;
    outline: none;
  }

  .subtitle {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    color: #ffcc02;
    text-align: center;
    width: 300px;
    position: absolute;
    top: calc(100%/2 + 253px/2);
    margin-top: 20px;
    left: calc(100%/2 - 300px/2);
    opacity: 0.3;
    animation: subtitle-shake 200ms linear infinite;
  }

  .ilkkan > img {
    width: 200px;
    height: 253px;
  }

  .talking {
    animation: shake 1s linear infinite;
  }

  .loading {
    animation: loading 400ms ease-in infinite;
  }

  .begin {
    animation: shine 1s ease-out infinite;
  }

  @keyframes shine {
    0% {
      filter: drop-shadow(0 0 4px #ffcc02);
    }
    80% {
      filter: drop-shadow(0 0 20px #ffcc0277);
    }
    90% {
      filter: drop-shadow(0 0 4px #ffcc0288);
    }
  }

  @keyframes loading {
    0% {
      opacity: .9;
    }
    80% {
      opacity: .7;
    }
    100% {
      opacity: .65;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0) rotate(0);
    }
    10% {
      transform: translate(-4px, -3px) rotate(2deg);
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
      transform: translate(-3px, 2px) rotate(-1deg);
    }
    50% {
      transform: translate(5px, -4px) rotate(-3deg);
    }
    60% {
      transform: translate(-5px, 3px) rotate(-2deg);
    }
    70% {
      transform: translate(2px, -3px) rotate(2deg);
    }
    80% {
      transform: translate(-2px, -3px) rotate(5deg);
    }
    80% {
      transform: translate(-3px, 0) rotate(-1deg);
    }
    90% {
      transform: translate(1px, -1px) rotate(-6deg);
    }
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }

  @keyframes subtitle-shake {
    0% {
      transform: rotate(0);
    }
    80% {
      transform: rotate(-1deg);
    }
  }
</style>
