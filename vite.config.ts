import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      host: '127.0.0.1',
      port: 3000,
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ],
        // eslint 报错解决：'ref' is not defined
        eslintrc: {
          enabled: true
        },
        resolvers: [NaiveUiResolver()]
      }),
      Components({
        // 指定组件位置，默认是src/components
        // dirs: ['src/components'],
        // 组件的有效文件扩展名
        // extensions: ['vue'],
        // 配置文件生成位置
        // dts: 'src/components.d.ts',
        resolvers: [NaiveUiResolver(), IconsResolver()]
      }),
      Icons({
        autoInstall: true
      }),
      VueSetupExtend()
    ]
  }
})
