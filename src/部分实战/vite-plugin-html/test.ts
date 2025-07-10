createHtmlPlugin({
        minify: true,
        inject:{
            data:{
                vConsole:'<script>function _vConsoleOnLoad(){var vConsole = new VConsole();}</script>'
            },
            tags:[
                {
              // 默认注入到body标签
              injectTo:  'body',
              tag: 'script',
              attrs: {
                src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
                async: true,
                onload: '_vConsoleOnLoad()',
              },
            }
            ]
        }
})

const list = [
    {
        name:'vConsole',
        data:'<script>function _vConsoleOnLoad(){var vConsole = new VConsole();}</script>',
        tags:{
            src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
            async: true,
            onload: '_vConsoleOnLoad()',
        }
    }
]