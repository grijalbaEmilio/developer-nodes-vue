<template>
    <div id="draw">

    <div class="buttons">
            <button title="Guardar el programa actula." v-on:click="save" >Guardar</button>
            <button title="Crea un número con valor por defecto CERO." v-on:click="load" >Cargar</button>
            <button title="Crea un número con valor por defecto CERO." v-on:click="printNodeNum" >Número</button>
            <button title='Podrá modificar su nombre manualmente y su valor con un nodo "ASIGNACIÓN".' v-on:click="printNodeVari">Variable</button>
            <button title="Resive un valor por la izquierda y conecta con una variable por derecha." v-on:click="printNodeAssign">Asignación</button>
            <button title="Resive dos Valores y los suma, retorna dicha suma." v-on:click="printNodeSum">Suma</button>
            <button title="Resive dos Valores y los resta, retorna dicha resta." v-on:click="printNodeSubstract">resta</button>
            <button title="Resive dos Valores y los multiplica, retorna el producto." v-on:click="printNodeMultiplication">Multiplicación</button>
            <button title="Resive numerador y denominador, retorna el cociente." v-on:click="printNodeDivision">División</button>
    </div>
    
    <Aside v-bind:dataNodes="dataNodes" :functionHiddenAside="functionHiddenAside" /> 
    <!-- <component v-bind:is="currentTabComponent"></component> -->

    </div>
</template>
    
<script>
import * as Vue from 'vue'
import Drawflow from 'drawflow'
import {nodeSum, nodeSubstraction, nodeMultiplication, nodeDivision, nodeAssign, 
removeDuplicateInputsOutputs, nodevari} from '../../functions/editorFunctions'
import {createNodeNum, createNodeSum, createNodeSubstract, createNodeMultiplication, 
createNodeDivision, createNodeVari, createNodeAssign} from '../../functions/createNodes'
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
    //console.log(editor);

    editor.editor_mode = 'edit'; // Default

    /* cada que se suelte el click se ejecutará... */
    editor.on('mouseUp', ()=>{
        nodeSum(editor)
        nodeSubstraction(editor)
        nodeMultiplication(editor)
        nodeDivision(editor)
        nodeAssign(editor)
        removeDuplicateInputsOutputs(editor)
        nodevari(editor)
    })

    //console.log('editor iniciado');
}, 100);

const printNodeNum = () =>{
    createNodeNum(editor)
}

const printNodeSum = () =>{
    createNodeSum(editor)
}

const printNodeSubstract = () =>{
    createNodeSubstract(editor)
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
        printNodeSubstract,
        printNodeMultiplication,
        printNodeDivision,
        printNodeVari,
        printNodeAssign,
        functionHiddenAside(){
            //modificamos el contenido de el props que enviamos a ASIDE
            this.dataNodes = JSON.stringify(editor.export().drawflow.Home.data)
        },
        save(){
            localStorage.setItem('editor',JSON.stringify(editor.export()))
        },
        load(){
            //console.log(editor);
            editor.import(JSON.parse(localStorage.getItem('editor')))
            this.dataNodes = JSON.stringify(editor.export().drawflow.Home.data)
            //console.log(editor.export().drawflow.Home.data);
        }


    },
    components : {
        Aside/* ,
        Other :{
            name : 'otherCompo',
            template : "<template>Hola</template>",

        } */
    },
    data(){
        return{
            dataNodes : 'editor'
        }
    }
}

</script>