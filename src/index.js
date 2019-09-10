import '@/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/components/App'
import { Provider } from 'react-redux'
import store from '@/store'

var config = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DB_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MSG_SENDER_ID
}
firebase.initializeApp(config)

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))