<script setup lang="ts">
import { reactive } from 'vue'
import { validateEmail, validateLength } from '@/utils/validate'
import MyInput from '@/components/MyInput.vue'

interface IFormData {
  email: string,
  password: string
}

interface IValidState {
  email: boolean
  password: boolean
}

// 表单数据
const formData = reactive<IFormData>({
  email: '',
  password: ''
})

// 校验状态
const validState = reactive<IValidState>({
  email: false,
  password: false
})
// 校验方法
const validFn = {
  email: (value: string) => validateEmail(value),
  password: (value: string) => validateLength(8, 20, value)
}

// 表单提交
const formSubmit = () => {
  console.log('表单提交')

  // todo: 提交表单
}
</script>

<template>
  <div class="box-login">
    <p class="title">登录</p>

    <form @submit.prevent="formSubmit">
      <my-input v-model="formData.email" label="邮箱" type="email" error-message="请输入正确的邮箱" placeholder="请输入邮箱"
        :validator="validFn.email" @validate="value => validState.email = value" :customClass="['input']"/>

      <my-input v-model="formData.password" label="密码" type="password" error-message="密码长度为8-20" placeholder="请输入密码"
        :validator="validFn.password" @validate="value => validState.password = value" :customClass="['input']"/>

      <input type="submit" class="submit-button" :disabled="!(validState.email && validState.password)" />
    </form>

    <div class="bottom">
      <p class="register">没有账户? <a href="#">注册</a></p>

      <p><a href="#">忘记密码?</a></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
$color-disabled: #D9CDF8;
$color-hover: #9376E0;
$color-purple: #A78BFA;

.box-login {
  width: 350px;
  padding: 2rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: $radius;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .title {
    font-weight: 700;
    line-height: 2rem;
    font-size: 1.5rem;
    text-align: center;
  }

  .submit-button {
    display: block;
    text-align: center;
    font-weight: 600;
    width: 100%;
    padding: 0.75rem;
    margin: 0.75rem 0;
    border-radius: 0.375rem;
    border: none;
    outline: none;
    background-color: $color-purple;
    color: $color-white;
    cursor: pointer;

    &:disabled {
      background-color: $color-disabled;
      color: rgba($color-black, 0.9);
      cursor: not-allowed;
      opacity: 0.85;

      &:hover {
        background-color: $color-disabled;
      }
    }

    &:hover {
      background-color: $color-hover;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    font-size: 0.75rem;
  }

  a {
      color: $color-blue;
  }
}
</style>
