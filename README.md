# @kyeotic/multimap

Provides a `Multimap` and `IndexedMultimap` for Mapping keys that contain multiple values

```ts
import { Multimap } from '@kyeotic/multimap'

const multi = new Multimap<string, string>()

multi.add('first', 'a')
multi.add('first', 'b')
multi.add('first', 'c')

console.log(mutli.get('first')) // => Set('a', 'b', 'c')
console.log(mutli.hasKey('first')) // => true
console.log(mutli.hasValue('a')) // => true
```