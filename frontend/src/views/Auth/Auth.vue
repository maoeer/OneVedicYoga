<script setup lang="ts">
import { reactive } from 'vue'
import { validateEmail, validateLength } from '@/utils/validate'
import Verification from './components/Verification.vue'
import MyInput from '@/components/MyInput.vue'

interface IVerificationOptions {
  title: '登录' | '注册'
  submitText: string
  disabled: boolean
}

// verification组件的控制
const verificationOptions = reactive<IVerificationOptions>({
  title: '登录',
  submitText: '登录',
  disabled: false
})

interface IFormData {
  email: string,
  password: string
}

// 表单数据
const formData = reactive<IFormData>({
  email: '',
  password: ''
})

interface IValidState {
  email: boolean
  password: boolean
}

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
const handleSubmit = () => {
  console.log(formData)
}

const controlForm = (currentTitle: '登录' | '注册') => {
  console.log(verificationOptions)
  verificationOptions.title = currentTitle 
  resetData()
}

// 重置表单数据
const resetData = () => {
  formData.email = ''
  formData.password = ''
  validState.email = false
  validState.password = false
}
</script>

<template>
  <div class="box-auth my-flex">
    <!-- 表单 -->
    <verification :options="verificationOptions" @submit="handleSubmit">
      <!-- 登录表单 -->
      <template v-if="verificationOptions.title === '登录'" #default>
        <my-input 
          v-model="formData.email" label="邮箱" type="email" 
          error-message="请输入正确的邮箱" placeholder="请输入邮箱"
          :validator="validFn.email" @validate="value => validState.email = value"/>

        <my-input 
          v-model="formData.password" label="密码" type="password" 
          error-message="密码长度为8-20" placeholder="请输入密码"
          :validator="validFn.password" @validate="value => validState.password = value"/>
      </template>

      <!-- 注册表单 -->
      <template v-if="verificationOptions.title === '注册'" #default>
        <my-input 
          v-model="formData.email" label="邮箱" type="email" 
          error-message="请输入正确的邮箱" placeholder="请输入邮箱"
          :validator="validFn.email" @validate="value => validState.email = value"/>

        <!-- todo 修改校验方法 -->
        <my-input 
          v-model="formData.password" label="验证码" type="text" 
          :max-length="6" :min-length="6" error-message="请输入6位验证码" 
          placeholder="请输入验证码" showBtn :validator="validFn.password" 
          @validate="value => validState.password = value"/>
      </template>

      <template #bottom>
        <p class="register">
          {{ verificationOptions.title === '登录' ? '没有账户?' : '已有账户?' }}
          <a href="javascript:void(0)" 
             @click="controlForm(verificationOptions.title === '登录' ? '注册' : '登录')">
            {{ verificationOptions.title === '登录' ? '注册' : '登录' }}
          </a>
        </p>

        <p><router-link to="/auth/register">忘记密码?</router-link></p>
      </template>
    </verification>
  </div>
</template>

<style scoped lang="scss">
.box-auth {
  height: 100%;
  background: radial-gradient(
    180% 180% at 50% 50%,
    #EDF4F8 0%, #EFF2FA 16.92%,
    #FAEFF6 34.8%, #FAE6F2 48.8%,
    #FAF0F7 63.79%, #F1F1FB 81.34%,
    #F0F4F8 100%
  );
  animation: flow 10s linear infinite alternate;
}

@keyframes flow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -2000px -2000px;
  }
}
</style>
