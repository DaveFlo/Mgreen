if(localStorage.getItem("user")!=null){
   $.mobile.navigate( "#land", {transition:"pop" });
}


    
    
    
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
	    	
	    	$('#regForm')[0].reset();
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
    function prodUp(){
    var form = new FormData($("#prodForm")[0]);
    form.append("usi",localStorage.getItem("usi"));
    
    	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		
	    if(data.toString()=="1"){
	    	$(".imgup").attr("src","");
	    	$('#prodForm')[0].reset();
            swal("Listo","Tu anuncio ha sido dado de alta.","success");
	    	$.mobile.navigate( "#land", { transition : "slide",info: "info about the #foo hash" });


	    }else if(data.toString()=="0"){
	    	 swal("Error","Necesitas elegir al menos una imagen","error");
	    	
	    	}else{
	    	
	    		mes="Ocurrio un error al dar de alta el producto, por favor revisa tu conexión e intentalo de nuevo";
	    	
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
    function login(){
	
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
	    	usi = datos[1];
	    	localStorage.setItem("user",user);
	    	localStorage.setItem("usi",usi);
	    	$.mobile.navigate( "#land", { transition : "slide",info: "info about the #foo hash" });
            

	    }else{
           
	    	swal("Error","Usuario inexistente","error");
	    }
	    
	}

        });
    }
var connectionStatus = false;


$(document).ready(function(){
	
    document.addEventListener("backbutton", function(e){
    	
    
           if($.mobile.activePage.is('#inicio')||$.mobile.activePage.is('#land')){
              
           }
           else {
               navigator.app.backHistory()
          }
         }, false);
    $("#logForm").submit(function(e){
    	e.preventDefault();
    	
    	$("#logac").prop("disabled",true);
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
   $("#prodForm").submit(function(e){
    	e.preventDefault();
	     var empty = $(this).find(".inputp").filter(function() {
	     	
           return this.value === "";
           
        });
        if(empty.length==0){
	    swal({
          title: "¿Estás seguro que la información es correta?",
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
 	         prodUp();
            }
         });
        }else{
        	swal("Error","Debes completar todos los campos","error");
        }
   });
   
   var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
	




});
