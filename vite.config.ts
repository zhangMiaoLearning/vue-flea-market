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
  },
      server: {
    host: true,
    // 设置端口号
    // port: 8080,
    //自动打开浏览器
    open: true,
    proxy: {
      "/userapi": {
        // 代理目标地址
        target: "http://127.0.0.1:8031",
        // 允许跨域
        changeOrigin: true,
        // 开启websockets代理
        ws: true,
        // 验证SSL证书
        secure: false,
        // 重写path路径
        rewrite: (path) => path.replace(/^\/userapi/, ""),
      },
      "/productapi": {
        // 代理目标地址
        target: "http://127.0.0.1:8032",
        // 允许跨域
        changeOrigin: true,
        // 开启websockets代理
        ws: true,
        // 验证SSL证书
        secure: false,
        // 重写path路径
        rewrite: (path) => path.replace(/^\/productapi/, ""),
      }
    },
  },

})

