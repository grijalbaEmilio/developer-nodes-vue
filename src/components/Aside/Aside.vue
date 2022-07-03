<template>
    <div class="aside">
    <button class="aside-button" v-on:click="toggleContentVisivility">></button>
        <div class="aside-content">
            <p class="asside-title">Código Prython</p>
            <div>{{dataNodes != 'editor'? (generateCodePython(dataNodes)) : "no render"}}</div>
            <!-- {{console.log('render')}} -->
        </div>    
    </div>
</template>

<script>
    import './Aside.css'
    import CodePython from '../../class/CodePytho'

    function toggleContentVisivility(){
        document.querySelector('.aside-content').classList.toggle('hidden-content')
        document.querySelector('.aside').classList.toggle('hidden-aside')
        //actualiza desde el componente padre el valor "props.dataNodes"
        this.functionHiddenAside()
    }
    
    export default {
        name : "AsideRight",
        methods :{
            toggleContentVisivility,
            generateCodePython : (dataNodesString)=>{
                    const nueva = new CodePython(dataNodesString)
                    
                    return  nueva.getVarisDeclare()
                    }
        },
        props: {
            dataNodes : String,
            functionHiddenAside : Function
        },
        /* setup(props){
            console.log('data -->',props.dataNodes);
            console.log('render -->',props.render);
        }, */
        data() {
            return {
                
            }
        },




    }

</script>