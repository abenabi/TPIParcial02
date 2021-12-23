var deportes=null;
var categorias=null;
var id;
var orden=0;

obtenerDeportes()

//función para asignar codigo a tr según deportes y poder filtrarlos
function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case 1: code = "c1"; break;
		case 2: code = "c2"; break;
		case 3: code = "c3"; break;
		case 4: code = "c4"; break;
	}
	return code;
}

//función para listar los deportes en las filas de la tabla de deportes
function listarDeportes(deportes) {
	var fila="<tr><td class='id' rowspan='8'></td><td>Nombre:</td><td class='Nombre'></td><td class='Cantidad' rowspan='8'></td><td>Imagen</td><td class='Eliminar' rowspan='8'></td></tr><tr><td>Modo de juego:</td><td class='Modo'></td><td class='Imagen' rowspan='3'></td></tr><tr><td>Terreno de juego:</td><td class='Terreno'></td></tr><tr><td>Categoría:</td><td class='Categoria'></td></tr><tr><td class='EncabezadoDescripcion' colspan='2'>Descripción:</td><td>Video</td></tr><tr><td class='Descripcion' colspan='2'></td><td class='Video' rowspan='3'></td></tr><tr><td class='EncabezadoHerramientas' colspan='2'>Herramientas necesarias:</td></tr><tr><td class='Herramientas' colspan='2'></td></tr><tr style='border: inset 0pt'><td colspan='6' class='Separador' style=' border: inset 0pt'></td></tr>";
	var cantidadJugadores = document.getElementById("jugadores");
	cantidadJugadores.setAttribute("onclick","orden*=-1;listarDeportes(deportes);");
	var num=deportes.length;
	var formagregar = document.getElementById("formagregar");
	var listado=document.getElementById("listado");
	var ids,nombres,descripciones,imagenes,modoDeJuegos,terrenoDeJuegos,cantidadDeJugadoresGlobal,herramientasNecesariasGlobal,videos,nombreDeCategorias;
	var tbody=document.getElementById("tbody"),nfila=0;
	tbody.innerHTML="";
	var catcode;
	for(i=0;i<num;i++) tbody.innerHTML+=fila;
	var tr;
	ids=document.getElementsByClassName("id");
	nombres=document.getElementsByClassName("Nombre");
	descripciones=document.getElementsByClassName("Descripcion");
	imagenes=document.getElementsByClassName("Imagen");
	modoDeJuegos=document.getElementsByClassName("Modo");
	terrenoDeJuegos=document.getElementsByClassName("Terreno");
	cantidadDeJugadoresGlobal=document.getElementsByClassName("Cantidad");
	herramientasNecesariasGlobal=document.getElementsByClassName("Herramientas");
	videos=document.getElementsByClassName("Video");
	nombreDeCategorias=document.getElementsByClassName("Categoria");
	accion=document.getElementsByClassName("Eliminar");
	if(orden===0) {
		orden=-1;cantidadJugadores.innerHTML="Cantidad de jugadores en el mundo"
	}
	else
		if(orden==1) {
			ordenarAsc(deportes,"cantidad_de_jugadores");
			cantidadJugadores.innerHTML="Cantidad de jugadores en el mundo (ascendente)";
			cantidadJugadores.style.color="lightgreen";
		}
		else
			if(orden==-1) {
				ordenarDesc(deportes,"cantidad_de_jugadores");
				cantidadJugadores.innerHTML="Cantidad de jugadores en el mundo (descendente)";
				cantidadJugadores.style.color="red";
			} 
	formagregar.style.display="block";
	listado.style.display="block";
	for(nfila=0;nfila<num;nfila++) {
		ids[nfila].innerHTML=deportes[nfila].id;
		nombres[nfila].innerHTML=deportes[nfila].nombre;
		descripciones[nfila].innerHTML=deportes[nfila].descripcion;
		imagenes[nfila].innerHTML="<img class='imagenesDeportes' src='"+deportes[nfila].imagen+"'>";
		modoDeJuegos[nfila].innerHTML = deportes[nfila].modo_de_juego;
		
		terrenoDeJuegos[nfila].innerHTML = deportes[nfila].terreno_de_juego;
		cantidadDeJugadoresGlobal[nfila].innerHTML = deportes[nfila].cantidad_de_jugadores;
		herramientasNecesariasGlobal[nfila].innerHTML = deportes[nfila].herramientas_necesarias;
		videos[nfila].innerHTML="<iframe width=\"400\" height=\"225\" src=\"" + deportes[nfila].video + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
		switch(deportes[nfila].id_categoria){
			case 1: nombreDeCategorias[nfila].innerHTML=categorias[0].nombre;break;
			case 2: nombreDeCategorias[nfila].innerHTML=categorias[1].nombre;break;
			case 3: nombreDeCategorias[nfila].innerHTML=categorias[2].nombre;break;
			case 4: nombreDeCategorias[nfila].innerHTML=categorias[3].nombre;break;
		}
		catcode=codigoCat(deportes[nfila].id_categoria);
		accion[nfila].innerHTML = "<button id='botonVentanaModificar' type='button' class='btn btn-warning' onclick="+"ventanaModificarDeportes('"+deportes[nfila].id+"');>Modificar</button><br><br><br><br><button id='botonEliminar' type='button' class='btn btn-danger' onclick="+"eliminarDeportes('"+deportes[nfila].id+"');>Eliminar</button>";
		tr=accion[nfila].parentElement;
		tr.setAttribute("class",catcode);
		tr=modoDeJuegos[nfila].parentElement;
		tr.setAttribute("class",catcode);
		tr=terrenoDeJuegos[nfila].parentElement;
		tr.setAttribute("class",catcode);
		tr=nombreDeCategorias[nfila].parentElement;
		tr.setAttribute("class",catcode);
		tr=descripciones[nfila].parentElement;
		tr.setAttribute("class",catcode);
		tr=herramientasNecesariasGlobal[nfila].parentElement;
		tr.setAttribute("class",catcode);
		var separador=document.getElementsByClassName("Separador");
		tr=separador[nfila].parentElement;
		tr.setAttribute("class",catcode);
		var separador=document.getElementsByClassName("EncabezadoDescripcion");
		tr=separador[nfila].parentElement;
		tr.setAttribute("class",catcode);
		var separador=document.getElementsByClassName("EncabezadoHerramientas");
		tr=separador[nfila].parentElement;
		tr.setAttribute("class",catcode);
	}
}

//función para obtener deportes de la fake api rest usando fetch. redirige a la dirección que contiene los deportes
function obtenerDeportes() {
	fetch('http://localhost:3000/deportes')
	.then(res=>res.json())
	.then(data => {
		deportes=data;
		listarDeportes(deportes)
	})
	//en la siguiente llamada se recupera las categorias de los deportes que estan en la dirección de categorias
	fetch('http://localhost:3000/categorias')
	.then(res => res.json())
	.then(data =>{
		categorias=data;
	})
	orden=0;
}

//funcion para agregar un deporte a la fake api rest y actualizar los deportes mostrados en la pagina
function agregarDeportes(){
	var urlImagenExReg = /^[a-z]+:[^:]+$/;
	var urlVideoExReg = /^[a-z]+:[^:]+$/;
	var nombreTxt=document.getElementById("AddNombre").value;
	var descripcionTxt=document.getElementById("AddDescripcion").value;
	var imagenUrl=document.getElementById("AddImagenUrl").value;
	var modoDeJuegoTxt=document.getElementById("AddModoJuego").value;
	var terrenoDeJuegoTxt=document.getElementById("AddTerrenoJuego").value;
	var cantidadDeJugadoresTxt=parseInt(document.getElementById("AddCantidadJugadores").value);
	var herramientasNecesariasTxt=document.getElementById("AddHerramientasNecesarias").value;
	var videoUrl=document.getElementById("AddVideoUrl").value;
	var nombreDeCategoriaTxt=document.getElementById("AddCategoria").value;
	var codigoCategoria;
	switch(nombreDeCategoriaTxt){
		case "Deportes de motor": codigoCategoria=1;break;
		case "Deportes de pelota": codigoCategoria=2;break;
		case "Deportes de tiro": codigoCategoria=3; break;
		case "Deportes extremos": codigoCategoria=4;break;
		case "": codigoCategoria="";break;
	}
	//validacion de los datos ingresados para agregar el deporte
	if(nombreTxt==""){
		alert("No se permiten campos vacíos. Ingrese un nombre para el deporte a agregar.");
		document.getElementById("AddNombre").focus();
	}else if(descripcionTxt==""){
		alert("No se permiten campos vacíos. Ingrese una descripción para el deporte a agregar.");
		document.getElementById("AddDescripcion").focus();
	}else if(imagenUrl==""){
		alert("No se permiten campos vacíos. Ingrese una dirección de imagen para el deporte a agregar.");
		document.getElementById("AddImagenUrl").focus();
	}else if(!urlImagenExReg.test(imagenUrl)){
		alert("Ingrese una url valida para la imagen del deporte a agregar.");
		document.getElementById("AddImagenUrl").focus();
	}else if(modoDeJuegoTxt==""){
		alert("No se permiten campos vacíos. Seleccione un modo de juego para el deporte a agregar.");
		document.getElementById("AddModoJuego").focus();
	}else if(terrenoDeJuegoTxt==""){
		alert("No se permiten campos vacíos. Seleccione un terreno de juego para el deporte a agregar.");
		document.getElementById("AddTerrenoJuego").focus();
	}else if(herramientasNecesariasTxt==""){
		alert("No se permiten campos vacíos. Ingrese las herramientas necesarias para el deporte a agregar.");
		document.getElementById("AddHerramientasNecesarias").focus();
	}else if(videoUrl==""){
		alert("No se permiten campos vacíos. Ingrese una dirección de video para el deporte a agregar.");
		document.getElementById("AddVideoUrl").focus();
	}else if(!urlVideoExReg.test(videoUrl)){
		alert("Ingrese una url valida para el video del deporte a agregar.");
		document.getElementById("AddVideoUrl").focus();
	}else if(isNaN(cantidadDeJugadoresTxt)){
		alert("No se permiten campos vacíos. Ingrese una cantidad de jugadores para el deporte a agregar.");
		document.getElementById("AddCantidadJugadores").focus();
	}else if(nombreDeCategoriaTxt==""){
		alert("No se permiten campos vacíos. Seleccione una categoria para el deporte a agregar.");
		document.getElementById("AddCategoria").focus();
	}else{
		if(document.getElementById("AddCantidadJugadores").value>=0){
			var deporte={
				nombre:nombreTxt,
				descripcion:descripcionTxt,
				imagen:imagenUrl,
				modo_de_juego:modoDeJuegoTxt,
				terreno_de_juego:terrenoDeJuegoTxt,
				cantidad_de_jugadores:cantidadDeJugadoresTxt,
				herramientas_necesarias:herramientasNecesariasTxt,
				video:videoUrl,
				id_categoria:codigoCategoria
			}
			fetch('http://localhost:3000/deportes/',
			{ method:"POST",
				body: JSON.stringify(deporte),
				headers: {
					'Accept': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',	   
				 }
			})
		document.getElementById("AddNombre").value="";
		document.getElementById("AddDescripcion").value="";
		document.getElementById("AddImagenUrl").value="";
		document.getElementById("AddModoJuego").value="";
		document.getElementById("AddTerrenoJuego").value="";
		document.getElementById("AddCantidadJugadores").value="";
		document.getElementById("AddHerramientasNecesarias").value="";
		document.getElementById("AddVideoUrl").value="";
		document.getElementById("AddCategoria").value="";
		alert("Se agregó el deporte: "+nombreTxt);
		obtenerDeportes()
		}
		else
		alert("Ingrese una cantidad de jugadores mayor que 0 para el deporte a agregar.");
	}
}

//función para mostrar la ventana de modificar deportes
function ventanaModificarDeportes(id){
	id=id-1;
	document.getElementById("ModificarNombre").value=deportes[id].nombre;
	document.getElementById("ModificarDescripcion").value=deportes[id].descripcion;
	document.getElementById("ModificarImagenUrl").value=deportes[id].imagen;
	document.getElementById("ModificarModoJuego").value=deportes[id].modo_de_juego;
	document.getElementById("ModificarTerrenoJuego").value=deportes[id].terreno_de_juego;
	document.getElementById("ModificarCantidadJugadores").value=deportes[id].cantidad_de_jugadores;
	document.getElementById("ModificarHerramientasNecesarias").value=deportes[id].herramientas_necesarias;
	document.getElementById("ModificarVideoUrl").value=deportes[id].video;
	switch(deportes[id].id_categoria){
		case 1: document.getElementById("ModificarCategoria").value=categorias[0].nombre;break;
		case 2: document.getElementById("ModificarCategoria").value=categorias[1].nombre;break;
		case 3: document.getElementById("ModificarCategoria").value=categorias[2].nombre;break;
		case 4: document.getElementById("ModificarCategoria").value=categorias[3].nombre;break;
	}
	document.getElementById("modificarDeportes").setAttribute("onclick","modificarDeportes('" +id+ "');");
	document.getElementById("ventanaModificar").style.display="block";
}

//función para modificar un deporte especifico
function modificarDeportes(id){
	var urlImagenExReg = /^[a-z]+:[^:]+$/;
	var urlVideoExReg = /^[a-z]+:[^:]+$/;
	var stringid=parseInt(id)+1;
	var modificarId=stringid;
	var modificarNombre=document.getElementById("ModificarNombre").value;
	var modificarDescripcion=document.getElementById("ModificarDescripcion").value;
	var modificarImagenUrl=document.getElementById("ModificarImagenUrl").value;
	var modificarModoJuego=document.getElementById("ModificarModoJuego").value;
	var modificarTerrenoJuego=document.getElementById("ModificarTerrenoJuego").value;
	var modificarCantidadJugadores=parseInt(document.getElementById("ModificarCantidadJugadores").value);
	var modificarHerramientasNecesarias=document.getElementById("ModificarHerramientasNecesarias").value;
	var modificarVideoUrl=document.getElementById("ModificarVideoUrl").value
	var modificarIdCategoria=document.getElementById("ModificarCategoria").value;
	switch(modificarIdCategoria){
		case "Deportes de motor": modificarIdCategoria=1;break;
		case "Deportes de pelota": modificarIdCategoria=2;break;
		case "Deportes de tiro": modificarIdCategoria=3;break;
		case "Deportes extremos": modificarIdCategoria=4;break;
		case "":modificarIdCategoria="";break;
	}
	//validacion de datos para modificar el item deporte
	if(!(modificarNombre!=deportes[id].nombre || modificarDescripcion!=deportes[id].descripcion || modificarImagenUrl!=deportes[id].imagen || modificarModoJuego!=deportes[id].modo_de_juego || modificarTerrenoJuego!=deportes[id].terreno_de_juego || modificarCantidadJugadores!=deportes[id].cantidad_de_jugadores || modificarHerramientasNecesarias!=deportes[id].herramientas_necesarias || modificarVideoUrl!=deportes[id].video || modificarIdCategoria!=deportes[id].id_categoria)){
		alert("Actualice al menos un dato para poder modificar el deporte.");
	}
	else
		if(modificarNombre==""){
			alert("Ingrese un nombre para el deporte a modificar.");
			document.getElementById("ModificarNombre").focus();
		}
		else
			if(modificarDescripcion==""){
				alert("Ingrese una descripción para el deporte a modificar.");
				document.getElementById("ModificarDescripcion").focus();
			}
			else
				if(modificarImagenUrl==""){
					alert("Ingrese una url para la imagen del deporte a modificar.");
					document.getElementById("ModificarImagenUrl").focus();
				}
				else
				if(!urlImagenExReg.test(modificarImagenUrl)){
					alert("Ingrese una url valida para la imagen del deporte a modificar.");
					document.getElementById("ModificarImagenUrl").focus();
				}
				else
					if(modificarModoJuego==""){
						alert("Seleccione un modo de juego para el deporte a modificar.");
						document.getElementById("ModificarModoJuego").focus();
					}
					else
						if(modificarTerrenoJuego==""){
							alert("Seleccione un modo de terreno de juego para el deporte a modificar.");
							document.getElementById("ModificarTerrenoJuego").focus();
						}
						else
							if(isNaN(modificarCantidadJugadores)){
								alert("Ingrese una cantidad de jugadores para el deporte a modificar.");
								document.getElementById("ModificarCantidadJugadores").focus();
							}
							else 
							{
								if(modificarCantidadJugadores<=0){
									alert("Ingrese una cantidad de jugadores mayor que 0 para el deporte a modificar.");
									document.getElementById("ModificarCantidadJugadores").focus();
								}
							else
								if(modificarHerramientasNecesarias==""){
									alert("Ingrese las herramientas necesarias para el deporte a modificar.");
									document.getElementById("ModificarHerramientasNecesarias").focus();
								}
								else
									if(modificarVideoUrl==""){
										alert("Ingrese una url para el video del deporte a modificar.");
										document.getElementById("ModificarVideoUrl").focus();
									}
									else
									if(!urlVideoExReg.test(modificarVideoUrl)){
										alert("Ingrese una url valida para el video del deporte a modificar.");
										document.getElementById("ModificarVideoUrl").focus();
									}
									else 
										if(modificarIdCategoria==""){
											alert("Seleccione una categoria para el deporte a modificar.");
											document.getElementById("ModificarCategoria").focus();
										}
										else{
											var deporteModificado={
												id:modificarId,
												nombre:modificarNombre,
												descripcion:modificarDescripcion,
												imagen:modificarImagenUrl,
												modo_de_juego:modificarModoJuego,
												terreno_de_juego:modificarTerrenoJuego,
												cantidad_de_jugadores:modificarCantidadJugadores,
												herramientas_necesarias:modificarHerramientasNecesarias,
												video:modificarVideoUrl,
												id_categoria:modificarIdCategoria
											}
											//peticion para modificar el deporte
											fetch('http://localhost:3000/deportes/'+stringid,
											{
												method: "PUT",
												headers: {'Content-type': 'application/json; charset=UTF-8'},
												body: JSON.stringify(deporteModificado)
											})
											.then(res => res.json())
											alert("Se modifico el deporte con id "+stringid);
											obtenerDeportes()
										}
	
							}
}

//función para cerrar la ventana de modificar deportes
function cerrarVentanaModificacion(){
	document.getElementById("ventanaModificar").style.display="none";
}

//función para eliminar un deporte
function eliminarDeportes(id) {
	fetch('http://localhost:3000/deportes/'+id, { method: "DELETE" }).then(response => response.json()).then(data => deportes = data);
	alert("Se ha eliminado el deporte N° " + id);
	obtenerDeportes()
}

//función para ordenar los deportes de forma descendente
function ordenarDesc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
	   if(a[p_key] > b[p_key]) return -1;
 if(a[p_key] < b[p_key]) return 1;
 return 0;
	});
 }
 
 //función para ordenar los deportes de forma ascendente
 function ordenarAsc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
	   if(a[p_key] > b[p_key]) return 1;
 if(a[p_key] < b[p_key]) return -1;
 return 0;
	});
}