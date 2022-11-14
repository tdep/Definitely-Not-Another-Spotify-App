//Global variables
//Search bar variables
const searchBar = document.getElementById("search-bar")
const submitButton = document.getElementById("submit-button")
const searchForm = document.getElementById("search-form")
const resultDiv = document.getElementById("search-result")



//Search function
const runSearch = () => {
	searchForm.addEventListener("submit", (e) => {
		e.preventDefault()
		//GET Request from deezerdevs
		let searchItem = searchForm.search.value
		let request = async () => {
			let req = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchItem}`, {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': 'a2399ab2a1mshbaea749573e0d46p1c86e7jsn073c23c80e70',
					'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
				}
			})
			let res = await req.json()
			let entryItem = res.data
			//render each element from res.data to the DOM
			entryItem.forEach((entry) => {
				let trackCard = document.createElement("li")
				trackCard.id = entry.id
				trackCard.innerText = `Album: ${entry.album.title}; Artist: ${entry.artist.name}`
				let trackCardImg = document.createElement("img")
				trackCardImg.src = entry.album.cover_small
				resultDiv.append(trackCard, trackCardImg)
			})
		}
		request()
	})
}

//function calls
runSearch()


