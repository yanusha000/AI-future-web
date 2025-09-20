// Futuristic AI Website JavaScript
// Enhanced with 3D animations, typing effects, and AI API integration

document.addEventListener("DOMContentLoaded", function () {
    // Initialize loading screen
    initializeLoadingScreen();

    // Initialize theme
    initializeTheme();

    // Initialize typing animation
    initializeTypingAnimation();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize navigation
    initializeNavigation();

    // Initialize 3D background
    initialize3DBackground();

    // Initialize neural network animation
    initializeNeuralNetwork();

    // Initialize chat functionality
    initializeChatSystem();

    // Initialize stats counter
    initializeStatsCounter();

    // Initialize tilt effects
    initializeTiltEffects();

    // Initialize particle systems
    initializeParticleSystem();

    // Initialize discover more click handler
    initializeDiscoverMore();
});

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    const loadingProgress = document.querySelector(".loading-progress");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingProgress || !loadingText) return;

    const loadingSteps = [
        "Initializing Neural Networks...",
        "Loading AI Models...",
        "Connecting to Quantum Processors...",
        "Calibrating Intelligence Systems...",
        "Ready to Transform the Future!",
    ];

    let currentStep = 0;
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                document.body.classList.add("loaded");
            }, 500);
        }

        loadingProgress.style.width = `${progress}%`;

        if (
            progress > (currentStep + 1) * 20 &&
            currentStep < loadingSteps.length - 1
        ) {
            currentStep++;
            loadingText.textContent = loadingSteps[currentStep];
        }
    }, 100);
}

// Fixed Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = themeToggle?.querySelector(".sun");
    const moonIcon = themeToggle?.querySelector(".moon");

    if (!themeToggle || !sunIcon || !moonIcon) return;

    // Get saved theme or default to dark
    let currentTheme = "dark";
    try {
        if (typeof Storage !== "undefined") {
            currentTheme = localStorage.getItem("theme") || "dark";
        }
    } catch (e) {
        console.warn("localStorage not available, using default theme");
    }

    // Apply initial theme
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcons(currentTheme);

    // Theme toggle functionality with smooth transition
    themeToggle.addEventListener("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";

        // Add transition class for smooth theme switching
        document.documentElement.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        document.documentElement.setAttribute("data-theme", currentTheme);
        
        try {
            if (typeof Storage !== "undefined") {
                localStorage.setItem("theme", currentTheme);
            }
        } catch (e) {
            console.warn("Could not save theme preference");
        }
        
        updateThemeIcons(currentTheme);

        // Remove transition class after animation
        setTimeout(() => {
            document.documentElement.style.transition = "";
        }, 300);
    });

    function updateThemeIcons(theme) {
        if (theme === "dark") {
            sunIcon.style.opacity = "1";
            sunIcon.style.transform = "rotate(0deg) scale(1)";
            moonIcon.style.opacity = "0";
            moonIcon.style.transform = "rotate(180deg) scale(0.5)";
        } else {
            sunIcon.style.opacity = "0";
            sunIcon.style.transform = "rotate(-180deg) scale(0.5)";
            moonIcon.style.opacity = "1";
            moonIcon.style.transform = "rotate(0deg) scale(1)";
        }
    }
}

// Enhanced Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.getElementById("typing-text");
    const cursor = document.querySelector(".cursor");

    if (!typingElement || !cursor) return;

    const messages = [
        "The Future is AI",
        "Artificial Intelligence", 
        "Smart Technology",
        "Innovation Unleashed",
        "Tomorrow, Today",
        "Neural Networks",
        "Machine Learning",
        "Deep Learning",
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 2000;

    function typeMessage() {
        const currentMessage = messages[messageIndex];

        if (isTyping && !isDeleting) {
            if (charIndex < currentMessage.length) {
                typingElement.textContent += currentMessage.charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, typingSpeed + Math.random() * 50);
            } else {
                isTyping = false;
                setTimeout(() => {
                    isDeleting = true;
                    typeMessage();
                }, pauseDelay);
            }
        } else if (isDeleting) {
            if (charIndex > 0) {
                typingElement.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeMessage, deletingSpeed);
            } else {
                isDeleting = false;
                isTyping = true;
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(typeMessage, typingSpeed);
            }
        }

        // Animate cursor
        cursor.style.animation = "none";
        cursor.offsetHeight; // Trigger reflow
        cursor.style.animation = "blink 1s infinite";
    }

    typeMessage();
}

// Enhanced Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                // Trigger specific animations for different elements
                if (entry.target.classList.contains("stat-item")) {
                    animateStatsCounter(entry.target);
                }

                if (entry.target.classList.contains("neural-network-3d")) {
                    startNeuralAnimation();
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document
        .querySelectorAll(
            ".fade-in, .animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3",
        )
        .forEach((el) => {
            observer.observe(el);
        });

    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const navbar = document.getElementById("navbar");
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Add navbar hide/show effect (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = "translateY(-100%)";
            } else {
                navbar.style.transform = "translateY(0)";
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    window.addEventListener("beforeunload", function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Enhanced Neural Network Animation
function initializeNeuralNetwork() {
    const neuralNetwork = document.querySelector(".neural-network-3d");
    if (!neuralNetwork) return;

    const nodes = document.querySelectorAll(".node");
    const svg = document.querySelector(".connections-svg");

    // Create connections between layers
    function createConnections() {
        const inputNodes = document.querySelectorAll('[data-layer="input"]');
        const hiddenNodes = document.querySelectorAll('[data-layer="hidden"]');
        const outputNodes = document.querySelectorAll('[data-layer="output"]');

        let connections = "";

        // Input to hidden connections
        inputNodes.forEach((inputNode, i) => {
            hiddenNodes.forEach((hiddenNode, j) => {
                const inputRect = inputNode.getBoundingClientRect();
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = inputRect.left + inputRect.width / 2 - svgRect.left;
                const y1 = inputRect.top + inputRect.height / 2 - svgRect.top;
                const x2 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y2 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j) * 100}"/>`;
            });
        });

        // Hidden to output connections
        hiddenNodes.forEach((hiddenNode, i) => {
            outputNodes.forEach((outputNode, j) => {
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const outputRect = outputNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y1 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;
                const x2 = outputRect.left + outputRect.width / 2 - svgRect.left;
                const y2 = outputRect.top + outputRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j + 10) * 100}"/>`;
            });
        });

        svg.innerHTML = connections;
    }

    function startNeuralAnimation() {
        createConnections();

        // Animate connections
        const connectionLines = document.querySelectorAll(".connection-line");
        connectionLines.forEach((line, index) => {
            const delay = parseInt(line.getAttribute("data-delay"));
            setTimeout(() => {
                line.style.stroke = "rgba(0, 237, 238, 0.6)";
                line.style.strokeWidth = "2";

                setTimeout(() => {
                    line.style.stroke = "rgba(0, 237, 238, 0.3)";
                    line.style.strokeWidth = "1";
                }, 500);
            }, delay);
        });

        // Animate nodes
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.transform = "scale(1.2)";
                node.style.boxShadow = "0 0 30px rgba(0, 237, 238, 0.8)";

                setTimeout(() => {
                    node.style.transform = "scale(1)";
                    node.style.boxShadow = "0 0 20px rgba(0, 237, 238, 0.6)";
                }, 300);
            }, index * 100);
        });
    }

    // Trigger animation on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startNeuralAnimation();
                    setInterval(startNeuralAnimation, 5000); // Repeat every 5 seconds
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(neuralNetwork);
}

// Enhanced Chat System
function initializeChatSystem() {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const typingIndicator = document.getElementById("typing-indicator");
    const clearChatBtn = document.querySelector(".clear-chat");

    if (!chatInput || !sendBtn || !chatMessages) return;

    let isTyping = false;

    // Enable/disable send button based on input
    chatInput.addEventListener("input", function () {
        sendBtn.disabled = this.value.trim() === "" || isTyping;
    });

    // Send message on Enter key
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey && !isTyping) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener("click", sendMessage);

    // Clear chat functionality
    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", clearChat);
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;

        // Add user message
        addMessage(message, "user");
        chatInput.value = "";
        sendBtn.disabled = true;
        isTyping = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            // Try to call the AI API
            const response = await fetch(
                `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(message)}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success && data.result && data.result.prompt) {
                // Simulate typing delay for more natural feel
                setTimeout(
                    () => {
                        hideTypingIndicator();
                        addMessage(data.result.prompt, "bot");
                        isTyping = false;
                        sendBtn.disabled = chatInput.value.trim() === "";
                    },
                    800 + Math.random() * 1200, // Random delay between 0.8-2 seconds
                );
            } else {
                throw new Error("API response error or invalid format");
            }
        } catch (error) {
            console.warn("AI API not available, using fallback responses:", error.message);
            // Fallback to local responses
            const fallbackResponse = generateFallbackResponse(message);
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(fallbackResponse, "bot");
                isTyping = false;
                sendBtn.disabled = chatInput.value.trim() === "";
                
                // Add a subtle indicator that this is a fallback response
                const lastMessage = chatMessages.lastElementChild;
                if (lastMessage) {
                    const statusIndicator = document.createElement("div");
                    statusIndicator.style.cssText = `
                        font-size: 0.7rem;
                        color: var(--text-muted);
                        opacity: 0.6;
                        margin-top: 0.3rem;
                        font-style: italic;
                    `;
                    statusIndicator.textContent = "• Offline response";
                    lastMessage.querySelector(".message-content").appendChild(statusIndicator);
                }
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.innerHTML = sender === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement("div");
        content.className = "message-content";

        const messageText = document.createElement("p");
        messageText.textContent = text;

        const timestamp = document.createElement("div");
        timestamp.className = "message-time";
        timestamp.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        content.appendChild(messageText);
        content.appendChild(timestamp);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Animate message appearance
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateY(20px)";
        requestAnimationFrame(() => {
            messageDiv.style.transition = "all 0.3s ease";
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "translateY(0)";
        });
    }

    function showTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.classList.add("show");
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function hideTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.classList.remove("show");
        }
    }

    function generateFallbackResponse(message) {
        const responses = {
            hello: "Hello! I'm your AI assistant. How can I help you explore the fascinating world of artificial intelligence?",
            hi: "Hi there! I'm here to help you understand AI and its applications. What would you like to know?",
            ai: "Artificial Intelligence is revolutionizing our world by enabling machines to learn, reason, and make decisions. It's transforming industries from healthcare to transportation.",
            "machine learning": "Machine Learning is a subset of AI that allows systems to learn and improve from experience without being explicitly programmed. It powers everything from recommendation systems to autonomous vehicles.",
            future: "The future of AI is incredibly exciting! We're moving towards more intelligent automation, personalized experiences, and AI-human collaboration that will solve complex global challenges.",
            help: "I'm here to help you understand AI and its applications! Feel free to ask me about artificial intelligence, machine learning, neural networks, or any technology topics.",
            "neural networks": "Neural networks are computing systems inspired by biological neural networks. They're the foundation of deep learning and power applications like image recognition and natural language processing.",
            robots: "AI-powered robots are becoming increasingly sophisticated, from industrial automation to personal assistants. They're designed to work alongside humans to enhance productivity and safety.",
            technology: "AI technology is advancing rapidly, with breakthroughs in areas like natural language processing, computer vision, and reinforcement learning creating new possibilities every day.",
            default: "That's an interesting question! AI technology continues to evolve rapidly, opening new possibilities for innovation and problem-solving across countless industries.",
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }

    function clearChat() {
        const userMessages = chatMessages.querySelectorAll(".user-message");
        userMessages.forEach((msg) => {
            msg.style.transition = "all 0.3s ease";
            msg.style.opacity = "0";
            msg.style.transform = "translateX(-100%)";
            setTimeout(() => msg.remove(), 300);
        });

        // Keep the welcome message but remove other bot messages
        const botMessages = chatMessages.querySelectorAll(".bot-message");
        if (botMessages.length > 1) {
            for (let i = 1; i < botMessages.length; i++) {
                botMessages[i].style.transition = "all 0.3s ease";
                botMessages[i].style.opacity = "0";
                botMessages[i].style.transform = "translateX(100%)";
                setTimeout(() => botMessages[i].remove(), 300);
            }
        }
    }
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(element) {
        const target = parseInt(element.getAttribute("data-count"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + "M+";
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + "K+";
            } else {
                element.textContent = Math.floor(current) + (target === 92 ? "%" : "+");
            }
        }, 16);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector(".stat-number");
                    if (statNumber && !statNumber.classList.contains("animated")) {
                        statNumber.classList.add("animated");
                        animateCounter(statNumber);
                    }
                }
            });
        },
        { threshold: 0.5 },
    );

    document.querySelectorAll(".stat-item").forEach((stat) => {
        observer.observe(stat);
    });
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll("[data-tilt]");

    tiltElements.forEach((element) => {
        let isHovering = false;

        element.addEventListener("mouseenter", function () {
            this.style.transformStyle = "preserve-3d";
            isHovering = true;
        });

        element.addEventListener("mousemove", function (e) {
            if (!isHovering) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener("mouseleave", function () {
            isHovering = false;
            this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });
}

// Enhanced Particle System
function initializeParticleSystem() {
    const heroParticles = document.getElementById("hero-particles");
    if (!heroParticles) return;

    let particleInterval;

    function createParticle() {
        const particle = document.createElement("div");
        particle.className = "hero-particle";
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 237, 238, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float-up 4s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 10px rgba(0, 237, 238, 0.8);
        `;

        heroParticles.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 4000);
    }

    // Create particles periodically
    particleInterval = setInterval(createParticle, 300);

    // Add CSS for particle animation if not exists
    if (!document.getElementById("particle-styles")) {
        const style = document.createElement("style");
        style.id = "particle-styles";
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-300px) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-600px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Cleanup function
    window.addEventListener("beforeunload", function() {
        if (particleInterval) {
            clearInterval(particleInterval);
        }
    });
}

// Utility Functions
function scrollToChat() {
    const chatSection = document.getElementById("chat");
    if (chatSection) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = chatSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    }
}

function clearChat() {
    const chatMessages = document.getElementById("chat-messages");
    if (!chatMessages) return;

    const userMessages = chatMessages.querySelectorAll(".user-message");
    userMessages.forEach((msg) => {
        msg.style.transition = "all 0.3s ease";
        msg.style.opacity = "0";
        msg.style.transform = "translateX(-100%)";
        setTimeout(() => msg.remove(), 300);
    });

    // Keep the welcome message but remove other bot messages
    const botMessages = chatMessages.querySelectorAll(".bot-message");
    if (botMessages.length > 1) {
        for (let i = 1; i < botMessages.length; i++) {
            botMessages[i].style.transition = "all 0.3s ease";
            botMessages[i].style.opacity = "0";
            botMessages[i].style.transform = "translateX(100%)";
            setTimeout(() => botMessages[i].remove(), 300);
        }
    }
}

// Contact Form Enhancement
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validate form data
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert("Please fill in all fields.");
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
                submitBtn.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                    contactForm.reset();
                    
                    // Reset form labels
                    const labels = contactForm.querySelectorAll('label');
                    labels.forEach(label => {
                        label.style.top = "1rem";
                        label.style.fontSize = "";
                        label.style.color = "var(--text-muted)";
                        label.style.fontWeight = "";
                    });
                }, 2000);
            }, 1500);
        });
    }
});

// Performance optimization and cleanup
window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Lazy load images and optimize performance
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "https://api.dreaded.site/api/chatgpt";
    document.head.appendChild(link);
});

// Error handling for better UX
window.addEventListener("error", function(e) {
    console.warn("JavaScript error caught:", e.error);
    // Don't show error to user, but log it for debugging
});

// Handle visibility changes for performance
document.addEventListener("visibilitychange", function() {
    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        if (document.hidden) {
            // Pause animations when tab is not visible
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});("scroll", function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.getElementById("navbar").offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // Close mobile menu if open
                const navMenu = document.getElementById("nav-menu");
                const hamburger = document.getElementById("hamburger");
                if (navMenu && hamburger) {
                    navMenu.classList.remove("active");
                    hamburger.classList.remove("active");
                    resetHamburgerIcon(hamburger);
                }
            }
        });
    });
}

// Fixed Navigation
function initializeNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll("span");
        if (hamburger.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[1].style.transform = "translateX(20px)";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        } else {
            resetHamburgerIcon(hamburger);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            resetHamburgerIcon(hamburger);
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            resetHamburgerIcon(hamburger);
        });
    });

    // Add active link highlighting
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    function resetHamburgerIcon(hamburger) {
        const spans = hamburger.querySelectorAll("span");
        spans.forEach((span) => {
            span.style.transform = "none";
            span.style.opacity = "1";
        });
    }
}

// Fixed Discover More Click Handler
function initializeDiscoverMore() {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const mouse = document.querySelector(".mouse");
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const navbarHeight = document.getElementById("navbar").offsetHeight;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
        
        // Make it more obvious that it's clickable
        scrollIndicator.style.cursor = "pointer";
    }
    
    if (mouse) {
        mouse.addEventListener("click", function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const navbarHeight = document.getElementById("navbar").offsetHeight;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
        
        mouse.style.cursor = "pointer";
    }
}

// 3D Background Animation
function initialize3DBackground() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle3D {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 1000;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.vz = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(0, 237, 238, ${this.opacity})`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.z += this.vz;

            // 3D perspective calculation
            const scale = 500 / (500 + this.z);
            this.screenX = this.x * scale + canvas.width / 2;
            this.screenY = this.y * scale + canvas.height / 2;
            this.screenSize = this.size * scale;

            // Reset particles that are too far
            if (this.z > 1000 || this.z < -500) {
                this.z = -500;
                this.x = (Math.random() - 0.5) * canvas.width;
                this.y = (Math.random() - 0.5) * canvas.height;
            }

            // Wrap around edges
            if (this.x < -canvas.width / 2) this.x = canvas.width / 2;
            if (this.x > canvas.width / 2) this.x = -canvas.width / 2;
            if (this.y < -canvas.height / 2) this.y = canvas.height / 2;
            if (this.y > canvas.height / 2) this.y = -canvas.height / 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.screenX, this.screenY, this.screenSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00EDEE";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor(canvas.width / 15));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle3D());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].screenX - particles[j].screenX;
                const dy = particles[i].screenY - particles[j].screenY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].screenX, particles[i].screenY);
                    ctx.lineTo(particles[j].screenX, particles[j].screenY);
                    ctx.strokeStyle = `rgba(0, 237, 238, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

// Enhanced Neural Network Animation
function initializeNeuralNetwork() {
    const neuralNetwork = document.querySelector(".neural-network-3d");
    if (!neuralNetwork) return;

    const nodes = document.querySelectorAll(".node");
    const svg = document.querySelector(".connections-svg");

    // Create connections between layers
    function createConnections() {
        const inputNodes = document.querySelectorAll('[data-layer="input"]');
        const hiddenNodes = document.querySelectorAll('[data-layer="hidden"]');
        const outputNodes = document.querySelectorAll('[data-layer="output"]');

        let connections = "";

        // Input to hidden connections
        inputNodes.forEach((inputNode, i) => {
            hiddenNodes.forEach((hiddenNode, j) => {
                const inputRect = inputNode.getBoundingClientRect();
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = inputRect.left + inputRect.width / 2 - svgRect.left;
                const y1 = inputRect.top + inputRect.height / 2 - svgRect.top;
                const x2 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y2 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j) * 100}"/>`;
            });
        });

        // Hidden to output connections
        hiddenNodes.forEach((hiddenNode, i) => {
            outputNodes.forEach((outputNode, j) => {
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const outputRect = outputNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y1 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;
                const x2 = outputRect.left + outputRect.width / 2 - svgRect.left;
                const y2 = outputRect.top + outputRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j + 10) * 100}"/>`;
            });
        });

        svg.innerHTML = connections;
    }

    function startNeuralAnimation() {
        createConnections();

        // Animate connections
        const connectionLines = document.querySelectorAll(".connection-line");
        connectionLines.forEach((line, index) => {
            const delay = parseInt(line.getAttribute("data-delay"));
            setTimeout(() => {
                line.style.stroke = "rgba(0, 237, 238, 0.6)";
                line.style.strokeWidth = "2";

                setTimeout(() => {
                    line.style.stroke = "rgba(0, 237, 238, 0.3)";
                    line.style.strokeWidth = "1";
                }, 500);
            }, delay);
        });

        // Animate nodes
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.transform = "scale(1.2)";
                node.style.boxShadow = "0 0 30px rgba(0, 237, 238, 0.8)";

                setTimeout(() => {
                    node.style.transform = "scale(1)";
                    node.style.boxShadow = "0 0 20px rgba(0, 237, 238, 0.6)";
                }, 300);
            }, index * 100);
        });
    }

    // Trigger animation on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startNeuralAnimation();
                    setInterval(startNeuralAnimation, 5000); // Repeat every 5 seconds
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(neuralNetwork);
}

// Enhanced Chat System
function initializeChatSystem() {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const typingIndicator = document.getElementById("typing-indicator");
    const clearChatBtn = document.querySelector(".clear-chat");

    let isTyping = false;

    // Enable/disable send button based on input
    chatInput.addEventListener("input", function () {
        sendBtn.disabled = this.value.trim() === "" || isTyping;
    });

    // Send message on Enter key
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey && !isTyping) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener("click", sendMessage);

    // Clear chat functionality
    clearChatBtn.addEventListener("click", clearChat);

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;

        // Add user message
        addMessage(message, "user");
        chatInput.value = "";
        sendBtn.disabled = true;
        isTyping = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            // Call the AI API
            const response = await fetch(
                `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(message)}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success && data.result && data.result.prompt) {
                // Simulate typing delay for more natural feel
                setTimeout(
                    () => {
                        hideTypingIndicator();
                        addMessage(data.result.prompt, "bot");
                        isTyping = false;
                        sendBtn.disabled = chatInput.value.trim() === "";
                    },
                    800 + Math.random() * 1200, // Random delay between 0.8-2 seconds
                );
            } else {
                throw new Error("API response error or invalid format");
            }
        } catch (error) {
            console.error("AI API Error:", error);
            // Fallback to local responses with enhanced error handling
            const fallbackResponse = generateFallbackResponse(message);
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(fallbackResponse, "bot");
                isTyping = false;
                sendBtn.disabled = chatInput.value.trim() === "";
                
                // Add a subtle indicator that this is a fallback response
                const lastMessage = chatMessages.lastElementChild;
                if (lastMessage) {
                    const statusIndicator = document.createElement("div");
                    statusIndicator.style.cssText = `
                        font-size: 0.7rem;
                        color: var(--text-muted);
                        opacity: 0.6;
                        margin-top: 0.3rem;
                        font-style: italic;
                    `;
                    statusIndicator.textContent = "• Offline response";
                    lastMessage.querySelector(".message-content").appendChild(statusIndicator);
                }
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.innerHTML = sender === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement("div");
        content.className = "message-content";

        const messageText = document.createElement("p");
        messageText.textContent = text;

        const timestamp = document.createElement("div");
        timestamp.className = "message-time";
        timestamp.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        content.appendChild(messageText);
        content.appendChild(timestamp);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Animate message appearance
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateY(20px)";
        setTimeout(() => {
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "translateY(0)";
        }, 10);
    }

    function showTypingIndicator() {
        typingIndicator.classList.add("show");
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        typingIndicator.classList.remove("show");
    }

    function generateFallbackResponse(message) {
        const responses = {
            hello: "Hello! I'm your AI assistant. How can I help you explore the fascinating world of artificial intelligence?",
            ai: "Artificial Intelligence is revolutionizing our world by enabling machines to learn, reason, and make decisions. It's transforming industries from healthcare to transportation.",
            "machine learning": "Machine Learning is a subset of AI that allows systems to learn and improve from experience without being explicitly programmed. It powers everything from recommendation systems to autonomous vehicles.",
            future: "The future of AI is incredibly exciting! We're moving towards more intelligent automation, personalized experiences, and AI-human collaboration that will solve complex global challenges.",
            help: "I'm here to help you understand AI and its applications! Feel free to ask me about artificial intelligence, machine learning, neural networks, or any technology topics.",
            default: "That's an interesting question! AI technology continues to evolve rapidly, opening new possibilities for innovation and problem-solving across countless industries.",
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }

    function clearChat() {
        const userMessages = chatMessages.querySelectorAll(".user-message");
        userMessages.forEach((msg) => msg.remove());

        // Keep the welcome message
        const botMessages = chatMessages.querySelectorAll(".bot-message");
        if (botMessages.length > 1) {
            for (let i = 1; i < botMessages.length; i++) {
                botMessages[i].remove();
            }
        }
    }
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(element) {
        const target = parseInt(element.getAttribute("data-count"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + "K+";
            } else {
                element.textContent = Math.floor(current) + (target === 99 ? "%" : "+");
            }
        }, 16);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector(".stat-number");
                    if (statNumber && !statNumber.classList.contains("animated")) {
                        statNumber.classList.add("animated");
                        animateCounter(statNumber);
                    }
                }
            });
        },
        { threshold: 0.5 },
    );

    document.querySelectorAll(".stat-item").forEach((stat) => {
        observer.observe(stat);
    });
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll("[data-tilt]");

    tiltElements.forEach((element) => {
        element.addEventListener("mouseenter", function () {
            this.style.transformStyle = "preserve-3d";
        });

        element.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener("mouseleave", function () {
            this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });
}

// Enhanced Particle System
function initializeParticleSystem() {
    const heroParticles = document.getElementById("hero-particles");
    if (!heroParticles) return;

    function createParticle() {
        const particle = document.createElement("div");
        particle.className = "hero-particle";
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 237, 238, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float-up 4s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 10px rgba(0, 237, 238, 0.8);
        `;

        heroParticles.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 4000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Add CSS for particle animation
    if (!document.getElementById("particle-styles")) {
        const style = document.createElement("style");
        style.id = "particle-styles";
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-300px) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-600px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
function scrollToChat() {
    document.getElementById("chat").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

function clearChat() {
    const chatMessages = document.getElementById("chat-messages");
    const userMessages = chatMessages.querySelectorAll(".user-message");
    userMessages.forEach((msg) => msg.remove());

    // Keep the welcome message
    const botMessages = chatMessages.querySelectorAll(".bot-message");
    if (botMessages.length > 1) {
        for (let i = 1; i < botMessages.length; i++) {
            botMessages[i].remove();
        }
    }
}

// Contact Form Enhancement
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});

// Performance optimization
window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Lazy load images and optimize performance
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }
});