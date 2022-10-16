//var Global= "http://localhost:8081/api/";
var Global = "http://129.213.125.75:8081/api/";

function obtenerCategoria(id){
	$("#idCategoria").val(id);

	$.ajax({
	    url : Global + 'Category/' +  id,
	    type : 'GET',
			//dataType: 'json',
			//contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
				$("#nombreCategoria").val(cs.name);
				$("#descripcionCategoria").val(cs.description);
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function leerCategorias(){
//FUNCION GET
	$.ajax({
	    url : Global + 'Category/all',
	    type : 'GET',
		  //dataType: 'json',
		  //contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
	   		$("#listaCategorias").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#listaCategorias").append(cs[i].id+" <b>"+cs[i].name+"</b> "+cs[i].description);
	   			$("#listaCategorias").append("<button onclick='borrarCategoria("+cs[i].id+")'>Borrar</button>");
					$("#listaCategorias").append("<button onclick='obtenerCategoria(" +cs[i].id +")'>Actualizar</button><br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function guardarCategoria() {
	let nombre=$("#nombreCategoria").val();
	let descripcionCategoria=$("#descripcionCategoria").val();

	let data={
		name:nombre,
		description:descripcionCategoria
	};

	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);


	$.ajax({
		url : Global + 'Category/save',
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
	    	leerCategorias();
	    }
	});
}


function editarCategoria(){
	let id=$("#idCategoria").val();
	let nombre=$("#nombreCategoria").val();
	let descripcionCategoria=$("#descripcionCategoria").val();

	let data={
		id:id,
		name:nombre,
		description:descripcionCategoria
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Category/update',
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
	    	leerCategorias();
	    }
	});

}

function borrarCategoria(idCategoria){
	let data={
		id:idCategoria
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Category/' + data.id,
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
	    	leerCategorias();
	    }
	});

}
