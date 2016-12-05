const Observable = require('./index')

const observerData$ = Observable.create(observer => {
    observer.next('=> hello')
    observer.complete(' => complete')
})

const observerMapData$ = observerData$.map(v => `map value ${v}`)

const arrayObserverData$ = Observable.fromArray([1, 2, 3])

const arrayConcatObserverData$ = arrayObserverData$.mergeMap(array => {
    return Observable.fromArray([4, 5, 6].concat(array))
})


console.log('observerData$ start===========')
observerData$.subscribe(
    v => console.log('next...' + v),
    v => console.log('error...' + v),
    () => console.log('complete...')
)
console.log('observerData$ end===========')

console.log('observerMapData$ start===========')
observerMapData$.subscribe(
    v => console.log('map-next...' + v),
    v => console.log('map-error...' + v),
    () => console.log('map-complete...')
)
console.log('observerMapData$ end===========')

console.log('arrayObserverData$ start===========')
arrayObserverData$.subscribe(v => console.log(v))
console.log('arrayObserverData$ end===========')

console.log('arrayConcatObserverData$ start===========')
arrayConcatObserverData$.subscribe(
    v => console.log('mergeMap-next...' + v),
    v => console.log('mergeMap-error...' + v),
    () => console.log('mergeMap-complete...')
)
console.log('arrayConcatObserverData$ end===========')