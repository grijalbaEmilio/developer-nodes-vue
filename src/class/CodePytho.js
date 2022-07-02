export default class CodePitho {

    constructor(StringData) {
        this.nodes = JSON.parse(StringData)
        this.getVarisDeclare()
        //console.log(this.nodes);
    }

    getVarisDeclare() {
        for (const key in this.nodes) {
            if (this.nodes[key].name === "vari") {
                console.log(this.#variDeclarateString(this.nodes[key])); 
            }
        }
    }

    /**
     * método recursivo hace un recorrido in-orden con backtraking para abb
     * @param {Object} node en su llamada inicial debe tener el atributo .name : 'vari'
     * @param {String} finalSting 
     * @returns cadena de código python para declarar una variable
     */
    #variDeclarateString(node, finalSting="") {
        console.log(node.data);
        //thisCharacterPython contendrá la traducción a codigo pyton de cada nodo
        let thisCharacterPython = ''
        if(node.name == 'vari'){
            thisCharacterPython = node.data.name
        }else if(node.name == 'num'){
            thisCharacterPython = node.data.value
        }else{
            thisCharacterPython = this.#operatorsString[node.name]
        }
        
        //si el nodo tiene entradas
        if (node.inputs['input_1']) {
            const inputs = node.inputs
                //si el nodo tiene dos entradas
                if(inputs['input_2']){
                    //las conecciónes de la forma { node : idNodeOutput , input : outputNodeOutput }
                    const [connection1, connection2] = [inputs['input_1'].connections[0], inputs['input_2'].connections[0]]
                    //llamamos a #variDeclarateDtring recursivamente
                    return "( "+this.#variDeclarateString(this.nodes[connection1.node], finalSting)+ thisCharacterPython +this.#variDeclarateString(this.nodes[connection2.node], finalSting)+" )"
                }else{
                    const connection1 = inputs['input_1'].connections[0]
                    return thisCharacterPython + this.#variDeclarateString(this.nodes[connection1.node], finalSting)    
                }
        }else{
            //retorno para hojas del abb
            return thisCharacterPython
        }
    }

    #operatorsString = {
        'assign' : ' = ',
        'sum' : ' + ',
        'multiplication' : ' * ',
        'division' : ' / '
    }


}