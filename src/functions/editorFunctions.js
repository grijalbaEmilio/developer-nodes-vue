/**
 * @param {DrawflowObject} editor 
 */
export function nodeSum(editor) {
    const nodes = editor.export().drawflow.Home.data
    for (const key in nodes) {
        let sum = 0
        //si el nodo es suma
        if (nodes[key].name === "sum") {
            //en caso de no tener conexiones actualizamos el valor a 0
            editor.updateNodeDataFromId(nodes[key].id, { value: 0 })

            // recorremos las entradas 
            for (const i in nodes[key].inputs) {
                // recorremos las conexiones de cada entrada
                nodes[key].inputs[i].connections.forEach((e) => {
                    //acumulamos la suma con el valor de los nodes entrantes
                    sum += parseFloat(editor.getNodeFromId(e.node).data.value)
                    // actualizamos el valor del nodo suma 
                    editor.updateNodeDataFromId(nodes[key].id, { value: sum })
                });
            }
        }
    }
}

export function nodeMultiplication(editor) {
    const nodes = editor.export().drawflow.Home.data
    for (const key in nodes) {
        let mult = 1
        if (nodes[key].name === "multiplication") {
            //en caso de no tener conexiones actualizamos el valor a 0
            editor.updateNodeDataFromId(nodes[key].id, { value: 0 })

            // recorremos las entradas 
            for (const i in nodes[key].inputs) {
                // recorremos las conexiones de cada entrada
                nodes[key].inputs[i].connections.forEach((e) => {
                    //acumulamos la suma con el valor de los nodes entrantes
                    mult *= parseFloat(editor.getNodeFromId(e.node).data.value)
                    // actualizamos el valor del nodo suma 
                    editor.updateNodeDataFromId(nodes[key].id, { value: mult })
                });
            }
        }
    }
}

export function nodeDivision(editor) {
    const nodes = editor.export().drawflow.Home.data
    for (const key in nodes) {
        let numerator = 0
        let divisor = 0
        if (nodes[key].name === "division") {

            // recorremos las entradas 
            for (const i in nodes[key].inputs) {
                // recorremos las conexiones de cada entrada
                if (i === 'input_1') {
                    nodes[key].inputs[i].connections.forEach((e) => {
                        //acumulamos la suma con el valor de los nodes entrantes
                        numerator = parseFloat(editor.getNodeFromId(e.node).data.value)
                        // actualizamos el valor del nodo suma    
                    });
                }
                if (i === 'input_2') {
                    nodes[key].inputs[i].connections.forEach((e) => {
                        //acumulamos la suma con el valor de los nodes entrantes
                        divisor = parseFloat(editor.getNodeFromId(e.node).data.value)
                        // actualizamos el valor del nodo suma    
                    });
                }
            }
            editor.updateNodeDataFromId(nodes[key].id, { value: (numerator / divisor).toFixed(2) })
        }
    }
}

/**
 * si se elimina la asignación se cambia el valor por CERO.
 * @param {ObjectDrawflow} editor 
 */
export function nodevari(editor) {
    const nodes = editor.export().drawflow.Home.data
    for (const key in nodes) {
        if (nodes[key].name === "vari") {
            const idNodeLeft = nodes[key].inputs['input_1'].connections[0]
            if (!idNodeLeft) {
                nodes[key]
                editor.updateNodeDataFromId(nodes[key].id, { ...nodes[key].data, value: 0 })
            }
        }
    }
}

export function nodeAssign(editor) {
    const nodes = editor.export().drawflow.Home.data
    for (const key in nodes) {
        //si el nodo es suma
        if (nodes[key].name === "assign") {
            // la asignación debe tener las dos conexiones
            if (nodes[key].outputs['output_1'].connections[0] && nodes[key].inputs['input_1'].connections[0]) {
                const idNodeRight = nodes[key].outputs['output_1'].connections[0].node
                const idNodeLeft = nodes[key].inputs['input_1'].connections[0].node
                //obtenemos los nodos de las conexiones
                const nodeRight = editor.getNodeFromId(idNodeRight)
                const nodeLeft = editor.getNodeFromId(idNodeLeft)

                //si la conexión de la derecha es una variable actualizamos su valor, de lo contrario 
                //eliminamos la conexión
                if (nodeRight.name == 'vari') {
                    editor.updateNodeDataFromId(nodeRight.id, { ...nodeRight.data, value: nodeLeft.data.value })
                } else {
                    const connectionsOutput = nodes[key].outputs['output_1'].connections
                    const nodeInput = connectionsOutput[0]
                    const nodeId = nodes[key].id
                    editor.removeSingleConnection(nodeId, nodeInput.node, 'output_1', nodeInput.output)
                    //output será la clase de la salida
                }
            }
        }
    }
}

/**
 * evita que los inputs y outputs tengas más de una relación
 * @param {ObjectDrawflow} editor 
 */

export function removeDuplicateInputsOutputs(editor) {
    const nodes = editor.export().drawflow.Home.data
    for (const key in nodes) {
        let inputs = nodes[key].inputs

        //input será la clase del la entrada
        for (const input in inputs) {
            const connectionsInput = nodes[key].inputs[input].connections
            //si algún input tiene más de una entrada
            if (connectionsInput.length > 1) {
                for (let index = 0; index < connectionsInput.length; index++) {
                    //dejamos la primera entrada
                    if (index > 0) {
                        //nodo que incide en el input
                        const nodeOutput = connectionsInput[index]
                        const nodeId = nodes[key].id
                        //editor.removeSingleConnection( id_output, id_input, output_class, input_class )
                        editor.removeSingleConnection(nodeOutput.node, nodeId, nodeOutput.input, input)
                    }
                }
            }
        }

        let outputs = nodes[key].outputs

        //output será la clase de la salida
        for (const output in outputs) {
            const connectionsOutput = nodes[key].outputs[output].connections
            //si algún input tiene más de una entrada
            if (connectionsOutput.length > 1) {
                for (let index = 0; index < connectionsOutput.length; index++) {
                    //dejamos la primera entrada
                    if (index > 0) {
                        //nodo que incide en el output
                        const nodeInput = connectionsOutput[index]
                        const nodeId = nodes[key].id
                        //editor.removeSingleConnection( id_output, id_input, output_class, input_class )
                        editor.removeSingleConnection(nodeId, nodeInput.node, output, nodeInput.output)
                    }
                }
            }
        }
    }
}