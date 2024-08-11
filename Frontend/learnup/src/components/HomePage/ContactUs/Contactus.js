import React from 'react'
import './Contact.css'
const Contactus = () => {
  return <>
  <div className='contactcontainer' id="contact-us">
      <div className="content2">
        <h1 className='contactheading'>Contact Us</h1>
        <p>We'd love to hear from you!</p>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Contactus