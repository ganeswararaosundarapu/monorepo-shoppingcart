import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='align-center'>
                    <img className='cart-icon' src='/imgs/cart-icon.png' />
                    <p className='header text-center'> Welcome to Shopping Cart</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
