//Global variables
//Search bar variables
const searchBar = document.getElementById("search-bar")
const submitButton = document.getElementById("submit-button")
const searchForm = document.getElementById("search-form")
//result list variables
const resultDiv = document.getElementById("search-result")
const trackCardContents = {
	trackCardImg:"",
	trackTitle:"",
	trackAlbum:"",
	trackArtist:"",
	trackDuration:""
}




//Search function
const runSearch = () => {
	let iterator = 0
	searchForm.addEventListener("submit", (e) => {
		e.preventDefault()
		//clear page results
		if (iterator !== 0) {
			while (resultDiv.firstChild) {
				resultDiv.removeChild(resultDiv.firstChild)
				if (iterator > 0) {
					iterator -= 1
				}
			}
		}
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
			//delete elements on page
			//populate the DOM
			entryItem.forEach((entry) => {
				let trackCard = document.createElement("div")
				trackCard.id = entry.id
				trackCard.className = "track-card"
				let trackCardImg = document.createElement("img")
				trackCardImg.src = entry.album.cover_small
				let trackTitle = document.createElement("h2")
				trackTitle.innerText = entry.title
				trackTitle.className = "track-title"
				let trackAlbum = document.createElement("p")
				trackAlbum.innerHTML = `<em>${entry.album.title}</em>`
				trackAlbum.className = "track-album"
				let trackArtist = document.createElement("p")
				trackArtist.innerText = entry.artist.name
				trackArtist.className = "track-artist"
				let trackDuration = document.createElement("p")
				trackDuration.innerText = `${entry.duration} seconds`
				trackCard.setAttribute("style", "border: 1px solid black; margin:20px auto 10px auto;")
				

				trackCard.append(trackCardImg, trackTitle, trackAlbum, trackArtist, trackDuration)
				resultDiv.append(trackCard)
				iterator += 1
			})
			console.log(iterator)
		}
		request()
	})
}

//function calls
runSearch()

