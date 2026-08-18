import { Link, Navigate, useParams } from 'react-router-dom'
import { getBlogById, getPopularBlogs } from '../config/Constants'
import '../styles/BlogDetails.css'

const formatBlogDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const BlogDetailsPage = () => {
  const { id } = useParams()
  const post = getBlogById(id)
  const relatedPosts = getPopularBlogs(3).filter((item) => item.id !== post?.id)

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="blog-page blog-details-page">
      <section className="details-hero editorial-panel">
        <p className="editorial-label">BlogSpace / {post.category}</p>
        <span className="editorial-number">01</span>
        <h1>
          {post.title}
        </h1>
        <div className="details-meta">
          <span>Author</span>
          <strong>{post.author}</strong>
          <span>Date</span>
          <strong>{formatBlogDate(post.publishedAt)}</strong>
          <span>Read time</span>
          <strong>{post.readTime}</strong>
        </div>
      </section>

      <section className="details-layout">
        <article className="details-article editorial-panel editorial-panel-cream">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <blockquote>
            A strong structure lets the design breathe, so the interface feels intentional from the
            first glance.
          </blockquote>

          <Link className="editorial-backlink" to="/">
            &larr; Back to articles
          </Link>
        </article>

        <aside className="details-sidebar">
          <section className="detail-panel editorial-panel editorial-panel-ink">
            <span className="editorial-number">02</span>
            <p className="editorial-label">Article notes</p>
            <h2>What this story demonstrates</h2>
            <ul>
              <li>Editorial typography hierarchy</li>
              <li>Angular geometry and color blocking</li>
              <li>React Router article navigation</li>
            </ul>
          </section>

          <section className="detail-panel editorial-panel editorial-panel-rose">
            <span className="editorial-number">03</span>
            <p className="editorial-label">More stories</p>
            <div className="related-list">
              {relatedPosts.map((item) => (
                <Link className="related-item" to={`/blog/${item.id}`} key={item.id}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  )
}

export default BlogDetailsPage
