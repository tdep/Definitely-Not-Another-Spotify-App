//Global variables
//Search bar variables
const searchBar = document.getElementById("search-bar")
const submitButton = document.getElementById("submit-button")
const searchForm = document.getElementById("search-form")
//result list variables
const resultDiv = document.getElementById("search-result")
//POST Request template
const playlistContents = {
	img:"",
	title:"",
	album:"",
	artist:"",
	duration:""
}
//playlist-list variables
const savedLists = document.getElementById("saved-lists")
const tracks = document.getElementById("tracks")
// let listDiv = document.createElement("div")
// listDiv.classname = "playlist-name"
// listDiv.innerText = "My Awesome Playlist"
let listButton = document.createElement("button")
listButton.innerText = "My Awesome Playlist"
listButton.setAttribute("style", "border: 1px solid black; margin:20px auto 20px auto;")
savedLists.append(listButton)
listButton.addEventListener("click", () => {
	//saved-lists dom populator
	 async () => {
		let req = await fetch("http://localhost:3000/playlists")
		let res = await req.json()
		res.forEach((element) => {
			let li = document.createElement("li")
			li.innerText = element.title
			console.log(li)
			tracks.append(li)
		})
	}

})


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
				let addButton = document.createElement("button")
				addButton.className = "add-button"
				addButton.innerHTML = "<b>+</b>"

				
				//POST request
				addButton.addEventListener("click",() => {
					playlistContents.img = trackCardImg.src
					playlistContents.title = trackTitle.innerText
					playlistContents.album = trackAlbum.innerText
					playlistContents.artist = trackArtist.innerText
					playlistContents.duration = trackDuration.innerText
					let dropdown = document.createElement("div")
					dropdown.className = "dropdown"
					const playLister = async () => {
						const req = await fetch("http://localhost:3000/playlists", {
							method: "POST",
							headers: {
								"Content-Type":"application/json"
							},
							body: JSON.stringify(playlistContents)
						})
					}
					playLister()
				})
				
				trackCard.append(trackCardImg, trackTitle, trackAlbum, trackArtist, trackDuration, addButton)
				resultDiv.append(trackCard)
				iterator += 1
			})
			// console.log(iterator)
		}
		request()
	})
}

//function calls
runSearch()

