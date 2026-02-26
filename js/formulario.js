const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, 
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^.{4,12}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
    usuario: false,
    nombre: false,
    apellido: false,
    password: false,
    correo: false,
};

const validacionFormulario = (e) => {
    switch (e.target.name){

        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
    }
};

const validarCampo = (expresion, input, campo) => {

    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
        campos[campo] = false; 
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validacionFormulario);
    input.addEventListener('blur', validacionFormulario);
});

formulario.addEventListener('submit',(e) => {

    e.preventDefault();

    const terminos = document.getElementById('terminos');

    if (campos.usuario && campos.nombre && campos.apellido && campos.password && campos.correo && terminos.checked) {

       
        formulario.submit();

    } else {
        document.getElementById('formulario_mensaje')
        .classList.add('formulario_mensaje-activo');
    }
});