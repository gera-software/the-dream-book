# the-dream-book
Um livro que conta as histórias dos nossos melhores sonhos.

https://gera-software.github.io/the-dream-book

## Como funciona?

O projeto é um SSG (Static Site Generated) criado usando o [Vitepress](https://vitepress.dev/) e Vue.

O usuário se autentica através do [Telegram Login Widget](https://core.telegram.org/widgets/login) e depois pode adicionar uma história preenchendo um formulário.

Ao enviar o formulário, o sistema utiliza a [REST API do Github](https://docs.github.com/en/rest?apiVersion=2022-11-28) para fazer um commit e salvar um novo arquivo.

Não é utilizado nenhum banco de dados. Todas as histórias ficam armazenadas na pasta `/dreams/` em arquivos Markdown.

Depois, através do [Github Actions](https://docs.github.com/pt/actions), automaticamente é feito o rebuild e deploy do código atualizado para o Github Pages. 

## Pré-requisitos
- Este código deve estar publicado em um repositório público do Github.
- **Github fine-grained access token:** Para fazer commits usando a API do Github, é preciso ter um [access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
    - ⚠️ As seguintes [permissões](https://docs.github.com/pt/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28) são necessárias: **contents = read & write** 

- **Dois bots do Telegram:** Para usar o Telegram Login Widget é preciso ter dois [bots no Telegram](https://core.telegram.org/bots) (um para fins de teste e outro para produção)

- **[Ngrok instalado:](https://ngrok.com/)** Para testar o login com Telegram na máquina local será preciso criar um túnel através do Ngrok


## Setup na máquina local

### Instação

1. Instale as dependências

    ```
    npm run install
    ```

2. Configure as variáveis de ambiente num arquivo `.env`
    ```Dotenv
    VITE_GITHUB_PERSONAL_ACCESS_TOKEN=<fine-grained access token>
    VITE_GITHUB_OWNER=<repo owner> # dono do repositorio no github
    VITE_GITHUB_REPO=<repo name> # repositorio no github
    VITE_GITHUB_AUTHOR_NAME=<commit author name> # autor dos commits através da API 
    VITE_GITHUB_AUTHOR_EMAIL=<commit author email> # email do autor dos commits através da API

    VITE_TELEGRAM_BOT_TESTE=<test bot name>
    VITE_TELEGRAM_BOT_PRODUCAO=<production bot name>
    ```

3. Crie seu [free static domain no Ngrok](https://ngrok.com/blog-post/free-static-domains-ngrok-users) (o Ngrok fornece um static domain grátis para cada usuário)

4. [Link seu static domain com seu bot de testes no Telegram](https://core.telegram.org/widgets/login#linking-your-domain-to-the-bot) enviando o comando `/setdomain` para o [@BotFather](https://t.me/botfather)


### Execução

1. Inicie o servidor local (porta padrão: 5173)
    ```
    npm run dev
    ```


2. Em um terminal paralelo, inicie um túnel usando o Ngrok, para expor seu servidor local na internet
    ```
    ngrok http --domain=<seu static domain> 5173
    ```

6. Pronto, basta acessar no navegador a url do seu static domain. 
    - ⚠️ Se acessar pelo localhost, o login com Telegram não vai funcionar.
    - ⚠️ Ao cadastrar uma nova história, ela será comitada pela API do Github para o seu repositório remoto. Enquanto você não fizer `git pull`, a página da nova história dará **Erro 404**.
    - ⚠️ Histórias criadas no ambiente local não são listadas na home do ambiente de produção, mas ainda podem ser acessadas pela sua url única.


## Setup Github Pages

Toda alteração na branch `main` será publicada automaticamente no Github Pages através do Github Actions. As configurações estão no arquivo `/.github/workflows/deploy.yml`. 

1. [Configure as variáveis de ambiente no repositório do Github](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) 

    `Settings > Secrets and Variables > Actions > Variables > Repository variables > New Repository variable`

    ```Dotenv
    VITE_GITHUB_PERSONAL_ACCESS_TOKEN=<fine-grained access token>
    VITE_GITHUB_OWNER=<repo owner> # dono do repositorio no github
    VITE_GITHUB_REPO=<repo name> # repositorio no github
    VITE_GITHUB_AUTHOR_NAME=<commit author name> # autor dos commits através da API 
    VITE_GITHUB_AUTHOR_EMAIL=<commit author email> # email do autor dos commits através da API

    VITE_TELEGRAM_BOT_TESTE=<test bot name>
    VITE_TELEGRAM_BOT_PRODUCAO=<production bot name>
    ```

2. [Link seu Github Pages Domain com seu bot de produção no Telegram](https://core.telegram.org/widgets/login#linking-your-domain-to-the-bot) enviando o comando `/setdomain` para o [@BotFather](https://t.me/botfather)

6. Pronto, basta acessar no navegador a url do seu Github Pages Domain.
