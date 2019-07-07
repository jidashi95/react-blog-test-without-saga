export default {
    entities: {
        auth: window.localStorage.auth ? JSON.parse(window.localStorage.auth) : {},
        user: window.localStorage.user ? JSON.parse(window.localStorage.user) : false,
    }
}