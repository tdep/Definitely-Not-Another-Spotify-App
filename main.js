const client_id = clientId;
const client_secret = clientSecret;

const auth = async () => {
    let res = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            "Authorization": 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
    })
}


