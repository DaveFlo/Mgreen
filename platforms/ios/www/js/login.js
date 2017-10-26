if(localStorage.getItem("user")!=null){
   $.mobile.navigate( "#land", {transition:"pop" });
}

Conekta.setPublicKey('key_L7Psm9dyS6CdPoozJGB6fdQ');
Conekta.setLanguage("es"); 
function checkC(){
	var $form = $("#regFormP");
    $form.find("button").prop("disabled", true);
    Conekta.Token.create($form, conektaSuccessResponseHandler, conektaErrorResponseHandler);
	
    	
}
 var conektaSuccessResponseHandler = function(token) {
  	
    var $form = $("#regForm");
    //Inserta el token_id en la forma para que se envíe al servidor
    $form.append($("<input type='hidden' name='conektaTokenId' id='conektaTokenId'>").val(token.id));
    register("#regFormP");
    	

  };
  var conektaErrorResponseHandler = function(response) {
  
  	
  	swal("Error",response.message_to_purchaser,"error");
  	

    var $form = $("#regForm");
    
    
  };
    
    
    
    function register(rform){
    var form = new FormData($(rform)[0]);
    	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/subscription.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		console.log(data);
	    if(data.toString()=="1"){
	    	
	    	$(rform)[0].reset();
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
    function updateD(){
    var form = new FormData($("#accForm")[0]);
    form.append("userm",localStorage.getItem("user"));
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
            swal("Listo","Tus datos han sido modificados.","success");
            $("#edit").addClass("ui-icon-edit");
 	 $("#edit").removeClass("ui-icon-delete");
 	$('#accForm input,#accForm textarea').css("background-color","transparent");
 	$('#accForm input,#accForm textarea').prop('readonly', true);
 	
		$("#saveD").css("visibility","hidden");
	    	$.mobile.navigate( "#land", { transition : "slideup",info: "info about the #foo hash" });


	    }else{
	    	
	    	
	    	
           swal("Error","No se han podido modificar tus datos, revisa tu conexión e intentalo de nuevo","error");
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
		 $.mobile.loading( "hide" );
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
	$(function() {

                $("#card").inputmask("9999 9999 9999 9999", {"placeholder": "0000 0000 0000 0000"});
                $("#cvv").inputmask("999", {"placeholder": "000"});
               $("#expdate").inputmask("99/9999", {"placeholder": "mm/aaaa"});
                $("[data-mask]").inputmask();

     });
    document.addEventListener("backbutton", function(e){
    	
    
           if($.mobile.activePage.is('#inicio')||$.mobile.activePage.is('#land')){
              
           }
           else {
               navigator.app.backHistory()
          }
         }, false);
    $("#logForm").submit(function(e){
    	e.preventDefault();
    	html = $(this).jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: "Verificando",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
    	$("#logac").prop("disabled",true);
	    login();
   });
   
    $(".imch").click(function(){
       $(this).next().click();
    });
    $(".pic").change(function(){
        readURL(this);
    });
    
   $("#regFormP").submit(function(e){
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
	        	var exd = $("#expdate").val().split("/");
        var month =  exd[0];
        var year =  exd[1];
        $("#month").val(month);
        $("#year").val(year);       
 	         checkC();
            }
         });
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
 	         register("#regForm");
            }
         });
   });
   $("#accForm").submit(function(e){
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
 	         updateD();
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
   
   
	
 $(".mats").click(function(e){
 	e.preventDefault();
 	$(".prodscon").empty();
 	var mat = $(this).data("material");
 	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: {mat:mat},
	success: function(data){
		$("#category").val(mat);
		$("#catname").text(mat);
		
		var jsonObj = jQuery.parseJSON(data);
		var pdi = jsonObj[0].split("+");
		var name = jsonObj[1].split("+");
		var price = jsonObj[2].split("+");
		var esps = jsonObj[3].split("+");
		var color = jsonObj[4].split("+");
		var images = jsonObj[5].split("+");
		
		var b = "a"
		if(pdi[0]!=""){
		for(var i =0; i<pdi.length;i=i+2){
			var temp = images[i].split(",");
			
			if(images[i+1]!=undefined){
				var temp2 = images[i+1].split(",");
			$(".prodscon").append('<div class="ui-grid-a"><div class="ui-block-a sprods "><a class="items" data-pid="'+pdi[i]+'" >'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp[0]+'" />'+
    	      '</div>'+
    	      '<p>'+name[i]+'</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      '<div class="ui-block-b sprods "><a class="items" data-pid="'+pdi[i+1]+'">'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp2[0]+'" />'+
    	      '</div>'+
    	      '<p>'+name[i]+'</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      '</div><br/>');
    	     }else{
    	     	
			$(".prodscon").append('<div class="ui-grid-a"><div class="ui-block-a sprods "><a class="items" data-pid="'+pdi[i]+'" >'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp[0]+'" />'+
    	      '</div>'+
    	      '<p>'+name[i]+'</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      
    	      '</div>');
    	     }
	      
	   }
	 }else{
	 	$(".prodscon").append("<h1>No hay productos en esta categoría</h1>");
	 }
	   $.mobile.navigate( "#prod", {transition:"flip" });
    }
    
  });
 });
 var datosp= Array();
 $("#edit").click(function(){
 	if($(this).hasClass("ui-icon-edit")){
 	$(this).removeClass("ui-icon-edit");
 	$(this).addClass("ui-icon-delete");
 	$('#accForm input[type=text],#accForm textarea').css("background-color","#fff");
 	$('#accForm input,#accForm textarea').prop('readonly', false);
 	$("#saveD").css("visibility","visible");
 	}else{
 	$(this).addClass("ui-icon-edit");
 	$(this).removeClass("ui-icon-delete");
 	$('#accForm input,#accForm textarea').css("background-color","transparent");
 	$('#accForm input,#accForm textarea').prop('readonly', true);
 	$("#nombrea").val(datosp[1]);
		$("#compa").val(datosp[2]);
		$("#addressa").val(datosp[3]);
		$("#statea").val(datosp[4]);
		$("#citya").val(datosp[5]);
		$("#paisa").val(datosp[6]);
		$("#telefonoa").val(datosp[8]);
		$("#cellpa").val(datosp[9]);
		$("#joba").val(datosp[10]);
		$("#saveD").css("visibility","hidden");
 	}
 	
 	
 });
 
 $(".account").click(function(){
 	var idu = localStorage.getItem("user");
 	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: {idu:idu},
	success: function(data){
		console.log(data);
		var obj = jQuery.parseJSON(data);
		datosp =obj;
		$("#nombrea").val(obj[1]);
		$("#compa").val(obj[2]);
		$("#addressa").val(obj[3]);
		$("#statea").val(obj[4]);
		$("#citya").val(obj[5]);
		$("#paisa").val(obj[6]);
		$("#telefonoa").val(obj[8]);
		$("#cellpa").val(obj[9]);
		$("#joba").val(obj[10]);
	}
	});
 });
 $("#filterF").submit(function(e){
 	e.preventDefault();
 	
 	 html = $(this).jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: "Cargando",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
 	 var form = new FormData($("#filterF")[0]);
    $.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		console.log(data);
		if(data.toString()!=""){
		$(".prodscon").empty();
		var jsonObj = jQuery.parseJSON(data);
		var pdi = jsonObj[0].split("+");
		var name = jsonObj[1].split("+");
		var price = jsonObj[2].split("+");
		var esps = jsonObj[3].split("+");
		var color = jsonObj[4].split("+");
		var images = jsonObj[5].split("+");
		
		var b = "a"
		if(pdi[0]!=""){
		for(var i =0; i<pdi.length;i=i+2){
			var temp = images[i].split(",");
			
			if(images[i+1]!=undefined){
				var temp2 = images[i+1].split(",");
			$(".prodscon").append('<div class="ui-grid-a"><div class="ui-block-a sprods "><a class="items" data-pid="'+pdi[i]+'" >'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp[0]+'" />'+
    	      '</div>'+
    	      '<p>'+name[i]+'</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      '<div class="ui-block-b sprods "><a class="items" data-pid="'+pdi[i+1]+'">'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp2[0]+'" />'+
    	      '</div>'+
    	      '<p>'+name[i]+'</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      '</div><br/>');
    	     }else{
    	     	
			$(".prodscon").append('<div class="ui-grid-a"><div class="ui-block-a sprods "><a class="items" data-pid="'+pdi[i]+'" >'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp[0]+'" />'+
    	      '</div>'+
    	      '<p>'+name[i]+'</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      
    	      '</div>');
    	     }
	      
	   }
	 }else{
	 	$(".prodscon").append("<h1>No hay productos en esta categoría</h1>");
	 }
	  $.mobile.loading( "hide" );
	   //$.mobile.navigate( "#prod", {transition:"flip" });
	  }else{
	  	$.mobile.loading( "hide" );
	  	
	  }
    }
  });
 });

$(".close").click(function(){
   	       localStorage.clear();
   	       $.mobile.navigate( "#inicio", {transition:"pop", info: "info about the #foo hash" });
   });
   $(".buym").click(function(){
   	if($(this).attr("href")!="#register"){
   		var typem=$(this).data("typem");
   		if($("#tm").length){
   			$("#tm").val(typem);
   			console.log($("#tm").val());
   		}else{
   			$("#regFormP").append("<input type='hidden' id='tm' name='member' value='"+typem+"' />")
   		}
   		
   		
   	}
   });
$(".usern").text(localStorage.getItem("user"));
$(".prodscon").on('click', 'div > div > .items', function(e){ 
	
	var pid = $(this).data("pid");
 	$(".swiper-wrapper").empty();
 	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: {pid:pid},
	success: function(data){
		
		var jsonObj = jQuery.parseJSON(data);
		var images = jsonObj[11].split(",");
		
		$(".backb").text(jsonObj[1]);
		$("#namep").text(jsonObj[1]);
		$("#orip").text(jsonObj[2]);
		$("#presp").text(jsonObj[3]);
		$("#empaqp").text(jsonObj[4]);
		$("#unitp").text(jsonObj[5]);
		$("#recp").text(jsonObj[6]);
		$("#pricep").text("$"+jsonObj[7]);
		$("#cantp").text(jsonObj[8]+" Disponibles");
		$("#descr").text(jsonObj[9]);
		$("#colorp").text(jsonObj[10]);
		$("#conc").text(jsonObj[12]);
		$("#namec").text(jsonObj[13]);
		$("#dirc").text(jsonObj[14]);
		$("#cityc").text(jsonObj[15]);
		$("#statec").text(jsonObj[16]);
		$("#counc").text(jsonObj[17]);
		$("#mailc").text(jsonObj[18]);
		$("#phonec").text(jsonObj[19]);
		$(".swiper-wrapper").append('<div id="image1" class="swiper-slide"><img  src="http://icone-solutions.com/mgreen/products/img/'+images[0]+'" /></div>');
		$(".swiper-wrapper").append('<div id="image1" class="swiper-slide"><img  src="http://icone-solutions.com/mgreen/products/img/'+images[1]+'" /></div>');
		$.mobile.navigate( "#item", {transition:"slide" });
	}
	});
 });
 $("#color, #origin").change(function(){
 	var el = this;
 	if($(this).val()=="Otro"){
 	swal({
    title: "Color",
    text: "Escribe el color de tu producto",
    showCancelButton: true,
    type: "input",
    inputType: "text",
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
     closeOnConfirm: false,
    inputPlaceholder: "color...",
    },
   function(value){
     if (value==="") {
       	swal.showInputError("Introduce el nombre del color");
     }else{
     	$(el).append("<option value='"+value+"'>"+value+"</option>");
     	$(el).val(value).attr('selected', true);
     	$(el).selectmenu('refresh', true);
     	swal.close();
     }
     });
    }
 });
 
});


$(document).on('pageshow', '#item', function(){ 
    if($('.swiper-pagination .swiper-pagination-progressbar').length == 0) {
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
    }
});