if(localStorage.getItem("user")!=null){
   $.mobile.navigate( "#land", {transition:"pop" });
}

 $.mobile.allowCrossDomainPages = true;  
    
    
    
    function register(){
    var form = new FormData($("#regForm")[0]);
    	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		
	    if(data.toString()=="1"){
	    	
	    	
            swal("Listo","Tu usuario ha sido registrado exitosamente.","success");
	    	$.mobile.navigate( "#inicio", { transition : "slide",info: "info about the #foo hash" });


	    }else{
	    	var mes="";
	    	if(data==1062){
	    		mes = "Este usuario ya se encuentra registrado."
	    	}else{
	    		mes="Ocurrio un error al registrarte, por favor revisa tu conexión e intentalo de nuevo";
	    	}
           swal("Error",mes,"error");
	    }
	   
	}

        });
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $(input).prev().prev().attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
$(document).ready(function(){
	function login(){
		alert("lolo");
    	var form = new FormData($("#logForm")[0]);
    	
    	//form.append("regID",localStorage.getItem('registrationId'));
    	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	error: function(xhr, settings, exception){ alert(xhr.responseText)},
	success: function(data){
		$("#logac").prop("disabled",false);
	    if(data.toString()!=="0"){
	    	var datos = data.toString().split(",");
	    	user = datos[0];
	    	localStorage.setItem("user",user);
	    	
	    	$.mobile.navigate( "#land", { transition : "slide",info: "info about the #foo hash" });
            

	    }else{
           
	    	swal("Error","Usuario inexistente","error");
	    }
	    $("#enter").prop("disabled",false);
	}

        });
    }
    document.addEventListener("backbutton", function(e){
    	
    
           if($.mobile.activePage.is('#inicio')||$.mobile.activePage.is('#land')){
              
           }
           else {
               navigator.app.backHistory()
          }
         }, false);
    $("#logForm").submit(function(e){
    	e.preventDefault();
    	alert("lala");
    	//$("#logac").prop("disabled",true);
	    login();
   });
   
    $(".imch").click(function(){
       $(this).next().click();
    });
    $(".pic").change(function(){
        readURL(this);
    });
   $("#regForm").submit(function(e){
    	e.preventDefault();
	
	    swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         register();
            }
         });
   });
   


      // STARTS and Resets the loop if any
    $(".menub").click(function(){
    	getCredit();
    });
	
	function getSchools(){
	$.ajax({
	url: "http://www.icone-solutions.com/tlunch/sqlOP.php",
	type: "POST",
	data: {school: 1},
	
	success: function(data){
            
		var jsonObj = jQuery.parseJSON(data);
		var id = jsonObj[0].split(",");
		var nombres = jsonObj[1].split(",");
		if(nombres[0]!=""){
		for(var i=0;i<nombres.length;i++){
			
			$("#schoolList").append('<option value="'+id[i]+'">'+nombres[i]+'</option>');
		}
       }
    }
   
    });
    }


getSchools();

});
