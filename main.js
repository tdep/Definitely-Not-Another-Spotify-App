//Global variables
//Search bar variables
const searchBar = document.getElementById("search-bar")
const submitButton = document.getElementById("submit-button")
const searchForm = document.getElementById("search-form")

//result list variables
const resultDiv = document.getElementById("search-result")
let iterator = 0

//playlist-list variables
const savedLists = document.getElementById("saved-lists")
const tracks = document.getElementById("tracks")

//Create new playlist
let playlistNameValue = document.getElementById("playlist-name-bar")
let playlistName = document.createElement('h3')
const createButton = document.getElementById("create-button")
createButton.addEventListener("click", () => {
	let playlistDiv = document.createElement('div')
	playlistDiv.className = "created-playlist"
	playlistDiv.id =`${playlistNameValue.value}`
	playlistName.innerText=`${playlistNameValue.value}`
	playlistDiv.append(playlistName)
	savedLists.append(playlistDiv)
	let playlistNameDB = playlistNameValue.value
	console.log(playlistNameDB)
	//(playlistNameDB)
})

//render each element from runSearch to the DOM
const searchRender = (data) => {
	data.forEach((entry) => {
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
		let button = document.createElement("button")
		button.className = "add-button"
		button.innerHTML = "<b>+</b>"
		button.addEventListener("click",() => {
			//populating playlistContents template when button clicked
				let trackData = {
					img: trackCardImg.src,
					title: trackTitle.innerText,
					album: trackAlbum.innerText,
					artist: trackArtist.innerText,
					duration: trackDuration.innerText
				}
				//****POST REQUEST FUNCTION*****
				playLister(trackData)
		})
		//render everything to the trackCard & resultDiv
		trackCard.append(trackCardImg, trackTitle, trackAlbum, trackArtist, trackDuration, button)
		resultDiv.append(trackCard)
		iterator += 1

	})
}

//Search bar function
const runSearch = () => {
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
			searchRender(res.data)
		}
		request()
	})
}
//POST request to make playlists
const createPlaylist = async (namedPlaylist) => {
	await fetch("http://localhost:3000/playlists", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(namedPlaylist)
	})
}

//POST request to populate playlists
const playLister = async (trackInfo) => {
	await fetch("http://localhost:3000/playlists", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(trackInfo)
	})
}
				
//function calls
runSearch()