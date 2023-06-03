import type { RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-uno'
import { parseColor } from '@unocss/preset-mini/utils'
import { theme as unoTheme } from '@unocss/preset-mini'
import { fonts } from '@unocss/preset-mini/rules'
import {
    defineConfig,
    mergeDeep,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

// for IDE support
export default defineConfig({
    theme: mergeDeep<Theme>(unoTheme, {
        colors: {
            context: 'rgba(var(--nui-c-context),%alpha)',
            primary: '#03ae67',
        },
        fontFamily: {
            sans: 'Avenir, Helvetica, Arial, sans-serif',
        },
    }),
    rules: [
        [/^n-(.*)$/, ([, body]: string[], { theme }: RuleContext<Theme>) => {
            const color = parseColor(body, theme)
            if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
                return {
                    '--nui-c-context': `${color.cssColor.components.join(',')}`,
                }
            }
        }]
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetTypography(),
        presetIcons({
            prefix: ['i-', ''],
            scale: 1.2,
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
    shortcuts: [
        ['head-link', 'color-inherit hover:op-100 op-60 transition-opacity select-none cursor-pointer']
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
