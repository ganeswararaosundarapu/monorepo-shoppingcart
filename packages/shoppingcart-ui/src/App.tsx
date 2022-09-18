import React, { FC } from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl'

const App: FC = props => {
  return (
    <div className="main">
      <div className="fixed-header">
          <div className="container">
              <nav>
                  <a href="#"> <FormattedMessage id="home" defaultMessage="Home" /></a>
                  <a href="#"> <FormattedMessage id="products" defaultMessage="Products" /></a>
              </nav>
          </div>
      </div>
      <div className="container">
      <p className='header text-center align-center'>
        <img className='cart-icon' src='/imgs/cart-icon.png' />
        <FormattedMessage id="welcomeMessage" defaultMessage="Welcome to the shopping cart" />
      </p>
      </div>
      <div className="fixed-footer">
        <div className="container">
          <div className='align-center'>
            <FormattedMessage id="dateMessage" defaultMessage="Current Date is " />
            <FormattedDate
              value={new Date()}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </div>
        </div>        
      </div>
    </div>
  )
}

export default App