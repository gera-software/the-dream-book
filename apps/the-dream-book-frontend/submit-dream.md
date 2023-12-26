
<script setup>
    import InputTags from '/components/InputTags.vue'
    import { ref } from 'vue'

    const date = ref(new Date().toISOString().split('T')[0]);

    const title = ref('');
    const author = ref('');
    const content = ref('');
    const tags = ref('');
</script>

<section class="container-center">
    <div class="form-group">
        <label for="date">Data</label>
        <input id="date" type="date" v-model="date"/>
    </div>
    <div class="form-group">
        <label for="title">Título</label>
        <textarea id="title" v-model="title" placeholder="Lorem ipsum dolor sit amet"></textarea>
    </div>
    <div class="form-group">
        <label for="content">História</label>
        <textarea id="content" v-model="content" placeholder="Escreva a história aqui..."></textarea>
    </div>
    <div class="form-group">
        <label for="author">Autor</label>
        <input id="author" type="text" v-model="author" placeholder="Seu Nome" />
    </div>
    <div class="form-group">
        <label for="tags">Tags</label>
        <input id="tags" type="text" v-model="tags" placeholder="tags" />
    </div>
    <InputTags></InputTags>
</section>


<style>

.form-group {
    background-color: red;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
</style>
