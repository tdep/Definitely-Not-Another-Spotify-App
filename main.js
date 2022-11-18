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
alternativeButton.addEventListener("click", () => {
	//clear page results
	if (iterator !== 0) {
		while (resultDiv.firstChild) {
			resultDiv.removeChild(resultDiv.firstChild)
			if (iterator > 0) {
				iterator -= 1
			}
		}
	}
	let dbRequest = async () => {
		let req = await fetch("http://localhost:3000/alternative")
		let res = await req.json()
		playlistRender(res)
	}
	dbRequest()
})
const rockButton = document.getElementById("rock")
rockButton.addEventListener("click", () => {
	//clear page results
	if (iterator !== 0) {
		while (resultDiv.firstChild) {
			resultDiv.removeChild(resultDiv.firstChild)
			if (iterator > 0) {
				iterator -= 1
			}
		}
	}
	let dbRequest = async () => {
		let req = await fetch("http://localhost:3000/rock")
		let res = await req.json()
		playlistRender(res)
	}
	dbRequest()
})
const jazzButton = document.getElementById("jazz")
jazzButton.addEventListener("click", () => {
	//clear page results
	if (iterator !== 0) {
		while (resultDiv.firstChild) {
			resultDiv.removeChild(resultDiv.firstChild)
			if (iterator > 0) {
				iterator -= 1
			}
		}
	}
	let dbRequest = async () => {
		let req = await fetch("http://localhost:3000/jazz")
		let res = await req.json()
		playlistRender(res)
	}
	dbRequest()
})
const classicalButton = document.getElementById("classical")
classicalButton.addEventListener("click", () => {
	//clear page results
	if (iterator !== 0) {
		while (resultDiv.firstChild) {
			resultDiv.removeChild(resultDiv.firstChild)
			if (iterator > 0) {
				iterator -= 1
			}
		}
	}
	let dbRequest = async () => {
		let req = await fetch("http://localhost:3000/classical")
		let res = await req.json()
		playlistRender(res)
	}
	dbRequest()
})

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
	button.className = "add-button"
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
	button.className = "add-button"
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
	button.className = "add-button"
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
	button.className = "add-button"
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
		let imgTitleDiv = document.createElement("div")
		imgTitleDiv.id = "track-card-top"
		let trackCardImg = document.createElement("img")
		trackCardImg.src = entry.album.cover_small
		let trackTitle = document.createElement("h3")
		trackTitle.innerText = entry.title
		trackTitle.className = "track-title"
		let trackDuration = document.createElement("p")
		trackDuration.innerText = `${entry.duration} seconds`
		let albumArtist = document.createElement("div")
		albumArtist.id = "track-card-bottom"
		let trackAlbum = document.createElement("p")
		trackAlbum.innerHTML = `<em>${entry.album.title}</em>`
		trackAlbum.className = "track-album"
		let trackArtist = document.createElement("p")
		trackArtist.innerText = entry.artist.name
		trackArtist.className = "track-artist"
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

		imgTitleDiv.append(trackCardImg, trackTitle)
		albumArtist.append(trackAlbum, trackArtist, trackDuration)
		trackCard.append(imgTitleDiv, albumArtist)
		resultDiv.append(trackCard)
		iterator += 1

	})
}
//render each element from the playlist buttons
const playlistRender = (data) => {
	data.forEach((entry) => {
		let trackCard = document.createElement("div")
		trackCard.id = entry.id
		trackCard.className = "track-card"
		let imgTitleDiv = document.createElement("div")
		imgTitleDiv.id = "track-card-top"
		let trackCardImg = document.createElement("img")
		trackCardImg.src = entry.img
		let trackTitle = document.createElement("h3")
		trackTitle.innerText = entry.title
		trackTitle.className = "track-title"
		let trackDuration = document.createElement("p")
		trackDuration.innerText = `${entry.duration}`
		let albumArtist = document.createElement("div")
		albumArtist.id = "track-card-bottom"
		let trackAlbum = document.createElement("p")
		trackAlbum.innerHTML = `<em>${entry.album}</em>`
		trackAlbum.className = "track-album"
		let trackArtist = document.createElement("p")
		trackArtist.innerText = entry.artist
		trackArtist.className = "track-artist"
		imgTitleDiv.append(trackCardImg, trackTitle)
		albumArtist.append(trackAlbum, trackArtist, trackDuration)
		trackCard.append(imgTitleDiv, albumArtist)
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