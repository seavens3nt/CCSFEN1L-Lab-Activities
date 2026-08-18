/* eslint-disable react-refresh/only-export-components */

const SITE_AUTHOR = {
  name: 'Ranee Mikaella V. Gutierrez',
  section: 'COM243',
  createdOn: '16 August 2026',
  role: 'Frontend Developer',
  email: 'raneemikaellavgutierrez@gmail.com',
}

const SAMPLE_USERS = [
  {
    identifier: 'ranee',
    email: 'ranee@mikaella.dev',
    password: 'react123',
    displayName: 'Ranee Mikaella V. Gutierrez',
  },
  {
    identifier: 'guest',
    email: 'guest@blogspace.dev',
    password: 'blog2026',
    displayName: 'Guest Reader',
  },
]

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The New Shape of a Student Blog',
    category: 'Featured Story',
    excerpt:
      'A moody editorial home page can make a class project feel intentional, polished, and easier to read.',
    content: [
      'BlogSpace was redesigned to feel more like a magazine cover than a standard dashboard. Strong contrast, restrained spacing, and oversized type make the page feel deliberate without becoming difficult to use.',
      'The homepage now opens with a bold featured story, then moves into latest and popular posts so readers can understand the structure right away. That balance keeps the layout expressive but still practical for a class presentation.',
      'Every section is still powered by simple React components and a constants file, which makes the project easy to maintain while the backend is still mocked out.',
    ],
    author: 'Ranee Mikaella',
    publishedAt: '2026-08-18',
    readTime: '5 min read',
    likes: 212,
    featured: true,
    tone: 'espresso',
  },
  {
    id: 2,
    title: 'How to Build a Calm Reading Rhythm',
    category: 'Design Notes',
    excerpt:
      'Typography, spacing, and hierarchy do most of the work when a page needs to feel premium.',
    content: [
      'A good blog layout does not need many effects to feel refined. Instead, it needs a clear type scale, consistent rhythm, and enough contrast for the eye to move comfortably from one section to the next.',
      'For this project, the color palette is intentionally limited to black, cream, and hot pink. That combination creates personality while still leaving the text easy to read from a distance.',
      'The result is a student project that feels editorial rather than generic, which is exactly the kind of visual identity a presentation needs.',
    ],
    author: 'Ranee Mikaella',
    publishedAt: '2026-08-17',
    readTime: '4 min read',
    likes: 184,
    featured: true,
    tone: 'rose',
  },
  {
    id: 3,
    title: 'Why Sample Data Makes Frontend Work Faster',
    category: 'Workflow',
    excerpt:
      'Temporary content keeps routing, forms, and blog cards testable before the backend exists.',
    content: [
      'Sample content is one of the most useful parts of a frontend workflow because it lets you test the full interface before the real data arrives.',
      'With constants handling credentials, articles, and mock responses, the app can already demonstrate login validation, contact submission, and page-to-page navigation.',
      'That means the structure of the project stays stable while the details evolve later.',
    ],
    author: 'Ranee Mikaella',
    publishedAt: '2026-08-16',
    readTime: '5 min read',
    likes: 159,
    featured: true,
    tone: 'blush',
  },
  {
    id: 4,
    title: 'Using Forms to Simulate a Request and Response',
    category: 'Frontend',
    excerpt:
      'Local state is enough to prototype messaging, validation, and confirmation states cleanly.',
    content: [
      'The contact page uses a local request-and-response function so the interface behaves like a live form without a server.',
      'That approach is ideal for prototype work because it helps students focus on validation, clear feedback, and readable error states before backend integration.',
      'It also keeps the code easy to explain during a presentation since the behavior lives in one constants file.',
    ],
    author: 'Ranee Mikaella',
    publishedAt: '2026-08-15',
    readTime: '4 min read',
    likes: 112,
    featured: false,
    tone: 'cream',
  },
  {
    id: 5,
    title: 'Keeping Navigation Compact and Useful',
    category: 'Routing',
    excerpt:
      'A short nav works best when each label is obvious and the header spacing leaves room to breathe.',
    content: [
      'The navigation only needs a few links to show the app structure clearly. A compact header keeps attention on the content while still making the routes easy to access.',
      'Spacing matters just as much as the label names. If the header sits too close to the edge, it can look accidental; if it has room around it, the whole interface feels more deliberate.',
      'That same idea carries into the footer so the design stays balanced from top to bottom.',
    ],
    author: 'Ranee Mikaella',
    publishedAt: '2026-08-14',
    readTime: '2 min read',
    likes: 91,
    featured: false,
    tone: 'ink',
  },
  {
    id: 6,
    title: 'Building Confidence with React Fundamentals',
    category: 'Learning',
    excerpt:
      'Functional components, events, and state are enough to create a polished class demo.',
    content: [
      'React fundamentals are powerful enough to build a full demonstration app when they are arranged well.',
      'This project uses functional components, props, local state, and React Router to create the kind of structure that feels complete even without a backend service.',
      'When those basics are paired with a strong visual system, the result feels far more advanced than the code actually is.',
    ],
    author: 'Ranee Mikaella',
    publishedAt: '2026-08-13',
    readTime: '3 min read',
    likes: 80,
    featured: false,
    tone: 'rose',
  },
]

const sortByNewest = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)

const getLatestBlogs = (count = 3) => [...BLOG_POSTS].sort(sortByNewest).slice(0, count)

const getPopularBlogs = (count = 3) =>
  [...BLOG_POSTS].sort((a, b) => b.likes - a.likes).slice(0, count)

const getFeaturedBlog = () => BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0]

const getBlogById = (id) => BLOG_POSTS.find((post) => String(post.id) === String(id))

const authenticateUser = ({ identifier = '', password = '' } = {}) => {
  const normalizedIdentifier = identifier.trim().toLowerCase()
  const normalizedPassword = password.trim()

  if (!normalizedIdentifier || !normalizedPassword) {
    return {
      ok: false,
      message: 'Please enter both your email or username and your password.',
    }
  }

  const matchedUser = SAMPLE_USERS.find(
    (user) =>
      [user.identifier, user.email].includes(normalizedIdentifier) &&
      user.password === normalizedPassword,
  )

  if (!matchedUser) {
    return {
      ok: false,
      message: 'Invalid credentials. Try the sample login details shown on the page.',
    }
  }

  return {
    ok: true,
    message: `Welcome back, ${matchedUser.displayName}.`,
    user: matchedUser,
  }
}

const submitContactRequest = ({ name = '', email = '', subject = '', message = '' } = {}) => {
  const values = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  }

  const missingFields = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  const invalidEmail = values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)

  if (missingFields.length > 0) {
    return {
      ok: false,
      message: 'Please complete the name, email, subject, and message fields.',
      missingFields,
    }
  }

  if (invalidEmail) {
    return {
      ok: false,
      message: 'Please enter a valid email address.',
      missingFields: ['email'],
    }
  }

  return {
    ok: true,
    message: `Thanks, ${values.name}. Your message about "${values.subject}" was sent locally.`,
    response: 'We will reply to your email soon.',
  }
}

export {
  SITE_AUTHOR,
  SAMPLE_USERS,
  BLOG_POSTS,
  getLatestBlogs,
  getPopularBlogs,
  getFeaturedBlog,
  getBlogById,
  authenticateUser,
  submitContactRequest,
}
