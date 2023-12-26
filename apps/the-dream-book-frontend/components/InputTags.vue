<template>
    <div class="input-tags" @click="handleContainerClick">
        <ul>
            <li v-for="tag in tags" :key="tag" class="tag" @click="deleteTag(tag)">{{ tag }}</li>
            <li class="input-tags__input">
                <input ref="inputRef"  @keydown.enter="addTag"/>
            </li>
        </ul>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const inputRef = ref(null)

const tags = ref(new Set(["nossa turma", "coração", "não tem mais jeito", 'acabou', 'boa-sorte']))

function handleContainerClick(event) {
    console.log(event.target !== inputRef.value)
    if(event.target !== inputRef.value) {
        inputRef.value.focus()
    }
}


function addTag(event) {
    const text = event.target.value.replace(/[^a-zç0-9áéíóúãõâêîôûàèìòù _-]/gim,"").trim()
    console.log(!!text, text)
    event.target.value = ''
    if(!!text) {
        tags.value.add(text)
    }
}

function deleteTag(tag) {
    console.log('delete' ,tag)
    tags.value.delete(tag)
}
</script>

<style scoped>
.input-tags {
    background-color: white;

    padding: 0 0.5em;
    border-radius: 8px;
    border: 1px solid black;
}

.input-tags:focus-within {
    background-color: orange;
    outline: black auto 1px;
    outline: -webkit-focus-ring-color auto 1px;
}

.input-tags ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0 10px;
    align-items: center;
}

.input-tags .tag {
    /* background-color: pink; */
    margin: 0.5rem 0;
    cursor: pointer;
}

.input-tags .tag::after {
    content: '✖';
    margin-left: 5px;
}

.input-tags__input {
    /* background-color: blueviolet; */
    flex-grow: 1;
}

.input-tags__input input {
    width: 100%;
    height: 48px;
    padding-left: 0;
    outline: none;
    border-color: transparent;
    background-color: rgba(128, 128, 128, 0.151);
}



</style>