// Accepts an array and splits it
// into pairs of [position, character_id]
export const randomId = (prefix = 'wfst_') => {
  return prefix + Math.floor((Math.random() * 100000000000000) + 1)
}
