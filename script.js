//URL = 'https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost'
const cardPropuesta = document.getElementById('card-propuesta') 


const jobInfo = async () =>{
    const res = await fetch('https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost')
    const data = await res.json()

    cardPropuesta.innerHTML = data.map((datita)=>{
        return `<div class="contenedor-cards">
        <h2>
            ${datita.puesto}
        </h2>
        <p>
            ${datita.empresa}
        </p>
        <button>
            ${datita.fecha}
        </button>
        <div class="container-propuesta">
            <button class="boton-redondeado">
                <h3>${datita.tag[0]}</h3>
            </button>
            <button class="boton-redondeado">
                <h3>${datita.tag[1]}</h3>
            </button>
            <button class="boton-redondeado">
                <h3>${datita.tag[2]}</h3>
            </button>
        </div>
        <div class="iconos">
            <i class="fas fa-trash"></i>
            <i class="fas fa-edit"></i>
        </div>
    </div>`
    }).join("")
}
jobInfo()






// git pasos habituales:
// Ir a la carpeta que queremos agregar al repositorio. (click derecho abrir"git bash here")
// 1. git init
// 2. git add .
// 3. git status (para chequear si hay archivos en rojo o verde)
// 4. git commit -m  (para enviar el mensaje)
// 5. git pull (sirve para traer los cambios)
// 6.git push (sirve para mandar los cambios)
// SI HACE FALTA VOLVER EN ALGÚN MOMENTO PARA VOLVER ATRÁS:
// 5. git restore --staged nombredearchivo.extension


// 4. git commit -m  (para enviar el mensaje)
// 5. git pull (sirve para traer los cambios)
// 6.git push (sirve para mandar los cambios)


//Falta
//fecha de cards
//delete, put, patch, gachi pachi y los dos pelotudos.
