# @kyeotic/multimap

Provides a `MultiMap` and `IndexedMultiMap` for Mapping keys that contain multiple values

```ts
import { MultiMap } from '@kyeotic/multimap'

const multi = new MultiMap<string, string>()

multi.add('first', 'a')
multi.add('first', 'b')
multi.add('first', 'c')

console.log(mutli.get('first')) // => Set('a', 'b', 'c')
console.log(mutli.hasKey('first')) // => true
console.log(mutli.hasValue('a')) // => true
```