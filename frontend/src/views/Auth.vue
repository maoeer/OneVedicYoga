<script setup lang="ts">
import { ref, watch } from 'vue';
import MyLayout from '@/components/MyLayout.vue';
import MyCountdownButton from '@/components/MyCountdownButton.vue';
import type { IPageData, IPageTheme } from '@/types/TypeAuth';

// 页面数据
const pageData = ref<IPageData>({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
});

// true: 登录, false: 注册
const pageControl = ref<boolean>(true);
const pageTheme = ref<IPageTheme>({
  title: '登录',
  subTitle: '请登录您的账号',
  confirmText: '登录',
  linkForeword: '还没有账号？',
  linkText: '去注册',
});
watch(pageControl, (newVal => {
  if (newVal) {
    pageTheme.value = {
      title: '登录',
      subTitle: '请登录您的账号',
      confirmText: '登录',
      linkForeword: '还没有账号？',
      linkText: '去注册'
    }
  } else {
    pageTheme.value = {
      title: '注册',
      subTitle: '请注册您的账号',
      confirmText: '注册',
      linkForeword: '已经有账号？',
      linkText: '去登录'
    }
  }

  // 初始化表单数据
  pageData.value = {
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  }
}));

// 处理表单提交事件
const handleConfirm = () => {};

// 处理点击注册/登录链接
const handleLink = () => { pageControl.value = !pageControl.value };

// 处理发送验证码事件
const handleSendCode = (e: Event) => {
  e.preventDefault();

  console.log('发送验证码')
}; 
</script>

<template>
  <my-layout class="my-layout"
    :title="pageTheme.title" :sub-title="pageTheme.subTitle" 
    :confirmText="pageTheme.confirmText" :link-foreword="pageTheme.linkForeword"
    :link-text="pageTheme.linkText"
    @confirm="handleConfirm" @link="handleLink">
    <section>
      <label for="email">邮箱</label>
      <input v-model="pageData.email" type="email" id="email" required>
    </section>

    <section v-if="!pageControl">
      <label for="code">验证码</label>
      <div class="code-container">
        <input v-model="pageData.code" type="text" id="code" required>
        <my-countdown-button @click="handleSendCode"></my-countdown-button>
      </div>
    </section>

    <section>
      <div class="password-container">
        <label for="password">密码</label>
        <a href="#" v-if="pageControl">忘记密码?</a>
      </div>
      <input v-model="pageData.password" type="password" id="password" required>
    </section>

    <section  v-if="!pageControl">
      <div>
        <label for="password">确认密码</label>
        <input v-model="pageData.confirmPassword" type="password" id="confirmPassword" required>
      </div>
    </section>
  </my-layout>
</template>

<style scoped lang="scss">
.my-layout{
  section {
    margin-bottom: 0.825rem;

    label {
      font-size: 0.825rem;
    }

    input {
      display: block;
      width: 100%;
      border: 1px solid #ccc;
      padding: 0.5rem;
      font-size: 1.1rem;
      border-radius: $radius-1;
    }

    .code-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;

      input {
        flex: 1;
      }
    }

    .password-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        font-size: 0.825rem;
        color: #007bff;
      }
    }
  }
}
</style>
