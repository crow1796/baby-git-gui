import '@/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/components/App'
import { Provider } from 'react-redux'
import store from '@/store'

var config = {
    apiKey: "AIzaSyBoXZ2sE9_KtJmOIwwpQ7c-nP0xoacrxeQ",
    authDomain: "baby-gi-514cc.firebaseapp.com",
    databaseURL: "https://baby-gi-514cc.firebaseio.com",
    projectId: "baby-gi-514cc",
    storageBucket: "",
    messagingSenderId: "504164360105"
}
firebase.initializeApp(config)

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))