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
  'confirm': [];
  'link': [];
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
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;  
  gap: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 0.5rem;

  main {

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
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-weight: 600;
        letter-spacing: 0.5rem;
        text-indent: 0.5rem;
        cursor: pointer;
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
