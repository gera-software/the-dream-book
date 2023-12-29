import GitHubService from './services/github-service/service.js'
import { v4 as uuidv4 } from 'uuid';

export default async function submitDream({ title, content, date, tags, author }) {
  const githubService = new GitHubService({ 
    owner: import.meta.env.VITE_GITHUB_OWNER, 
    repo: import.meta.env.VITE_GITHUB_REPO, 
    author_name: import.meta.env.VITE_GITHUB_AUTHOR_NAME, 
    author_email: import.meta.env.VITE_GITHUB_AUTHOR_EMAIL
  })

  const id = uuidv4()
  
  // TODO use path module 
  const path = `apps/the-dream-book-frontend/dreams/${author.id}/${id}.md`
  console.log(path)

  //date no formato ISO string
  // TODO data está sendo apresentada na página como sendo o dia anterior...
  const header = `id: ${id}
title: "${title}"
date: "${ date }"
tags: [ ${tags.map(t => `"${t}"`).join(', ')} ]
author: {
    first_name: "${author.first_name}",
    id: ${author.id},
    last_name: "${author.last_name}",
    photo_url: "${author.photo_url}",
    username: "${author.username}"
}`
  
  const markdown = `---
layout: dream
${header}
---

${content}`
  
  console.log(markdown)
  await githubService.addFile({ path, content: markdown, encoding: 'utf-8' })

  await githubService.commit({ 
    message: `Submit dream (via GITHUB API)
    
${header}` 
  })

  return true
}
