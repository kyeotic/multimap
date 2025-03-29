import { Multimap } from './multimap.ts'
import { add, del } from './set-operations.ts'

export class IndexedMultimap<K, V> extends Multimap<K, V> {
  private keysByValue: Map<V, Set<K>>

  constructor() {
    super()
    this.keysByValue = new Map()
  }

  override get values(): V[] {
    return Array.from(this.keysByValue.keys())
  }

  override add(key: K, value: V) {
    super.add(key, value)
    add(this.keysByValue, value, key)
  }

  override delete(key: K, value: V) {
    super.delete(key, value)
    del(this.keysByValue, value, key)
  }

  override hasValue(value: V): boolean {
    return this.keysByValue.has(value)
  }

  override getKeysForValue(value: V): K[] {
    const set = this.keysByValue.get(value)
    return set ? Array.from(set) : []
  }
}
