import { useState } from 'react'
import { SITE_AUTHOR, submitContactRequest } from '../config/Constants'
import '../styles/Contact.css'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ContactPage = () => {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = submitContactRequest(formData)
    setStatus(result)

    if (result.ok) {
      setFormData(initialForm)
    }
  }

  return (
    <main className="blog-page contact-page">
      <section className="contact-hero editorial-panel">
        <p className="editorial-label">Contact BlogSpace</p>
        <h1>
          LET&apos;S
          <br />
          TALK.
        </h1>
        <p className="contact-lead">
          Have a question, suggestion, or message? Send it through the form below.
        </p>
      </section>

      <section className="contact-layout">
        <article className="contact-info editorial-panel editorial-panel-cream">
          <span className="editorial-number">01</span>
          <p className="editorial-label">Contact details</p>
          <h2>Use this space for feedback, questions, and blog ideas.</h2>
          <p>{SITE_AUTHOR.email}</p>
          <p>{SITE_AUTHOR.section}</p>
        </article>

        <form className="contact-form editorial-panel editorial-panel-ink" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="editorial-field">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </label>

            <label className="editorial-field">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="editorial-field">
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
            />
          </label>

          <label className="editorial-field">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
            />
          </label>

          <button type="submit" className="form-button">
            Send Message
          </button>

          {status ? (
            <div className={`form-response ${status.ok ? 'success' : 'error'}`}>
              <strong>{status.ok ? 'Message ready' : 'Please check the form'}</strong>
              <p>{status.message}</p>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default ContactPage
