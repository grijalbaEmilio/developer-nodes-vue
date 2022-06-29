<template>
    <div id="draw"></div>
</template>

<script>
import * as Vue from 'vue'
import Drawflow from 'drawflow'
import 'drawflow/dist/drawflow.min.css'
setTimeout(() => {
    // iniciando flujo de exptacción
    var id = document.getElementById("draw");
    const editor = new Drawflow(id, Vue);
    editor.reroute = true;
    editor.start();
    console.log(editor);

    editor.editor_mode = 'edit'; // Default
    
    //editor.editor_mode = 'fixed'; // Only scroll

    var html = `
    <div><input type="text" df-name></div>
    `;
    var data = { "name": '' };

    editor.addNode('github', 0, 1, 150, 300, 'github', data, html);
    editor.addNode('home', 1, 2, 50, 50, 'github', data, html);

    console.log(document.querySelector('.github'));
    



}, 100);


export default {
    name : "drawFlow",
    methods : {
        
    }
}
</script>