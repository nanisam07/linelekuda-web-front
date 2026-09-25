import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Clock,
  Bell,
  ShieldCheck,
  ArrowRight,
  Check,
  X,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
  Activity,
  ArrowLeft,
  MapPin,
  Plus,
  Users,
  Building2,
  Lock,
  Heart
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';
import ContactUs from './ContactUs';
import './Blog.css';
import { BLOG_POSTS } from './blogData';
import LegalPages from './LegalPages';

gsap.registerPlugin(ScrollTrigger);

// Predefined Mock Doctor Data for Simulators
const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Anya Sharma', specialty: 'Cardiologist', rating: 4.9, reviews: 142, avatar: '👩‍⚕️', experience: '12 years', verified: true },
  { id: 2, name: 'Dr. Rajesh Patel', specialty: 'Pediatrician', rating: 4.8, reviews: 98, avatar: '👨‍⚕️', experience: '10 years', verified: true },
  { id: 3, name: 'Dr. Sarah Jenkins', specialty: 'Dermatologist', rating: 4.9, reviews: 115, avatar: '👩‍⚕️', experience: '8 years', verified: true },
  { id: 4, name: 'Dr. Amit Varma', specialty: 'General Physician', rating: 4.7, reviews: 210, avatar: '👨‍⚕️', experience: '15 years', verified: true },
  { id: 5, name: 'Dr. Priya Nair', specialty: 'Gynecologist', rating: 4.9, reviews: 86, avatar: '👩‍⚕️', experience: '9 years', verified: true },
];

// Predefined Mock Testimonials for the 3D Coverflow Carousel
const MOCK_TESTIMONIALS = [
  { id: 1, name: 'Siddharth Mehta', role: 'Software Engineer', text: '"I used to wait at least 45 minutes for my checkups. With Linelekunda, I stayed at my desk working and only went down when my app notification said I was next. Outstanding system!"', rating: 5, avatar: '🙋‍♂️' },
  { id: 2, name: 'Dr. Anya Sharma', role: 'Cardiologist Specialist', text: '"As a cardiologist, having a crowded waiting room is stressful for patients. Linelekunda has smoothed out our bookings. Patients arrive happy, relaxed, and on-schedule."', rating: 5, avatar: '👩‍⚕️' },
  { id: 3, name: 'Apex Care Clinic', role: 'Operations Manager', text: '"Clinics and hospitals see reduced administrative workloads. Patient scheduling coordinates seamlessly. Skip-queue rates are down and overall satisfaction scores are way up."', rating: 5, avatar: '🏢' },
  { id: 4, name: 'Rohan Deshmukh', role: 'Patient', text: '"Linelekunda saved my mother so much waiting time when she needed an emergency cardiologist appointment. The queue updates were spot on!"', rating: 5, avatar: '🙋‍♂️' },
  { id: 5, name: 'Dr. Sarah Jenkins', role: 'Dermatologist', text: '"The scheduling system is clean, the integration with my clinic calendar is perfect, and we\'ve reduced waiting room density by 70%."', rating: 5, avatar: '👩‍⚕️' }
];

// Linelekunda Logo SVG Component
const LogoSVG = ({ size = 38 }) => {
  // Coordinates for the packed collection of blue human silhouettes in the left half
  const people = [
    // Column 1 (x = 46)
    { x: 46, y: 17 }, { x: 46, y: 23 }, { x: 46, y: 29 }, { x: 46, y: 35 }, { x: 46, y: 41 },
    { x: 46, y: 47 }, { x: 46, y: 53 }, { x: 46, y: 59 }, { x: 46, y: 65 }, { x: 46, y: 71 },
    { x: 46, y: 77 }, { x: 46, y: 83 },
    // Column 2 (x = 41)
    { x: 41, y: 21 }, { x: 41, y: 27 }, { x: 41, y: 33 }, { x: 41, y: 39 }, { x: 41, y: 45 },
    { x: 41, y: 51 }, { x: 41, y: 57 }, { x: 41, y: 63 }, { x: 41, y: 69 }, { x: 41, y: 75 },
    { x: 41, y: 81 },
    // Column 3 (x = 36)
    { x: 36, y: 25 }, { x: 36, y: 31 }, { x: 36, y: 37 }, { x: 36, y: 43 }, { x: 36, y: 49 },
    { x: 36, y: 55 }, { x: 36, y: 61 }, { x: 36, y: 67 }, { x: 36, y: 73 }, { x: 36, y: 79 },
    // Column 4 (x = 31)
    { x: 31, y: 29 }, { x: 31, y: 35 }, { x: 31, y: 41 }, { x: 31, y: 47 }, { x: 31, y: 53 },
    { x: 31, y: 59 }, { x: 31, y: 65 }, { x: 31, y: 71 }, { x: 31, y: 77 },
    // Column 5 (x = 26)
    { x: 26, y: 34 }, { x: 26, y: 40 }, { x: 26, y: 46 }, { x: 26, y: 52 }, { x: 26, y: 58 },
    { x: 26, y: 64 }, { x: 26, y: 70 },
    // Column 6 (x = 21)
    { x: 21, y: 40 }, { x: 21, y: 46 }, { x: 21, y: 52 }, { x: 21, y: 58 }, { x: 21, y: 64 },
    // Column 7 (x = 16)
    { x: 16, y: 46 }, { x: 16, y: 52 }, { x: 16, y: 58 }
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: size, height: size, overflow: 'visible', flexShrink: 0 }}
      className="linelekunda-logo-svg"
    >
      {/* Left side: People silhouette grid */}
      <g>
        {people.map((p, i) => (
          <g key={i}>
            {/* Head */}
            <circle cx={p.x} cy={p.y} r="1.6" fill="#1E88E5" />
            {/* Body (rounded shoulders) */}
            <path
              d={`M ${p.x - 2.1} ${p.y + 2.3} a 2.1 2.1 0 0 1 4.2 0 v 3.2 h -4.2 z`}
              fill="#1E88E5"
            />
          </g>
        ))}
      </g>

      {/* Right side: Clock Outline */}
      <path
        d="M 51 11 v 78 M 51 11 A 39 39 0 0 1 51 89"
        fill="none"
        stroke="#1E88E5"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Clock ticks on the right side */}
      <line x1="70.5" y1="20.3" x2="67.5" y2="22" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="84.7" y1="34.5" x2="81.2" y2="36.5" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="50" x2="86" y2="50" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="84.7" y1="65.5" x2="81.2" y2="63.5" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70.5" y1="79.7" x2="67.5" y2="78" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" />

      {/* Clock hands */}
      <circle cx="51" cy="50" r="2" fill="#1E88E5" />
      <line x1="51" y1="50" x2="43.5" y2="61" stroke="#1E88E5" strokeWidth="3" strokeLinecap="round" />
      <line x1="51" y1="50" x2="49" y2="32" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" />

      {/* Green Checkmark */}
      <path
        d="M 60 62 L 69 74 L 89 42"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Animated counter component for stats
const AnimatedCounter = ({ value, duration = 2, delay = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const isFloat = value.includes('.');
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const current = progress * numericValue;
      setCount(isFloat ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Custom intersection observer hook for scroll reveals
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target); // Animate once
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
}

// Premium glassmorphic feature card with 3D mouse tilt and zoom
function FeatureCard({ imageSrc, imageAlt, title, description, buttonText, onClick, delay }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set spotlight center
    setSpotlightPos({ x, y });

    // Responsive checks (disable heavy 3D calculations on mobile < 768px)
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (isMobile) {
      setTilt({ x: 0, y: 0 });
      return;
    }

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation 8 degrees on desktop, 4 degrees on tablet
    const maxRot = isTablet ? 4 : 8;
    const rotateX = -((y - centerY) / centerY) * maxRot;
    const rotateY = ((x - centerX) / centerX) * maxRot;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`feature-card ${isHovered ? 'hover-active' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) translateY(-10px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : 'perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)',
      }}
    >
      {/* Spotlight Hover Effect (radial gradient following cursor) */}
      <div
        className="card-spotlight"
        style={{
          background: `radial-gradient(circle 240px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59,130,246,0.15), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 300ms ease'
        }}
      />

      <div className="feature-glow"></div>

      <div className="feature-illustration-wrapper">
        <div
          className="feature-illustration-container"
          style={{ animationDelay: delay }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="feature-illustration"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn-premium-showcase" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}


function BlogsListing({ onBookAppointment }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Healthcare', 'Technology', 'Patient Experience', 'Practice Growth', 'Product Updates'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const featuredPost = BLOG_POSTS[0];
  const gridPosts = (selectedCat === 'All' && searchTerm === '')
    ? filteredPosts.filter(p => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="blogs-page animate-fade-in">
      <div className="container">
        {/* HERO SECTION */}
        <section className="blogs-hero">
          <div className="blogs-hero-grid">
            <div className="blogs-hero-content">
              <span className="badge">Insights & Updates</span>
              <h1>Healthcare Insights, Delivered Instantly</h1>
              <p>Explore articles, guides, and updates on digital healthcare ecosystems, 24/7 emergency ambulance dispatch, and personalized post-care rehabilitation.</p>
              <a href="#blog" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                const gridElem = document.getElementById('articles-grid-anchor');
                if (gridElem) gridElem.scrollIntoView({ behavior: 'smooth' });
              }}>Browse Articles <ArrowRight size={18} /></a>
            </div>
            <div className="blogs-hero-visual">
              <img src="/images/doctor_avatar_3d.png" alt="Blogs Illustration" />
            </div>
          </div>
        </section>

        {/* FEATURED POST */}
        {selectedCat === 'All' && searchTerm === '' && featuredPost && (
          <section className="featured-section">
            <h3 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem', color: 'var(--primary)' }}>Featured Post</h3>
            <div className="featured-card">
              <div className="featured-img-wrapper">
                <img src={featuredPost.image} alt={featuredPost.title} className="featured-img" />
              </div>
              <div className="featured-info">
                <div>
                  <h2><a href={`#blog/${featuredPost.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{featuredPost.title}</a></h2>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                  <a href={`#blog/${featuredPost.slug}`} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>Read Article <ArrowRight size={16} /></a>
                </div>
              </div>
            </div>
          </section>
        )}

        <div id="articles-grid-anchor" style={{ scrollMarginTop: '100px' }}>
          <div className="blogs-filter-bar" style={{ justifyContent: 'center' }}>
            <div className="blogs-search-wrapper" style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
              <Search size={18} className="blogs-search-icon" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                className="blogs-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ARTICLES GRID */}
        <section className="grid-section">
          {gridPosts.length > 0 ? (
            <div className="blog-grid">
              {gridPosts.map(post => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-img-wrapper">
                    <img src={post.image} alt={post.title} className="blog-card-img" />
                  </div>
                  <div className="blog-card-body">
                    <h3><a href={`#blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{post.title}</a></h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer" style={{ justifyContent: 'flex-end' }}>
                      <a href={`#blog/${post.slug}`} className="read-more-btn">Read More <ArrowRight size={14} /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-grey)' }}>
              <h3>No articles found matching your criteria.</h3>
              <p style={{ marginTop: '0.5rem' }}>Try modifying your search query or selecting another category.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function BlogDetail({ slug, onBookAppointment }) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  if (!post) {
    return (
      <div className="blogs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Article Not Found</h2>
          <p style={{ margin: '1rem 0 2rem' }}>The blog post you are looking for does not exist or has been moved.</p>
          <a href="#blog" className="btn btn-primary">Back to Blogs Listing</a>
        </div>
      </div>
    );
  }

  const currentIndex = BLOG_POSTS.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 4);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      const headings = document.querySelectorAll('.blog-article-content h2');
      let currentActive = '';
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 140) {
          currentActive = heading.id;
        }
      });
      if (currentActive) {
        setActiveHeadingId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const headings = post.content
    .filter(block => block.type === 'heading' && block.level === 2)
    .map(block => ({
      text: block.text,
      id: block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setEmailSubscribed(true);
    setSubscribeEmail('');
    setTimeout(() => setEmailSubscribed(false), 5000);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    let shareUrl = '';
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    else if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    else if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="blogs-page">
      {/* Sticky Reading Progress */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="container">
          {/* ARTICLE HEADER HERO */}
        <header className="blog-detail-header animate-fade-in" style={{ marginBottom: '2rem' }}>
          <h1>{post.title}</h1>
        </header>

        {/* FEATURED COVER IMAGE */}
        <div className="blog-cover-wrapper animate-fade-in">
          <img src={post.image} alt={post.title} className="blog-cover-img" />
        </div>

        {/* ARTICLE LAYOUT GRID */}
        <div className="blog-content-layout">
          {/* ARTICLE CONTENT */}
          <article className="blog-article-content">
            {post.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return <p key={idx}>{block.text}</p>;
              }
              if (block.type === 'heading') {
                const headingId = block.level === 2 ? block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : null;
                const Tag = `h${block.level}`;
                return <Tag key={idx} id={headingId}>{block.text}</Tag>;
              }
              if (block.type === 'blockquote') {
                return (
                  <blockquote key={idx}>
                    <p>{block.text}</p>
                  </blockquote>
                );
              }
              if (block.type === 'list') {
                const ListTag = block.style === 'numbered' ? 'ol' : 'ul';
                return (
                  <ListTag key={idx}>
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        {item.label && <strong className="article-list-item-title">{item.label}: </strong>}
                        {item.text}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              return null;
            })}
          </article>

          {/* TABLE OF CONTENTS SIDEBAR */}
          {headings.length > 0 && (
            <aside className="blog-sidebar">
              <h4 className="toc-title">Table of Contents</h4>
              <nav>
                <ul className="toc-list">
                  {headings.map((heading, idx) => (
                    <li key={idx}>
                      <a
                        className={`toc-link ${activeHeadingId === heading.id ? 'active' : ''}`}
                        onClick={() => {
                          const element = document.getElementById(heading.id);
                          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        {/* PREVIOUS / NEXT NAVIGATION CARD */}
        <div className="article-navigation">
          {prevPost ? (
            <a href={`#blog/${prevPost.slug}`} className="nav-article-card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
              <span className="nav-article-direction">← Previous Post</span>
              <h4 className="nav-article-title">{prevPost.title}</h4>
            </a>
          ) : <div />}

          {nextPost ? (
            <a href={`#blog/${nextPost.slug}`} className="nav-article-card" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
              <span className="nav-article-direction">Next Post →</span>
              <h4 className="nav-article-title">{nextPost.title}</h4>
            </a>
          ) : <div />}
        </div>
      </div>

      {/* RELATED ARTICLES DRAWER SECTION */}
      <section className="related-articles-section">
        <div className="container">
          <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem', textAlign: 'center' }}>Related Articles</h3>
          <div className="blog-grid">
            {relatedPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-img-wrapper">
                  <img src={post.image} alt={post.title} className="blog-card-img" />
                </div>
                <div className="blog-card-body">
                  <h3><a href={`#blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{post.title}</a></h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer" style={{ justifyContent: 'flex-end' }}>
                    <a href={`#blog/${post.slug}`} className="read-more-btn">Read More <ArrowRight size={14} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  // Add GSAP ScrollTrigger Refs
  const heroRef = React.useRef(null);
  const heroBgRef = React.useRef(null);
  const heroContentRef = React.useRef(null);
  const videoRef = React.useRef(null);

  // Play hero background video programmatically with robust mobile fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Autoplay video was prevented, waiting for user interaction:", err);

          // Play on first touch, scroll, or click as a robust mobile fallback
          const startVideoOnInteraction = () => {
            video.play().then(() => {
              cleanupListeners();
            }).catch(e => {
              console.warn("Failed to play video on user interaction:", e);
            });
          };

          const cleanupListeners = () => {
            window.removeEventListener('touchstart', startVideoOnInteraction);
            window.removeEventListener('scroll', startVideoOnInteraction);
            document.removeEventListener('click', startVideoOnInteraction);
          };

          window.addEventListener('touchstart', startVideoOnInteraction, { passive: true });
          window.addEventListener('scroll', startVideoOnInteraction, { passive: true });
          document.addEventListener('click', startVideoOnInteraction);
        });
      }
    };

    // Small timeout to let browser settle before initial play attempt
    const timer = setTimeout(playVideo, 100);
    return () => clearTimeout(timer);
  }, []);

  // Testimonials 3D Coverflow Carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(2); // Start with center index
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [testimonialDragStartX, setTestimonialDragStartX] = useState(null);

  // Resize listener for responsive layout checks
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel Autoplay Timer (every 4.5 seconds, paused on hover)
  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isTestimonialHovered]);

  // Touch Swipe Handlers for mobile navigation
  const handleTestimonialTouchStart = (e) => {
    setTestimonialDragStartX(e.touches[0].clientX);
  };

  const handleTestimonialTouchMove = (e) => {
    if (testimonialDragStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diffX = testimonialDragStartX - currentX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        setActiveTestimonial((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
      } else {
        setActiveTestimonial((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
      }
      setTestimonialDragStartX(null);
    }
  };

  // Mouse Drag Handlers for desktop navigation
  const handleTestimonialMouseDown = (e) => {
    setTestimonialDragStartX(e.clientX);
  };

  const handleTestimonialMouseMove = (e) => {
    if (testimonialDragStartX === null) return;
    const diffX = testimonialDragStartX - e.clientX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        setActiveTestimonial((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
      } else {
        setActiveTestimonial((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
      }
      setTestimonialDragStartX(null);
    }
  };

  const handleTestimonialMouseUpOrLeave = () => {
    setTestimonialDragStartX(null);
  };

  // Helper to calculate circular distance of slide from active slide
  const getTestimonialOffset = (idx) => {
    let diff = idx - activeTestimonial;
    const count = MOCK_TESTIMONIALS.length;
    if (diff < -count / 2) diff += count;
    if (diff > count / 2) diff -= count;
    return diff;
  };  // Navigation active state and scrolling border
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Blogs Routing State
  const [currentView, setCurrentView] = useState('home');
  const [activeBlogSlug, setActiveBlogSlug] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '' || hash === '#') {
        setCurrentView('home');
        setActiveBlogSlug('');
        setActiveSection('home');
      } else if (hash === '#contact') {
        setCurrentView('contact');
        setActiveBlogSlug('');
        setActiveSection('contact');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#blog') {
        setCurrentView('blog');
        setActiveBlogSlug('');
        setActiveSection('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        setCurrentView('blog-detail');
        setActiveBlogSlug(slug);
        setActiveSection('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#privacy') {
        setCurrentView('privacy');
        setActiveBlogSlug('');
        setActiveSection('privacy');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#terms') {
        setCurrentView('terms');
        setActiveBlogSlug('');
        setActiveSection('terms');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#refund-policy') {
        setCurrentView('refund-policy');
        setActiveBlogSlug('');
        setActiveSection('refund-policy');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        // Fallback for general anchors (like #features, #how-it-works, #contact)
        setCurrentView('home');
        setActiveBlogSlug('');
        const sectionId = hash.replace('#', '');
        setActiveSection(sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    handleHashChange(); // Run on mount

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Sync document title and meta description dynamically for SEO
  useEffect(() => {
    if (currentView === 'home') {
      document.title = "Book Doctors Instantly | Linelekunda";
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', 'Skip waiting rooms. Book doctors instantly and get live queue updates with Linelekunda.');
    } else if (currentView === 'blog') {
      document.title = "Insights & Updates | Linelekunda Blog";
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', 'Read the latest insights and updates about modern healthcare booking, 24/7 ambulance coordination, at-home physiotherapy, and rehabilitation.');
    } else if (currentView === 'blog-detail' && activeBlogSlug) {
      const post = BLOG_POSTS.find(p => p.slug === activeBlogSlug);
      if (post) {
        document.title = `${post.title} | Linelekunda Blog`;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', post.excerpt);
      }
    }
  }, [currentView, activeBlogSlug]);

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState(null);

  // Simulators Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Doctor Search Simulator State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // Scroll Reveal Observer for Feature Section
  const [headerRef, headerVisible] = useIntersectionObserver();

  // Virtual Queue Simulator State
  const [queuePos, setQueuePos] = useState(3);
  const [estimatedWait, setEstimatedWait] = useState(5);
  const [queueStatus, setQueueStatus] = useState('Waiting at home / office');

  // Booking Flow Multi-Step State
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Specialty, 2: Select Date, 3: Fill Info
  const [bookingSpecialty, setBookingSpecialty] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [healthConcern, setHealthConcern] = useState('');

  // Scroll effect to adjust Navbar shadow/height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic Button Effect with scale and soft glow support
  useEffect(() => {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    const handleMouseMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Pull button towards cursor (max movement: 8px)
      const maxMove = 8;
      const xMove = Math.min(Math.max(x * 0.15, -maxMove), maxMove);
      const yMove = Math.min(Math.max(y * 0.15, -maxMove), maxMove);

      gsap.to(btn, {
        x: xMove,
        y: yMove,
        scale: 1.03,
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = (e) => {
      const btn = e.currentTarget;
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)' // Spring physics for elastic release
      });
    };

    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      magneticButtons.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Premium scroll effects and smooth Lenis animations
  useEffect(() => {
    if (currentView !== 'home') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      let rafId;
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Hero Reveal Animations & Stats Panel Stagger
    const tlHero = gsap.timeline();
    tlHero.to('.hero-reveal-line', {
      y: '0%',
      opacity: 1,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.12,
      delay: 0.2
    })
      .fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.95, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.hero-actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-stats-panel',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

    // 3. Hero Background Scroll Parallax (No pinning)
    if (heroRef.current && heroBgRef.current && heroContentRef.current) {
      gsap.to(heroBgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        scale: 0.92,
        y: 40,
        ease: 'none'
      });

      gsap.to(heroContentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        },
        y: -80,
        ease: 'none'
      });

      // Animate heading on scroll
      gsap.to('.hero-title', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
        y: -50,
        scale: 0.96,
        ease: 'none'
      });
    }



    // 8. FAQ Section Staggered Reveal
    gsap.fromTo('.faq-grid .faq-item',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.faq-grid',
          start: 'top 90%',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08
      }
    );

    // 10. Cinematic Overlapping & Pinning Flow (Desktop vs Mobile Isolation)
    const track = document.querySelector('.horizontal-track');
    const trackWrapper = document.querySelector('.horizontal-track-wrapper');
    const mm = gsap.matchMedia();

    if (track && trackWrapper) {
      const getScrollAmount = () => {
        const amount = track.scrollWidth - trackWrapper.clientWidth;
        return amount > 0 ? amount : 0;
      };

      // Desktop Master Overlapping Scroll Timeline (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        const overlapWrapper = document.querySelector('#overlap-wrapper');
        if (overlapWrapper) {
          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#overlap-wrapper',
              start: 'top top',
              end: '+=3500', // Pinned for a premium narrative flow
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              id: 'overlap-master-trigger'
            }
          });

          // Set initial visual states for absolute layers on desktop
          gsap.set('#how-it-works', { visibility: 'hidden', y: '100vh', opacity: 0 });
          gsap.set('#benefits', { visibility: 'hidden', y: '100vh', opacity: 0 });
          gsap.set('#features', { visibility: 'visible', y: 0, opacity: 1 });
          gsap.set('#features .container', { opacity: 1, scale: 1, y: 0 });
          gsap.set('.feature-card-reveal-wrapper', { opacity: 0, y: 150 });

          // Phase 1: Features Entrance & Hold (0% to 25% of timeline)
          masterTl.to('.feature-card-reveal-wrapper', {
            opacity: 1,
            y: 0,
            duration: 2.5,
            ease: 'power2.out',
            stagger: 0.25
          });

          // Phase 2: Transition 1 (Features fades out/scales down, How It Works slides up and fades in simultaneously) - 25% to 40%
          masterTl.addLabel('transition1')
            .to('#features .container', {
              opacity: 0,
              scale: 0.92,
              y: -50,
              duration: 1.5,
              ease: 'power1.inOut'
            }, 'transition1')
            .to('#how-it-works', {
              visibility: 'visible',
              duration: 0.01
            }, 'transition1')
            .fromTo('#how-it-works', {
              y: '100vh',
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power1.inOut'
            }, 'transition1');

          // Phase 3: Horizontal Scroll of How It Works card-track - 40% to 75%
          masterTl.to(track, {
            x: () => -getScrollAmount(),
            duration: 3.5,
            ease: 'none'
          });

          // Phase 4: Transition 2 (How It Works fades out/scales down, Benefits slides up and fades in simultaneously) - 75% to 90%
          masterTl.addLabel('transition2')
            .to('#how-it-works .container', {
              opacity: 0,
              scale: 0.92,
              y: -50,
              duration: 1.5,
              ease: 'power1.inOut'
            }, 'transition2')
            .to('#benefits', {
              visibility: 'visible',
              duration: 0.01
            }, 'transition2')
            .fromTo('#benefits', {
              y: '100vh',
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power1.inOut'
            }, 'transition2');

          // Phase 5: Focus hold on Benefits (Why Customers Love) before unpinning - 90% to 100%
          masterTl.to({}, { duration: 1.0 });
        }
      });

      // Mobile Horizontal Pinning & Scroll reveals Flow (max-width: 1023px)
      mm.add("(max-width: 1023px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: '#how-it-works',
            start: 'top top',
            end: '+=1600',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: 'pin-how-it-works-mobile'
          }
        }).to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
        });

        // 4. Feature Cards Staggered Reveal (Mobile Viewport)
        gsap.fromTo('.feature-card-reveal-wrapper',
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.showcase-grid',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12
          }
        );

        // 5. How It Works - Sequential Timeline Stagger (Mobile Viewport)
        gsap.fromTo('.how-step-card',
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '#how-it-works',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2
          }
        );

        // 6. Benefits Phone Mockup Fade In & Parallax (Mobile Viewport)
        gsap.fromTo('#benefits .phone-mockup-wrapper',
          { scale: 0.9, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '#benefits',
              start: 'top 75%',
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          }
        );

        gsap.to('#benefits .phone-mockup', {
          scrollTrigger: {
            trigger: '#benefits',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: 35,
          ease: 'none'
        });

        // 7. Benefits Section Staggered Reveal (Mobile Viewport)
        gsap.fromTo('.benefits-grid .benefit-card',
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.benefits-grid',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1
          }
        );
      });
    }

    // Reset styles for mobile/tablet when resized/unmounted
    mm.add("(max-width: 1023px)", () => {
      const overlappingSections = ['#features', '#benefits', '#how-it-works'];
      overlappingSections.forEach((selector) => {
        const sec = document.querySelector(selector);
        if (!sec) return;
        sec.style.minHeight = '';
        sec.style.height = '';
        sec.style.zIndex = '';
        sec.style.position = '';
        sec.style.display = '';
        sec.style.flexDirection = '';
        sec.style.justifyContent = '';
        sec.style.visibility = '';

        const container = sec.querySelector('.container');
        if (container) {
          container.style.opacity = '';
          container.style.transform = '';
        }
      });

      const resetSecs = ['.testimonials-section', '#benefits', '#how-it-works'];
      resetSecs.forEach((selector) => {
        const sec = document.querySelector(selector);
        if (!sec) return;
        sec.style.zIndex = '';
        sec.style.position = '';
      });
    });

    // Force a ScrollTrigger refresh after layout settles to prevent race conditions
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      lenis.destroy();
      mm.revert();
    };
  }, [currentView]);

  // Filtered Doctors List for Search Simulator
  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Unique list of specialties
  const specialties = ['All', 'Cardiologist', 'Pediatrician', 'Dermatologist', 'General Physician', 'Gynecologist'];

  // Handle virtual queue progress ticking
  const progressQueue = () => {
    if (queuePos > 1) {
      setQueuePos(prev => prev - 1);
      setEstimatedWait(prev => Math.max(1, prev - 2));
      setQueueStatus('Arrive at clinic / Heading in');
    } else if (queuePos === 1) {
      setQueuePos(0);
      setEstimatedWait(0);
      setQueueStatus('It is your turn! Please enter Room 102.');
    }
  };

  const resetQueue = () => {
    setQueuePos(3);
    setEstimatedWait(5);
    setQueueStatus('Waiting at home / office');
  };

  // Handle Complete Booking Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !bookingSpecialty || !bookingDate) return;

    const message = `Hello LineLekunda Team,\n\nI would like to request an appointment.\n\nMedical Specialty:\n${bookingSpecialty}\n\nPreferred Date:\n${bookingDate}\n\nPatient Name:\n${patientName}\n\nPhone Number:\n${patientPhone}\n\nEmail:\n${patientEmail || 'Not provided'}\n\nHealth Concern:\n${healthConcern || 'Not provided'}\n\nPlease contact me and help schedule the most suitable specialist.\n\nThank you.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919063903355?text=${encodedMessage}`, '_blank');
    
    setIsBookingOpen(false); // Close the modal
    setBookingStep(1); // Reset
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setHealthConcern('');
  };

  // Launch booking for a specific specialty from Search Simulator
  const startBookingForDoctor = (doctor) => {
    setBookingSpecialty(doctor.specialty);
    setIsSearchOpen(false);
    setBookingStep(2); // Jump to date selection
    setIsBookingOpen(true);
  };

  // Toggle single FAQ accordion item
  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  // Handle smooth scroll for stacked sections on desktop
  const handleNavLinkClick = (e, targetId) => {
    setActiveSection(targetId);

    // If we're not on the homepage, route the user accordingly
    if (currentView !== 'home') {
      if (targetId === 'home') {
        e.preventDefault();
        setCurrentView('home');
        setActiveBlogSlug('');
        setActiveSection('home');
        window.history.pushState(null, '', '#');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (targetId === 'contact') {
        e.preventDefault();
        setCurrentView('contact');
        setActiveBlogSlug('');
        setActiveSection('contact');
        window.history.pushState(null, '', '#contact');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (targetId === 'blog') {
        e.preventDefault();
        setCurrentView('blog');
        setActiveBlogSlug('');
        setActiveSection('blog');
        window.history.pushState(null, '', '#blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
        setActiveBlogSlug('');
        window.location.hash = '#' + targetId;
      }
      return;
    }

    // If target is blog, change hash AND directly update state
    if (targetId === 'blog') {
      e.preventDefault();
      setCurrentView('blog');
      setActiveBlogSlug('');
      setActiveSection('blog');
      window.history.pushState(null, '', '#blog');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (window.innerWidth < 1024) {
      return;
    }

    const overlapWrapper = document.querySelector('#overlap-wrapper');
    if (!overlapWrapper) return;

    const trigger = ScrollTrigger.getById('overlap-master-trigger');
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    const total = end - start;

    let targetScroll = 0;

    if (targetId === 'home') {
      targetScroll = 0;
    } else if (targetId === 'features') {
      targetScroll = start + 5; // offset slightly to ensure trigger activation
    } else if (targetId === 'how-it-works') {
      targetScroll = start + total * 0.22; // middle of how-it-works phase
    } else {
      // For normal scrolling links like #contact, let the default anchor behavior run
      return;
    }

    e.preventDefault();
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Premium Noise Overlay & Glowing Blobs */}
      <div className="noise-overlay" />
      <div className="global-glow-container">
        <div className="global-glow-blob glow-blue"></div>
        <div className="global-glow-blob glow-cyan"></div>
      </div>

      {/* NAVBAR */}
      <header className={`navbar-header ${isScrolled ? 'scrolled glass' : ''}`}>
        <div className="container navbar-container">
          <a href="#home" className="logo-link" onClick={(e) => handleNavLinkClick(e, 'home')}>
            <img src="/logo.png" alt="LineLekunda Logo" style={{ height: '80px', width: 'auto' }} />
          </a>

          <nav>
            <ul className="nav-links">
              <li>
                <a
                  href="#home"
                  className={`nav-item-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={`nav-item-link ${activeSection === 'features' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'features')}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className={`nav-item-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'how-it-works')}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className={`nav-item-link ${activeSection === 'blog' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'blog')}
                >
                  Blogs
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className={`nav-item-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="navbar-actions">
            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          <li>
            <a
              href="#home"
              className="nav-item-link"
              onClick={() => { setMobileMenuOpen(false); setActiveSection('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="nav-item-link"
              onClick={() => { setMobileMenuOpen(false); setActiveSection('features'); }}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="nav-item-link"
              onClick={() => { setMobileMenuOpen(false); setActiveSection('how-it-works'); }}
            >
              How It Works
            </a>
          </li>

          <li>
            <a
              href="#blog"
              className="nav-item-link"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setCurrentView('blog');
                setActiveBlogSlug('');
                setActiveSection('blog');
                window.history.pushState(null, '', '#blog');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              Blogs
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="nav-item-link"
              onClick={() => { setMobileMenuOpen(false); setActiveSection('contact'); }}
            >
              Contact
            </a>
          </li>
        </ul>
        <button
          className="btn btn-primary"
          onClick={() => {
            setMobileMenuOpen(false);
            setBookingStep(1);
            setIsBookingOpen(true);
          }}
        >
          Book Appointment
        </button>
      </div>

      {/* ============ BLOG VIEWS ============ */}
      {currentView === 'contact' && (
        <ContactUs setIsBookingOpen={setIsBookingOpen} setBookingStep={setBookingStep} />
      )}

      {currentView === 'blog' && (
        <BlogsListing
          onBookAppointment={() => { setBookingStep(1); setIsBookingOpen(true); }}
        />
      )}
      {currentView === 'blog-detail' && (
        <BlogDetail
          slug={activeBlogSlug}
          onBookAppointment={() => { setBookingStep(1); setIsBookingOpen(true); }}
        />
      )}

      {/* ============ LEGAL VIEWS ============ */}
      {(currentView === 'privacy' || currentView === 'terms' || currentView === 'refund-policy') && (
        <LegalPages
          activeTab={currentView}
          onTabChange={(tab) => {
            window.location.hash = `#${tab}`;
          }}
        />
      )}

      <div style={{ display: currentView === 'home' ? 'block' : 'none' }}>
        {/* HERO SECTION */}
        <section id="home" className="hero-section" ref={heroRef}>
          <div className="hero-bg-container" ref={heroBgRef}>
            <video
              ref={videoRef}
              src="/images/hero_bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              className="hero-bg-image"
            />

            {/* Aurora Background Overlay */}
            <div className="aurora-bg">
              <div className="aurora-blob aurora-blue"></div>
              <div className="aurora-blob aurora-cyan"></div>
              <div className="aurora-blob aurora-purple"></div>
            </div>

            {/* Floating abstract blobs */}
            <div className="floating-blobs-container">
              <div className="floating-blob blob-1"></div>
              <div className="floating-blob blob-2"></div>
              <div className="floating-blob blob-3"></div>
            </div>

            {/* Floating abstract outline shapes */}
            <div className="floating-shapes-container">
              <svg className="floating-shape shape-hex" viewBox="0 0 100 100" width="50" height="50">
                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="rgba(30,136,229,0.25)" strokeWidth="2.5" />
              </svg>
              <svg className="floating-shape shape-ring" viewBox="0 0 100 100" width="60" height="60">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="2" strokeDasharray="5 5" />
              </svg>
              <svg className="floating-shape shape-plus" viewBox="0 0 100 100" width="30" height="30">
                <path d="M50,10 V90 M10,50 H90" fill="none" stroke="rgba(177,13,201,0.25)" strokeWidth="3.5" />
              </svg>
            </div>
          </div>

          <div className="container hero-content" ref={heroContentRef}>
            <h1 className="hero-title">
              <span><span className="hero-reveal-line">See A Doctor.</span></span>
              <span><span className="hero-reveal-line">Not A Waiting Room.</span></span>
            </h1>

            <p className="hero-subtitle">
              Linkelekunda makes healthcare simple with instant doctor discovery, smart booking, and queue free appointments.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-get-started btn-magnetic animate-pulse-glow"
                onClick={() => {
                  setBookingStep(1);
                  setIsBookingOpen(true);
                }}
              >
                Get Started
              </button>

              <button
                className="btn btn-request-demo btn-magnetic"
                onClick={() => window.open('https://wa.me/919063903355', '_blank')}
              >
                Request Demo
              </button>
            </div>

            {/* Redesigned Premium Stats Banner (Trust Indicators) */}
            <div className="hero-stats-panel">
              <div className="hero-stat-item">
                <div className="hero-stat-icon-badge">
                  <Building2 size={20} />
                </div>
                <div className="hero-stat-content">
                  <div className="hero-stat-number">
                    <AnimatedCounter value="1000" suffix="+" delay={0.8} />
                  </div>
                  <div className="hero-stat-label">Verified Clinics</div>
                </div>
              </div>

              <div className="hero-stat-divider"></div>

              <div className="hero-stat-item">
                <div className="hero-stat-icon-badge">
                  <Users size={20} />
                </div>
                <div className="hero-stat-content">
                  <div className="hero-stat-number">
                    <AnimatedCounter value="1" suffix="M+" delay={1.0} />
                  </div>
                  <div className="hero-stat-label">Happy Patients</div>
                </div>
              </div>

              <div className="hero-stat-divider"></div>

              <div className="hero-stat-item">
                <div className="hero-stat-icon-badge">
                  <Clock size={20} />
                </div>
                <div className="hero-stat-content">
                  <div className="hero-stat-number">
                    <AnimatedCounter value="50" suffix="%+" delay={1.2} />
                  </div>
                  <div className="hero-stat-label">Wait-Time Reduced</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OVERLAP WRAPPER FOR DESKTOP STORYTELLING */}
        <div id="overlap-wrapper">
          {/* 3D FEATURE SHOWCASE SECTION */}
          <section id="features" className="section">
            <div className="container">
              <div
                ref={headerRef}
                className={`showcase-header scroll-reveal ${headerVisible ? 'visible' : ''}`}
              >
                <h2>Where <span className="highlight-blue">Waiting</span> Ends</h2>
                <p>Experience healthcare booking that is visual, transparent, and completely under your control.</p>
              </div>

              <motion.div
                className="showcase-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {}
                }}
              >
                {/* Card 1: Find Doctor */}
                <motion.div
                  className="feature-card-reveal-wrapper"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <FeatureCard
                    imageSrc="/images/doctor_avatar_3d.png"
                    imageAlt="Verified Doctor Card 3D Illustration"
                    title="Book a Doctor"
                    description="Connect with verified top specialists instantly. Browse profiles, real user ratings, and credentials with ease."
                    buttonText="Book a Doctor"
                    onClick={() => window.open('https://wa.me/919063903355', '_blank')}
                    delay="0s"
                  />
                </motion.div>

                {/* Card 2: Book an Ambulance Instantly */}
                <motion.div
                  className="feature-card-reveal-wrapper"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <FeatureCard
                    imageSrc="/images/ambulance_booking_3d.png"
                    imageAlt="Book an ambulance instantly 3D illustration"
                    title="Book an Ambulance Instantly"
                    description="Request an ambulance in seconds with real-time availability and instant confirmation. Fast, reliable emergency transportation when you need it most."
                    buttonText="Book an Ambulance"
                    onClick={() => window.open('https://wa.me/919063903355', '_blank')}
                    delay="0.8s"
                  />
                </motion.div>

                {/* Card 3: Start Your Recovery Today */}
                <motion.div
                  className="feature-card-reveal-wrapper"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <FeatureCard
                    imageSrc="/images/physiotherapy_recovery_3d.png"
                    imageAlt="Physiotherapy recovery session 3D illustration"
                    title="Start Your Recovery Today"
                    description="Book a physiotherapy session with experienced specialists at your preferred time. Receive personalized care to restore movement, relieve pain, and improve mobility."
                    buttonText="Book Physiotherapy"
                    onClick={() => window.open('https://wa.me/919063903355', '_blank')}
                    delay="1.6s"
                  />
                </motion.div>
              </motion.div>

              {/* Mobile Redesign - Staggered Layout (Visible on Mobile Only) */}
              <div className="mobile-features-layout">

                {/* Item 01 */}
                <motion.div
                  className="mobile-feature-item item-1"
                  initial={{ opacity: 0, x: -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="mobile-feature-visual">
                    <div className="mobile-doctor-card-wrapper">
                      <img
                        src="/images/doctor_avatar_3d.png"
                        alt="Verified Doctor Card 3D Illustration"
                        className="mobile-feature-img"
                      />
                      <div className="verified-badge-overlay">
                        <span className="verified-check">✓</span>
                        <span className="verified-text">Verified Specialist</span>
                      </div>
                    </div>
                  </div>

                  <div className="mobile-feature-info">
                    <span className="mobile-step-badge badge-blue">01</span>
                    <h3>Book a Doctor</h3>
                    <p>Connect with verified top specialists instantly. Browse profiles, real user ratings, and credentials with ease.</p>
                    <button className="mobile-feature-btn btn-blue" onClick={() => window.open('https://wa.me/919063903355', '_blank')}>
                      <Search size={14} /> Book a Doctor
                    </button>
                  </div>
                </motion.div>

                {/* Connection Line 1: Blue with dot at the end */}
                <div className="mobile-connecting-line">
                  <svg viewBox="0 0 375 65" fill="none" preserveAspectRatio="none">
                    <path
                      d="M 85,0 C 85,32 195,24 195,40 C 195,56 35,48 35,65"
                      stroke="#1e88e5"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                    />
                    <circle cx="35" cy="61" r="4" fill="#1e88e5" />
                  </svg>
                </div>

                {/* Item 02 */}
                <motion.div
                  className="mobile-feature-item item-2"
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="mobile-feature-info">
                    <span className="mobile-step-badge badge-green">02</span>
                    <h3>Book an Ambulance Instantly</h3>
                    <p>Request an ambulance in seconds with real-time availability and instant confirmation. Fast, reliable emergency transportation when you need it most.</p>
                    <button className="mobile-feature-btn btn-green" onClick={() => window.open('https://wa.me/919063903355', '_blank')}>
                      <Calendar size={14} /> Book an Ambulance
                    </button>
                  </div>

                  <div className="mobile-feature-visual">
                    <div className="mobile-calendar-card-wrapper">
                      <img
                        src="/images/ambulance_booking_3d.png"
                        alt="Book an ambulance instantly 3D illustration"
                        className="mobile-feature-img"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Connection Line 2: Green with arrowhead at the end */}
                <div className="mobile-connecting-line">
                  <svg viewBox="0 0 375 65" fill="none" preserveAspectRatio="none">
                    <defs>
                      <marker
                        id="green-arrow"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2ec4b6" />
                      </marker>
                    </defs>
                    <path
                      d="M 290,0 C 290,32 165,24 165,40 C 165,56 85,48 85,65"
                      stroke="#2ec4b6"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                      markerEnd="url(#green-arrow)"
                    />
                  </svg>
                </div>

                {/* Item 03 */}
                <motion.div
                  className="mobile-feature-item item-3"
                  initial={{ opacity: 0, x: -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="mobile-feature-visual">
                    <div className="mobile-phone-card-wrapper">
                      <img
                        src="/images/physiotherapy_recovery_3d.png"
                        alt="Physiotherapy recovery session 3D illustration"
                        className="mobile-feature-img"
                      />
                    </div>
                  </div>

                  <div className="mobile-feature-info">
                    <span className="mobile-step-badge badge-purple">03</span>
                    <h3>Start Your Recovery Today</h3>
                    <p>Book a physiotherapy session with experienced specialists at your preferred time. Receive personalized care to restore movement, relieve pain, and improve mobility.</p>
                    <button className="mobile-feature-btn btn-purple" onClick={() => window.open('https://wa.me/919063903355', '_blank')}>
                      <Bell size={14} /> Book Physiotherapy
                    </button>
                  </div>
                </motion.div>

                {/* Trust Footer Bar */}
                <div className="mobile-features-trust-bar">
                  <div className="trust-bar-item">
                    <ShieldCheck size={14} className="trust-icon-blue" />
                    <span>Secure</span>
                  </div>
                  <div className="trust-bar-divider"></div>
                  <div className="trust-bar-item">
                    <Lock size={14} className="trust-icon-blue" />
                    <span>Transparent</span>
                  </div>
                  <div className="trust-bar-divider"></div>
                  <div className="trust-bar-item">
                    <Heart size={14} className="trust-icon-blue" />
                    <span>Patient First</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section id="how-it-works" className="section" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 2, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -20px 40px rgba(0,0,0,0.06)' }}>
            <div className="container">
              <div className="how-it-works-header">
                <span className="section-tag">HOW IT WORKS</span>
                <h2>Healthcare In 4 Simple Steps</h2>
                <p>Your path to seamless, queue-free healthcare with Linelekunda.</p>
              </div>

              <div className="horizontal-track-wrapper">
                <div className="horizontal-track">
                  {/* Step 1 */}
                  <div className="how-step-card horizontal-card">
                    <span className="step-number">01</span>
                    <div className="how-step-icon">
                      <Search size={22} />
                    </div>
                    <h3>Find Your Doctor</h3>
                    <p>Browse specializations, read verified reviews, and find the right care matching your schedule.</p>
                    <button
                      onClick={() => window.open('https://wa.me/919063903355', '_blank')}
                      className="how-step-link"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      Explore Directory <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Step 2 */}
                  <div className="how-step-card horizontal-card">
                    <span className="step-number">02</span>
                    <div className="how-step-icon">
                      <Calendar size={22} />
                    </div>
                    <h3>Book In Seconds</h3>
                    <p>Instant booking at your convenience. Pick a customized date and time. No phone calls required.</p>
                    <button
                      onClick={() => window.open('https://wa.me/919063903355', '_blank')}
                      className="how-step-link"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      Schedule Now <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Center Phone Mockup inside the horizontal flow */}
                  <div className="phone-horizontal-wrapper">
                    <div className="phone-mockup-glow"></div>
                    <div className="phone-mockup">
                      <img
                        src="/images/dashboard_phone.png"
                        alt="Linelekunda search app screen on smartphone frame"
                        className="phone-image animate-float"
                      />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="how-step-card horizontal-card">
                    <span className="step-number">03</span>
                    <div className="how-step-icon">
                      <Clock size={22} />
                    </div>
                    <h3>Skip The Queue</h3>
                    <p>Arrive when it is actually your turn. Monitor your live position in the virtual queue from anywhere.</p>
                    <button
                      onClick={() => window.open('https://wa.me/919063903355', '_blank')}
                      className="how-step-link"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      Track Live Queue <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Step 4 */}
                  <div className="how-step-card horizontal-card">
                    <span className="step-number">04</span>
                    <div className="how-step-icon">
                      <Bell size={22} />
                    </div>
                    <h3>Get Real-Time Updates</h3>
                    <p>Receive SMS alerts, push reminders, and notifications. Stay in sync with any emergency delays.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <img
                        src="/images/smartwatch_notification.png"
                        alt="Smartwatch updates illustration"
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-grey)', fontWeight: 600 }}>Wearable Alerts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BENEFITS SECTION */}
          <section id="benefits" className="section" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 3, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -20px 40px rgba(0,0,0,0.06)' }}>
            <div className="container">
              {/* Top Banner Mockup for Mobile view only */}
              <div className="benefits-top-mockup">
                <div className="benefits-top-mockup-inner">
                  <img
                    src="/images/queue_phone.png"
                    alt="Linelekunda digital queue app screen illustration"
                  />
                </div>
              </div>

              <div className="showcase-header">
                <h2>Why Customers Love Linelekunda</h2>
                <p>We designed our service to respect your time, simplify booking, and clear out waiting rooms.</p>
              </div>

              <motion.div
                className="benefits-layout"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.12 } },
                  hidden: {}
                }}
              >
                {/* Left Column: Cards 1 & 2 */}
                <div className="how-cards-column">
                  <motion.div
                    className="benefit-card float-3"
                    variants={{
                      hidden: { opacity: 0, x: -40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                  >
                    <div className="benefit-icon-wrapper">
                      <Clock size={24} />
                    </div>
                    <h3>Save Time</h3>
                    <p>Eliminate hours wasted sitting in clinics. Arrive right when your checkup slot begins.</p>
                  </motion.div>

                  <motion.div
                    className="benefit-card float-4"
                    variants={{
                      hidden: { opacity: 0, x: -40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } }
                    }}
                  >
                    <div className="benefit-icon-wrapper">
                      <Activity size={24} />
                    </div>
                    <h3>Live Tracking</h3>
                    <p>Know exactly how many patients are ahead of you with real-time digital queue refreshers.</p>
                  </motion.div>
                </div>

                {/* Center Column: App Mockup */}
                <div className="phone-mockup-wrapper">
                  <div className="phone-mockup-glow"></div>
                  <div className="phone-mockup">
                    <img
                      src="/images/physiotherapy_recovery_3d.png"
                      alt="Linelekunda healthcare app illustration"
                      className="phone-image animate-float"
                    />
                  </div>
                </div>

                {/* Right Column: Cards 3 & 4 */}
                <div className="how-cards-column">
                  <motion.div
                    className="benefit-card float-1"
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                  >
                    <div className="benefit-icon-wrapper">
                      <ShieldCheck size={24} />
                    </div>
                    <h3>Verified Doctors</h3>
                    <p>All medical staff undergo strict profile and credential verification processes.</p>
                  </motion.div>

                  <motion.div
                    className="benefit-card float-2"
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } }
                    }}
                  >
                    <div className="benefit-icon-wrapper">
                      <Bell size={24} />
                    </div>
                    <h3>Smart Notifications</h3>
                    <p>Receive SMS and app notifications before your appointment and if there are queue status shifts.</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* TESTIMONIALS SECTION */}
        <section className="section testimonials-section">
          <div className="container">
            <div className="showcase-header">
              <h2>What People Are Saying</h2>
              <p>Read review responses from patients, medical specialists, and clinical operators.</p>
            </div>

            <div
              className="coverflow-container"
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => {
                setIsTestimonialHovered(false);
                handleTestimonialMouseUpOrLeave();
              }}
              onTouchStart={handleTestimonialTouchStart}
              onTouchMove={handleTestimonialTouchMove}
              onMouseDown={handleTestimonialMouseDown}
              onMouseMove={handleTestimonialMouseMove}
              onMouseUp={handleTestimonialMouseUpOrLeave}
            >
              {/* Radial Glow behind Active Card */}
              <div
                className="coverflow-glow"
                style={{
                  transform: `translate(-50%, -50%) translateZ(-50px)`
                }}
              ></div>

              <div className="coverflow-track">
                {MOCK_TESTIMONIALS.map((item, idx) => {
                  const offset = getTestimonialOffset(idx);
                  const isActive = offset === 0;

                  const absOffset = Math.abs(offset);
                  const isMobile = windowWidth < 640;
                  const isTablet = windowWidth >= 640 && windowWidth < 1024;

                  const zIndex = 10 - absOffset;

                  let opacity = 1;
                  if (isMobile) {
                    opacity = offset === 0 ? 1 : (absOffset === 1 ? 0.35 : 0);
                  } else if (isTablet) {
                    opacity = absOffset === 0 ? 1 : (absOffset === 1 ? 0.75 : 0);
                  } else {
                    opacity = absOffset === 0 ? 1 : (absOffset === 1 ? 0.85 : (absOffset === 2 ? 0.45 : 0));
                  }

                  const scale = offset === 0 ? 1.18 : Math.max(0.6, 0.85 - (absOffset - 1) * 0.15);
                  const rotateY = offset === 0 ? 0 : (offset > 0 ? -30 : 30);

                  let translateX = 0;
                  if (offset !== 0) {
                    const direction = offset > 0 ? 1 : -1;
                    let spacingFactor = 220; // High-end spacing
                    if (isMobile) {
                      spacingFactor = 95;
                    } else if (isTablet) {
                      spacingFactor = 160;
                    }
                    translateX = direction * (spacingFactor + absOffset * 25);
                  }

                  const translateZ = offset === 0 ? 100 : -absOffset * 70;

                  return (
                    <motion.div
                      key={item.id}
                      className={`coverflow-card ${isActive ? 'active' : ''}`}
                      style={{
                        position: 'absolute',
                        width: '320px',
                        height: '380px',
                        zIndex: zIndex,
                        pointerEvents: opacity === 0 ? 'none' : 'auto',
                        cursor: isActive ? 'grab' : 'pointer',
                      }}
                      animate={{
                        x: translateX,
                        z: translateZ,
                        rotateY: rotateY,
                        scale: scale,
                        opacity: opacity
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 95,
                        damping: 18,
                        mass: 0.8
                      }}
                      onClick={() => {
                        if (!isActive) {
                          setActiveTestimonial(idx);
                        }
                      }}
                      whileHover={isActive ? {
                        y: -8,
                        scale: 1.20,
                        transition: { duration: 0.3 }
                      } : {}}
                    >
                      <div className="coverflow-card-inner">
                        <div>
                          <div className="stars">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <p className="testimonial-text">{item.text}</p>
                        </div>
                        <div className="testimonial-user">
                          <div className="user-avatar" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {item.avatar}
                          </div>
                          <div className="user-info">
                            <h4>{item.name}</h4>
                            <p>{item.role}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Dots Pagination Indicators */}
            <div className="coverflow-pagination">
              {MOCK_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  className={`coverflow-dot ${activeTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>



        {/* FAQ SECTION (ACCORDION) */}
        <section className="section">
          <div className="container">
            <div className="showcase-header">
              <h2>Frequently Asked Questions</h2>
              <p>Clear details on booking flow, rescheduling appointments, and queue status trackers.</p>
            </div>

            <motion.div
              className="faq-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {}
              }}
            >
              {/* FAQ 1 */}
              <motion.div
                className={`faq-item ${openFaq === 0 ? 'open' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                  <h3>How does booking work?</h3>
                  <Plus size={20} className="faq-icon" />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      style={{ overflow: 'hidden' }}
                      className="faq-answer"
                    >
                      <div className="faq-answer-content">
                        You simply click "Book Appointment", search for your doctor or specialty, pick an available day/time slot, enter your name and email, and confirm. You will instantly get a confirmed digital ticket with your time and doctor details.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* FAQ 2 */}
              <motion.div
                className={`faq-item ${openFaq === 1 ? 'open' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                  <h3>Can I reschedule my booking?</h3>
                  <Plus size={20} className="faq-icon" />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      style={{ overflow: 'hidden' }}
                      className="faq-answer"
                    >
                      <div className="faq-answer-content">
                        Yes, you can easily reschedule. Just click on your ticket receipt email, select a new date and time that suits you, and click "Confirm Reschedule". The calendar details will automatically refresh.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* FAQ 3 */}
              <motion.div
                className={`faq-item ${openFaq === 2 ? 'open' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <button className="faq-question-btn" onClick={() => toggleFaq(2)}>
                  <h3>Do doctors verify their profiles?</h3>
                  <Plus size={20} className="faq-icon" />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      style={{ overflow: 'hidden' }}
                      className="faq-answer"
                    >
                      <div className="faq-answer-content">
                        Absolutely. Every medical specialist on Linelekunda must supply credentials, licenses, and verified clinical qualifications before receiving the blue verified badge on their ID cards.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* FAQ 4 */}
              <motion.div
                className={`faq-item ${openFaq === 3 ? 'open' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <button className="faq-question-btn" onClick={() => toggleFaq(3)}>
                  <h3>How does queue tracking work?</h3>
                  <Plus size={20} className="faq-icon" />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      style={{ overflow: 'hidden' }}
                      className="faq-answer"
                    >
                      <div className="faq-answer-content">
                        When you check in, you join a virtual queue. Our system monitors live doctor checkups and counts down the number of patients ahead of you. You receive updates via SMS, allowing you to stay home or at work until your slot approaches.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
          {/* Subtle Aurora Background Overlay inside CTA */}
          <div className="cta-aurora-bg">
            <div className="cta-aurora-blob cta-aurora-blue"></div>
            <div className="cta-aurora-blob cta-aurora-purple"></div>
          </div>

          {/* Floating Blue Particles */}
          <div className="cta-particles">
            <div className="cta-particle particle-1"></div>
            <div className="cta-particle particle-2"></div>
            <div className="cta-particle particle-3"></div>
            <div className="cta-particle particle-4"></div>
          </div>

          <motion.div
            className="container cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2>Ready to Skip Waiting Rooms?</h2>
            <p>Join over 1 million customers saving time every day. Book your verified specialist and arrive when they are ready.</p>
            <div className="cta-actions">
              <button
                className="btn btn-primary btn-magnetic"
                onClick={() => {
                  setBookingStep(1);
                  setIsBookingOpen(true);
                }}
              >
                Book Appointment
              </button>
              <button
                className="btn btn-secondary btn-magnetic"
                onClick={() => window.open('https://wa.me/919063903355', '_blank')}
              >
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <motion.footer
        id="contact"
        className="footer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Wave Divider cutting into CTA */}
        <div className="footer-wave-container">
          <svg className="footer-wave-svg" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32 C240,70 480,70 720,32 C960,-6 1200,-6 1440,32 L1440,74 L0,74 Z" fill="var(--card-bg)" />
          </svg>
        </div>

        {/* Footer Grain overlay */}
        <div className="footer-grain-overlay"></div>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#home" className="logo-link">
                <img src="/logo.png" alt="LineLekunda Logo" style={{ height: '60px', width: 'auto' }} />
              </a>
              <p>We are making doctor discovery, appointment scheduling, and queue coordination instant, transparent, and waiting-room-free.</p>
            </div>

            <div className="footer-nav">
              <div className="footer-column">
                <h3>Navigations</h3>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>

                </ul>
              </div>

              <div className="footer-column">
                <h3>Legal</h3>
                <ul>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms & Conditions</a></li>
                  <li><a href="#refund-policy">Refund & Cancellation</a></li>
                  <li><a href="#home">Doctor Terms</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h3>Contact</h3>
                <ul>
                  <li><span style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>geethavani@linelekunda.com</span></li>
                  <li><span style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>+91 9063903355</span></li>
                  <li><span style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>Hyderabad, Telangana</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© Copyright 2026 Linelekunda LLC. All rights reserved.</p>
            <div className="socials">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://youtube.com" className="social-link" aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* =========================================
          INTERACTIVE SIMULATOR MODALS
      ========================================= */}

      {/* 1. DOCTOR DIRECTORY SEARCH MODAL */}
      {isSearchOpen && (
        <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsSearchOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="search-modal-body">
              <div className="search-header-group">
                <h2>Explore Verified Doctors</h2>
                <p>Filter by clinical specialty or search by doctor name to schedule appointments.</p>
              </div>

              <div className="search-bar-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search name, medical specialty..."
                  className="input-field search-input-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="specialty-tags">
                {specialties.map(spec => (
                  <button
                    key={spec}
                    className={`specialty-tag ${selectedSpecialty === spec ? 'active' : ''}`}
                    onClick={() => setSelectedSpecialty(spec)}
                  >
                    {spec}
                  </button>
                ))}
              </div>

              <motion.div
                className="doctors-list"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: {}
                }}
              >
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doc => (
                    <motion.div
                      key={doc.id}
                      className="doctor-item-row"
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                      }}
                      whileHover={{ y: -3, scale: 1.015, boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}
                    >
                      <div className="doctor-info-left">
                        <div className="doctor-avatar-circle">{doc.avatar}</div>
                        <div className="doctor-details">
                          <h4>
                            {doc.name}
                            {doc.verified && (
                              <span style={{ color: 'var(--primary)', marginLeft: '0.25rem', fontSize: '0.8rem' }}>✓</span>
                            )}
                          </h4>
                          <p>{doc.specialty} • {doc.experience} exp</p>
                          <div className="star-rating">
                            <Star size={10} fill="currentColor" /> {doc.rating} ({doc.reviews} reviews)
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => startBookingForDoctor(doc)}
                      >
                        Book
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-grey)' }}>
                    No doctors found matching "{searchQuery}"
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIRTUAL QUEUE SIMULATOR MODAL */}
      {isQueueOpen && (
        <div className="modal-overlay" onClick={() => setIsQueueOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsQueueOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="queue-modal-body">
              <div className="queue-header-group">
                <h2>Virtual Queue Tracker</h2>
                <p>Live simulator showing how Linelekunda monitors waiting status and alerts you when to arrive.</p>
              </div>

              <div className="queue-circle-display">
                <div className="queue-circle-text">
                  <span className="queue-position-num">{queuePos}</span>
                  <span className="queue-position-lbl">Ahead of you</span>
                </div>
              </div>

              <div className="queue-status-banner">
                <p>Status: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{queueStatus}</span></p>
                <div className="queue-progress-bar-bg">
                  <div
                    className="queue-progress-bar-fill"
                    style={{ width: `${((3 - queuePos) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Estimated arrival at clinic room in: <strong style={{ color: 'var(--text-dark)' }}>{estimatedWait} mins</strong>
              </p>

              <div className="queue-controls">
                {queuePos > 0 ? (
                  <button className="btn btn-primary" onClick={progressQueue}>
                    Next Patient (Progress Queue)
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={resetQueue}>
                    Re-join Queue (Restart)
                  </button>
                )}
                <button className="btn btn-dark" onClick={() => setIsQueueOpen(false)}>
                  Close Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MULTI-STEP BOOKING FLOW MODAL */}
      {isBookingOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsBookingOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="booking-modal-body">

              {/* STEP 1: Select Specialty */}
              {bookingStep === 1 && (
                <div>
                  <div className="booking-header-group">
                    <h2>Choose Medical Specialty</h2>
                    <p>Step 1 of 3: Select the specialty you need.</p>
                  </div>
                  <motion.div
                    className="doctors-list"
                    style={{ maxHeight: '400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                      hidden: {}
                    }}
                  >
                    {[
                      { name: 'Orthopaedics', icon: '🦴' },
                      { name: 'Cardiology', icon: '❤️' },
                      { name: 'Neurology', icon: '🧠' },
                      { name: 'Dermatology', icon: '✨' },
                      { name: 'Gastroenterology', icon: '🍏' },
                      { name: 'ENT', icon: '👂' },
                      { name: 'Pediatrics', icon: '👶' },
                      { name: 'Gynecology', icon: '🌸' },
                      { name: 'Pulmonology', icon: '🫁' },
                      { name: 'Urology', icon: '💧' },
                      { name: 'Ophthalmology', icon: '👁️' },
                      { name: 'General Physician', icon: '🩺' }
                    ].map(spec => (
                      <motion.div
                        key={spec.name}
                        className={`doctor-item-row ${bookingSpecialty === spec.name ? 'glass' : ''}`}
                        style={{ cursor: 'pointer', borderColor: bookingSpecialty === spec.name ? 'var(--primary)' : 'var(--border)', flexDirection: 'column', textAlign: 'center', padding: '1.5rem 1rem', borderRadius: '16px' }}
                        onClick={() => setBookingSpecialty(spec.name)}
                        variants={{
                          hidden: { opacity: 0, scale: 0.9 },
                          visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                        }}
                        whileHover={{ y: -4, scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{spec.icon}</div>
                        <h4 style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-dark)' }}>{spec.name}</h4>
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                          {bookingSpecialty === spec.name && <Check size={18} style={{ color: 'var(--primary)' }} />}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button className="btn btn-primary" onClick={() => { if(bookingSpecialty) setBookingStep(2); }} disabled={!bookingSpecialty}>
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Date */}
              {bookingStep === 2 && (
                <div>
                  <div className="booking-header-group">
                    <h2>Preferred Appointment Date</h2>
                    <p>Our care team will coordinate the best available appointment based on your preferred date.</p>
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <input
                      type="date"
                      className="input-field"
                      style={{ fontSize: '1.1rem', padding: '1rem', width: '100%', fontFamily: 'inherit', color: 'var(--text-dark)', cursor: 'text', appearance: 'none', WebkitAppearance: 'none' }}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                    <button className="btn btn-outline" onClick={() => setBookingStep(1)}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="btn btn-primary" onClick={() => setBookingStep(3)}>
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patient Information Form */}
              {bookingStep === 3 && (
                <form onSubmit={handleBookingSubmit}>
                  <div className="booking-header-group">
                    <h2>Patient Details</h2>
                    <p>Enter patient contact details to request an appointment.</p>
                  </div>

                  <div className="booking-form-fields">
                    <div className="booking-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="pname">Full Name:</label>
                      <input
                        type="text"
                        id="pname"
                        placeholder="John Doe"
                        className="input-field"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-form-group">
                      <label htmlFor="pphone">Phone Number:</label>
                      <input
                        type="tel"
                        id="pphone"
                        placeholder="+91 90000 00000"
                        className="input-field"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-form-group">
                      <label htmlFor="pemail">Email Address:</label>
                      <input
                        type="email"
                        id="pemail"
                        placeholder="johndoe@example.com"
                        className="input-field"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="pconcern">Health Concern (Optional):</label>
                      <textarea
                        id="pconcern"
                        placeholder="Briefly describe your symptoms or reason for consultation."
                        className="input-field"
                        style={{ minHeight: '60px', resize: 'vertical', paddingTop: '8px' }}
                        value={healthConcern}
                        onChange={(e) => setHealthConcern(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-grey)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p style={{ margin: 0 }}><strong>Specialty:</strong> <span style={{ color: 'var(--text-dark)' }}>{bookingSpecialty}</span></p>
                    <p style={{ margin: 0 }}><strong>Preferred Date:</strong> <span style={{ color: 'var(--text-dark)' }}>{bookingDate}</span></p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setBookingStep(2)}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Request Appointment <Check size={16} />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
