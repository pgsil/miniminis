document.addEventListener('DOMContentLoaded', function(){
	ready();
	console.log("Document ready. ready() executed.")
});

let ready = function(){
	LSInitialize();
	renderItems();
	bindSubmit();
};

/*Creates and renders to-do task elements*/
let renderItems = function(){
	let object = getLobj();
	
	for (i = 0; i < object.length; i++) {
		let elem = document.createElement("div");
		let textdiv = document.createElement("div");
		let text = document.createTextNode(object[i]);
		let deletThis = document.createElement("div");
		let deletThisIcon = document.createElement("i");

		elem.className = "todo-item";
		elem.setAttribute("todo-id", i);

		textdiv.className = "todo-textdiv eleven columns";
		textdiv.setAttribute("id", "text-div-id" + i);

		deletThis.className = "delet-btn one column";
		deletThis.setAttribute("todo-id", i);

		deletThisIcon.className = "fa fa-times";
		deletThisIcon.setAttribute("aria-hidden", true);

		let index = i;

		deletThis.onclick = function(){
			removeLobj(index);
			reRenderApp();
		}

		deletThis.appendChild(deletThisIcon);
		textdiv.appendChild(text);
		elem.appendChild(deletThis);
		elem.appendChild(textdiv);		

		document.getElementById("todos").appendChild(elem);

		console.log(document.getElementById("text-div-id" + i).offsetHeight);
	};
};
/*Cleans the view and rerenders all elements*/
let reRenderApp = function(){
	document.getElementById("todos").innerHTML = "";
	renderItems();
};
/*Returns the localStorage object: array of strings when parsed*/
let getLobj = function(){
	return JSON.parse(localStorage.todostorage);
};
/*Adds an item to the localStorage object*/
let addLobj = function(data, bShouldRerender){
	let object = getLobj();
	/*If we have input in the input field: */
	if(data.length > 0){
		object.push(data);

		localStorage.setItem("todostorage", JSON.stringify(object));

		if(bShouldRerender){
			reRenderApp();
			console.log("App rerendered.");
		}
	}
};
/*Removes an item from the localStorage with a given index*/
let removeLobj = function(index){
	let object = getLobj();

	console.log(object.splice(index, 1));

	localStorage.setItem("todostorage", JSON.stringify(object));
};
/*If there is no localStorage object, we initialize it as an empty array*/
let LSInitialize = function(){
	if (localStorage.todostorage == undefined || JSON.parse(localStorage.todostorage) == "undefined"){
		let array = [];
		localStorage.setItem("todostorage", JSON.stringify(array));
	}
};
/*Binds the the text input and the add button to functions*/
let bindSubmit = function(){
	let textinput = document.getElementById("todo-add");
	let submitbtn = document.getElementById("todo-submit-btn");

	submitbtn.oninput = function(){
	}
	
	submitbtn.onclick = function(){
		addLobj(textinput.value, true);
		textinput.value = "";
	}
};