import crypto from 'crypto'

// isString method should come from a utility library like Ramda or Lodash
const isString = (item) => typeof item === 'string'

// DRY it, also it could be in a shared folder if it's used in other places
const createHash = (toUpdate) =>
  crypto.createHash('sha3-512').update(toUpdate).digest('hex')

// if these are constants it'd be a better have them in other place
// or at least outside the exported function
const TRIVIAL_PARTITION_KEY = '0'
const MAX_PARTITION_KEY_LENGTH = 256

export const deterministicPartitionKey = (event) => {
  // get a hash from event if exists
  const hashFromEvent = event && createHash(JSON.stringify(event))

  // get initial value for candidate
  let candidate = event?.partitionKey || hashFromEvent || TRIVIAL_PARTITION_KEY

  // if candidate initial value is not an string make it a string
  if (!isString(candidate)) {
    candidate = JSON.stringify(candidate)
  }

  // if candidate.length is bigger than MAX_PARTITION_KEY_LENGTH hash it
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate)
  }

  return candidate
}
