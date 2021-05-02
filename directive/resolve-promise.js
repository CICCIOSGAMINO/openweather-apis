import { AsyncDirective, directive } from 'lit/async-directive.js'

class ResolvePromise extends AsyncDirective {
  render (promise) {
    Promise.resolve(promise)
      .then((resolvedValue) => {
        // Rendered Async
        this.setValue(resolvedValue)
      })
    // Rendered synchronously
    return ''
  }
}

export const resolvePromise = directive(ResolvePromise)
