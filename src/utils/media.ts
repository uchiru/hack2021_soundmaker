import { css } from 'styled-components/macro'

const sizes: Record<string, number> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const device = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
    css`
      @media (min-width: ${sizes[label]}px) {
        ${css(literals, ...placeholders)};
      }
    `.join('')
  return acc
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>)
