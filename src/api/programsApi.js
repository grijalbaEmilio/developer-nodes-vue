/* el contenido de las funcione deberá reemplazarce posteriormente por las consultas a la api REST
construida en go-chi */

/**
 * 
 * @param {String} name 
 * @param {String} data exportación del editor
 */
export function saveProgram(name, data) {
    let programs = JSON.parse(localStorage.getItem('programs'))
    if (!programs) {
        programs = []
    }
    const repeat = programs.filter((e) => {
        if (e.name == name) {
            return e
        }
    })

    //no se guardarán programas con nombres repetidos
    if (repeat[0]) {
        alert('ya existe un programa con nombre "' + name + '"')
    }
    //no se guardarán programas sin nombre
    if (name && !repeat[0]) {
        programs.push({ name: name, data: data })
        localStorage.setItem('programs', JSON.stringify(programs))
    } else {
        alert('Nombre inválido.')
    }
}

export function getPrograms() {
    return JSON.parse(localStorage.getItem('programs'))
}


/**
 * 
 * @param {String} name nombre de un programa registrado
 */
export function deleteProgram(name) {
    let programs = JSON.parse(localStorage.getItem('programs'))
    const programasFinal = programs.filter((e) => {
        if (e.name != name) {
            return e
        }
    })
    localStorage.setItem('programs', JSON.stringify(programasFinal))
}