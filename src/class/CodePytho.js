export default class CodePitho {

    constructor(StringData) {
        StringData != 'editor'
        ? 
        this.nodes = JSON.parse(StringData)
        :
        this.nodes = {}
        //console.log(this.nodes);
    }

    getVarisDeclare() {
        let result = []
        for (const key in this.nodes) {
            if (this.nodes[key].name === "vari") {
                //console.log(this.#variDeclarateString(this.nodes[key])); 
                result.push(this.#variDeclarateString(this.nodes[key]))
            }
        }
        return result
    }

    /** 
     * método recursivo hace un recorrido in-orden con backtraking para abb
     * @param {Object} node en su llamada inicial debe tener el atributo .name : 'vari'
     * @param {String} finalSting 
     * @returns cadena de código python para declarar una variable
     */
    #variDeclarateString(node, finalSting="", repeatVariable=0) {
        //console.log(node.data);
        //thisCharacterPython contendrá la traducción a codigo pyton de cada nodo
        let thisCharacterPython = ''
        if(node.name == 'vari'){
            thisCharacterPython = node.data.name
            repeatVariable++
        }else if(node.name == 'num'){
            thisCharacterPython = node.data.value
        }else{
            thisCharacterPython = this.#operatorsString[node.name]
        }

        
        if(repeatVariable > 1 && node.name == 'vari'){
            return thisCharacterPython
        }
        
        //si el nodo tiene entradas
        if (node.inputs['input_1']) {
            const inputs = node.inputs
                //si el nodo tiene dos entradas i conneciones
                if(inputs['input_2'] && inputs['input_2'].connections[0]){
                    //las conecciónes de la forma { node : idNodeOutput , input : outputNodeOutput }
                    const [connection1, connection2] = [inputs['input_1'].connections[0], inputs['input_2'].connections[0]]
                    //llamamos a #variDeclarateDtring recursivamente
                    return "( "+this.#variDeclarateString(this.nodes[connection1.node], finalSting, repeatVariable)+ thisCharacterPython +this.#variDeclarateString(this.nodes[connection2.node], finalSting, repeatVariable)+" )"
                }else if(inputs['input_1'].connections[0]){
                    const connection1 = inputs['input_1'].connections[0]
                    return thisCharacterPython + this.#variDeclarateString(this.nodes[connection1.node], finalSting, repeatVariable)    
                }
        }else{
            //retorno para hojas del abb
            return thisCharacterPython
        }
    }

    #operatorsString = {
        'assign' : ' = ',
        'sum' : ' + ',
        'substract' : ' - ',
        'multiplication' : ' * ',
        'division' : ' / '
    }

    


}