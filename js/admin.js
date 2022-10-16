
function obtenerAdmin(){
	let id=$("#idAdmin").val();

	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client/' +  id,
	    type : 'GET',
			//dataType: 'json',
			//contentType:'application/json',
	    success : function(response) {
	   		let cs=response.items;
	   		$("#listaAdmin").empty();
	   		for(i=0;i<cs.length;i++){
					$("#mailAdmin").val(cs[i].email);
					$("#nombreAdmin").val(cs[i].name);
					$("#passwordAdmin").val(cs[i].password);
	   			$("#listaAdmin").append(cs[i].idAdmin+" <b>"+cs[i].name+"</b> "+cs[i].email+" "+cs[i].password);
	   			$("#listaAdmin").append("<button onclick='borrarAdmin("+cs[i].idAdmin+")'>Borrar</button></br> </br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function leerAdmin(){
//FUNCION GET
	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
	    type : 'GET',
		  //dataType: 'json',
		  //contentType:'application/json',
	    success : function(response) {
	   		let cs=response.items;
	   		$("#listaAdmin").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#listaAdmin").append(cs[i].idAdmin+" <b>"+cs[i].name+"</b> "+cs[i].email);
	   			$("#listaAdmin").append("<button onclick='borrarAdmin("+cs[i].id+")'>Borrar</button><br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function guardarAdmin() {
	let nombre=$("#nombreAdmin").val();
	let mailAdmin=$("#mailAdmin").val();
	let password=$("#passwordAdmin").val();

	let data={
		name:nombre,
		email:mailAdmin,
		password:password
	};

	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);


	$.ajax({
		url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
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
	    	leerAdmin();
	    }
	});
}


function editarAdmin(){
	let nombre=$("#nombreAdmin").val();
	let mailAdmin=$("#mailAdmin").val();
	let password=$("#passwordAdmin").val();

	let data={
		name:nombre,
		email:mailAdmin,
		password:password
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
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
	    	leerAdmin();
	    }
	});

}

function borrarAdmin(idAdmin){
	let data={
		id:idAdmin
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
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
	    	leerAdmin();
	    }
	});

}
