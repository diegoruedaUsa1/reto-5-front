//var Global= "http://localhost:8081/api/";
var Global = "http://129.213.125.75:8081/api/";

function obtenerCliente(idClient){
	$("#idCliente").val(idClient);

	let id = idClient;

	$.ajax({
	    url : Global + 'Client/' +  id,
	    type : 'GET',
			//dataType: 'json',
			//contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
				$("#nombreCliente").val(cs.name);
				$("#mailCliente").val(cs.email);
				$("#edadCliente").val(cs.age);
				$("#passwordCliente").val(cs.password);

	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function leerClientes(){
//FUNCION GET
	$.ajax({
	    url : Global + 'Client/all',
	    type : 'GET',
		  //dataType: 'json',
		  //contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
	   		$("#listaClientes").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#listaClientes").append(cs[i].idClient+" <b>"+cs[i].name+"</b> "+cs[i].email+" "+cs[i].age);
	   			$("#listaClientes").append("<button onclick='borrarCliente("+cs[i].idClient+")'>Borrar</button>");
					$("#listaClientes").append("<button onclick='obtenerCliente(" +cs[i].idClient +")'>Actualizar</button><br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function guardarCliente() {
	let nombre=$("#nombreCliente").val();
	let mailCliente=$("#mailCliente").val();
	let edad=$("#edadCliente").val();
	let password=$("#passwordCliente").val();

	let data={
		name:nombre,
		email:mailCliente,
		age:parseInt(edad),
		password:password
	};

	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);


	$.ajax({
		url : Global + 'Client/save',
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
	    	leerClientes();
	    }
	});
}


function editarCliente(){
	let id=$("#idCliente").val();
	let nombre=$("#nombreCliente").val();
	let mailCliente=$("#mailCliente").val();
	let edad=$("#edadCliente").val();
	let password=$("#passwordCliente").val();

	let data={
		idClient: id,
		name:nombre,
		email:mailCliente,
		age:parseInt(edad),
		password:password
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Client/update',
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
	    	leerClientes();
	    }
	});

}

function borrarCliente(idCliente){
	let data={
		id:idCliente
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Client/' + data.id,
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
	    	leerClientes();
	    }
	});

}
