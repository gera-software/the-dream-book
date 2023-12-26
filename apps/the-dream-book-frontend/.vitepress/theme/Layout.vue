<script setup>
import { data as dreams } from './dreams.data.js'
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
  <div v-if="frontmatter.home" class="page-home">
    <div class="container-center">
      <h1>{{ site.title }}</h1>
      <p>{{ site.description }}</p>
  
      <!-- <pre>
        {{ dreams }}
      </pre> -->
      <ul class="dreams-list">
        <li v-for="dream of dreams">
          <p class="date">{{ new Intl.DateTimeFormat('pt-BR').format(new Date(dream.frontmatter.date))  }}</p>
          <h1>
            <a :href="withBase(dream.url)">
              {{ dream.frontmatter.title }}
            </a>
          </h1>
          
          <p class="author"><div class="avatar">GA</div> {{ dream.frontmatter.author }}</p>
          <ul class="tags">
            <li v-for="tag in dream.frontmatter.tags" :key="tag" class="tag">{{ tag }}</li>
          </ul>
  
        </li>
      </ul>
    </div>
  </div>
  <div v-else-if="frontmatter.layout === 'dream'" class="page-dream">
    <section class="container-center">
      <header class="section-header">
        <a :href="withBase('/')" title="Home" class="back-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
          </svg>
          Voltar
        </a>
    
        <p class="date">{{ new Intl.DateTimeFormat('pt-BR').format(new Date(frontmatter.date))  }}</p>
        <h1>{{ frontmatter.title }}</h1>
        
        <p class="author"><div class="avatar">GA</div> {{ frontmatter.author }}</p>
        <ul class="tags">
          <li v-for="tag in frontmatter.tags" :key="tag" class="tag">{{ tag }}</li>
        </ul>
      </header>
  
      <Content class="section-content" />
    </section>
  </div>
  <div v-else class="page">
    <div class="container-center">
      <a :href="withBase('/')">Home</a>
      <Content />
    </div>
  </div>
</template>

<style>

.page {
    /* background-color: aqua; */
  display: flex;
  justify-content: center;
}

.page-dream {
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
}

.container-center {
  /* background-color: red; */
  padding: 1rem;
  width: 100%;
  max-width: 680px;
}

.section-header {
  /* background-color: red; */
  margin-bottom: 3rem;
}



.section-content {
  /* background-color: rgb(206, 206, 206); */
}

p.author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}

p.date {
  font-size: 1rem;
}

.dreams-list {
  /* background-color: red; */
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 5px;
}

.dreams-list > li {
  /* padding: 1rem; */
  margin: 1rem 0;
  /* background-color: red; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

/* .dreams-list a {
  display: block;
  background-color: aqua;
  text-decoration: none;
  color: black;
  padding: 1rem;
} */

.page-home {
  /* background-color: red; */
  display: flex;
  justify-content: center;
}

</style>
