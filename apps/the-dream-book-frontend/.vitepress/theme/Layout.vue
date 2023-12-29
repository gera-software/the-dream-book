<script setup>
import { data as dreamData } from './dreams.data.js'
import { useData, withBase } from 'vitepress'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'

import TelegramLoginWidget from '/components/TelegramLoginWidget.vue'

const telegramBotName = import.meta.env.PROD ? 'TheDreamBook_bot' : 'TheDreamBook_testebot'

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

const dreams = computed(() => {
  if(import.meta.env.PROD) {
    return dreamData
            .filter(dream => !dream.frontmatter.title.startsWith('[test]')) // remove os arquivos de teste
  } else {
    return dreamData
  }
})

</script>

<template> 
  <ClientOnly>
    <div class="telegram-login-widget">
      <TelegramLoginWidget
        mode="callback"
        :telegram-login="telegramBotName"
        @loaded='telegramLoadedCallbackFunc'
        @callback="yourCallbackFunction"
        request-acces="write"
        v-if="!telegramUser.id"
      />
      <img v-else class="avatar" :src="telegramUser.photo_url" :title="`${telegramUser.first_name} ${telegramUser.last_name} ${telegramUser.username ? `- @${telegramUser.username}` : '' }`" />
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
              <span class="username" v-if="dream.frontmatter.author.username">@{{ dream.frontmatter.author.username }}</span>
            </span>
          </p>
          <ul class="tags">
            <li v-for="tag in dream.frontmatter.tags" :key="tag" class="tag">{{ tag }}</li>
          </ul>
  
        </li>
      </ul>
    </div>
    
    <a :href="withBase('/submit-dream.html')" class="button-fab" title="Contar um sonho">
      <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512">
        <path d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57-57h68c49.7 0 97.9-14.4 139-41c11.1-7.2 5.5-23-7.8-23c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l81-24.3c2.5-.8 4.8-2.1 6.7-4l22.4-22.4c10.1-10.1 2.9-27.3-11.3-27.3l-32.2 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l112-33.6c4-1.2 7.4-3.9 9.3-7.7C506.4 207.6 512 184.1 512 160c0-41-16.3-80.3-45.3-109.3l-5.5-5.5C432.3 16.3 393 0 352 0s-80.3 16.3-109.3 45.3L139 149C91 197 64 262.1 64 330v55.3L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z"/>
      </svg>
    </a>
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
            <span class="username" v-if="frontmatter.author.username">@{{ frontmatter.author.username }}</span>
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
