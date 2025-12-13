<template>
  <div class="calculator">
    <h1>计算器工具</h1>
    <div class="calculator-container">
      <div class="display">
        <input v-model="display" readonly class="display-input" :class="{ error: hasError }" />
      </div>
      <div class="buttons">
        <button @click="clear" class="btn clear">C</button>
        <button @click="backspace" class="btn backspace">⌫</button>
        <button @click="appendOperator('/')" class="btn operator">÷</button>
        <button @click="appendOperator('*')" class="btn operator">×</button>

        <button @click="appendNumber('7')" class="btn number">7</button>
        <button @click="appendNumber('8')" class="btn number">8</button>
        <button @click="appendNumber('9')" class="btn number">9</button>
        <button @click="appendOperator('-')" class="btn operator">−</button>

        <button @click="appendNumber('4')" class="btn number">4</button>
        <button @click="appendNumber('5')" class="btn number">5</button>
        <button @click="appendNumber('6')" class="btn number">6</button>
        <button @click="appendOperator('+')" class="btn operator">+</button>

        <button @click="appendNumber('1')" class="btn number">1</button>
        <button @click="appendNumber('2')" class="btn number">2</button>
        <button @click="appendNumber('3')" class="btn number">3</button>
        <button @click="calculate" class="btn equals">=</button>

        <button @click="appendNumber('0')" class="btn number zero">0</button>
        <button @click="appendNumber('.')" class="btn number">.</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const display = ref('0')
const hasError = ref(false)

const appendNumber = (num: string) => {
  if (hasError.value) {
    display.value = num
    hasError.value = false
  } else if (display.value === '0') {
    display.value = num
  } else {
    display.value += num
  }
}

const appendOperator = (operator: string) => {
  if (hasError.value) {
    hasError.value = false
    display.value = '0' + operator
  } else if (display.value !== '0' && !isLastCharOperator()) {
    display.value += operator
  }
}

const isLastCharOperator = () => {
  const lastChar = display.value.slice(-1)
  return ['+', '-', '*', '/'].includes(lastChar)
}

const calculate = () => {
  try {
    // 使用Function构造函数安全地计算表达式
    const result = new Function(
      'return ' + display.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
    )()
    display.value = String(result)
    hasError.value = false
  } catch (error) {
    display.value = 'Error'
    hasError.value = true
  }
}

const clear = () => {
  display.value = '0'
  hasError.value = false
}

const backspace = () => {
  if (hasError.value) {
    display.value = '0'
    hasError.value = false
  } else if (display.value.length > 1) {
    display.value = display.value.slice(0, -1)
  } else {
    display.value = '0'
  }
}
</script>

<style scoped>
.calculator {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.calculator-container {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.display {
  margin-bottom: 20px;
}

.display-input {
  width: 100%;
  height: 60px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 24px;
  text-align: right;
  padding: 0 16px;
  font-family: 'Courier New', monospace;
  transition: border-color 0.3s ease;
}

.display-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.display-input.error {
  border-color: var(--error-color);
  color: var(--error-color);
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.btn {
  height: 60px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
}

.btn.number {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.btn.number:hover {
  background: var(--bg-tertiary);
}

.btn.operator {
  background: var(--primary-color);
  color: white;
}

.btn.operator:hover {
  background: var(--primary-hover);
}

.btn.clear {
  background: var(--warning-color);
  color: white;
}

.btn.clear:hover {
  background: var(--warning-hover);
}

.btn.backspace {
  background: var(--error-color);
  color: white;
}

.btn.backspace:hover {
  background: var(--error-hover);
}

.btn.equals {
  background: var(--success-color);
  color: white;
  grid-column: span 1;
}

.btn.equals:hover {
  background: var(--success-hover);
}

.btn.zero {
  grid-column: span 2;
}
</style>
