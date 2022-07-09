<template>
    <div class="modal-save-load">
        <div class="modal-content">
        <span id="close-modal" v-on:click="hiddenModal">x</span>
        <div class="saved-programs">contenido</div>
        </div>
    </div>
</template>

<script>

import './ModalSaveLoad.css'
import { getPrograms } from '@/api/programsApi'

console.log(getPrograms());

export default {
    name : "modalSaveLoad",
    props : {
        hiddenModal : Function
    },
    methods: {
        
    },
}
</script>