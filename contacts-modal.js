// Contacts Modal Logic
class ContactsModal {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <!-- Contacts Modal Overlay -->
            <div id="contactsModalOverlay" class="contacts-modal-overlay"></div>
            
            <!-- Contacts Modal -->
            <div id="contactsModal" class="contacts-modal">
                <div class="contacts-modal-header">
                    <h2>Контакты</h2>
                    <button class="contacts-modal-close" onclick="contactsModal.closeModal()">×</button>
                </div>
                
                <div class="contacts-modal-body">
                    <!-- Phone Numbers and Email -->
                    <div class="contact-section">
                        <h3>Контакты</h3>
                        <div class="contact-item">
                            <a href="tel:+375291234567" class="phone-link">+375 (29) 123-45-67</a>
                            <a href="tel:+375333456789" class="phone-link">+375 (33) 345-67-89</a>
                            <div class="work-time">Работаем ежедневно с 8:00 до 22:00</div>
                            <a href="mailto:info@aquaforge.by" class="email-link">info@aquaforge.by</a>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="contact-section social-section">
                        <h3>Мы в социальных сетях</h3>
                        <div class="social-icons">
                            <a href="https://wa.me/375291234567" class="social-icon" title="WhatsApp" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </a>
                            <a href="https://t.me/aquaforge_by" class="social-icon" title="Telegram" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com/aquaforge_by" class="social-icon" title="Instagram" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-icon" title="VK">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.299.574-1.491c.584-.189 1.336 1.256 2.131 1.812.602.421 1.06.329 1.06.329l2.126-.03s1.111-.071.584-.957c-.043-.073-.308-.659-1.587-1.863-1.339-1.26-1.16-1.057.453-3.237.982-1.328 1.375-2.138 1.252-2.485-.117-.331-.841-.244-.841-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.211.263-.211.263s-.377 1.02-.879 1.888c-1.058 1.829-1.482 1.926-1.656 1.812-.403-.267-.302-1.074-.302-1.647 0-1.791.267-2.537-.521-2.731-.262-.064-.454-.107-1.123-.114-.859-.009-1.587.003-1.998.208-.274.137-.485.442-.356.459.159.022.519.099.71.363.247.341.238 1.106.238 1.106s.142 2.109-.331 2.371c-.325.18-.77-.187-1.725-1.865-.489-.849-.859-1.786-.859-1.786s-.071-.177-.198-.272c-.154-.115-.37-.152-.37-.152l-2.276.015s-.342.01-.467.161c-.111.134-.009.411-.009.411s1.777 4.234 3.788 6.37c1.843 1.96 3.933 1.831 3.933 1.831h.949z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        // Привязка к ссылкам "Контакты"
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Проверяем различные варианты ссылок на контакты
            if (target.matches('a[href*="contact"]') || 
                target.matches('a[href="contacts.html"]') ||
                target.textContent.includes('Контакты') ||
                target.textContent.includes('контакты')) {
                
                e.preventDefault();
                this.openModal();
            }
        });

        // Закрытие по клику на overlay
        document.addEventListener('click', (e) => {
            const overlay = document.getElementById('contactsModalOverlay');
            if (e.target === overlay) {
                this.closeModal();
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });

        // Предотвращение закрытия при клике внутри модального окна
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('contactsModal');
            if (modal && modal.contains(e.target)) {
                e.stopPropagation();
            }
        });
    }

    openModal() {
        const modal = document.getElementById('contactsModal');
        const overlay = document.getElementById('contactsModalOverlay');
        
        if (modal && overlay) {
            overlay.classList.add('show');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
        }
    }

    closeModal() {
        const modal = document.getElementById('contactsModal');
        const overlay = document.getElementById('contactsModalOverlay');
        
        if (modal && overlay) {
            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            this.isOpen = false;
        }
    }
}

// Инициализация модального окна контактов
let contactsModal;
document.addEventListener('DOMContentLoaded', () => {
    contactsModal = new ContactsModal();
});
