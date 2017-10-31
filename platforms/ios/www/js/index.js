/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	if(localStorage.getItem("user")!=null){
   
  var usname= localStorage.getItem("user");
       $.ajax({
	url: "http://www.icone-solutions.com/mgreen/sqlOP.php",
	type: "POST",
	data: {usname:usname},
	success: function(data){
		
		if(data.toString()=="libre"){
			$("#filterF").remove();
		}else if(data.toString()=="premium"){
			
		}else{
			$("#filters").empty();
			$("#filters").append('<option>Buscar por</option><optgroup  label="Origen">'+
            '<option value="Post Industrial">Post Industrial</option>'+
     	    '<option value="Post Consumo">Post Consumo</option>'+
     	    '<option value="Otro">Otro</option>'+
       ' </optgroup>'+
        '<optgroup label="Presentación">'+
            '<option value="Pieza">Pieza</option>'+
     	    '<option value="Purga">Purga</option>'+
     	    '<option value="Barredura">Barredura</option>'+
     	    '<option value="Molido">Molido</option>'+
     	    '<option value="Pelet">Pelet</option>'+
       ' </optgroup>');
		}
    }
    });
}
    }
    // Update DOM on a Received Event
    
};
