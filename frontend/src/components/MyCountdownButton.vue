<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

// 是否在计时
const isCounting = ref<boolean>(false);
// 剩余秒数
const remainingSeconds = ref<number>(0);

const props = withDefaults(defineProps<{
  defaultText?: string; // 默认文本
  totalSeconds?: number; // 总秒数
  customClass?: string; // 自定义类
}>(), {
  defaultText: '发送验证码',
  totalSeconds: 60,
  customClass: ''
});

const emits = defineEmits<{
  (e: 'click', event: Event): void; // 倒计时结束事件
}>();

let timer: number | null  = null;

const handleClick = (event: Event) => {
  emits('click', event);
  // 开始倒计时
  startCountdown();
};

// 处理倒计时事件
const startCountdown = () => {
  if (isCounting.value) return;

  isCounting.value = true;
  remainingSeconds.value = props.totalSeconds;

  timer = setInterval(() => {
    remainingSeconds.value--;

    if (remainingSeconds.value <= 0 && timer) {
      clearInterval(timer);
      isCounting.value = false;
      // 重置为初始值
      remainingSeconds.value = props.totalSeconds;
      timer = null;
    }
  }, 1000);
}

// 清理定时器
onUnmounted(() => {
  if (timer) clearInterval(timer);
})
</script>

<template>
  <!-- todo: 刷新页面和切换为登录状态的时候,倒计时没有了.待完善 -->
  <button @click="handleClick" :disabled="isCounting" :class="{'disabled': isCounting, customClass}">
    {{ isCounting ? `${remainingSeconds} S` : defaultText }}
  </button>
</template>

<style scoped lang="scss">
button {
  align-self: stretch;
  border: none;
  padding: 0.5rem;
  border-radius: $radius-1;
  background-color: #8581ff;
  color: $white-1;
  cursor: pointer;
  width: 100px;

  &.disabled {
    background-color: #c9c7ff;
    cursor: not-allowed;
  }
}
</style>