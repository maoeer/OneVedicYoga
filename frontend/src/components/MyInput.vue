<!-- 
  todo:
  1. 背景颜色和边框颜色
  2. 错误信息使用隐藏不是直接删除
  3. 倒时60s发送验证按钮
-->

<script setup lang="ts">
import { ref, computed } from 'vue';
import debounce from '@/utils/debounce';

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  type?: 'text' | 'password' | 'email'
  errorMessage?: string
  minLength?: number
  maxLength?: number
  placeholder?: string
  showBtn?: boolean
  validator?: (value: string) => boolean
}>(), {
  modelValue: '',
  type: 'text',
  minLength: 8,
  maxLength: 20,
  placeholder: '',
  showBtn: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'validate', valid: boolean): void
}>()

// 校验结果
const isValid = computed(() => {
  // 没有校验函数，则认为校验通过
  if (!props.validator) return true
  // 调用校验函数，返回校验结果
  return props.validator(props.modelValue)
})

// 用于配合防抖逻辑控制错误消息的显示时机
const isErrorPending = ref<boolean>(false)
// 控制显示错误消息的开关
const shouldShowError = computed(() =>
  // 显示条件：1. 有传入错误信息；2.符合显示时机；3.校验不通过
  props.errorMessage && isErrorPending.value && !isValid.value
)

// 防抖函数
const debouncedShowError = debounce(() => isErrorPending.value = true, 500)
// 输入事件
const handleInput = (e: Event): void => {
  const newValue = (e.target as HTMLInputElement).value
  emit('update:modelValue', newValue)

  // 校验
  if (props.validator) {
    emit('validate', props.validator(newValue))
  }

  // 重置显示状态，防抖展示错误消息
  isErrorPending.value = false
  // 防抖展示错误消息
  debouncedShowError()
}

// 失去焦点事件
const handleBlur = (): void => { isErrorPending.value = true }

// 发送验证码
const sendCode = (): void => {
  // todo: 60s倒计时
  
  console.log('发送验证码')
} 
</script>

<template>
  <div class="box-input">
    <label v-if="label">{{ label }}</label>

    <div class="input-authCode">
      <input :class="{ 'authCode': showBtn }" :value="modelValue" :type="type" :placeholder="placeholder" :maxlength="maxLength" :minlength="minLength"
      @input="handleInput" @blur="handleBlur">
      <button class="authCode-btn" v-if="showBtn" @click="sendCode">发送验证码</button>
    </div>

    <small :style="{ visibility: shouldShowError ? 'visible' : 'hidden' }">{{ errorMessage }}</small>
  </div>
</template>

<style scoped lang="scss">
.box-input {
  margin: 0.25rem 0;

  label,
  small {
    display: block;
  }

  .input-authCode {
    display: flex;
    justify-content: space-between;

    .authCode {
      width: 70%;
    }

    .authCode-btn {
      margin: 0.25rem 0;
      padding: 0 0.25rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.375rem;
      outline: none;
      background-color: $color-white;
      cursor: pointer;
    }
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.375rem;
    margin: 0.25rem 0;
    outline: none;
    color: $color-black;
    background-color: $color-white;

    &::placeholder {
      opacity: 0.5;
    }

    &:hover {
      background-color: $color-gray-white;
    }
  }

  small {
    font-size: 0.75rem;
    color: $color-red;
  }
}
</style>
