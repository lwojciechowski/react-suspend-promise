export default function suspendPromise(p) {
  let state = 0
  let value

  let promise = p.then(
    val => {
      value = val
      state = 1
    },
    err => {
      value = err
      state = 2
    },
  )

  return function valueReader() {
    switch (state) {
      case 0:
        throw promise

      case 1:
        return value

      case 2:
        throw value
      // no default
    }
  }
}
