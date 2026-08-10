/* ==========================================================================
   Google Antigravity CLI — Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Blur Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Navigation Drawer ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuToggle && mobileDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        });
    }

    // --- 3. Terminal Interactive Tabs ---
    const terminalTabs = document.querySelectorAll('.terminal-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    terminalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPaneId = `pane-${tab.dataset.tab}`;
            
            // Remove active classes
            terminalTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to current tab & pane
            tab.classList.add('active');
            const targetPane = document.getElementById(targetPaneId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // --- 4. Copy to Clipboard Functionality ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-clipboard');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const tooltip = btn.querySelector('.copy-tooltip');
                    if (tooltip) {
                        tooltip.classList.add('show');
                        setTimeout(() => {
                            tooltip.classList.remove('show');
                        }, 2000);
                    } else {
                        // Visual feedback on button if tooltip missing
                        const originalHTML = btn.innerHTML;
                        btn.innerHTML = '<i data-lucide="check" style="color: #10b981;"></i>';
                        if (window.lucide) lucide.createIcons();
                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                            if (window.lucide) lucide.createIcons();
                        }, 2000);
                    }
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

    // --- 5. Smooth Scroll Offset adjustment for Fixed Header ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. Card Hover Glow Effect Follow Mouse ---
    const cards = document.querySelectorAll('.feature-card, .slash-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
