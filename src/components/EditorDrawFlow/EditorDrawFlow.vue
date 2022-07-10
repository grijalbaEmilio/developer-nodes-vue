<template>
    <div id="draw">

        <header>
            <div class="buttons function-back">
                <button name="save" class="buttons-function-back" title="Guardar el programa actula."
                    v-on:click="hiddenModal">Guardar</button>
                <button name="manage" class="buttons-function-back" title="Crea un número con valor por defecto CERO."
                    v-on:click="hiddenModal">Gestionar</button>
            </div>
            
            <div class="buttons">
                <button title="Crea un número con valor por defecto CERO." v-on:click="printNodeNum">Número</button>
                <button title='Podrá modificar su nombre manualmente y su valor con un nodo "ASIGNACIÓN".'
                    v-on:click="printNodeVari">Variable</button>
                <button title="Resive un valor por la izquierda y conecta con una variable por derecha."
                    v-on:click="printNodeAssign">Asignación</button>
                <button title="Resive dos Valores y los suma, retorna dicha suma." v-on:click="printNodeSum">Suma</button>
                <button title="Resive dos Valores y los resta, retorna dicha resta."
                    v-on:click="printNodeSubstract">resta</button>
                <button title="Resive dos Valores y los multiplica, retorna el producto."
                    v-on:click="printNodeMultiplication">Multiplicación</button>
                <button title="Resive numerador y denominador, retorna el cociente."
                    v-on:click="printNodeDivision">División</button>
            </div>
        </header>

        <Aside v-bind:dataNodes="dataNodes" :functionHiddenAside="actualiceDataEditor" />
        <ModalSaveLoadVue v-if="modalVisibility" v-bind:optionVew="renderInModal" :hiddenModal="hiddenModal"
            :load="load" :saveThisProgram="saveThisProgram" />
        <!-- <component v-bind:is="currentTabComponent"></component> -->
    </div>
</template>
    
<script>
import * as Vue from 'vue'
import Drawflow from 'drawflow'
import ModalSaveLoadVue from '../modalSaveLoad'
import { saveProgram } from '../../api/programsApi'
import {
    nodeSum, nodeSubstraction, nodeMultiplication, nodeDivision, nodeAssign,
    removeDuplicateInputsOutputs, nodevari
} from '../../functions/editorFunctions'
import {
    createNodeNum, createNodeSum, createNodeSubstract, createNodeMultiplication,
    createNodeDivision, createNodeVari, createNodeAssign
} from '../../functions/createNodes'
import Aside from '../Aside'
import 'drawflow/dist/drawflow.min.css'
import './EditorDrawFlow.css'


let editor = ''
setTimeout(() => {
    // iniciando flujo de exptacción
    var id = document.getElementById("draw");
    editor = new Drawflow(id, Vue);
    editor.reroute = true;
    editor.start();
    for(let i = 0; i < 3; i++){
        editor.zoom_out()
    }

    /* cada que se suelte el click se ejecutará... */
    editor.on('mouseUp', () => {
        nodeSum(editor)
        nodeSubstraction(editor)
        nodeMultiplication(editor)
        nodeDivision(editor)
        nodeAssign(editor)
        removeDuplicateInputsOutputs(editor)
        nodevari(editor)

    })
}, 100);

const printNodeNum = () => {
    createNodeNum(editor)
}

const printNodeSum = () => {
    createNodeSum(editor)
}

const printNodeSubstract = () => {
    createNodeSubstract(editor)
}

const printNodeMultiplication = () => {
    createNodeMultiplication(editor)
}

const printNodeDivision = () => {
    createNodeDivision(editor)
}

const printNodeVari = () => {
    createNodeVari(editor)
}

const printNodeAssign = () => {
    createNodeAssign(editor)
}


export default {
    name: "EditorDrawFlow",
    methods: {
        printNodeNum,
        printNodeSum,
        printNodeSubstract,
        printNodeMultiplication,
        printNodeDivision,
        printNodeVari,
        printNodeAssign,
        actualiceDataEditor(data = JSON.stringify(editor.export().drawflow.Home.data)) {
            //modificamos el contenido de el props que enviamos a ASIDE
            this.dataNodes = data
            return this.dataNodes
        },
        save() {
            localStorage.setItem('editor', JSON.stringify(editor.export()))
        },
        load(data) {
            //se crea la estructura de importación para drawflow
            editor.import(
                {
                    drawflow: {
                        Home: {
                            data: JSON.parse(data)
                        }
                    }
                }
            )
            this.hiddenModal()
            this.dataNodes = JSON.stringify(editor.export().drawflow.Home.data)
        },
        hiddenModal(event) {
            //hiddenModal puede llamarsen en eventos click y dentro de otras funciones
            event && (event.target.name == "manage" || event.target.name == "save") ?
                this.renderInModal = event.target.name : null
            this.modalVisibility = !this.modalVisibility
        },
        saveThisProgram(name) {
            saveProgram(name, JSON.stringify(editor.export().drawflow.Home.data))
            this.hiddenModal()
        }
    },
    components: {
        Aside,
        ModalSaveLoadVue
    },
    data() {
        return {
            dataNodes: 'editor', // tendra el valor de exportación del grafo draw
            modalVisibility: false, //indica si el modal está renderizado
            renderInModal: 'manage' //indica si renderizar manage o save en el componente modal
        }
    }
}

</script>