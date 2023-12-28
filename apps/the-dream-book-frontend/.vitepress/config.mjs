import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The Dream Book",
  description: "Um livro que conta as histórias dos nossos melhores sonhos",
  base: '/the-dream-book/',
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
