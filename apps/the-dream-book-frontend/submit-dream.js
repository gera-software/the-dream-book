import GitHubService from './services/github-service/service.js'

// TODO env
const OWNER = 'gera-software'
const REPO = 'the-dream-book'
const AUTHOR_NAME = 'Gilmar Andrade'
const AUTHOR_EMAIL = 'gilmar-andrade@outlook.com'

export default async function submitDream({ title, content, date, tags, author }) {
  const githubService = new GitHubService({ 
    owner: OWNER, 
    repo: REPO, 
    author_name: AUTHOR_NAME, 
    author_email: AUTHOR_EMAIL 
  })
  
  // TODO 
  const path = `apps/the-dream-book-frontend/dreams/${author.id}/testegit.md`
  
  const markdown = `---
layout: dream
title: ${title}
date: ${ date /* date no formato ISO string, TODO está sendo apresentada na página como sendo o dia anterior... */ }
tags: [ ${tags} ]
author: {
    first_name: ${author.first_name},
    id: ${author.id},
    last_name: ${author.last_name},
    photo_url: ${author.photo_url},
    username: ${author.username}
}
---

${content}`
  
  console.log(markdown)
  await githubService.addFile({ path, content: markdown, encoding: 'utf-8' })

  await githubService.commit({ 
    message: 'teste submit dream via GITHUB API' // TODO 
  })

  return true
}
