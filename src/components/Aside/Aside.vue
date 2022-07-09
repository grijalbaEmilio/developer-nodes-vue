<template>
    <div class="aside">
        <button class="aside-button" v-on:click="toggleContentVisivility">{{iconAside}}</button>
        <div class="aside-content">
            <p class="asside-title">Código Python</p>

            <div class = "code-python">
            
            <div id="varis-declare">
                <div class="vari" v-for="(item, index) in generateCodePython(dataNodes)" :key="index">
                    <div>{{item}}</div>
                </div>
            </div>
            
            </div>

        </div>
        <!-- {{console.log('render')}} -->
    </div>
</template>

<script>
import './Aside.css'
import CodePython from '../../class/CodePytho'

function toggleContentVisivility() {
    
    document.querySelector('.aside-content').classList.toggle('hidden-content')
    const hiddenAside = document.querySelector('.aside').classList.toggle('hidden-aside')
    //actualiza desde el componente padre el valor "props.dataNodes"
    this.functionHiddenAside()
    this.iconAside = hiddenAside ? '>' : '<'
}



export default {
    name: "AsideRight",
    methods: {
        toggleContentVisivility,
        generateCodePython: (dataNodesString) => {
            const nueva = new CodePython(dataNodesString)
            return nueva.getVarisDeclare()
        }
    },
    props: {
        dataNodes: String,
        functionHiddenAside: Function
    },
    /* setup(props){
        console.log('data -->',props.dataNodes);
        console.log('render -->',props.render);
    }, */
    data() {
        return {
            iconAside : '<'
        }
    },




}

</script>