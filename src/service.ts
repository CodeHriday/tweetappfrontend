const BASE_URL = "http://127.0.0.1:8080/api/v1.0/tweets"

export async function login(username: String, password: String) {
    const response = await fetch(BASE_URL + "/login", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ username, password })
    })
    return response;
}

export async function loadTweets() {
    const response = await fetch(BASE_URL + "/all", {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
    })

    return await response.json();
}

export async function loadTweet(id: String) {
    const response = await fetch(BASE_URL + `/tweet/${id}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
    })

    return await response.json();
}

export async function createTweet(tweet: String, tweetTag: [String]) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/add`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
            tweet,
            tweetTag,
        })
    })
}


export async function replyTweet(id: String, tweet: String, tweetTag: [String]) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/reply/${id}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
            tweet,
            tweetTag,
        })
    })
}


export async function getAllUsers() {
    const response = await fetch(BASE_URL + `/users/all`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
    return await response.json();
}

export async function searchUser(key: String) {
    const response = await fetch(BASE_URL + `/user/search/${key}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
    return await response.json();
}

export async function getAllTweetsOfUser(id: String) {
    const response = await fetch(BASE_URL + `/${id}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
    return await response.json();
}

export async function isUsernameExist(key: String) {
    const response = await fetch(BASE_URL + `/username/${key}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    })
    return await response.json();
}

export async function register(user: { firstName: String, lastName: String, userName: String, email: String, password: String, resetKey: String }) {
    const response = await fetch(BASE_URL + `/register`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user)
    })
    return await response.json();
}


export async function updateTweet(id: String, tweet: String, tweetTag: [String]) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/update/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
            tweet,
            tweetTag,
        })
    })
}

export async function likeTweet(id: String) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/like/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
}

export async function deleteTweet(id: String) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
}


export async function logout() {
    const response = await fetch(BASE_URL + `/sign-out`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem("refresh-token") })
    })
}