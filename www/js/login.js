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
   
   
	
 $(".mats").click(function(e){
 	e.preventDefault();
 	$(".prodscon").empty();
 	var mat = $(this).data("material");
 	$.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: {mat:mat},
	success: function(data){
		console.log(data);
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
    	      '<p>Nombre material</p>'+
    	      '<p>Nombre Compañia</p>'+
    	      '<p>País</p>'+
    	      '</div>'+
    	      '</a></div>'+
    	      '<div class="ui-block-b sprods "><a class="items" data-pid="'+pdi[i+1]+'">'+
    	      '<div class="sellp">'+
    	      '<div class="imgcon">'+
    	      '<img width="100%" src="http://icone-solutions.com/mgreen/products/img/'+temp2[0]+'" />'+
    	      '</div>'+
    	      '<p>Nombre material</p>'+
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
    	      '<p>Nombre material</p>'+
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
$(".close").click(function(){
   	       localStorage.clear();
   	       $.mobile.navigate( "#inicio", {transition:"pop", info: "info about the #foo hash" });
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
		console.log(data);
		var jsonObj = jQuery.parseJSON(data);
		var images = jsonObj[11].split(",");
		console.log(jsonObj);
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