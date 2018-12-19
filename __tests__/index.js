import suspendPromise from '../src'

describe('suspendPromise', () => {
  it('throws promise when unresolved', () => {
    const read = suspendPromise(new Promise(res => {}))

    try {
      read()
    } catch (err) {
      expect(typeof err.then).toBe('function')
    }
  })

  it('returns value when promise resolved', () => {
    const read = suspendPromise(Promise.resolve('value'))
    setImmediate(() => {
      expect(read()).toBe('value')
    })
  })

  it('throws error when promise rejected', () => {
    const read = suspendPromise(Promise.reject('error'))
    setImmediate(() => {
      expect(read).toThrowError('error')
    })
  })
})
