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
const alternativeButton = document.getElementById("alternative")
const rockButton = document.getElementById("rock")
const jazzButton = document.getElementById("jazz")
const classicalButton = document.getElementById("classical")

//Create new playlist
let playlistNameValue = document.getElementById("playlist-name-bar")

const createButton = document.getElementById("create-button")
createButton.addEventListener("click", () => {
	let playlistDiv = document.createElement('div')
	playlistDiv.className = "created-playlist"
	playlistDiv.id =`${playlistNameValue.value}`
	let playlistName = document.createElement('h3')
	playlistName.innerText = `${playlistNameValue.value}`
	playlistDiv.append(playlistName)
	savedLists.append(playlistDiv)
})

//Playlist populating POST requests
const classicalAdd = (domElement, track) => {
	const button = document.createElement("button")
	button.innerHTML = "<b>+</b> Classical"
	button.addEventListener("click", () => {
		const addToDb = async () => {
			await fetch("http://localhost:3000/classical", {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(track)
			})
		}
		addToDb(track)
	})
	domElement.append(button)
} 

const alternativeAdd = (domElement, track) => {
	const button = document.createElement("button")
	button.innerHTML = "<b>+</b> Alternative"
	button.addEventListener("click", () => {
		const addToDb = async () => {
			await fetch("http://localhost:3000/alternative", {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(track)
			})
		}
		addToDb(track)
	})
	domElement.append(button)
} 

const jazzAdd = (domElement, track) => {
	const button = document.createElement("button")
	button.innerHTML = "<b>+</b> Jazz"
	button.addEventListener("click", () => {
		const addToDb = async () => {
			await fetch("http://localhost:3000/jazz", {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(track)
			})
		}
		addToDb(track)
	})
	domElement.append(button)

} 

const rockAdd = (domElement, track) => {
	const button = document.createElement("button")
	button.innerHTML = "<b>+</b> Rock"
	button.addEventListener("click", () => {
		const addToDb = async () => {
			await fetch("http://localhost:3000/rock", {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(track)
			})
		}
		addToDb(track)
	})
	domElement.append(button)
} 
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
		let trackData = {
			img: trackCardImg.src,
			title: trackTitle.innerText,
			album: trackAlbum.innerText,
			artist: trackArtist.innerText,
			duration: trackDuration.innerText
		}
		//POST request buttons
		rockAdd(trackCard, trackData)
		jazzAdd(trackCard, trackData)
		classicalAdd(trackCard, trackData)
		alternativeAdd(trackCard, trackData)

		trackCard.append(trackCardImg, trackTitle, trackAlbum, trackArtist, trackDuration)
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

//global function calls
runSearch()