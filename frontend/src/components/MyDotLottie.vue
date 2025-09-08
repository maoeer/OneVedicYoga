<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

interface Porps {
  src: string
  width?: string | number
  height?: string | number
  autoplay?: boolean
  loop?: boolean
  customStyle?: Record<string, string | number>
}

withDefaults(defineProps<Porps>(), {
  width: '100%',
  height: '100%',
  autoplay: true,
  loop: true,
  custoStyle: () => ({})
})  
</script>

<template>
    <DotLottieVue 
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      :style="{width, height, ...customStyle}"
    />
</template>