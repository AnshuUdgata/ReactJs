import React from 'react'
import './App.css'

const App = () => {
  return (
    <div className="parent">
      <div className="card">
        <div className="card__badge">New</div>

        <div className="card__image">
          <div className="card__image-inner">👟</div>
        </div>

        <div className="card__content">
          <div className="card__top">
            <div>
              <p className="card__category">Running Shoes</p>
              <h2>Nova Sprint X</h2>
            </div>
            <button className="card__save">♡</button>
          </div>

          <p className="card__desc">
            Lightweight comfort with responsive cushioning for your daily run.
          </p>

          <div className="card__meta">
            <div>
              <span className="card__label">Rating</span>
              <div className="card__stars">★ 4.8</div>
            </div>
            <div>
              <span className="card__label">Price</span>
              <div className="card__price">$89</div>
            </div>
          </div>

          <div className="card__colors" aria-label="Available colors">
            <span className="color color--blue"></span>
            <span className="color color--pink"></span>
            <span className="color color--black"></span>
          </div>

          <button className="card__button">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default App