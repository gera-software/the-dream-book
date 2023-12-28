<script setup>
import { data as dreams } from './dreams.data.js'
import { useData, withBase } from 'vitepress'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

import TelegramLoginWidget from '/components/TelegramLoginWidget.vue'

const isLoaded = ref(false)

function telegramLoadedCallbackFunc () {
  console.log('script is loaded')
  isLoaded.value = true
}

const defaultUser = {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        username: undefined,
        photo_url: undefined,
        auth_date: undefined,
        hash: undefined,
}

const telegramUser = useStorage('telegram-user', defaultUser)

function yourCallbackFunction ({ id, first_name, last_name, username, photo_url, auth_date, hash }) {
  // gets user as an input
  // id, first_name, last_name, username,
  // photo_url, auth_date and hash
  telegramUser.value = { id, first_name, last_name, username, photo_url, auth_date, hash }
  console.log(telegramUser.value)
  // localStorage.setItem('telegram-user', JSON.stringify(user))
  // alert(`Seja bem vindo ${first_name} ${last_name}!`)
}


// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter, page } = useData()

</script>

<template> 
  <ClientOnly>
    <div class="telegram-login-widget">
      <TelegramLoginWidget
        mode="callback"
        telegram-login="TheDreamBook_bot"
        @loaded='telegramLoadedCallbackFunc'
        @callback="yourCallbackFunction"
        request-acces="write"
        v-if="!telegramUser.id"
      />
      <img v-else class="avatar" :src="telegramUser.photo_url" />
    </div>
  </ClientOnly>
  <pre>
      <!-- {{ frontmatter }} -->
      <!-- {{ page }} -->
      <!-- {{ site }} -->
    </pre>
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
          
          <p class="author" :id="dream.frontmatter.author.id">
            <img class="avatar" :src="dream.frontmatter.author.photo_url" />
            <span class="author_info">
              <span class="name">{{ dream.frontmatter.author.first_name }} {{ dream.frontmatter.author.last_name }}</span>
              <span class="username">@{{ dream.frontmatter.author.username }}</span>
            </span>
          </p>
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
        
        <p class="author" :id="frontmatter.author.id">
          <img class="avatar" :src="frontmatter.author.photo_url" />
          <span class="author_info">
            <span class="name">{{ frontmatter.author.first_name }} {{ frontmatter.author.last_name }}</span>
            <span class="username">@{{ frontmatter.author.username }}</span>
          </span>
        </p>

        <ul class="tags">
          <li v-for="tag in frontmatter.tags" :key="tag" class="tag">{{ tag }}</li>
        </ul>
      </header>
  
      <Content class="section-content" />
    </section>
  </div>
  <div v-else class="page">
    <div class="container-center">
      <a :href="withBase('/')" title="Home" class="back-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
          </svg>
          Voltar
      </a>
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
