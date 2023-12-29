// https://www.levibotelho.com/development/commit-a-file-with-the-github-api/
// https://docs.github.com/pt/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28


/**
  data: {
    ref: 'refs/heads/main',
    node_id: 'REF_kwDOK90he69yZWZzL2hlYWRzL21haW4',
    url: 'https://api.github.com/repos/gera-software/the-dream-book/git/refs/heads/main',
    object: {
      sha: '28347bb253da24f6c418dac15c4b72d878ba6d6d',
      type: 'commit',
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/commits/28347bb253da24f6c418dac15c4b72d878ba6d6d'
    }
  }
 */
// token permission contents=read
export async function getReferenceToHead(octokit, { owner, repo }) {
    return octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
        owner,
        repo,
        ref: 'heads/main',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

/**
data: {
  sha: '28347bb253da24f6c418dac15c4b72d878ba6d6d',
  node_id: 'C_kwDOK90he9oAKDI4MzQ3YmIyNTNkYTI0ZjZjNDE4ZGFjMTVjNGI3MmQ4NzhiYTZkNmQ',
  url: 'https://api.github.com/repos/gera-software/the-dream-book/git/commits/28347bb253da24f6c418dac15c4b72d878ba6d6d',
  html_url: 'https://github.com/gera-software/the-dream-book/commit/28347bb253da24f6c418dac15c4b72d878ba6d6d',
  author: {
    name: 'Gilmar Andrade',
    email: 'gilmar-andrade@outlook.com',
    date: '2023-12-27T00:16:41Z'
  },
  committer: {
    name: 'Gilmar Andrade',
    email: 'gilmar-andrade@outlook.com',
    date: '2023-12-27T00:16:41Z'
  },
  tree: {
    sha: 'eedab4c509b0732bed36f7d46168540dbeb63497',
    url: 'https://api.github.com/repos/gera-software/the-dream-book/git/trees/eedab4c509b0732bed36f7d46168540dbeb63497'
  },
  message: 'fix input date on mobile',
  parents: [
    {
      sha: '783bde854e5fe2f47965a34a58881a77f4be28f4',
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/commits/783bde854e5fe2f47965a34a58881a77f4be28f4',
      html_url: 'https://github.com/gera-software/the-dream-book/commit/783bde854e5fe2f47965a34a58881a77f4be28f4'
    }
  ],
  verification: {
    verified: false,
    reason: 'unsigned',
    signature: null,
    payload: null
  }
}
 */
// token permission contents=read
export async function getCommitObject(octokit, { owner, repo, commit_sha }) {
    return octokit.request('GET /repos/{owner}/{repo}/git/commits/{commit_sha}', {
      owner,
      repo,
      commit_sha,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
}

/**
   data: {
    sha: 'ebb539234a84876ab80dae120e1c2bd9efa5998d',
    url: 'https://api.github.com/repos/gera-software/the-dream-book/git/blobs/ebb539234a84876ab80dae120e1c2bd9efa5998d'
  }
 */
// token permission contents=write
export async function createBlobObject(octokit, { owner, repo, content, encoding }) {
  return octokit.request('POST /repos/{owner}/{repo}/git/blobs', {
    owner,
    repo,
    content,
    encoding, // 'utf-8' or 'base64'
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

/**
data: {
  sha: 'eedab4c509b0732bed36f7d46168540dbeb63497',
  url: 'https://api.github.com/repos/gera-software/the-dream-book/git/trees/eedab4c509b0732bed36f7d46168540dbeb63497',
  tree: [
    {
      path: 'README.md',
      mode: '100644',
      type: 'blob',
      sha: '7a4658aa87a770de23e25b2a3e79bdce31b0efed',
      size: 2471,
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/blobs/7a4658aa87a770de23e25b2a3e79bdce31b0efed'
    },
    {
      path: 'apps',
      mode: '040000',
      type: 'tree',
      sha: '783baba0cd826b8e9b31bece759b2404897f3067',
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/trees/783baba0cd826b8e9b31bece759b2404897f3067'
    }
  ],
  truncated: false
}
 */
// token permission contents=read
export async function getTreeObject(octokit, { owner, repo, tree_sha }) {
  return octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
    owner,
    repo,
    tree_sha,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

/**
data: {
  sha: 'eedab4c509b0732bed36f7d46168540dbeb63497',
  url: 'https://api.github.com/repos/gera-software/the-dream-book/git/trees/eedab4c509b0732bed36f7d46168540dbeb63497',
  tree: [
    {
      path: 'README.md',
      mode: '100644',
      type: 'blob',
      sha: '7a4658aa87a770de23e25b2a3e79bdce31b0efed',
      size: 2471,
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/blobs/7a4658aa87a770de23e25b2a3e79bdce31b0efed'
    },
    {
      path: 'apps',
      mode: '040000',
      type: 'tree',
      sha: '783baba0cd826b8e9b31bece759b2404897f3067',
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/trees/783baba0cd826b8e9b31bece759b2404897f3067'
    }
  ],
  truncated: false
}
 */
// token permission contents=write
export async function createTree(octokit, { owner, repo, base_tree, tree }) {
  return octokit.request('POST /repos/{owner}/{repo}/git/trees', {
    owner,
    repo,
    base_tree,
    tree,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

/**
data: {
  sha: 'c69d984c3b552ec0dd4f052a12cccadbe131b70b',
  node_id: 'C_kwDOK90he9oAKGM2OWQ5ODRjM2I1NTJlYzBkZDRmMDUyYTEyY2NjYWRiZTEzMWI3MGI',
  url: 'https://api.github.com/repos/gera-software/the-dream-book/git/commits/c69d984c3b552ec0dd4f052a12cccadbe131b70b',
  html_url: 'https://github.com/gera-software/the-dream-book/commit/c69d984c3b552ec0dd4f052a12cccadbe131b70b',
  author: {
    name: 'Gilmar Andrade',
    email: 'gilmar-andrade@outlook.com',
    date: '2023-12-27T02:27:57Z'
  },
  committer: {
    name: 'Gilmar Andrade',
    email: 'gilmar-andrade@outlook.com',
    date: '2023-12-27T02:27:57Z'
  },
  tree: {
    sha: 'de1146b1d0328392f89747a1fd8c6057447de384',
    url: 'https://api.github.com/repos/gera-software/the-dream-book/git/trees/de1146b1d0328392f89747a1fd8c6057447de384'
  },
  message: 'my test commit message via GITHUB API',
  parents: [
    {
      sha: '28347bb253da24f6c418dac15c4b72d878ba6d6d',
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/commits/28347bb253da24f6c418dac15c4b72d878ba6d6d',
      html_url: 'https://github.com/gera-software/the-dream-book/commit/28347bb253da24f6c418dac15c4b72d878ba6d6d'
    }
  ],
  verification: {
    verified: false,
    reason: 'unsigned',
    signature: null,
    payload: null
  }
}
 */
// token permission contents=write
export async function createCommit(octokit, { owner, repo, message, author, parents, tree }) {
  return octokit.request('POST /repos/{owner}/{repo}/git/commits', {
    owner,
    repo,
    message,
    author,
    parents,
    tree,
    // signature: '-----BEGIN PGP SIGNATURE-----\n\niQIzBAABAQAdFiEESn/54jMNIrGSE6Tp6cQjvhfv7nAFAlnT71cACgkQ6cQjvhfv\n7nCWwA//XVqBKWO0zF+bZl6pggvky3Oc2j1pNFuRWZ29LXpNuD5WUGXGG209B0hI\nDkmcGk19ZKUTnEUJV2Xd0R7AW01S/YSub7OYcgBkI7qUE13FVHN5ln1KvH2all2n\n2+JCV1HcJLEoTjqIFZSSu/sMdhkLQ9/NsmMAzpf/iIM0nQOyU4YRex9eD1bYj6nA\nOQPIDdAuaTQj1gFPHYLzM4zJnCqGdRlg0sOM/zC5apBNzIwlgREatOYQSCfCKV7k\nnrU34X8b9BzQaUx48Qa+Dmfn5KQ8dl27RNeWAqlkuWyv3pUauH9UeYW+KyuJeMkU\n+NyHgAsWFaCFl23kCHThbLStMZOYEnGagrd0hnm1TPS4GJkV4wfYMwnI4KuSlHKB\njHl3Js9vNzEUQipQJbgCgTiWvRJoK3ENwBTMVkKHaqT4x9U4Jk/XZB6Q8MA09ezJ\n3QgiTjTAGcum9E9QiJqMYdWQPWkaBIRRz5cET6HPB48YNXAAUsfmuYsGrnVLYbG+\nUpC6I97VybYHTy2O9XSGoaLeMI9CsFn38ycAxxbWagk5mhclNTP5mezIq6wKSwmr\nX11FW3n1J23fWZn5HJMBsRnUCgzqzX3871IqLYHqRJ/bpZ4h20RhTyPj5c/z7QXp\neSakNQMfbbMcljkha+ZMuVQX1K9aRlVqbmv3ZMWh+OijLYVU2bc=\n=5Io4\n-----END PGP SIGNATURE-----\n',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

/**
  data: {
    ref: 'refs/heads/main',
    node_id: 'REF_kwDOK90he69yZWZzL2hlYWRzL21haW4',
    url: 'https://api.github.com/repos/gera-software/the-dream-book/git/refs/heads/main',
    object: {
      sha: '2b5b60e3296cf69d3f996137d2c2fffe21fec63f',
      type: 'commit',
      url: 'https://api.github.com/repos/gera-software/the-dream-book/git/commits/2b5b60e3296cf69d3f996137d2c2fffe21fec63f'
    }
  }
 */
// token permission contents=write
export async function updateHead(octokit, { owner, repo, commit_sha }) {
  return octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
    owner,
    repo,
    ref: 'heads/main',
    sha: commit_sha,
    force: true,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}