import { createHtmlPlugin } from 'vite-plugin-html';
import {IvitePluginHtmlOptions} from './data'
export default function viteHtmlLoader(options:IvitePluginHtmlOptions) {
  if (!options.loaderList) return {};

  const injectData = {}
  options.loaderList.reduce((pre:Record<string,string>, loader) => {
    const value = typeof loader.value === 'function' ? loader.value(options.env) : loader.value
    if (value) {
      pre[loader.key] = value
    }
    return pre
  }, {})

  return createHtmlPlugin({
    minify: true,
    inject: {
      data: injectData,
      tags: options.loaderList.reduce((pre:any[], loader) => {
        let tag = loader.tag === 'function' ? loader.tag(options.env) : loader.tag
        if (!tag) {
          return pre
        }
        if (loader.type === 'css') {
          pre.push({
            injectTo: 'head',
            tag: 'link',
            attrs: {
              href: tag.src,
              rel: 'stylesheet',
            }
          })
        } else {
          pre.push({
            injectTo: tag.injectTo || 'body',
            tag: 'link',
            attrs: tag.attrs || {}
          })
        }
        return pre
      }, [])
    },
  });
}
