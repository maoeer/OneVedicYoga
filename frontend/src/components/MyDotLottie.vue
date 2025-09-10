<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

interface LottieInstance {
  destroy: () => void
}

interface LottieComponent {
  getDotLottieInstance: () => LottieInstance | null
}

interface Props {
  src: string
  width?: string | number
  height?: string | number
  autoplay?: boolean
  loop?: boolean
  customStyle?: Record<string, string | number>
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  autoplay: true,
  loop: true,
  customStyle: () => ({})
})  

const playRef = ref<LottieComponent | null>(null)

// 仅保留组件卸载时的销毁逻辑
onUnmounted(() => {
  // 销毁动画实例，释放资源
  playRef.value?.getDotLottieInstance()?.destroy()
})
</script>

<template>
    <dotLottie-vue 
      ref="playRef"
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      :style="{width, height, ...customStyle}"
      :render-config="{ autoResize: true }"
    />
</template>