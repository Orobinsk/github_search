export const throttle = (
  func: () => void,
  limit: number
): ((this: any, ...args: any[]) => void) => {
  let inThrottle: boolean
  return function (...args: []) {
    // const args = arguments
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
