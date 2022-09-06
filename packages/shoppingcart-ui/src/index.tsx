import React, { FC } from 'react'
import * as ReactDOM from 'react-dom'
import './app.scss'

interface Props { 
	message?: string
}

const  App : FC<Props> = props => {
	return (
		<div className='container'>
			<div className='align-center'>
				<img className='cart-icon' src='/imgs/cart-icon.png' />
				<p className='header text-center'>{props.message}</p>
			</div>
		</div>
	)
}

ReactDOM.render(<App message='Welcome to Shopping Cart' />, document.getElementById('root'))
