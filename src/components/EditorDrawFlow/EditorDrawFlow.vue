<template>
    <div id="draw">

    <div class="buttons">
            <button title="Crea un número con valor por defecto CERO." v-on:click="printNodeNum">Número</button>
            <button title='Podrá modificar su nombre manualmente y su valor con un nodo "ASIGNACIÓN".' v-on:click="printNodeVari">Variable</button>
            <button title="Resive un valor por la izquierda y conecta con una variable por derecha." v-on:click="printNodeAssign">Asignación</button>
            <button title="Resive dos Valores y los suma, retorna dicha suma." v-on:click="printNodeSum">Suma</button>
            <button title="Resive dos Valores y los multiplica, retorna el producto." v-on:click="printNodeMultiplication">Multiplicación</button>
            <button title="Resive numerador y denominador, retorna el cociente." v-on:click="printNodeDivision">División</button>
    </div>
    </div>
</template>

<script>
import * as Vue from 'vue'
import Drawflow from 'drawflow'
import {nodeSum, nodeMultiplication, nodeDivision, nodeAssign, removeDuplicateInputsOutputs} from '../functions/editorFunctions'
import {createNodeNum, createNodeSum, createNodeMultiplication, createNodeDivision,
createNodeVari, createNodeAssign} from '../functions/createNodes'
import 'drawflow/dist/drawflow.min.css'
import './EditorDrawFlow.css'

let editor = null

setTimeout(() => {
    // iniciando flujo de exptacción
    var id = document.getElementById("draw");
    editor = new Drawflow(id, Vue);
    editor.reroute = true;
    editor.start();
    console.log(editor);

    editor.editor_mode = 'edit'; // Default

    /* cada que se selecciona un nodo se ejecutará... */
    editor.on('mouseUp', ()=>{
        // suma los nodos entrantes a sum
        nodeSum(editor)
        nodeMultiplication(editor)
        nodeDivision(editor)
        nodeAssign(editor)
        removeDuplicateInputsOutputs(editor)
        
    })

    //console.log('editor iniciado');
}, 100);

const printNodeNum = () =>{
    createNodeNum(editor)
}

const printNodeSum = () =>{
    createNodeSum(editor)
}

const printNodeMultiplication = () =>{
    createNodeMultiplication(editor)
}

const printNodeDivision = () =>{
    createNodeDivision(editor)
}

const printNodeVari = () =>{
    createNodeVari(editor)
}

const printNodeAssign = () =>{
    createNodeAssign(editor)
}

export default {
    name : "EditorDrawFlow",
    methods : {
        printNodeNum,
        printNodeSum,
        printNodeMultiplication,
        printNodeDivision,
        printNodeVari,
        printNodeAssign
    }
}
</script>