<script setup lang="ts">
interface IFormProps {
  options: {
    title?: string
    submitText?: string
    disabled?: boolean
  }
}

const props = withDefaults(defineProps<IFormProps>(), {
  options: () => ({
    title: '表单',
    submitText: '提交',
    disabled: false
  })
})

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="box-login">
    <p class="title">{{ options.title }}</p>

    <form @submit.prevent="handleSubmit">
      <!-- 表单内容插槽 - 用于放置输入框等表单元素 -->
      <slot></slot>

      <!-- 提交按钮 -->
      <input 
        type="submit" 
        class="submit-button" 
        :value="options.submitText"
        :disabled="options.disabled"
      />
    </form>

    <div class="bottom">
      <!-- 底部区域插槽-->
      <slot name="bottom"></slot>
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

  :deep(a) {
    color: $color-blue;
  }
}
</style>
