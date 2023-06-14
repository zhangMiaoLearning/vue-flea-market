import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// ⾃动导⼊vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite';
//⾃动导⼊ui-组件 ⽐如说ant-design-vue element-plus等
import Components from 'unplugin-vue-components/vite';
//element
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      //安装两⾏后你会发现在组件中不⽤再导⼊ref，reactive等
      imports:['vue','vue-router'],
      //存放的位置
      dts:"src/auto-import.d.ts",
      resolvers:[ElementPlusResolver()]
    }),
    Components({
      // 引⼊组件的,包括⾃定义组件
      // 存放的位置
      dts: "src/components.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
