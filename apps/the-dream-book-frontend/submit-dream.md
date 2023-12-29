
<script setup>
    import InputTags from '/components/InputTags.vue'
    import { ref } from 'vue'
    import { useStorage } from '@vueuse/core'
    import submitDream from './submit-dream.js'
    import { useRouter } from 'vitepress'
    import { withBase } from 'vitepress'

    const router = useRouter()

    const isLoading = ref(false)

    const telegramUser = useStorage('telegram-user', {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        username: undefined,
        photo_url: undefined,
        auth_date: undefined,
        hash: undefined,
    })


    const date = ref(new Date().toISOString().split('T')[0]);
    const title = ref('');
    const content = ref('');
    const tags = ref([]);

    async function submitForm() {
        isLoading.value = true
        const payload = {
             date: new Date(date.value).toISOString(), 
             author: {
                first_name: telegramUser.value.first_name,
                id: telegramUser.value.id,
                last_name: telegramUser.value.last_name,
                photo_url: telegramUser.value.photo_url,
                username: telegramUser.value.username
            }, 
             tags: [...tags.value],
             title: title.value, 
             content: content.value, 
        }
        console.log('submit form', payload)
        // await submitDream(payload)
        const path = submitDream(payload)
        setTimeout(() => {
            path.then(url => {
                console.log('pronto', withBase(url))
                // isLoading.value = false
                router.go(withBase(url))
            })
        }, 60000)
    }
</script>

<div class="modal-login-required" v-if="!telegramUser.id">
    Faça login para continuar...
</div>
<form class="container-center" @submit.prevent="submitForm">
    <h1>Conte seu sonho</h1>
    <div class="form-group">
        <label class="form-label" for="date">Data</label>
        <input id="date" type="date" v-model="date" required/>
    </div>
    <div class="form-group">
        <label class="form-label" for="tags">Tags</label>
        <InputTags id="tags" v-model="tags" placeholder="Tecle Enter para adicionar tag"></InputTags>
    </div>
    <div class="form-group">
        <label class="form-label" for="title">Título</label>
        <textarea id="title" v-model="title" placeholder="Lorem ipsum dolor sit amet" required></textarea>
    </div>
    <div class="form-group">
        <label class="form-label" for="content">História</label>
        <textarea id="content" v-model="content" placeholder="Escreva a história aqui..." rows="20" required></textarea>
    </div>
    <div class="form-group">
        <button type="submit" class="button progress-button" :class="{ 'loading': isLoading }"  :disabled="isLoading" >
            <span class="progress-button__progress"></span>
            <span class="progress-button__content">{{ isLoading ? 'Aguarde...' : 'Enviar' }}</span>
        </button>
    </div>
</form>


<style>

.modal-login-required {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(10px);

    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    text-align: center;
    z-index: 5;
}

.modal-login-required::before {
    content: '';
    width: 40px;
    aspect-ratio: 1;
    border-radius: 100%;
    position: absolute;
    top: 0%;
    right: 0%;
    margin: 1rem;
    background-color: #54a9eb; /* telegram color */
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(40);
        opacity: 0;
	}

    100% {
		transform: scale(1);
        opacity: .6;
	}
}

.progress-button {
    position: relative;
    overflow: hidden;
}

.progress-button.loading:disabled {
  /* background-color: rgb(0, 140, 255); */
  color: white;
  background-color: rgb(0 96 175);
  cursor: not-allowed;
}

.progress-button .progress-button__content {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.progress-button .progress-button__progress {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    transform-origin: top left;
    pointer-events: none;

}

.progress-button.loading .progress-button__progress {
    animation: progress-load 60s ease-out;
    background-color: rgb(0, 140, 255);
}

@keyframes progress-load {
	0% {
		transform: translateX(-100%);
	}

    100% {
		transform: translateX(0)
	}
}

</style>
