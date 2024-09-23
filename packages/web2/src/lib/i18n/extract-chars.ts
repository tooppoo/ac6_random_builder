
type Resource = Record<string, string | object>
type ResourceValue = string | Record<string, string | object>

export function extractChars(src: Resource): string {
  return unique(
    removeOneByteSymbols(nestedToValues(src).join('')),
  )
}

function nestedToValues(obj: Resource): string[] {
  const values = Object.values(obj) as ResourceValue[]

  return values.reduce((acc, v): string[] => {
    return [...acc, ...(typeof v === 'string' ? [v] : nestedToValues(v))]
  }, [] as string[])
}

function removeOneByteSymbols(src: string): string {
  return src.replace(/[ -~\n]/g, '')
}

function unique(src: string): string {
  const charMap = src
    .split('')
    .reduce((acc, char) => ({ ...acc, [char]: char }), {})

  return Object.values(charMap).join('')
}