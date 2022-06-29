<template>
    <div id="draw">

    <div class="buttons">
            <button v-on:click="printNode">Número</button>
            <button v-on:click="printNode2">Suma</button>
    </div>
    </div>
</template>

<script>
import * as Vue from 'vue'
import Drawflow from 'drawflow'
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
    
    //editor.editor_mode = 'fixed'; // Only scroll

    /* var html = `
    <div><input type="text" df-name></div>
    `;
    var data = { "name": '' };

    editor.addNode('github', 0, 1, 150, 300, 'github', data, html);
    editor.addNode('home', 1, 2, 50, 50, 'github', data, html);

    console.log(document.querySelector('.github'));
     */

    /* cada que se selecciona un nodo se ejecutará... */
    editor.on('click', ()=>{
        // obtenemos los nodos del editor
        const nodos = editor.export().drawflow.Home.data
        let sum = 0
         for (const key in nodos) {
             //si el nodo es suma
             if(nodos[key].name === "suma"){
                 // recorremos las entradas 
                 for (const i in nodos[key].inputs) {
                     // recorremos las conexiones 
                     nodos[key].inputs[i].connections.forEach((e) => {
                        //acumulamos la suma con el valor de los nodos entrantes
                        sum += parseInt(editor.getNodeFromId(e.node).data.name)
                        //console.log(editor.getNodeFromId(e.node).data.name); 
                        //nodos[key].data.name = 'fff'
                        editor.updateNodeDataFromId(nodos[key].id, {name : sum})
                        console.log(nodos[key])

                     });

                     
                 }
                 //editor.getNodeFromId() 

             }
            //console.log(key);
         }
         //console.log(nodos['1'])
    })
    //console.log('editor iniciado');
}, 100);

const printNode = () =>{
    var html = `
    <div><label>Número</label><input type="number" df-name></div>
    `;
    var data = { "name": '0' };
    editor.addNode('name', 0, 1, 150, 300, 'github', data, html);
     //console.log(document.querySelector('.github'));
}

const printNode2 = () =>{
    var html = `
    <div><label>Suma</label><input type="text" df-name></div>
    `;
    var data = { "name": 'hh' };
    editor.addNode('suma', 2, 1, 300, 300, 'github', data, html);
     //console.log(document.querySelector('.github'));
}

export default {
    name : "EditorDrawFlow",
    methods : {
        printNode,
        printNode2
    }
}
</script>