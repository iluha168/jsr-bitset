# BitSet
A general-purpose interface for a byte array to manipulate individual bits.

## Example
```ts
import { BitSet } from "./src/mod.mts";

const bits = new BitSet(new ArrayBuffer(2))

bits.set(2, 1)
bits.set(3, 1)
bits.invert(4)

console.log(`${bits}`)
// Expected output: "BitSet(16) { 0b00011100 00000000 }"

console.log(bits.get(4))
// Expected output: 1

console.log(bits.get(1))
// Expected output: 0

console.log(Array.from(bits).join(''))
// Expected output: 0011100000000000
```