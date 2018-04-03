import React from 'react'
import '@/scss/main.scss'
import BabyGit from '@/containers/BabyGit'

export default class App extends React.Component {
	render(){
		return (
			<div id="app">
				<BabyGit/>
			</div>
		)
	}
}