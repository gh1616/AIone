import { useEffect, useState } from 'react'
import './index.css'

/* ===================== 导航 ===================== */
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#contact', idx: '', label: '联系' },
    { href: 'https://github.com/gh1616', idx: '↗', label: 'GitHub' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="logo">
        <span className="accent">~/</span>AIone<span className="blink">_</span>
      </a>
      <div className="nav-links">
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="nav-link"
            {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {l.idx && <span className="idx">{l.idx}</span>}{l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ===================== 终端卡片（打字机效果） ===================== */
const TERMINAL_SCRIPT: Array<{ t: string; cmd?: boolean; mail?: boolean }> = [
  { t: '$ whoami', cmd: true },
  { t: 'Rick · Full-Stack Developer' },
  { t: '' },
  { t: '$ cat stack.txt', cmd: true },
  { t: 'React · TypeScript · Node.js · Python' },
  { t: '' },
  { t: '$ echo $status', cmd: true },
  { t: 'Open to work ✓' },
  { t: '' },
  { t: '$ ./contact', cmd: true },
  { t: 'rick1639@yeah.net', mail: true },
]

function Terminal() {
  const [line, setLine] = useState(0)
  const [ch, setCh] = useState(0)
  const done = line >= TERMINAL_SCRIPT.length

  useEffect(() => {
    if (done) return
    const cur = TERMINAL_SCRIPT[line].t
    if (ch < cur.length) {
      const id = setTimeout(() => setCh(c => c + 1), 24)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => { setLine(l => l + 1); setCh(0) }, 320)
    return () => clearTimeout(id)
  }, [line, ch, done])

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dot r"></span>
        <span className="dot y"></span>
        <span className="dot g"></span>
        <span className="terminal-title">ai_one@localhost: ~</span>
      </div>
      <div className="terminal-body">
        {TERMINAL_SCRIPT.slice(0, line).map((l, i) => (
          <div key={i}>
            {l.t === '' ? '\u00A0' : (
              <span className={l.cmd ? 'term-prompt' : l.mail ? 'term-mail' : 'term-out'}>{l.t}</span>
            )}
          </div>
        ))}
        {!done && (
          <div>
            <span className={TERMINAL_SCRIPT[line].cmd ? 'term-prompt' : TERMINAL_SCRIPT[line].mail ? 'term-mail' : 'term-out'}>
              {TERMINAL_SCRIPT[line].t.slice(0, ch)}
            </span>
            <span className="cursor-block"></span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ===================== Hero ===================== */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="fade-up">
          <p className="hero-kicker">
            <span className="accent">$</span> ./init_personal_site --project=<span className="accent">AIone</span>
          </p>
          <h1 className="hero-title">
            AIone<span className="dim">.</span>
          </h1>
          <p className="hero-tagline">MINIMAL · GEEK · CRAFTED</p>
          <p className="hero-desc">
            你好，我是 <strong>Rick</strong>，一名全栈开发者。热爱用代码解决真实问题，
            专注 Web 与 AI 的交叉领域，相信简洁本身就是一种力量。
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">联系我</a>
            <a href="https://github.com/gh1616" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub ↗</a>
          </div>
          <div className="hero-status">
            <span className="status-dot"></span>
            Available for new opportunities
          </div>
        </div>
        <div className="fade-up"><Terminal /></div>
      </div>
    </section>
  )
}

/* ===================== 联系 ===================== */
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact-wrap">
        <div className="section-head fade-up">
          <div className="section-label" style={{ justifyContent: 'center' }}>联系</div>
          <h2 className="section-title">Keep in Touch</h2>
        </div>
        <a className="contact-email fade-up" href="mailto:rick1639@yeah.net">
          rick1639@yeah.net
        </a>
        <p className="contact-note">Whether it's a collaboration, a quick chat, or just to say hi — my inbox is always open.</p>
        <div className="contact-links">
          <a className="contact-link" href="mailto:rick1639@yeah.net">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Email
          </a>
          <a className="contact-link" href="https://github.com/gh1616" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.906-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>
          <a className="contact-link" href="https://twitter.com" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X / Twitter
          </a>
        </div>
      </div>
    </section>
  )
}

/* ===================== 页脚 ===================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="brand">
          <span className="accent">~/</span>AIone — Rick 的个人主页
        </span>
        <span>© 2026 AIone · rick1639@yeah.net</span>
      </div>
    </footer>
  )
}

/* ===================== 应用入口 ===================== */
function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navigation />
      <Hero />
      <Contact />
      <Footer />
    </>
  )
}

export default App
