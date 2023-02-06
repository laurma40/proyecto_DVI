function devuelveTextoDeAlerta() {
  return "uooooo! Vaya alerta";
}

function desaparece(nombre) {
	var button = document.getElementById(nombre);
  button.style.visibility='hidden';
}

function aparece(nombre) {
	var button = document.getElementById(nombre);
  button.style.visibility='visible';
}