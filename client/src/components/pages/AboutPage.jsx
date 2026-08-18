import { SITE_AUTHOR } from '../config/Constants'
import '../styles/About.css'

const AboutPage = () => {
  return (
    <main className="blog-page about-page">
      <section className="about-hero editorial-panel">
        <p className="editorial-label">About BlogSpace</p>
        <h1>
          ABOUT
          <br />
          THE
          <br />
          PROJECT.
        </h1>
        <p className="about-lead">
          BlogSpace is a student-built editorial blog application that shows how React Router,
          reusable components, and sample data can be shaped into a cohesive publication-style
          website.
        </p>
      </section>

      <section className="about-grid">
        <article className="about-card editorial-panel editorial-panel-cream">
          <span className="editorial-number">01</span>
          <p className="editorial-label">Why we exist</p>
          <h2>To present a class project like a designed article system.</h2>
          <p>
            The site turns basic frontend requirements into a polished reading experience with a
            strong hierarchy, a consistent palette, and a layout that feels intentional from the
            first screen.
          </p>
        </article>

        <article className="about-card editorial-panel editorial-panel-ink">
          <span className="editorial-number">02</span>
          <p className="editorial-label">What we do</p>
          <h2>Show the latest posts, popular reads, routing, and mock interactions.</h2>
          <p>
            Home highlights the feed, About explains the project, Contact simulates a message
            request, Login validates sample credentials, and Blog Details expands each story.
          </p>
        </article>

        <article className="about-card editorial-panel editorial-panel-rose">
          <span className="editorial-number">03</span>
          <p className="editorial-label">Who created it</p>
          <h2>{SITE_AUTHOR.name}</h2>
          <p>{SITE_AUTHOR.role}</p>
          <p>{SITE_AUTHOR.section}</p>
          <p>{SITE_AUTHOR.createdOn}</p>
        </article>
      </section>
    </main>
  )
}

export default AboutPage
