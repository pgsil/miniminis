let jayjay;

let c = crel2;

function weekBtn(){
	document.getElementById("results-div").innerHTML = "";

	getUsers("https://fcctop100.herokuapp.com/api/fccusers/top/recent");

	document.getElementById("current-list").innerHTML = "top 5 free code camp users this week";
}

function alltimeBtn(){
	document.getElementById("results-div").innerHTML = ""

	getUsers("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");

	document.getElementById("current-list").innerHTML = "top 5 free code camp users all time";
}

function getUsers(urlStr){
	fetch(urlStr)
		.then(response => response.json())
		.then(json => {
			jayjay = json;
		})
		.then(function(){
			for (var i = 0; i < 5; i++) {
				let user = jayjay[i];

				$('#results-div').append(
					c('div', ['class', 'columns'],
						c('div', ['class', 'column is-3 has-text-centered'],
							c('img', ['src', jayjay[i].img, 'class', 'img-tiny'])), 
													
						c('div', ['class', 'column has-text-centered'], jayjay[i].username,
							c('p', ['class', 'bold'], "Total score: "),
							c('div', "🏆 " + jayjay[i].alltime))
					)

				);
			}
	});
}

document.addEventListener("DOMContentLoaded", function(event) { 
	alltimeBtn();
});
