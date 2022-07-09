/* el contenido de las funcione deberá reemplazarce posteriormente por las consultas a la api REST
construida en go-chi */
export function saveProgram(name, data){
    let programs = JSON.parse(localStorage.getItem('programs'))
    if(!programs){
        programs = []
    }
    const repeat = programs.filter((e)=>{
        if(e.name == name){
            return e
        }
    })
    console.log(repeat.length);
    if(repeat[0]){
        alert('ya existe un programa con nombre "'+name+'"')
    }
    
    if(name && Object.entries(data).length != 2){
        programs.push({name : name, data : data})
        localStorage.setItem('programs', JSON.stringify(programs))
    }
}

export function getPrograms(){
    return JSON.parse(localStorage.getItem('programs'))
}