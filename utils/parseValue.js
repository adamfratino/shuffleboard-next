const parseValue = (val = '') =>
  val.split(',').reduce((acc, v) => {
    // Multi-dim array is empty or last element already has 2 elements
    if (!acc[acc.length - 1] || acc[acc.length - 1].length === 2) {
      acc.push([parseFloat(v)])
      return acc
    }
    // last element has 1 element
    acc[acc.length - 1].push(parseFloat(v))
    return acc
  }, [])

export default parseValue
