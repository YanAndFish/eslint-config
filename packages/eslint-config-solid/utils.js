/* eslint-disable n/prefer-global/process */
const isInEditor = !!(process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI

module.exports = {
  isInEditor,
}
