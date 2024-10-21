/**
 * Converts a bit index to its byte array location.
 * @param bitIndex Index of the bit in a byte array.
 * @returns Index of bit's byte, 2^(index of the bit in its byte)
 */
export function parseBitIndex(bitIndex: number): [number, number] {
    return [Math.floor(bitIndex/8), 1 << (bitIndex%8)]
}

/**
 * Utility class that can set individual bits of a byte array.
 */
export class BitSet {
    private static TO_STRING_BYTE_LIMIT: number = 6

    /**
     * Underlying storage for bits.
     * It is safe to mutate this externally, even during iteration over the BitSet.
     */
    bytes: Uint8Array

    constructor(bytes: ArrayBufferLike){
        this.bytes = new Uint8Array(bytes)
    }

    /**
     * Returns bit at the specified position.
     * @param bitIndex Index of the bit to retrieve.
     */
    get(bitIndex: number): number {
        const [at, mask] = parseBitIndex(bitIndex)
        return (this.bytes[at] & mask)? 1 : 0
    }

    /**
     * Sets bit at the specified position.
     * @param bitIndex Index of the bit to change.
     * @param value Value to set. Falsy and truthy values correspond to 0 and 1 respectively.
     */
    set(bitIndex: number, value: number): void {
        const [at, mask] = parseBitIndex(bitIndex)
        if(value) this.bytes[at] |= mask
        else      this.bytes[at] &= ~mask
    }

    /**
     * Toggles bit in-place at the specified position.
     * @param bitIndex Index of the bit to change.
     */
    invert(bitIndex: number): void {
        const [at, mask] = parseBitIndex(bitIndex)
        this.bytes[at] ^= mask
    }

    /** Returns the amount of bits stored. */
    length(): number {
        return this.bytes.length*8
    }

    /** Yields each bit sequentially. */
    *[Symbol.iterator](): Generator<number> {
        for(let i = 0; i < this.length(); i++)
            yield this.get(i)
    }

    toString(): string {
        const bits = Array
            .from(this.bytes.subarray(0, BitSet.TO_STRING_BYTE_LIMIT))
            .map(byte => byte.toString(2).padStart(8,'0'))
            .join(' ')
        const omitted = 8*(this.bytes.length-BitSet.TO_STRING_BYTE_LIMIT)
        return `${BitSet.name}(${this.length()}) { 0b${bits}${omitted > 0? ` ... ${omitted} more bits` : ''} }`
    }
}