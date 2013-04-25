// write your javascript in here

var parseForm = function(data){
	
	
};

function get(id) {
		var theElement = document.getElementById(id);
		return theElement;
		}

$("#home").on("pageinit", function(){
	
	
	 var rbform = $("#addForm"),
	 	errorsLink = $("#errorslink")
	 	homeLink   = $("#homeLink")
	 ;
	 
	 rbform.validate({
		 invalidHandler: function(form, validator){
			 var html = '';
			 errorsLink.click();
			 
			 for(var key in validator.submitted){
			 console.log(this);
				var label = $("label[for^='" + key +"']").not("[generated]");
				 var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				 //this code checks for legends (used for radios and checkboxes) and then checks for labels (used for text field inputs)
				 var fieldName = legend.length ? legend.text() : label.text();
				 html += '<li>' + fieldName + '</li>';
			 };
			 $("#errorspopup ul").html(html);
		 },
		 submitHandler: function(){
			 var data = rbform.serializeArray();
			 storeData(data);
			 alert("Party Member Saved! Reloading the page for you :)");
			 autofillData();
			
		 }
	 });
	
});




var autofillData = function (){
	 $("#reset").click();
};

var storeData = function(data){
	var id = Math.floor(Math.random()*100065);
	
	
	var character      = {};
	
	character.name        = get("name").value;
	character.gender      = data[1].value;
	character.age         = get("age").value;
	character.nationality = get("nationality").value;
	character.role        = get("class").value;
	character.level       = get("level").value;
	character.bio         = get("bio").value;
	
	console.log(character);
	localStorage.setItem(id, JSON.stringify(character));
};

var getData = function(){
	
	
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

var rbform;
