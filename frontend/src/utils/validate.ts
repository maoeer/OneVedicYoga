/**
 * 验证邮箱格式是否合法
 */
export function validateEmail(email: string): boolean {
  /*
    []+ 表示至少出现1次
    \. 转义的点
    {2,} 表示至少出现2次 
  */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailRegex.test(email.trim())
}

/**
 * 校验字符串长度是否合法
 */
export function validateLength(min: number, max: number, target: string) {
  return target.length <= max && target.length >= min
}