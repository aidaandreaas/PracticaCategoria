document.addEventListener("DOMContentLoaded", () => {
    
   // usuarios

    const modal = document.getElementById("modalUsuario");
    const btnAbrir = document.getElementById("btnAbrirModal");
    const cerrar = document.getElementById("cerrarModal");
    const form = document.getElementById("formUsuario");
    const tbody = document.getElementById("tbodyUsuarios");
    const editIndex = document.getElementById("editIndex");

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const rol = document.getElementById("rol");
    const estado = document.getElementById("estado");
    const avatar = document.getElementById("avatar");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let contadorId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    btnAbrir.onclick = () => {
        form.reset();
        editIndex.value = "";
        modal.style.display = "flex";
    };

    cerrar.onclick = () => modal.style.display = "none";

    form.onsubmit = e => {
        e.preventDefault();

        const data = {
            id: editIndex.value ? usuarios[editIndex.value].id : contadorId++,
            nombre: nombre.value,
            email: email.value,
            password: password.value,
            rol: rol.value,
            estado: estado.value,
            avatar: avatar.files[0]
                ? URL.createObjectURL(avatar.files[0])
                : "images/avatar.png"
        };

        if (editIndex.value !== "") {
            usuarios[editIndex.value] = data;
        } else {
            usuarios.push(data);
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        renderUsuarios();
        modal.style.display = "none";
    };

    function renderUsuarios() {
        tbody.innerHTML = "";
        usuarios.forEach((u, i) => {
            tbody.innerHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td><img src="${u.avatar}" class="avatar-sm"></td>
                    <td>${u.nombre}</td>
                    <td>${u.email}</td>
                    <td>${u.password}</td>
                    <td>${u.rol}</td>
                    <td>${u.estado}</td>
                    <td>
                        <button class="btn-edit" onclick="editarUsuario(${i})">Editar</button>
                        <button class="btn-delete" onclick="eliminarUsuario(${i})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    window.editarUsuario = i => {
        const u = usuarios[i];
        editIndex.value = i;
        nombre.value = u.nombre;
        email.value = u.email;
        password.value = u.password;
        rol.value = u.rol;
        estado.value = u.estado;
        modal.style.display = "flex";
    };

    window.eliminarUsuario = i => {
        usuarios.splice(i, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        renderUsuarios();
    };

    renderUsuarios();

//roles

const modalRol = document.getElementById("modalRol");
const btnAbrirModalRol = document.getElementById("btnAbrirModalRol");
const cerrarModalRol = document.getElementById("cerrarModalRol");
const formRol = document.getElementById("formRol");
const tbodyRoles = document.getElementById("tbodyRoles");
const editIndexRol = document.getElementById("editIndexRol");

const nombreRol = document.getElementById("nombreRol");
const estadoRol = document.getElementById("estadoRol");

let roles = JSON.parse(localStorage.getItem("roles")) || [];
let contadorRolId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1;

//esto abre el modal
btnAbrirModalRol.onclick = () => {
    formRol.reset();
    editIndexRol.value = "";
    modalRol.style.display = "flex";
};

//cierra el modal 
cerrarModalRol.onclick = () => {
    modalRol.style.display = "none";
};

//guradar y editar
formRol.onsubmit = e => {
    e.preventDefault();

    const data = {
        id: editIndexRol.value ? roles[editIndexRol.value].id : contadorRolId++,
        nombre: nombreRol.value,
        estado: estadoRol.value
    };

    if (editIndexRol.value !== "") {
        roles[editIndexRol.value] = data;
    } else {
        roles.push(data);
    }

    localStorage.setItem("roles", JSON.stringify(roles));
    renderRoles();
    modalRol.style.display = "none";
};

//El render para que se muestre en la pantalla lo actualizado.
function renderRoles() {
    tbodyRoles.innerHTML = "";
    roles.forEach((r, i) => {
        tbodyRoles.innerHTML += `
            <tr>
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.estado}</td>
                <td>
                    <button class="btn-edit" onclick="editarRol(${i})">Editar</button>
                    <button class="btn-delete" onclick="eliminarRol(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//editar
window.editarRol = i => {
    const r = roles[i];
    editIndexRol.value = i;
    nombreRol.value = r.nombre;
    estadoRol.value = r.estado;
    modalRol.style.display = "flex";
};

//eliminar
window.eliminarRol = i => {
    roles.splice(i, 1);
    localStorage.setItem("roles", JSON.stringify(roles));
    renderRoles();
};

renderRoles();

 
//categorias

const modalCategoria = document.getElementById("modalCategoria");
const btnAbrirModalCategoria = document.getElementById("btnAbrirModalCategoria");
const cerrarModalCategoria = document.getElementById("cerrarModalCategoria");
const formCategoria = document.getElementById("formCategoria");
const tbodyCategorias = document.getElementById("tbodyCategorias");
const editIndexCategoria = document.getElementById("editIndexCategoria");

const nombreCategoria = document.getElementById("nombreCategoria");
const estadoCategoria = document.getElementById("estadoCategoria");
const imagenCategoria = document.getElementById("imagenCategoria");

let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let contadorCategoriaId = categorias.length
    ? Math.max(...categorias.map(c => c.id)) + 1
    : 1;

//abre modal
btnAbrirModalCategoria.onclick = () => {
    formCategoria.reset();
    editIndexCategoria.value = "";
    modalCategoria.style.display = "flex";
};

//cierra modal
cerrarModalCategoria.onclick = () => {
    modalCategoria.style.display = "none";
};

//guarad y edita
formCategoria.onsubmit = e => {
    e.preventDefault();

    const imagenURL = imagenCategoria.files[0]
        ? URL.createObjectURL(imagenCategoria.files[0])
        : "images/default.png";

    const data = {
        id: editIndexCategoria.value
            ? categorias[editIndexCategoria.value].id
            : contadorCategoriaId++,
        nombre: nombreCategoria.value,
        estado: estadoCategoria.value,
        imagen: imagenURL
    };

    if (editIndexCategoria.value !== "") {
        
        if (!imagenCategoria.files[0]) {
            data.imagen = categorias[editIndexCategoria.value].imagen;
        }
        categorias[editIndexCategoria.value] = data;
    } else {
        categorias.push(data);
    }

    localStorage.setItem("categorias", JSON.stringify(categorias));
    renderCategorias();
    modalCategoria.style.display = "none";
};

//render
function renderCategorias() {
    tbodyCategorias.innerHTML = "";

    categorias.forEach((c, i) => {
        tbodyCategorias.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.nombre}</td>
                <td>
                    <img src="${c.imagen}" class="img-categoria">
                </td>
                <td>${c.estado}</td>
                <td>
                    <button class="btn-edit" onclick="editarCategoria(${i})">Editar</button>
                    <button class="btn-delete" onclick="eliminarCategoria(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//editar
window.editarCategoria = i => {
    const c = categorias[i];
    editIndexCategoria.value = i;
    nombreCategoria.value = c.nombre;
    estadoCategoria.value = c.estado;
    modalCategoria.style.display = "flex";
};

//eliminar
window.eliminarCategoria = i => {
    categorias.splice(i, 1);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    renderCategorias();
};

renderCategorias();
//sucategorias

const modalSubcategoria = document.getElementById("modalSubcategoria");
const btnAbrirModalSubcategoria = document.getElementById("btnAbrirModalSubcategoria");
const cerrarModalSubcategoria = document.getElementById("cerrarModalSubcategoria");
const formSubcategoria = document.getElementById("formSubcategoria");
const tbodySubcategorias = document.getElementById("tbodySubcategorias");
const editIndexSubcategoria = document.getElementById("editIndexSubcategoria");

const nombreSubcategoria = document.getElementById("nombreSubcategoria");
const idCategoria = document.getElementById("categoria"); // coincide con tu HTML
const estadoSubcategoria = document.getElementById("estadoSubcategoria");
const imagenSubcategoria = document.getElementById("imagenSubcategoria");


let subcategorias = JSON.parse(localStorage.getItem("subcategorias")) || [];
let contadorSubcategoriaId = subcategorias.length
    ? Math.max(...subcategorias.map(c => c.id)) + 1
    : 1;

btnAbrirModalSubcategoria.onclick = () => {
    formSubcategoria.reset();
    editIndexSubcategoria.value = "";
    modalSubcategoria.style.display = "flex";
};


cerrarModalSubcategoria.onclick = () => {
    modalSubcategoria.style.display = "none";
};

formSubcategoria.onsubmit = e => {
    e.preventDefault();

    const imagenURL = imagenSubcategoria.files[0]
        ? URL.createObjectURL(imagenSubcategoria.files[0])
        : "images/default.png";

    const data = {
        id: editIndexSubcategoria.value !== ""
            ? subcategorias[editIndexSubcategoria.value].id
            : contadorSubcategoriaId++,
        nombre: nombreSubcategoria.value,
        idCategoria: idCategoria.value, 
        estado: estadoSubcategoria.value,
        imagen: imagenURL
    };

    if (editIndexSubcategoria.value !== "") {
        // si no cambia imagen, conserva la anterior
        if (!imagenSubcategoria.files[0]) {
            data.imagen = subcategorias[editIndexSubcategoria.value].imagen;
        }
        subcategorias[editIndexSubcategoria.value] = data;
    } else {
        subcategorias.push(data);
    }

    localStorage.setItem("subcategorias", JSON.stringify(subcategorias));
    renderSubcategorias();
    modalSubcategoria.style.display = "none";
};


function renderSubcategorias() {
    tbodySubcategorias.innerHTML = "";

    subcategorias.forEach((c, i) => {
        tbodySubcategorias.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.nombre}</td>
                <td>
                    <img src="${c.imagen}" class="img-subcategoria">
                </td>
                <td>${c.idCategoria}</td> <!-- Mostramos ID de categoría -->
                <td>${c.estado}</td>
                <td>
                    <button class="btn-edit" onclick="editarSubcategoria(${i})">Editar</button>
                    <button class="btn-delete" onclick="eliminarSubcategoria(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


window.editarSubcategoria = i => {
    const c = subcategorias[i];
    editIndexSubcategoria.value = i;
    nombreSubcategoria.value = c.nombre;
    idCategoria.value = c.idCategoria; 
    estadoSubcategoria.value = c.estado;
    modalSubcategoria.style.display = "flex";
};

window.eliminarSubcategoria = i => {
    subcategorias.splice(i, 1);
    localStorage.setItem("subcategorias", JSON.stringify(subcategorias));
    renderSubcategorias();
};


renderSubcategorias();

//subcategorias

const modalSubsubcategoria = document.getElementById("modalSubsubcategoria");
const btnAbrirModalSubsubcategoria = document.getElementById("btnAbrirModalSubsubcategoria");
const cerrarModalSubsubcategoria = document.getElementById("cerrarModalSubsubcategoria");
const formSubsubcategoria = document.getElementById("formSubsubcategoria");
const tbodySubsubcategorias = document.getElementById("tbodySubsubcategorias");
const editIndexSubsubcategoria = document.getElementById("editIndexSubsubcategoria");

const nombreSubsubcategoria = document.getElementById("nombreSubsubcategoria");
const subcategoria = document.getElementById("subcategoria"); // coincide con tu HTML
const estadoSubsubcategoria = document.getElementById("estadoSubsubcategoria");
const imagenSubsubcategoria = document.getElementById("imagenSubsubcategoria");

let subsubcategorias = JSON.parse(localStorage.getItem("subsubcategorias")) || [];
let contadorSubsubcategoriaId = subsubcategorias.length
    ? Math.max(...subsubcategorias.map(c => c.id)) + 1
    : 1;


btnAbrirModalSubsubcategoria.onclick = () => {
    formSubsubcategoria.reset();
    editIndexSubsubcategoria.value = "";
    modalSubsubcategoria.style.display = "flex";
};


cerrarModalSubsubcategoria.onclick = () => {
    modalSubsubcategoria.style.display = "none";
};


formSubsubcategoria.onsubmit = e => {
    e.preventDefault();

    const imagenURL = imagenSubsubcategoria.files[0]
        ? URL.createObjectURL(imagenSubsubcategoria.files[0])
        : "images/default.png";

    const data = {
        id: editIndexSubsubcategoria.value !== ""
            ? subsubcategorias[editIndexSubsubcategoria.value].id
            : contadorSubsubcategoriaId++,
        nombre: nombreSubsubcategoria.value,
        subcategoria: subcategoria.value, 
        estado: estadoSubsubcategoria.value,
        imagen: imagenURL
    };

    if (editIndexSubsubcategoria.value !== "") {
        if (!imagenSubsubcategoria.files[0]) {
            data.imagen = subsubcategorias[editIndexSubsubcategoria.value].imagen;
        }
        subsubcategorias[editIndexSubsubcategoria.value] = data;
    } else {
        subsubcategorias.push(data);
    }

    localStorage.setItem("subsubcategorias", JSON.stringify(subsubcategorias));
    renderSubsubcategorias();
    modalSubsubcategoria.style.display = "none";
};


function renderSubsubcategorias() {
    tbodySubsubcategorias.innerHTML = "";

    subsubcategorias.forEach((c, i) => {
       
        const subcatPadre = subcategorias.find(sc => sc.id == c.subcategoria);
        const nombreSubcatPadre = subcatPadre ? subcatPadre.nombre : "No asignada";

        tbodySubsubcategorias.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.nombre}</td>
                <td>
                    <img src="${c.imagen}" class="img-subsubcategoria">
                </td>
                <td>${nombreSubcatPadre}</td>
                <td>${c.estado}</td>
                <td>
                    <button class="btn-edit" onclick="editarSubsubcategoria(${i})">Editar</button>
                    <button class="btn-delete" onclick="eliminarSubsubcategoria(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


window.editarSubsubcategoria = i => {
    const c = subsubcategorias[i];
    editIndexSubsubcategoria.value = i;
    nombreSubsubcategoria.value = c.nombre;
    subcategoria.value = c.subcategoria; 
    estadoSubsubcategoria.value = c.estado;
    modalSubsubcategoria.style.display = "flex";
};

window.eliminarSubsubcategoria = i => {
    subsubcategorias.splice(i, 1);
    localStorage.setItem("subsubcategorias", JSON.stringify(subsubcategorias));
    renderSubsubcategorias();
};


renderSubsubcategorias();


//productos

const modalProducto = document.getElementById("modalProducto");
const btnAbrirModalProducto = document.getElementById("btnAbrirModalProducto");
const cerrarModalProducto = document.getElementById("cerrarModalProducto");
const formProducto = document.getElementById("formProducto");
const tbodyProductos = document.getElementById("tbodyProductos");
const editIndexProducto = document.getElementById("editIndexProducto");

const nombreProducto = document.getElementById("nombreProducto");
const marcaProducto = document.getElementById("marcaProducto");
const skuProducto = document.getElementById("skuProducto");
const colorProducto = document.getElementById("colorProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const precioProducto = document.getElementById("precioProducto");
const stockProducto = document.getElementById("stockProducto");
const subsubcategoriaProducto = document.getElementById("subsubcategoriaProducto");
const usuarioProducto = document.getElementById("usuarioProducto");
const estadoProducto = document.getElementById("estadoProducto");
const imagenProducto = document.getElementById("imagenProducto");


let productos = JSON.parse(localStorage.getItem("productos")) || [];
let contadorProductoId = productos.length
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;


btnAbrirModalProducto.onclick = () => {
    formProducto.reset();
    editIndexProducto.value = "";
    modalProducto.style.display = "flex";
};

cerrarModalProducto.onclick = () => {
    modalProducto.style.display = "none";
};


formProducto.onsubmit = e => {
    e.preventDefault();

    const imagenURL = imagenProducto.files[0]
        ? URL.createObjectURL(imagenProducto.files[0])
        : "images/default.png";

    const data = {
        id: editIndexProducto.value !== ""
            ? productos[editIndexProducto.value].id
            : contadorProductoId++, 
        nombre: nombreProducto.value,
        marca: marcaProducto.value,
        sku: skuProducto.value,
        color: colorProducto.value,
        descripcion: descripcionProducto.value,
        precio: parseFloat(precioProducto.value),
        stock: parseInt(stockProducto.value),
        subsubcategoria: subsubcategoriaProducto.value,
        usuario: usuarioProducto.value,
        estado: estadoProducto.value,
        imagen: imagenURL
    };

    if (editIndexProducto.value !== "") {
        if (!imagenProducto.files[0]) {
            data.imagen = productos[editIndexProducto.value].imagen;
        }
        productos[editIndexProducto.value] = data;
    } else {
        productos.push(data);
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
    modalProducto.style.display = "none";
};


function renderProductos() {
    tbodyProductos.innerHTML = "";

    productos.forEach((p, i) => {
     
        const subsubcat = JSON.parse(localStorage.getItem("subsubcategorias")) || [];
        const subsubcatData = subsubcat.find(s => s.id == p.subsubcategoria);
        const nombreSubsub = subsubcatData ? subsubcatData.nombre : "No asignado";

        tbodyProductos.innerHTML += `
            <tr>
                <td>${p.id}</td> <!-- ID del producto -->
                <td>${p.nombre}</td>
                <td><img src="${p.imagen}" class="img-producto"></td>
                <td>${p.marca}</td>
                <td>${p.sku}</td>
                <td>${p.color}</td>
                <td>${p.descripcion}</td>
                <td>${p.precio.toFixed(2)}</td>
                <td>${p.stock}</td>
                <td>${nombreSubsub}</td>
                <td>${p.usuario}</td>
                <td>${p.estado}</td>
                <td>
                    <button class="btn-edit" onclick="editarProducto(${i})">Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


window.editarProducto = i => {
    const p = productos[i];
    editIndexProducto.value = i;
    nombreProducto.value = p.nombre;
    marcaProducto.value = p.marca;
    skuProducto.value = p.sku;
    colorProducto.value = p.color;
    descripcionProducto.value = p.descripcion;
    precioProducto.value = p.precio;
    stockProducto.value = p.stock;
    subsubcategoriaProducto.value = p.subsubcategoria;
    usuarioProducto.value = p.usuario;
    estadoProducto.value = p.estado;
    modalProducto.style.display = "flex";
};


window.eliminarProducto = i => {
    productos.splice(i, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
};

renderProductos();


//el menú del dasboard

const menuUsuarios = document.getElementById("menuUsuarios");
const menuRoles = document.getElementById("menuRoles");
const menuCategorias = document.getElementById("menuCategorias");
const menuSubcategorias = document.getElementById("menuSubcategorias");
const menuSubsubcategorias = document.getElementById("menuSubsubcategorias");
const menuProductos = document.getElementById("menuProductos"); // nuevo

const seccionUsuarios = document.getElementById("seccionUsuarios");
const seccionRoles = document.getElementById("seccionRoles");
const seccionCategorias = document.getElementById("seccionCategorias");
const seccionSubcategorias = document.getElementById("seccionSubcategorias");
const seccionSubsubcategorias = document.getElementById("seccionSubsubcategorias");
const seccionProductos = document.getElementById("seccionProductos"); // nuevo

// Usuarios
menuUsuarios.addEventListener("click", () => {
    seccionUsuarios.style.display = "block";
    seccionRoles.style.display = "none";
    seccionCategorias.style.display = "none";
    seccionSubcategorias.style.display = "none";
    seccionSubsubcategorias.style.display = "none";
    seccionProductos.style.display = "none";

    menuUsuarios.classList.add("active");
    menuRoles.classList.remove("active");
    menuCategorias.classList.remove("active");
    menuSubcategorias.classList.remove("active");
    menuSubsubcategorias.classList.remove("active");
    menuProductos.classList.remove("active");
});

// Roles
menuRoles.addEventListener("click", () => {
    seccionUsuarios.style.display = "none";
    seccionRoles.style.display = "block";
    seccionCategorias.style.display = "none";
    seccionSubcategorias.style.display = "none";
    seccionSubsubcategorias.style.display = "none";
    seccionProductos.style.display = "none";

    menuRoles.classList.add("active");
    menuUsuarios.classList.remove("active");
    menuCategorias.classList.remove("active");
    menuSubcategorias.classList.remove("active");
    menuSubsubcategorias.classList.remove("active");
    menuProductos.classList.remove("active");
});

// Categorías
menuCategorias.addEventListener("click", () => {
    seccionUsuarios.style.display = "none";
    seccionRoles.style.display = "none";
    seccionCategorias.style.display = "block";
    seccionSubcategorias.style.display = "none";
    seccionSubsubcategorias.style.display = "none";
    seccionProductos.style.display = "none";

    menuCategorias.classList.add("active");
    menuUsuarios.classList.remove("active");
    menuRoles.classList.remove("active");
    menuSubcategorias.classList.remove("active");
    menuSubsubcategorias.classList.remove("active");
    menuProductos.classList.remove("active");
});

// Subcategorías
menuSubcategorias.addEventListener("click", () => {
    seccionUsuarios.style.display = "none";
    seccionRoles.style.display = "none";
    seccionCategorias.style.display = "none";
    seccionSubcategorias.style.display = "block";
    seccionSubsubcategorias.style.display = "none";
    seccionProductos.style.display = "none";

    menuSubcategorias.classList.add("active");
    menuUsuarios.classList.remove("active");
    menuRoles.classList.remove("active");
    menuCategorias.classList.remove("active");
    menuSubsubcategorias.classList.remove("active");
    menuProductos.classList.remove("active");
});

// Subsubcategorías
menuSubsubcategorias.addEventListener("click", () => {
    seccionUsuarios.style.display = "none";
    seccionRoles.style.display = "none";
    seccionCategorias.style.display = "none";
    seccionSubcategorias.style.display = "none";
    seccionSubsubcategorias.style.display = "block";
    seccionProductos.style.display = "none";

    menuSubsubcategorias.classList.add("active");
    menuUsuarios.classList.remove("active");
    menuRoles.classList.remove("active");
    menuCategorias.classList.remove("active");
    menuSubcategorias.classList.remove("active");
    menuProductos.classList.remove("active");
});

// Productos
menuProductos.addEventListener("click", () => {
    seccionUsuarios.style.display = "none";
    seccionRoles.style.display = "none";
    seccionCategorias.style.display = "none";
    seccionSubcategorias.style.display = "none";
    seccionSubsubcategorias.style.display = "none";
    seccionProductos.style.display = "block";

    menuProductos.classList.add("active");
    menuUsuarios.classList.remove("active");
    menuRoles.classList.remove("active");
    menuCategorias.classList.remove("active");
    menuSubcategorias.classList.remove("active");
    menuSubsubcategorias.classList.remove("active");
});


});
