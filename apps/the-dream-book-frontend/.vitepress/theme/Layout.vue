<script setup>
import { useData, withBase } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter, page } = useData()

</script>

<template> 
    <!-- <pre>
        {{ frontmatter }}
      {{ page }}
      {{ site }}
    </pre> -->
  <div v-if="frontmatter.home">
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="./markdown-examples.html">Markdown Examples</a></li>
      <li><a href="./api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div v-else-if="frontmatter.layout === 'dream'">
    <a :href="withBase('/')">Home</a>
    <h2>Eu tive um sonho</h2>
    <p>{{ new Intl.DateTimeFormat('pt-BR').format(new Date(frontmatter.date))  }}</p>
    <p>{{ frontmatter.author }}</p>
    <ul>
      <li v-for="tag in frontmatter.tags" :key="tag">{{ tag }}</li>
    </ul>
    <Content />
  </div>
  <div v-else>
    <a :href="withBase('/')">Home</a>
    <Content />
  </div>
</template>
