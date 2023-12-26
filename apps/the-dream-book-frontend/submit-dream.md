
<script setup>
    import InputTags from '/components/InputTags.vue'
    import { ref } from 'vue'

    const date = ref(new Date().toISOString().split('T')[0]);

    const title = ref('');
    const author = ref('');
    const content = ref('');
    const tags = ref([]);
</script>

<section class="container-center">
    <h1>Enviar sonho</h1>
    <div class="form-group">
        <label class="form-label" for="date">Data</label>
        <input id="date" type="date" v-model="date"/>
    </div>
    <div class="form-group">
        <label class="form-label" for="author">Autor</label>
        <input id="author" type="text" v-model="author" placeholder="Seu Nome" />
    </div>
    <div class="form-group">
        <label class="form-label" for="tags">Tags</label>
        <InputTags id="tags" v-model="tags" placeholder="Tecle enter para adicionar tag"></InputTags>
    </div>
    <div class="form-group">
        <label class="form-label" for="title">Título</label>
        <textarea id="title" v-model="title" placeholder="Lorem ipsum dolor sit amet"></textarea>
    </div>
    <div class="form-group">
        <label class="form-label" for="content">História</label>
        <textarea id="content" v-model="content" placeholder="Escreva a história aqui..." rows="20"></textarea>
    </div>
    <div class="form-group">
        <button class="button">Enviar</button>
    </div>
</section>


<style>




</style>
