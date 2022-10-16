//var Global= "http://localhost:8081/api/";
var Global = "http://129.213.125.75:8081/api/";
function obtenerPuntaje(idScore){
	$("#idPuntaje").val(idScore);

	$.ajax({
	    url : Global + 'Score/' +  idScore,
	    type : 'GET',
			//dataType: 'json',
			//contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
				$("#cuerpoMensajeScore").val(cs.messageText);
				$("#stars").val(cs.stars);

	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function leerPuntajes(){
//FUNCION GET
	$.ajax({
	    url : Global + 'Score/all',
	    type : 'GET',
		  //dataType: 'json',
		  //contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
	   		$("#listaPuntajes").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#listaPuntajes").append(cs[i].idScore+" <b>"+cs[i].messageText+"</b> "+cs[i].stars);
	   			$("#listaPuntajes").append("<button onclick='borrarPuntaje("+cs[i].idScore+")'>Borrar</button>");
					$("#listaPuntajes").append("<button onclick='obtenerPuntaje(" +cs[i].idScore +")'>Actualizar</button><br>");

	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function guardarPuntaje() {
	let mensaje=$("#cuerpoMensajeScore").val();
	let stars=$("#stars").val();

	let data={
		messageText:mensaje,
		stars:stars
	};

	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);


	$.ajax({
		url : Global + 'Score/save',
		type : 'post',
		dataType: 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			//alert("El cliente se ha guardado correctamente");

	    },
	    error : function(xhr, status) {
	        //alert('Ha ocurrido un problema al guardar el cliente');
	    },
	    complete: function(){
	    	leerPuntajes();
	    }
	});
}


function editarPuntaje(){
	let id = $("#idPuntaje").val();
	let mensaje=$("#cuerpoMensajeScore").val();
	let stars=$("#stars").val();

	let data={
		idScore: id,
		messageText:mensaje,
		stars:stars
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Score/update',
	    type : 'PUT',
	 		dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			//alert("El cliente se ha actualizado correctamente");

	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un problema al actualizar el cliente');
	    },
	    complete: function(){
	    	leerPuntajes();
	    }
	});

}

function borrarPuntaje(idPuntaje){
	let data={
		id:idPuntaje
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Score/' + data.id,
	    type : 'DELETE',
	    dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
				//console.log("El cliente se ha borrado correctamente");
	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un priblema al borrar el cliente');
	    },
	    complete: function(){
	    	leerPuntajes();
	    }
	});

}
