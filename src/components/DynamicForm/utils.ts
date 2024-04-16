export function getB(str: string) {
  const parameters = str.match(/\((.*?)\)/)?.[1]
  const functionBody = str.replace(/^\w*\s*\((.*?)\)\s*=>\s*/, '')
  return {
    args: parameters,
    body: functionBody,
  }
}
