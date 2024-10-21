import { BitSet } from "../src/mod.mts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("BitSet", async t => {
    const bits = new BitSet(new Uint8Array([0b10010101, 0b11100000]))
    
    await t.step("get in first byte", () => {
        assertEquals(bits.get(0), 1)
        assertEquals(bits.get(1), 0)
        assertEquals(bits.get(2), 1)
        assertEquals(bits.get(3), 0)
        assertEquals(bits.get(4), 1)
        assertEquals(bits.get(5), 0)
        assertEquals(bits.get(6), 0)
        assertEquals(bits.get(7), 1)
    })

    await t.step("get in second byte", () => {
        assertEquals(bits.get( 8), 0)
        assertEquals(bits.get( 9), 0)
        assertEquals(bits.get(10), 0)
        assertEquals(bits.get(11), 0)
        assertEquals(bits.get(12), 0)
        assertEquals(bits.get(13), 1)
        assertEquals(bits.get(14), 1)
        assertEquals(bits.get(15), 1)
    })

    await t.step("bytes mutability", () => {
        const previousBytes = Array.from(bits.bytes)
        previousBytes.push(0b10010010)
        bits.bytes = new Uint8Array(previousBytes)

        assertEquals(bits.get(16), 0)
        assertEquals(bits.get(17), 1)
    })

    await t.step("set", () => {
        for(let i = 0; i < 10000; i++){
            const randomIndex = Math.floor(Math.random()*bits.length())
            const randomValue = Math.random() > 0.5? 1 : 0

            bits.set(randomIndex, randomValue)
            assertEquals(bits.get(randomIndex), randomValue)
        }
    })

    await t.step("invert", () => {
        for(let i = 0; i < 10000; i++){
            const randomIndex = Math.floor(Math.random()*bits.length())
            const previousValue = bits.get(randomIndex)

            bits.invert(randomIndex)
            assertEquals(bits.get(randomIndex), 1 - previousValue)
        }
    })

    await t.step("iterator", () => {
        let i = 0;
        for(const bit of bits){
            assertEquals(bit, bits.get(i))

            i++
        }
    })

    await t.step("mutating bytes during iteration", () => {
        let i = 0;
        for(const bit of bits){
            assertEquals(bit, bits.get(i))

            bits.bytes = new Uint8Array([Math.random() * 255])
            i++
        }
    })
})