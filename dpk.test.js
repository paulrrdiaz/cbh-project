import { deterministicPartitionKey } from './dpk'

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey()
    expect(trivialKey).toBe('0')
  })

  it('returns a hash when given an empty event', () => {
    const trivialKey = deterministicPartitionKey({})
    expect(trivialKey).toBe(
      'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862',
    )
  })

  it('returns a hash when given an empty partitionKey into event object', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: '' })
    expect(trivialKey).toBe(
      'b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6',
    )
  })

  it('returns a hash when given a nullish partitionKey into event object', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: null })
    expect(trivialKey).toBe(
      '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2',
    )
  })

  it('returns a hash when given a event object without partitionKey', () => {
    const trivialKey = deterministicPartitionKey({ hireMe: true })
    expect(trivialKey).toBe(
      '3f1adbe8d00a6467d4b6703012bf68e1f8eaa1fb228ffc4cf8f1c6b3cd49ae0d91a15169ed63b0a212710efb2adb3980df2379d2e9f209fac38806754681bcce',
    )
  })

  it('returns the partitionKey as String when given a small numeric partitionKey into event object', () => {
    const partitionKey = 1123581321
    const trivialKey = deterministicPartitionKey({ partitionKey })
    expect(trivialKey).toBe(String(partitionKey))
  })

  it('returns a hash when given a long partitionKey into event object', () => {
    const partitionKey = [...Array(257).fill(1)].join('')
    const trivialKey = deterministicPartitionKey({ partitionKey })
    expect(trivialKey).toBe(
      '3f2e417dd3287bb9d5a0e47a8a25191210abdd7739d882cea800f3180dc91508c047c737c51abad48d4d4f2469776294e2b4d9de0af65bffb147d7655ff49fa8',
    )
  })

  it('returns null when given a Infinity as partitionKey into event object', () => {
    const partitionKey = Math.pow(1123581321, 40)
    const trivialKey = deterministicPartitionKey({ partitionKey })
    expect(trivialKey).toBe('null')
  })
})
