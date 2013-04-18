/*
Name:  Matthew Lewis
Visual Frameworks Assignment 4
Term: 1303
*/

window.addEventListener("DOMContentLoaded", function(){

	//creating the "getElementbyId function as outlined in the tutorial vides to keep my sanity and keep my code clean
	
		function get(id) {
		var theElement = document.getElementById(id);
		return theElement;
		}
	
		
		function createSelect(){
			var retrieveTags = document.getElementsByTagName("form");
			//console.log(retrieveTags);
				var retrieveSelect   = get("origin");
				createSelect = document.createElement('select');
				createSelect.setAttribute("id", "nationality");
			for(var i=0, n=nationalities.length; i<n; i++) {
				var createChoice = document.createElement('option');
				var choiceId = nationalities[i];
				createChoice.setAttribute("value", choiceId);
				createChoice.innerHTML = choiceId;
				createSelect.appendChild(createChoice);
			}
			retrieveSelect.appendChild(createSelect);
		}
		
		
		function getRadio(){
			var temp = document.forms[0].gender;
			for (var i=0; i<temp.length; i++) {
				if(temp[i].checked) {
					genderValue = temp[i].value;
				}
			}
		}
	
		function toggleScreen(n){
			switch(n){
				case "on":
					get("charInput").style.display = "none";
					get("viewParty").style.display = "none";
					get("clearParty").style.display = "inline";
					get("goBack").style.display = "inline";
					get("submitBtn").style.display = "none";
					break;
				case "off":
					get("charInput").style.display = "block";
					get("clearParty").style.display = "inline";
					get("viewParty").style.display = "inline";
					get("goBack").style.display = "none";
					get("submitBtn").style.display = "inline"
					get('items').style.display = "none";
					break;
				default:
				return false;

			}
		}
		
		function deleteParty(){
			var promptUser = confirm("Are you sure you want to delete this party member?");
			if(promptUser){
				localStorage.removeItem(this.key);
				alert("Party member deleted!");
				window.location.reload();
			}else{
				alert("Party Member saved.");
			}
		}
		
		
		function clearData(){
			if(localStorage.length === 0) {
				alert("You have not created any characters yet.")
			} else {
			localStorage.clear();
			alert("All party members have been deleted!");
			window.location.reload();
			return false;
			}
		}
		
		function addData(key){
			if(!key){
				var id = Math.floor(Math.random()*100065);
			}else{
				id = key;
			}
			getRadio();
			var member            = {};
				member.name       =["Name: ",    get("memberName").value];
				member.gender     =["Gender: ",  genderValue];
				member.age        =["Age: ",     get("age").value];
				member.origin     =["From: ",    get("nationality").value];
				member.role       =["Class: ",   get("class").value];
				member.level      =["Level: ",   get("memberLevel").value];
				member.bio        =["Bio: ",     get("charBio").value];
				
				
				
				localStorage.setItem(id, JSON.stringify(member));
				alert("Party Member Saved!");
				window.location.reload();
				
		}
		
		function showData(){
			
			if (localStorage.length === 0) {
				alert("There were no characters created yet, so default characters were created!");
				autoCreateChars();
			}else{
				toggleScreen("on");
				var createDiv = document.createElement('div');
				createDiv.setAttribute("id", "items");
				var colorDiv = get("items");
				//createDiv.appendChild(createList);
				document.body.appendChild(createDiv);
				for (var i=0, len=localStorage.length; i<len; i++) {
					var createLi = document.createElement('li');
					var createField = document.createElement('fieldset');
					var createList = document.createElement('ul');
					createDiv.appendChild(createField);
					createField.appendChild(createList);
					var createLinks = document.createElement('li');
					createList.appendChild(createLi);
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
					var obj = JSON.parse(value);
					var createSubList = document.createElement('ul');
					createLi.appendChild(createSubList);
					createImage(obj.origin[1], createSubList);
					for(var n in obj) {
						var createSubLi = document.createElement('li');
						createSubList.appendChild(createSubLi);
						var optSubText = obj[n][0]+" "+obj[n][1];
						createSubLi.innerHTML = optSubText; 
						createSubList.appendChild(createLinks);
					}
					createItemLinks(localStorage.key(i), createLinks);
				}
			}
		}
		//retrieves image for correct character's nationality from the img folder
		function createImage(nationalityName, createSubList){
			var imageTag = document.createElement('li');
			createSubList.appendChild(imageTag);
			var image = document.createElement('img');
			var setImageSrc = image.setAttribute("src", "img/"+ nationalityName + ".png");
			imageTag.appendChild(image);
		}
		
		function autoCreateChars(){
			//fills in local storage with json "characters" in the event LS is empty.  This is for testing puposes.
			for(var n in json){
				var id = Math.floor(Math.random()*100065);
				localStorage.setItem(id, JSON.stringify(json[n]));
			}
		}
		
		function createItemLinks(key, createLinks){
			var edit = document.createElement('a');
			edit.href = "#";
			edit.key = key;
			var txt = "Edit Member ";
			edit.innerHTML = txt;
			edit.addEventListener('click', editParty);
			createLinks.appendChild(edit);
			edit.style.display="block";
			
			var del = document.createElement('a');
			del.href = '#';
			del.key = key;
			var delTxt = " Delete Member";
			del.innerHTML = delTxt;
			del.addEventListener('click', deleteParty);
			createLinks.appendChild(del);
		}
		
		function editParty() {
			var getKey = localStorage.getItem(this.key);
			var member = JSON.parse(getKey);
			toggleScreen("off");
			get("viewParty").style.display = "none";
			
			get("memberName").value = member.name[1];
			get('age').value = member.age[1];
			get('nationality').value = member.origin[1];
			get('class').value = member.role[1];
			get('memberLevel').value = member.level[1];
			get('charBio').value = member.bio[1];
			var rdioVal = document.forms[0].gender;
			for(var i=0; i<rdioVal.length; i++) {
				if (rdioVal[i].value === "Female" && member.gender[1] === 'Female'){
					rdioVal[i].setAttribute("checked", "checked");
				} else if (rdioVal[i].value === "Male" && member.gender[1] === 'Male'){
					rdioVal[i].setAttribute("checked", "checked");	
				}
			}		
			//removing event listener originally attached to store data (don't want to restore a whole new entry when editing)
			addParty.removeEventListener('click', addData);
			get('submitBtn').value = "Edit Member";
			var submitEdited = get('submitBtn');
			submitEdited.addEventListener('click', validateData);
			submitEdited.key = this.key;
		}
		
		function validateData(eventData){
		//validate input data that is required!
			getRadio();
			var getName    = get("memberName");
			var getGender  = get("charGender");
			var getOrigin  = get("nationality");
			var getLevel   = get("memberLevel");
			var errorText  = get("genderLabel");
			var radio      = get("test1");
			var radio2     = get("test2");
			
			//reset errors
			errors.innerHTML = "";
			getName.style.border = "1px solid black";
			getOrigin.style.border = "1px solid black";
			getLevel.style.border = "1px solid black";
			radio.style.border ="1px solid black";
			radio2.style.border ="1px solid black";
			errorText.style.color = "white";
			errorText.style.fontWeight = "normal";
			
			//Error Messages
			var errorMsgs = [];
			//name validation
			if (getName.value == "Name"){
				var nameError = "Please choose a character name.";
				getName.style.border = "1px solid red";
				errorMsgs.push(nameError);
			}
			//gender validation
			if (genderValue != "Male" && genderValue != "Female"){
				var genderError = "Please choose a gender for your character.";
				radio.style.border ="1px solid red";
				radio2.style.border ="1px solid red";	
				errorText.style.color = "red";
				errorText.style.fontWeight = "bold";

			
				errorMsgs.push(genderError);
			}
			
			
			//nationality validation
			if (getOrigin.value === "--Where does your character hail from?--"){
				var originError = "Please choose a nationality for your character.";
				getOrigin.style.border = "1px solid red";
				errorMsgs.push(originError);
			}
			//character level validation
			var levelExp = /^\d{1,2}$/;
			if (!(levelExp.exec(getLevel.value)) || getLevel.value > 10){
				var levelError = "Please enter a valid starting level (1-10) for your character.";							
				getLevel.style.border = "1px solid red";
				errorMsgs.push(levelError);
			}
			
			if(errorMsgs.length >= 1){
				for(var i=0, j=errorMsgs.length; i < j; i++){
					var errorTxt = document.createElement('li');
					errorTxt.setAttribute("class", "errors");
					errorTxt.innerHTML = errorMsgs[i];
					errorTxt.style.color = "#FDA029";
					errors.appendChild(errorTxt);
					
				}
			eventData.preventDefault();
			return false;
			}else{
				addData(this.key);
			}
		}
		
		
	//Variable defaults
	var genderValue; 
	var errors = get('errorMsgs');
	var nationalities = ["--Where does your character hail from?--", "Durkshire", "Black-Mountains", "Jergain-Highlands", "Oc'tyre-Desert"];
	createSelect();



	//Set Link & Submit Click Events
	var showParty = get("viewParty");
	showParty.addEventListener('click', showData);
	var clearParty = get("clearParty");
	clearParty.addEventListener('click', clearData);
	var addParty = get("submitBtn");
	addParty.addEventListener('click', validateData);
});