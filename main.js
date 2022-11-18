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
const customPlaylists = document.getElementById("custom-playlists")
const tracks = document.getElementById("tracks")
let playlistNameValue = document.getElementById("playlist-name-bar")

//clears the page for every search / playlist render
const pageClearer = () => {
	if (iterator !== 0) {
		while (resultDiv.firstChild) {
			resultDiv.removeChild(resultDiv.firstChild)
			if (iterator > 0) {
				iterator -= 1
			}
		}
	}
}

//GET request to render playlists
const playlistGet = async (playlistName) => {
	let req = await fetch(`http://localhost:3000/${playlistName}`)
	let res = await req.json()
	playlistRender(res)
}

//Playlist button assignments
const alternativeButton = document.getElementById("alternative")
alternativeButton.addEventListener("click", () => {
	pageClearer()
	playlistGet("alternative")
})

const rockButton = document.getElementById("rock")
rockButton.addEventListener("click", () => {
	pageClearer()
	playlistGet("rock")
})

const jazzButton = document.getElementById("jazz")
jazzButton.addEventListener("click", () => {
	pageClearer()
	playlistGet("jazz")
})
const classicalButton = document.getElementById("classical")
classicalButton.addEventListener("click", () => {
	pageClearer()
	playlistGet("classical")
})

//POST request to populate playlists
//takes name of the playlist and the data as an object to POST
const playlistPost = async (playlistName, track) => {
	await fetch(`http://localhost:3000/${playlistName}`, {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(track)
	})
}

//takes the dom element to append the track entry to, the name of the playlist, 
//and the data to add to the database
const playlistAdd = (domElement, playlistName, track) => {
	const button = document.createElement("button")
	button.className = "add-button"
	button.innerHTML = `<b>+</b> ${playlistName}`
	button.addEventListener("click", () => {
		playlistPost(playlistName, track)
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
		playlistAdd(trackCard, "Classical", trackData)
		playlistAdd(trackCard, "Rock", trackData)
		playlistAdd(trackCard, "Jazz", trackData)
		playlistAdd(trackCard, "Alternative", trackData)
		
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
//Create new playlist
const createPlaylistButton = () => {
	const createButton = document.getElementById("create-button")
	createButton.addEventListener("click", () => {
		let button = document.createElement("button")
		button.className = "playlist-button"
		button.innerText = `${playlistNameValue.value}`
		customPlaylists.append(button)
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
// const createPlaylist = async (namedPlaylist) => {
// 	await fetch("http://localhost:3000/playlists", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type":"application/json"
// 		},
// 		body: JSON.stringify(namedPlaylist)
// 	})
// }

//global function calls
createPlaylistButton()
runSearch()