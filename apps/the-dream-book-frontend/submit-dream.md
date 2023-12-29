
<script setup>
    import InputTags from '/components/InputTags.vue'
    import { ref } from 'vue'
    import { useStorage } from '@vueuse/core'
    import submitDream from './submit-dream.js'

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
        await submitDream(payload)
        // TODO loading state
    }
</script>

<div class="modal-login-required" v-if="!telegramUser.id">
    Faça login para continuar...
</div>
<form class="container-center" @submit.prevent="submitForm">
    <h1>Escreva seu sonho</h1>
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
        <button type="submit" class="button">Enviar</button>
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


</style>
