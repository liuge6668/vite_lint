import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'

import { useCounterStore } from '../counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with count 0', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
  })

  it('should increment count', () => {
    const counter = useCounterStore()
    counter.increment()
    expect(counter.count).toBe(1)
  })

  it('should decrement count', () => {
    const counter = useCounterStore()
    counter.count = 5
    counter.decrement()
    expect(counter.count).toBe(4)
  })

  it('should reset count to 0', () => {
    const counter = useCounterStore()
    counter.count = 10
    counter.reset()
    expect(counter.count).toBe(0)
  })

  it('should compute double count correctly', () => {
    const counter = useCounterStore()
    counter.count = 3
    expect(counter.doubleCount).toBe(6)
  })
})
