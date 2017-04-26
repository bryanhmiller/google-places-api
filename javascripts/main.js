$(document).ready(function(){

	const apiKey = "";

	$("body").on("click", "li", (e) => {
	// console.log(e.target.innerHTML);
		loadPlaces(e.target.innerHTML).then((results) => {
			writePlaceToDOM(results);
		}).catch((error) => {
			console.log(error);
		});
	});

	$("body").on("click", ".place", (e) => {
		let place_id = e.target.id;
		loadDetail(place_id).then((result) =>{
			writeAddressToDOM(result.formatted_address);
		});
	});

	const loadDetail = (place_id) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
			.done((data) => resolve(data.result))
			.fail((error) => reject(error));
		});
	};

	const loadPlaces = (dropdownType) => {
		return new Promise ((resolve, reject) => { 
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}`)
			.done((data) => resolve(data.results))
			.fail((error) => reject(error));
		});
	};

	const writeAddressToDOM = (address) => {
		let outputString = `<div>${address}</div>`;
		$("#addresses").append(outputString);
	};

	const writePlaceToDOM = (results) => {
		let outputString = "";
		for (let i = 0; i < results.length; i++) {
			outputString += `<a href="#"><div class="place" id="${results[i].place_id}">${results[i].name}</div></a>`;
		}
		$("#input").append(outputString);
	};
});
