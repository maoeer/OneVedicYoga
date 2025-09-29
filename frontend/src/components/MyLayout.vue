<script setup lang="ts">
import MyDotLottie from '@/components/MyDotLottie.vue';

defineProps<{
  title: string;  // 标题
  subTitle: string; // 子标题
  confirmText: string; // 确认按钮文本
  linkForeword: string; // 链接前导文本
  linkText: string; // 链接文本
}>();

const emits = defineEmits<{
  (e: 'confirm'): void; // 确认事件
  (e: 'link'): void; // 链接事件
}>();

const handleConfirm = () => {
  emits('confirm');
}
const handleLink = () => {
  emits('link');
}
</script>

<template>
  <div class="layout">
    <div class="container">
      <aside>
        <my-dot-lottie 
          src="/animation/yoga.lottie"
          width="300px"
          height="300px"
        />
        <h1>One Vedic Yoga</h1>
      </aside>

      <main>
        <header>
          <h1>{{ title }}</h1>
          <p>{{ subTitle }}</p>
        </header>

        <!-- 表单 -->
        <form @submit.prevent="handleConfirm" autocomplete="off">
          <slot></slot>

          <!-- 提交按钮 -->
          <section>
            <input type="submit" :value="confirmText">
          </section>
        </form>

        <footer>
          <div>{{ linkForeword }}<a href="#" @click="handleLink">{{ linkText }}</a></div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;  
  gap: 3rem;
  width: 1000px;
  max-width: 100%; /* 适配小屏幕 */
  min-height: 500px; /* 固定最小高度 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: $radius-1;

  aside {
    width: 60%; /* 占总宽度40% */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  main {
    width: 40%; /* 占总宽度60% */
    max-width: 400px; /* 限制表单最大宽度，避免过宽 */

    header {
      margin-bottom: 2rem;

      h1 {
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.825rem;
      }
    }

    form {
      margin-bottom: 2rem;

      input[type="submit"] {
        display: block;
        width: 100%;
        border: none;
        border-radius: $radius-1;
        padding: 0.5rem;
        font-weight: 600;
        font-size: 1.1rem;
        letter-spacing: 0.5rem;
        text-indent: 0.5rem;
        background-color: $blue-1;
        cursor: pointer;
        
        &:hover {
          background-color: $blue-2;
        }
      }
    }

    footer {
      font-size: 0.825rem;
      a {
        color: #007bff;  
      }
    }
  }
}
</style>
