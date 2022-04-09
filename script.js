const cardPropuesta = document.getElementById('card-propuesta') 
const guardarPropuesta = document.getElementById('guardar-propuesta')
const editarPropuesta = document.getElementById('editar-propuesta')
const eliminarPropuesta = document.getElementById('eliminar-propuesta')
const puestoGuardar = document.getElementById('puestoGuardar')
const empresaGuardar = document.getElementById('empresaGuardar')
const tagsGuardar = document.getElementById('tagsGuardar')
const eliminarId = document.getElementById('eliminar-id')
const eliminarModal = document.getElementById('eliminar-modal')
const modalEdit = document.getElementById('modal-edit')
const editPuesto = document.getElementById('edit-puesto')
const editEmpresa = document.getElementById('edit-empresa')
const editTags = document.getElementById('edit-tags')
const editarId = document.getElementById('editar-id')
const cerrarModalEdit = document.getElementById('modal-edit-close')
const cerrarModalEliminar = document.getElementById('modal-eliminar-close')
const buscadorFiltro = document.getElementById('buscador-filtro')

//Eliminar

const showModalDelete = () =>{
    eliminarModal.classList.add("is-visible");
}
const openModalDelete = (id)=> {
    showModalDelete();
    eliminarId.value = id;
};
const closeModalDelete = () =>{
    eliminarModal.classList.remove("is-visible");
}
eliminarPropuesta.addEventListener("click", () =>{ 
    closeModalDelete()
    const id = eliminarId.value;
    fetch(`https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost/${id}`, {method : 'DELETE'})
    .then(res => updateDom());
});
cerrarModalEliminar.addEventListener("click", () =>{
    closeModalDelete()
})


//Editar
const showModalEdit = () =>{
    modalEdit.classList.add("is-visible");
}
const closeModalEdit = () =>{
    modalEdit.classList.remove("is-visible");
}
const openModalEdit = async (id)=> {
    showModalEdit();
    const res = await fetch(`https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost/${id}`)
    const data = await res.json()
    editPuesto.value = data.puesto
    editEmpresa.value = data.empresa
    editTags.value = data.tag
    editarId.value = id 
};


//No funcionan los tag
editarPropuesta.addEventListener("click", () =>{
    closeModalEdit()
    const id = editarId.value
    const trabajo = {}
    trabajo.puesto = editPuesto.value;
    trabajo.empresa = editEmpresa.value;
    trabajo.tag=[...editTags.value.split(" ")];

    fetch(`https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost/${id}`, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(trabajo)
    }).then((res) => updateDom());
})

cerrarModalEdit.addEventListener('click', ()=> {
    closeModalEdit()
})


//Mapeo de cards

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
                ${datita.fecha.slice(0,10)}
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
            <i class="fas fa-trash" onclick="openModalDelete(${datita.id})"></i>
            <i class="fas fa-edit" onclick="openModalEdit(${datita.id})" ></i>
        </div>
    </div>`
    }).join("")
}
jobInfo()

//filter

const busquedaFilter = async (parametro) => {
    const res = await fetch(`https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost?filter=${parametro}`)
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
                ${datita.fecha.slice(0,10)}
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
            <i class="fas fa-trash" onclick="openModalDelete(${datita.id})"></i>
            <i class="fas fa-edit" onclick="openModalEdit(${datita.id})" ></i>
        </div>
    </div>`
    }).join("")

   }

buscadorFiltro.addEventListener('keypress', (e) =>{
    busquedaFilter(e.target.value)
})

//Agregar

guardarPropuesta.addEventListener("click", () =>{ 
    const trabajo = {}
    trabajo.puesto = puestoGuardar.value;
    trabajo.empresa = empresaGuardar.value;
    trabajo.tag=[...tagsGuardar.value.split(" ")]

    fetch(`https://6243a0ce39aae3e3b744ef34.mockapi.io/jobpost`, {
        method: "POST",
        headers:{
        "Content-Type": "application/json"
    },
        body:JSON.stringify(trabajo)
    }).then(res => updateDom());
})


const updateDom = () =>{
    jobInfo()

}