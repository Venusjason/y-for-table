const PACKAGE_NAME = '[Y-For-Table]'

// const logFun = console.warn

// export default (...args) => {
//   return logFun.call(console, `${PACKAGE_NAME}:`, ...args)
// }

const Log = {
  success: (...args) => console.log(`${PACKAGE_NAME}:`, ...args),
  warn: (...args) => console.warn(`${PACKAGE_NAME}:`, ...args),
  error: (...args) => console.error(`${PACKAGE_NAME}:`, ...args),
  table: (...args) => console.table(`${PACKAGE_NAME}:`, ...args),
}

export default Log