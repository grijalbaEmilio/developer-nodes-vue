export default class CodePitho {

    constructor(StringData) {
        this.nodes = JSON.parse(StringData)
        this.getVarisDeclare()
        //console.log(this.nodes);
    }

    getVarisDeclare() {
        for (const key in this.nodes) {
            if (this.nodes[key].name === "vari") {
                this.#n(this.nodes[key])
            }
        }
    }

    #n(node) {
        if (node.inputs['input_1']) {
            console.log(node.inputs['input_1'].connections[0])
            const idNodeLeft = node.inputs['input_1'].connections[0].node
            this.#n(this.nodes[idNodeLeft])
        }
    }


}