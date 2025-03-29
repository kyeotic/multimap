import { Multimap } from './multimap.ts'
import { add, del } from './set-operations.ts'

/**
 * Maps keys to a set of values
 *
 * Additionally indexes keys by value, improving the performance of `getByValue`
 * at the cost of additional memory
 */
export class IndexedMultimap<K, V> extends Multimap<K, V> {
  private keysByValue: Map<V, Set<K>>

  constructor() {
    super()
    this.keysByValue = new Map()
  }

  /** All values, flattened into a single array */
  override get values(): V[] {
    return Array.from(this.keysByValue.keys())
  }

  /** Add a key/value pair */
  override add(key: K, value: V) {
    super.add(key, value)
    add(this.keysByValue, value, key)
  }

  /** Remove a key/value pair */
  override delete(key: K, value: V) {
    super.delete(key, value)
    del(this.keysByValue, value, key)
  }

  /** Check if any key has the provided value */
  override hasValue(value: V): boolean {
    return this.keysByValue.has(value)
  }

  /** Get all keys for the provided value */
  override getByValue(value: V): K[] {
    const set = this.keysByValue.get(value)
    return set ? Array.from(set) : []
  }
}
