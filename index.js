const isFunction = (fn) => {
    return typeof fn === 'function'
}

const noop = () => console.log('noop...')

class Observable {
    constructor (fn) {
        this.fn = fn
    }

    static create(fn) {
        return new Observable(fn)
    }

    subscribe (next, error, complete) {
        if(!isFunction(next)) {
            return this.fn(next)
        }

        return this.fn({
            next,
            error: error || noop,
            complete: complete || noop
        })
    }

    map (fn) {
        return new Observable(observer => {
            return this.subscribe({
                next(v) {
                    observer.next(fn(v))
                },
                error(err) {
                    observer.error(err)
                },
                complete() {
                    observer.complete()
                }
            })
        })
    }

    mergeMap (fn) {
        return new Observable(observer => {
            return this.subscribe({
                next(v) {    
                    fn(v).subscribe({
                        next(v) {
                            observer.next(v)
                        },
                        error(e) {
                            observer.error(e) 
                        },
                        complete() {
                            observer.complete()
                        } 
                    })
                },
                error(err) {
                    observer.error(err) 
                },
                complete() {
                    observer.complete()
                }
            })
        })
    }

    static fromEvent (el, event) {
        return new Observable(observer => {
            const handler = e => observer.next(e)
            el.addEventListener(event, handle)

            return () => {
                el.removeEventListener(event, handle)
            }
        })
    }

    static fromArray (array) {
        return new Observable(observer => {
            array.forEach(v => observer.next(v))
            observer.complete()
        })
    }
}

module.exports = Observable