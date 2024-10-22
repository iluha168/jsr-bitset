[![JSR][jsr-badge]][jsr-url]
[![Deno][deno-badge]][deno-url]
[![TypeScript][typescript-badge]][typescript-url]
[![CI][ci-badge]][ci-url]
[![License: MIT][license-badge]][license-url]

# BitSet
A general-purpose interface for a byte array to manipulate individual bits.

## Example
```ts
import { BitSet } from "jsr:@iluha168/bitset";

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

console.log(Array.from(bits.entries().take(3)))
// Expected output: [ [ 0, 0 ], [ 1, 0 ], [ 2, 1 ] ]
```

[jsr-badge]: https://jsr.io/badges/@iluha168/bitset?style=flat-square
[jsr-url]: https://jsr.io/@iluha168/bitset

[deno-badge]: https://img.shields.io/badge/Deno-000000?logo=Deno&logoColor=FFF&style=flat-square
[deno-url]: https://deno.com/

[typescript-badge]: https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[typescript-url]: https://www.typescriptlang.org/

[ci-badge]: https://img.shields.io/github/actions/workflow/status/iluha168/jsr-bitset/publish.yml?logo=github&style=flat-square
[ci-url]: https://github.com/iluha168/jsr-bitset/actions/workflows/publish.yml

[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: https://wei.mit-license.org