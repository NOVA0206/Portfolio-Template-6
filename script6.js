// Particle System
class ParticleSystem {
  constructor() {
    this.particles = []
    this.container = document.getElementById("particles-container")
    this.init()
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.createParticle()
    }
    this.animate()
  }

  createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"

    const size = Math.random() * 4 + 1
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight
    const duration = Math.random() * 3 + 2

    particle.style.width = size + "px"
    particle.style.height = size + "px"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.animationDuration = duration + "s"

    this.container.appendChild(particle)
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    })
  }

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

      particle.element.style.left = particle.x + "px"
      particle.element.style.top = particle.y + "px"
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Navigation
class Navigation {
  constructor() {
    this.navbar = document.querySelector(".navbar")
    this.hamburger = document.querySelector(".hamburger")
    this.navMenu = document.querySelector(".nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")

    this.init()
  }

  init() {
    this.hamburger.addEventListener("click", () => this.toggleMenu())
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu())
    })

    window.addEventListener("scroll", () => this.handleScroll())
  }

  toggleMenu() {
    this.navMenu.classList.toggle("active")
    this.hamburger.classList.toggle("active")
  }

  closeMenu() {
    this.navMenu.classList.remove("active")
    this.hamburger.classList.remove("active")
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.style.background = "rgba(10, 10, 10, 0.95)"
    } else {
      this.navbar.style.background = "rgba(10, 10, 10, 0.9)"
    }
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), { threshold: 0.1 })
    this.init()
  }

  init() {
    const elements = document.querySelectorAll(".text-card, .project-card, .skill-category, .contact-item")
    elements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(50px)"
      this.observer.observe(el)
    })
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "all 0.8s ease"
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }
}

// Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number")
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), { threshold: 0.5 })
    this.init()
  }

  init() {
    this.counters.forEach((counter) => {
      this.observer.observe(counter)
    })
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateCounter(entry.target)
        this.observer.unobserve(entry.target)
      }
    })
  }

  animateCounter(counter) {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        counter.textContent = target
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current)
      }
    }, 16)
  }
}

// Skills Animation
class SkillsAnimation {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-item")
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), { threshold: 0.5 })
    this.init()
  }

  init() {
    this.skillBars.forEach((skill) => {
      this.observer.observe(skill)
    })
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target.getAttribute("data-skill")
        const progressBar = entry.target.querySelector(".skill-progress")

        setTimeout(() => {
          progressBar.style.width = skillLevel + "%"
        }, 200)

        this.observer.unobserve(entry.target)
      }
    })
  }
}

// 3D Cube Interaction
class CubeInteraction {
  constructor() {
    this.cube = document.querySelector(".cube")
    this.isMouseDown = false
    this.mouseX = 0
    this.mouseY = 0
    this.rotationX = 0
    this.rotationY = 0

    this.init()
  }

  init() {
    if (this.cube) {
      this.cube.addEventListener("mousedown", (e) => this.handleMouseDown(e))
      document.addEventListener("mousemove", (e) => this.handleMouseMove(e))
      document.addEventListener("mouseup", () => this.handleMouseUp())
    }
  }

  handleMouseDown(e) {
    this.isMouseDown = true
    this.mouseX = e.clientX
    this.mouseY = e.clientY
    this.cube.style.animationPlayState = "paused"
  }

  handleMouseMove(e) {
    if (!this.isMouseDown) return

    const deltaX = e.clientX - this.mouseX
    const deltaY = e.clientY - this.mouseY

    this.rotationY += deltaX * 0.5
    this.rotationX -= deltaY * 0.5

    this.cube.style.transform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`

    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  handleMouseUp() {
    this.isMouseDown = false
    setTimeout(() => {
      this.cube.style.animationPlayState = "running"
    }, 2000)
  }
}

// Form Handler
class FormHandler {
  constructor() {
    this.form = document.querySelector(".contact-form")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    // Add loading state
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!"
      submitBtn.style.background = "linear-gradient(135deg, #00ff00, #00aa00)"

      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.background = ""
        this.form.reset()
      }, 2000)
    }, 1500)
  }
}

// Parallax Effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll(".hero-3d, .floating-cube")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll())
  }

  handleScroll() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    this.elements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`
    })
  }
}

// Mouse Trail Effect
class MouseTrail {
  constructor() {
    this.trail = []
    this.maxTrail = 20
    this.init()
  }

  init() {
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e))
  }

  handleMouseMove(e) {
    this.trail.push({ x: e.clientX, y: e.clientY, time: Date.now() })

    if (this.trail.length > this.maxTrail) {
      this.trail.shift()
    }

    this.updateTrail()
  }

  updateTrail() {
    const now = Date.now()

    this.trail.forEach((point, index) => {
      const age = now - point.time
      const opacity = Math.max(0, 1 - age / 1000)

      if (opacity > 0) {
        this.createTrailDot(point.x, point.y, opacity, index)
      }
    })
  }

  createTrailDot(x, y, opacity, index) {
    const existing = document.querySelector(`#trail-${index}`)
    if (existing) {
      existing.style.left = x + "px"
      existing.style.top = y + "px"
      existing.style.opacity = opacity
      return
    }

    const dot = document.createElement("div")
    dot.id = `trail-${index}`
    dot.style.position = "fixed"
    dot.style.left = x + "px"
    dot.style.top = y + "px"
    dot.style.width = "4px"
    dot.style.height = "4px"
    dot.style.background = "var(--primary-color)"
    dot.style.borderRadius = "50%"
    dot.style.pointerEvents = "none"
    dot.style.zIndex = "9999"
    dot.style.opacity = opacity
    dot.style.transition = "opacity 0.1s ease"

    document.body.appendChild(dot)

    setTimeout(() => {
      if (dot.parentNode) {
        dot.parentNode.removeChild(dot)
      }
    }, 1000)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ParticleSystem()
  new Navigation()
  new SmoothScroll()
  new AnimationObserver()
  new CounterAnimation()
  new SkillsAnimation()
  new CubeInteraction()
  new FormHandler()
  new ParallaxEffect()
  new MouseTrail()

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Handle window resize
window.addEventListener("resize", () => {
  // Reinitialize particles on resize
  const container = document.getElementById("particles-container")
  container.innerHTML = ""
  new ParticleSystem()
})

// Add some extra interactive effects
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor")
  if (!cursor) {
    const newCursor = document.createElement("div")
    newCursor.className = "cursor"
    newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `
    document.body.appendChild(newCursor)
  }

  const cursorElement = document.querySelector(".cursor")
  cursorElement.style.left = e.clientX - 10 + "px"
  cursorElement.style.top = e.clientY - 10 + "px"
})

// Add hover effects for interactive elements
document.querySelectorAll("button, a, .project-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const cursor = document.querySelector(".cursor")
    if (cursor) {
      cursor.style.transform = "scale(2)"
      cursor.style.background = "radial-gradient(circle, var(--secondary-color), transparent)"
    }
  })

  element.addEventListener("mouseleave", () => {
    const cursor = document.querySelector(".cursor")
    if (cursor) {
      cursor.style.transform = "scale(1)"
      cursor.style.background = "radial-gradient(circle, var(--primary-color), transparent)"
    }
  })
})
