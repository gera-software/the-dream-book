<template>
    <div class="input-tags" @click="handleContainerClick">
        {{ props.placeholder  }}
        <ul>
            <li v-for="tag in tags" :key="tag" class="tag" @click="deleteTag(tag)" title="Deletar tag">{{ tag }}</li>
            <li class="input-tags__input">
                <textarea rows="1" ref="inputRef" @blur="handleBlur"  @keydown.enter.prevent="addTag" :id="id" :placeholder="placeholder"></textarea>
            </li>
        </ul>
    </div>

</template>

<script setup>
import { ref, useAttrs } from 'vue';

const { id, placeholder } = useAttrs()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)

const tags = ref(new Set([...props.modelValue]))


function emitUpdate() {
    emit('update:modelValue', [...tags.value])
}

function handleContainerClick(event) {
    if(event.target !== inputRef.value) {
        inputRef.value.focus()
    }
}

function handleBlur(event) {
    event.target.value = ''
}


function addTag(event) {
    const text = event.target.value.replace(/[^a-zç0-9áéíóúãõâêîôûàèìòù _-]/gim,"").trim().toLowerCase()
    event.target.value = ''
    if(!!text) {
        tags.value.add(text)
        emitUpdate()
    }
}

function deleteTag(tag) {
    tags.value.delete(tag)
    emitUpdate()
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
    /* background-color: orange; */
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
    margin: 0.5rem 0;
    height: 32px;
}

.input-tags__input textarea {
    width: 100%;
    height:100%;
    padding: 0.3rem 1rem;
    padding-left: 0;
    resize: none;
    overflow: hidden;
    outline: none;
    border-color: transparent;
    background-color: transparent;
}



</style>