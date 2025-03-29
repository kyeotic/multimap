import { add, del } from './set-operations.ts'

/**
 * Maps keys to a set of values
 */
export class Multimap<K, V> {
  private valuesByKey: Map<K, Set<V>>

  constructor() {
    this.valuesByKey = new Map<K, Set<V>>()
  }

  /** All keys */
  get keys(): K[] {
    return Array.from(this.valuesByKey.keys())
  }

  /** All values, flattened into a single array */
  get values(): V[] {
    const sets = Array.from(this.valuesByKey.values())
    return sets.reduce((values, set) => values.concat(Array.from(set)), <V[]>[])
  }

  /** The size of all values */
  get size(): number {
    const sets = Array.from(this.valuesByKey.values())
    return sets.reduce((size, set) => size + set.size, 0)
  }

  /** Add a key/value pair */
  add(key: K, value: V) {
    add(this.valuesByKey, key, value)
  }

  /** Remove a key/value pair */
  delete(key: K, value: V) {
    del(this.valuesByKey, key, value)
  }

  /** Check for a key/value pair */
  has(key: K, value: V): boolean {
    const values = this.valuesByKey.get(key)
    return values != null && values.has(value)
  }

  /** Check if a key has any values */
  hasKey(key: K): boolean {
    return this.valuesByKey.has(key)
  }

  /** Check if any key has the provided value */
  hasValue(value: V): boolean {
    const sets = Array.from(this.valuesByKey.values())
    return sets.some((set) => set.has(value))
  }

  /** Get values for the provided key */
  get(key: K): V[] {
    const values = this.valuesByKey.get(key)
    return values ? Array.from(values) : []
  }

  /** Get all keys for the provided value */
  getByValue(value: V): K[] {
    return Array.from(this.valuesByKey)
      .filter(([_key, values]) => values.has(value))
      .map(([key, _values]) => key)
  }
}
