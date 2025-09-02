/**防抖函数 */
export default function debounce(fn: Function, delay: number) {
  let timer: number | null = null;

  return function (...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}