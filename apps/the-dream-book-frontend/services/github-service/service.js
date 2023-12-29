// https://www.levibotelho.com/development/commit-a-file-with-the-github-api/
// https://docs.github.com/pt/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28

import { Octokit } from "octokit"
import { createBlobObject, createCommit, createTree, getCommitObject, getReferenceToHead, getTreeObject, updateHead } from "./helpers.js"

console.log('ENV MODE', import.meta.env.MODE)
console.log('ENV', import.meta.env)

export default class GitHubService {
    constructor({ owner, repo, author_name, author_email }) {
        this.owner = owner
        this.repo = repo
        this.author_name = author_name,
        this.author_email = author_email

        this.blobs = []

        this.octokit = new Octokit({ 
            auth: import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN // TODO falha de segurança: the value is visible from the build code
        });
    }

    /**
     * Create a blob e adiciona no array de blobs
     */
    async addFile({ path, content, encoding }){
        // 3: Post your new file to the server (create blobs)
        const { data } = await createBlobObject(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo, 
                content, 
                encoding, 
            }
        )
        console.log('BLOB', data)

        const file = { path, content, encoding, ...data }
        this.blobs.push(file)
        return file
    }

    /**
     * Commita todos os blobs no array 
     * @param {*} param0 
     * @returns 
     */
    async commit({ message }) {
        // 1: Get a reference to HEAD
        const { data: head } = await getReferenceToHead(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo
            }
        )
        console.log('HEAD', head)

        // 2:  Grab the commit that HEAD points to
        const { data: lastCommitObject } = await getCommitObject(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo,
                commit_sha: head.object.sha 
            }
        )
        console.log('COMMIT OBJECT', lastCommitObject)

        // 4: Get a hold of the tree that the commit points to
        const { data: oldTreeObject } = await getTreeObject(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo,
                tree_sha: lastCommitObject.tree.sha 
            }
        )
        console.log('OLD TREE OBJECT', oldTreeObject)

        // 5a: Create a tree containing your new file (the ease way)
        const newTree = []
        for(let i = 0; i< this.blobs.length; i++) {
            newTree.push({
                path: this.blobs[i].path,
                mode: '100644',//blob
                type: 'blob',
                sha: this.blobs[i].sha,
            })
        }
        const { data: newTreeObject } = await createTree(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo,
                base_tree: oldTreeObject.sha, 
                tree: newTree,
            }
        )
        console.log('CREATED TREE', newTreeObject)

        // 6: Create a new commit
        const { data: createdCommit } = await createCommit(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo,
                message,
                author: {
                    name: this.author_name,
                    email: this.author_email,
                    date: new Date().toISOString()
                }, 
                parents: [
                    lastCommitObject.sha // parent commit(s) sha
                ],
                tree: newTreeObject.sha // tree sha
            }
        )
        console.log('CREATE COMMIT', createdCommit)

        // 7: Update HEAD
        const { data: newHead } = await updateHead(
            this.octokit, 
            { 
                owner: this.owner, 
                repo: this.repo,
                commit_sha: createdCommit.sha 
            }
        )
        console.log('UPDATED HEAD', newHead)

        this.blobs = []

        return newHead
    }
}


// example Dream markdown content:

// `---
// layout: dream
// title: Criado via GITHUB API
// date: ${ new Date().toISOString() }
// tags: [ babado, não acredito, consegui ]
// author: {
//     first_name: "Gilgamesh",
//     id: 300420393,
//     last_name: "Andrade",
//     photo_url: "https://t.me/i/userpic/320/v-Dk5mavRm_ziwhEn2p4ivbhw8dgHZhZoiCQcIIZnEU.jpg",
//     username: "AndradeGilmar"
// }
// ---

// Hoje eu sonhei que a nossa turma estava no IF assistindo uma aula de português com a professora Sheila.

// O assunto era advérbio. Ela ficava perguntando sobre o assunto, mas ninguém tinha estudado e só eu respondia as perguntas dela.

// O mais engraçado era que tudo que eu falava fazia sentido! Eu expliquei o que era advérbio e até falei que eu confundia advérbio com complemento nominal.

// Um detalhe interessante era que Giovanni estava de cabelo loiro.

// Pense numa coisa que odeio é quando eu sonho que voltei a estudar. Deus me livre!`