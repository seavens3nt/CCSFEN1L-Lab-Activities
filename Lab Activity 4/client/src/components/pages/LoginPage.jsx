import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SAMPLE_USERS, authenticateUser } from '../config/Constants'
import '../styles/Login.css'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = authenticateUser(credentials)
    setStatus(result)

    if (result.ok) {
      setCredentials({
        identifier: '',
        password: '',
      })
    }
  }

  return (
    <main className="blog-page login-page">
      <section className="login-hero editorial-panel">
        <p className="editorial-label">BlogSpace / Login</p>
        <h1>
          WELCOME
          <br />
          BACK.
        </h1>
        <p className="login-lead">Use the sample credentials to log in without a backend.</p>
      </section>

      <section className="login-layout">
        <article className="login-copy editorial-panel editorial-panel-cream">
          <span className="editorial-number">01</span>
          <p className="editorial-label">Sample access</p>
          <h2>Try the frontend-only login flow with the credentials below.</h2>

          <div className="sample-login">
            {SAMPLE_USERS.map((user) => (
              <div className="sample-row" key={user.identifier}>
                <span>{user.email}</span>
                <strong>{user.password}</strong>
              </div>
            ))}
          </div>

          <Link className="editorial-backlink" to="/">
            Back to articles
          </Link>
        </article>

        <form className="login-form editorial-panel editorial-panel-ink" onSubmit={handleSubmit}>
          <label className="editorial-field">
            Email
            <input
              type="text"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              placeholder="ranee@mikaella.dev"
            />
          </label>

          <label className="editorial-field">
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          <button type="submit" className="form-button">
            Log In
          </button>

          {status ? (
            <div className={`form-response ${status.ok ? 'success' : 'error'}`}>
              <strong>{status.ok ? 'Login successful' : 'Login failed'}</strong>
              <p>{status.message}</p>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default LoginPage
