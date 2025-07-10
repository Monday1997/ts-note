import * as globalConfigDev from '../globalConfigDev.ts';
import { ILoaderItem } from './data.js'
/**
 * 脚本样式等加载列表
 * @type {[{name: string, src: string, injectTo: string},{name: string, src: string},{name: string, src: string},{name: string, src: string, type: string},{name: string, src: string, injectScript: {name: string, script: string, isFn: (function(): *)}, isFn: (function(): *), attrs: {async: boolean, onload: string}}]}
 */
export const loaderList: ILoaderItem[] = [
    {
        key: 'webViewScript',
        value: `<script type="text/javascript">
      const userAgent = navigator.userAgent
      // 支付宝小程序
      if (userAgent.indexOf('AliApp') > -1 || userAgent.indexOf('AlipayClient') > -1) {
        document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>');
      }
      </script>`
    },
    //   type
    {
        key: 'vConsole',
        value: (env = {}) => {
            return judgeIsVconsoleShow(env) ? '<script>function _vConsoleOnLoad(){var vConsole = new VConsole();}</script>' : ''
        },
        tag: (env = {}) => {
            let result = {
                arrts: {
                    src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
                    async: true,
                    onload: '_vConsoleOnLoad()'
                }
            }
            return judgeIsVconsoleShow(env) ? result : undefined
        }
    },
];
function judgeIsVconsoleShow(env: any) {
    let isVConsoleShow = false
    // 生产环境中 
    if (env.BUILD_ENV && ['dev', 'test'].includes(env.BUILD_ENV)) {
        isVConsoleShow = env.SHOW_DEV_CONSOLE && env.SHOW_DEV_CONSOLE === 'true';
    }
    // 开发环境中
    else if (env.NODE_ENV === 'development') {
        isVConsoleShow = globalConfigDev.SHOW_DEV_CONSOLE
    }
    return isVConsoleShow

}