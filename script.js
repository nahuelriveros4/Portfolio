// Animación simple al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.stack-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = '0.6s ease-out';
        observer.observe(el);
    });
});

const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const button = form.querySelector('button');
    const originalText = button.innerText;
    button.innerText = "ENVIANDO...";
    button.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/xqedjrpd', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            button.innerText = "MENSAJE ENVIADO!";
            form.reset(); // Limpia el formulario
        } else {
            button.innerText = "ERROR. INTENTE NUEVAMENTE.";
        }
    } catch (error) {
        button.innerText = "FALLO LA CONEXIÓN.";
    } finally {
        setTimeout(() => {
            button.innerText = originalText;
            button.disabled = false;
        }, 3000);
    }
});