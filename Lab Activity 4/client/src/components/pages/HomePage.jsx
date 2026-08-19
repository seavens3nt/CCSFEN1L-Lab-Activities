import { Link } from 'react-router-dom'
import {
  BLOG_POSTS,
  getFeaturedBlog,
  getLatestBlogs,
  getPopularBlogs,
} from '../config/Constants'
import '../styles/Home.css'

const formatBlogDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const HomePage = () => {
  const featuredBlog = getFeaturedBlog()
  const latestBlogs = getLatestBlogs(4)
  const popularBlogs = getPopularBlogs(3)

  return (
    <main className="blog-page home-page">
      <section className="hero-panel editorial-block hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Issue 04 | BlogSpace</p>
          <h1>
            BOLD STORIES.
            <br />
            SOFT CREAM LIGHT.
            <br />
            HOT PINK ENERGY.
          </h1>
          <p className="hero-text">
            This front page is built like a magazine spread: the latest posts are easy to scan,
            the featured story gets room to breathe, and every section keeps the route structure
            clear for presentation.
          </p>

          <div className="hero-actions">
            <Link className="primary-action" to={`/blog/${featuredBlog.id}`}>
              Read featured story
            </Link>
            <Link className="secondary-action" to="/about-us">
              About the site
            </Link>
          </div>

          <div className="hero-stats editorial-metrics" aria-label="Blog summary">
            <article>
              <strong>{String(BLOG_POSTS.length).padStart(2, '0')}</strong>
              <span>posts</span>
            </article>
            <article>
              <strong>{String(latestBlogs.length).padStart(2, '0')}</strong>
              <span>latest</span>
            </article>
            <article>
              <strong>{String(popularBlogs.length).padStart(2, '0')}</strong>
              <span>popular</span>
            </article>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-symbol">
            <span>01</span>
          </div>
          <div className="hero-tiles">
            <div className="tile tile-dark tile-angular">
              <span>Latest issue</span>
              <strong>Magazine tone</strong>
            </div>
            <div className="tile tile-cream tile-shift">
              <span>Read time</span>
              <strong>{featuredBlog.readTime}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-story editorial-block featured-grid">
        <div className="feature-number">01</div>
        <div className="feature-copy">
          <p className="section-kicker">Featured story</p>
          <h2>{featuredBlog.title}</h2>
          <p>{featuredBlog.excerpt}</p>
        </div>
        <div className="feature-meta">
          <span>{formatBlogDate(featuredBlog.publishedAt)}</span>
          <span>{featuredBlog.author}</span>
          <Link className="feature-link" to={`/blog/${featuredBlog.id}`}>
            Open article
          </Link>
        </div>
      </section>

      <section className="blog-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Latest Articles</p>
            <h2>Curated stories from the feed</h2>
          </div>
          <p>
            The grid intentionally shifts sizes so the page feels like a publication layout, not a
            dashboard.
          </p>
        </div>

        <div className="latest-mosaic">
          {latestBlogs.map((post, index) => (
            <article
              className={`post-card tone-${post.tone} latest-card latest-card-${index + 1}`}
              key={post.id}
            >
              <div className="post-card-top">
                <span className="post-index">0{index + 1}</span>
                <span className="post-tag">{post.category}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span>{post.author}</span>
                <span>{formatBlogDate(post.publishedAt)}</span>
              </div>
              <Link className="post-link" to={`/blog/${post.id}`}>
                Read story
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Popular Blogs</p>
            <h2>Most read articles this week</h2>
          </div>
          <p>
            The popular section is tighter and more compact, so the layout keeps moving without
            feeling cluttered.
          </p>
        </div>

        <div className="popular-stack">
          {popularBlogs.map((post, index) => (
            <article className="popular-row" key={post.id}>
              <span className="popular-rank">0{index + 1}</span>
              <div className="popular-copy">
                <p className="post-tag">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <div className="popular-meta">
                <span>{post.likes} likes</span>
                <span>{post.readTime}</span>
                <Link to={`/blog/${post.id}`}>Open</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
