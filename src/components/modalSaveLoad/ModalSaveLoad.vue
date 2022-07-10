<template>
    <div class="modal-save-load">
        <div class="modal-content">
            <span id="close-modal" v-on:click="hiddenModal">x</span>

            <ul v-if="optionVew == 'manage'" class="saved-programs saved-programs-li">
                <li class="option-program"  v-for="(item, index) in getPrograms()" :key="index">
                    <p class="name-program-li">{{ item.name }}</p>
                    <div>
                        <button v-on:click="load(item.data)" class="button-modal load-button">Cargar</button>
                        <button v-on:click="deleteOne(item.name)" class="button-modal delete-button">Borrar</button>
                    </div>
                </li>
            </ul>

            <div v-if="optionVew == 'save'" class="saved-programs">
                <h1 class="title-modal">Gruardar Programa</h1>
                <div class="form">
                    <label for="nameProgram">Nombre del programa:</label>
                    <input name="nameProgram" v-on:change="actualiceNameSave" class="name-program-save" type="text">
                </div>
                <button class=" button-modal save-button" v-on:click="saveThisProgram(nameSave)">Guardar</button>
            </div>

        </div>
    </div>
</template>

<script>

import './ModalSaveLoad.css'
import { getPrograms, deleteProgram } from '@/api/programsApi'

export default {
    name: "modalSaveLoad",
    props: {
        hiddenModal: Function, //función para ocultar el modal
        load: Function, //fución para cargar un programa guardado
        optionVew: String, //Indica si cargar la vista para guradar o gestionar programas
        saveThisProgram: Function //función para guardar un programa
    },
    methods: {
        getPrograms,
        deleteOne(name) {
            deleteProgram(name)
            this.hiddenModal()
        },
        actualiceNameSave(event) {
            this.nameSave = event.target.value;
        },
    },
    data() {
        return {
            nameSave: ''
        }
    }
}
</script>