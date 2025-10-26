// Calculator Modal Logic
class PriceCalculator {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 6;
        this.formData = {};
        this.selectedCity = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div id="calculatorModal" class="calculator-modal">
                <div class="calculator-content">
                    <div class="calculator-header">
                        <h2>Расчет стоимости онлайн</h2>
                        <button class="calculator-close" onclick="calculator.closeModal()">&times;</button>
                    </div>
                    <div class="calculator-body">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="step-indicator">
                            ${Array.from({length: this.totalSteps}, (_, i) => 
                                `<div class="step-dot ${i === 0 ? 'active' : ''}" data-step="${i}"></div>`
                            ).join('')}
                        </div>
                        
                        <!-- Step 1: Тип клиента -->
                        <div class="form-step active" data-step="0">
                            <h3>Тип клиента</h3>
                            <div class="form-group">
                                <div class="radio-group">
                                    <div class="radio-option">
                                        <input type="radio" id="client_individual" name="clientType" value="individual">
                                        <label for="client_individual">Физическое лицо</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" id="client_business" name="clientType" value="business">
                                        <label for="client_business">Юридическое лицо / ИП</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Цели использования -->
                        <div class="form-step" data-step="1">
                            <h3>Для каких целей будут использоваться кольца?</h3>
                            <div class="form-group">
                                <div class="checkbox-group">
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="purpose_sewage" name="purpose" value="sewage">
                                        <label for="purpose_sewage">Канализация</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="purpose_water" name="purpose" value="water">
                                        <label for="purpose_water">Водоснабжение</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="purpose_drainage" name="purpose" value="drainage">
                                        <label for="purpose_drainage">Дренаж</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="purpose_well" name="purpose" value="well">
                                        <label for="purpose_well">Колодец</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="purpose_septic" name="purpose" value="septic">
                                        <label for="purpose_septic">Септик</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="purpose_other" name="purpose" value="other">
                                        <label for="purpose_other">Другое</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Уровень грунтовых вод -->
                        <div class="form-step" data-step="2">
                            <h3>Уровень грунтовых вод</h3>
                            <div class="form-group">
                                <div class="radio-group">
                                    <div class="radio-option">
                                        <input type="radio" id="water_high" name="waterLevel" value="high">
                                        <label for="water_high">Высокий (до 1м)</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" id="water_medium" name="waterLevel" value="medium">
                                        <label for="water_medium">Средний (1-3м)</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" id="water_low" name="waterLevel" value="low">
                                        <label for="water_low">Низкий (более 3м)</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" id="water_unknown" name="waterLevel" value="unknown">
                                        <label for="water_unknown">Не знаю</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 4: Технические параметры -->
                        <div class="form-step" data-step="3">
                            <h3>Технические параметры</h3>
                            <div class="form-group">
                                <label for="diameter">Диаметр колец (см)</label>
                                <select id="diameter" name="diameter">
                                    <option value="">Выберите диаметр</option>
                                    <option value="70">70 см</option>
                                    <option value="100">100 см</option>
                                    <option value="120">120 см</option>
                                    <option value="150">150 см</option>
                                    <option value="200">200 см</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="quantity">Количество колец</label>
                                <input type="number" id="quantity" name="quantity" min="1" max="50" placeholder="Введите количество">
                            </div>
                            <div class="form-group">
                                <label for="depth">Глубина установки (м)</label>
                                <input type="number" id="depth" name="depth" min="1" max="20" step="0.5" placeholder="Например: 3.5">
                            </div>
                        </div>

                        <!-- Step 5: Дополнительные услуги -->
                        <div class="form-step" data-step="4">
                            <h3>Дополнительные услуги</h3>
                            <div class="form-group">
                                <div class="checkbox-group">
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="service_delivery" name="services" value="delivery">
                                        <label for="service_delivery">Доставка</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="service_installation" name="services" value="installation">
                                        <label for="service_installation">Монтаж</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="service_excavation" name="services" value="excavation">
                                        <label for="service_excavation">Земляные работы</label>
                                    </div>
                                    <div class="checkbox-option">
                                        <input type="checkbox" id="service_waterproofing" name="services" value="waterproofing">
                                        <label for="service_waterproofing">Гидроизоляция</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="location">Адрес объекта</label>
                                <input type="text" id="location" name="location" placeholder="Город, район, населенный пункт">
                            </div>
                        </div>

                        <!-- Step 6: Контактные данные -->
                        <div class="form-step" data-step="5">
                            <h3>Контактные данные</h3>
                            <div class="form-group">
                                <label for="name">Имя *</label>
                                <input type="text" id="name" name="name" required placeholder="Ваше имя">
                            </div>
                            <div class="form-group">
                                <label for="phone">Телефон *</label>
                                <input type="tel" id="phone" name="phone" required placeholder="+375 (XX) XXX-XX-XX">
                            </div>
                            <div class="form-group">
                                <label for="city">Город *</label>
                                <input type="text" id="city" name="city" required placeholder="Ваш город">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="your@email.com">
                            </div>
                            <div class="form-group">
                                <label for="comments">Дополнительные комментарии</label>
                                <textarea id="comments" name="comments" rows="3" placeholder="Любая дополнительная информация..."></textarea>
                            </div>
                            
                            <div class="result-summary">
                                <h3>Предварительный расчет</h3>
                                <div id="calculationResult">
                                    <!-- Результат расчета будет добавлен здесь -->
                                </div>
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn btn-secondary" id="prevBtn" onclick="calculator.prevStep()" style="display: none;">
                                ← Назад
                            </button>
                            <button type="button" class="btn btn-primary" id="nextBtn" onclick="calculator.nextStep()">
                                Далее →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        // Привязка к кнопкам "Расчет стоимости онлайн"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cta-button') || 
                e.target.textContent.includes('Расчет стоимости онлайн')) {
                e.preventDefault();
                this.openModal();
            }
        });

        // Закрытие по клику вне модального окна
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('calculatorModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal() {
        const modal = document.getElementById('calculatorModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Если есть предзаполненный город, устанавливаем его
        if (this.selectedCity) {
            setTimeout(() => {
                const cityField = document.querySelector('#city');
                if (cityField) {
                    cityField.value = this.selectedCity;
                    cityField.readOnly = true;
                    cityField.style.background = 'rgba(255, 255, 255, 0.1)';
                    cityField.style.color = 'rgba(255, 255, 255, 0.8)';
                    cityField.style.cursor = 'not-allowed';
                }
            }, 100);
        }
    }

    closeModal() {
        const modal = document.getElementById('calculatorModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Сбрасываем предзаполненный город
        this.selectedCity = null;
        const cityField = document.querySelector('#city');
        if (cityField) {
            cityField.readOnly = false;
            cityField.style.background = '';
            cityField.style.color = '';
            cityField.style.cursor = '';
        }
        
        // Сброс формы
        setTimeout(() => {
            this.resetForm();
        }, 300);
    }

    resetForm() {
        this.currentStep = 0;
        this.formData = {};
        this.showStep(0);
        this.updateProgress();
        
        // Очистка всех полей
        const modal = document.getElementById('calculatorModal');
        const inputs = modal.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }

    nextStep() {
        console.log('Current step:', this.currentStep);
        const isValid = this.validateStep();
        console.log('Step valid:', isValid);
        
        if (isValid) {
            this.saveStepData();
            
            if (this.currentStep < this.totalSteps - 1) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgress();
            } else {
                this.submitForm();
            }
        } else {
            // Показать сообщение об ошибке
            this.showValidationError();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }

    showStep(step) {
        // Скрыть все шаги
        const steps = document.querySelectorAll('.form-step');
        steps.forEach(s => s.classList.remove('active'));
        
        // Показать текущий шаг
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Обновить кнопки навигации
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.style.display = step > 0 ? 'inline-flex' : 'none';
        nextBtn.textContent = step === this.totalSteps - 1 ? 'Отправить заявку' : 'Далее →';
        
        // Обновить индикатор шагов
        const dots = document.querySelectorAll('.step-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed');
            if (index < step) {
                dot.classList.add('completed');
            } else if (index === step) {
                dot.classList.add('active');
            }
        });

        // Если последний шаг, показать расчет
        if (step === this.totalSteps - 1) {
            this.calculatePrice();
        }
    }

    updateProgress() {
        const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${progress}%`;
    }

    validateStep() {
        const currentStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        console.log('Validating step element:', currentStepEl);
        
        switch (this.currentStep) {
            case 0: // Тип клиента
                const clientType = currentStepEl.querySelector('input[name="clientType"]:checked');
                console.log('Client type selected:', clientType);
                return clientType !== null;
            case 1: // Цели использования
                const purposes = currentStepEl.querySelectorAll('input[name="purpose"]:checked');
                console.log('Purposes selected:', purposes.length);
                return purposes.length > 0;
            case 2: // Уровень грунтовых вод
                const waterLevel = currentStepEl.querySelector('input[name="waterLevel"]:checked');
                console.log('Water level selected:', waterLevel);
                return waterLevel !== null;
            case 3: // Технические параметры
                const diameter = currentStepEl.querySelector('#diameter').value;
                const quantity = currentStepEl.querySelector('#quantity').value;
                console.log('Diameter:', diameter, 'Quantity:', quantity);
                return diameter && quantity && parseInt(quantity) > 0;
            case 4: // Дополнительные услуги
                return true; // Необязательный шаг
            case 5: // Контактные данные
                const name = currentStepEl.querySelector('#name').value.trim();
                const phone = currentStepEl.querySelector('#phone').value.trim();
                const city = currentStepEl.querySelector('#city').value.trim();
                console.log('Name:', name, 'Phone:', phone, 'City:', city);
                return name && phone && city;
            default:
                return true;
        }
    }

    showValidationError() {
        let message = '';
        switch (this.currentStep) {
            case 0:
                message = 'Пожалуйста, выберите тип клиента';
                break;
            case 1:
                message = 'Пожалуйста, выберите хотя бы одну цель использования';
                break;
            case 2:
                message = 'Пожалуйста, укажите уровень грунтовых вод';
                break;
            case 3:
                message = 'Пожалуйста, заполните диаметр и количество колец';
                break;
            case 5:
                message = 'Пожалуйста, заполните имя, телефон и город';
                break;
        }
        
        if (message) {
            // Создать временное уведомление
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ef4444;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 3000;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }

    saveStepData() {
        const currentStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const inputs = currentStepEl.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!this.formData[input.name]) {
                    this.formData[input.name] = [];
                }
                if (input.checked) {
                    this.formData[input.name].push(input.value);
                }
            } else if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }

    calculatePrice() {
        // Базовые цены (примерные)
        const basePrices = {
            70: 150,   // BYN за кольцо
            100: 200,
            120: 280,
            150: 350,
            200: 500
        };

        const servicePrices = {
            delivery: 50,      // за доставку
            installation: 100, // за кольцо
            excavation: 80,    // за м³
            waterproofing: 30  // за кольцо
        };

        let totalPrice = 0;
        let breakdown = [];

        // Стоимость колец
        const diameter = this.formData.diameter;
        const quantity = parseInt(this.formData.quantity) || 0;
        
        if (diameter && quantity) {
            const ringPrice = basePrices[diameter] || 200;
            const ringsTotal = ringPrice * quantity;
            totalPrice += ringsTotal;
            breakdown.push({
                item: `Кольца ${diameter}см x ${quantity}шт`,
                price: ringsTotal
            });
        }

        // Дополнительные услуги
        if (this.formData.services) {
            this.formData.services.forEach(service => {
                let servicePrice = 0;
                let serviceName = '';
                
                switch (service) {
                    case 'delivery':
                        servicePrice = servicePrices.delivery;
                        serviceName = 'Доставка';
                        break;
                    case 'installation':
                        servicePrice = servicePrices.installation * quantity;
                        serviceName = `Монтаж (${quantity} колец)`;
                        break;
                    case 'excavation':
                        const depth = parseFloat(this.formData.depth) || 3;
                        const volume = Math.PI * Math.pow(parseInt(diameter)/200, 2) * depth;
                        servicePrice = Math.round(servicePrices.excavation * volume);
                        serviceName = `Земляные работы (~${volume.toFixed(1)}м³)`;
                        break;
                    case 'waterproofing':
                        servicePrice = servicePrices.waterproofing * quantity;
                        serviceName = `Гидроизоляция (${quantity} колец)`;
                        break;
                }
                
                if (servicePrice > 0) {
                    totalPrice += servicePrice;
                    breakdown.push({
                        item: serviceName,
                        price: servicePrice
                    });
                }
            });
        }

        // Отображение результата
        const resultEl = document.getElementById('calculationResult');
        let resultHTML = '';
        
        breakdown.forEach(item => {
            resultHTML += `
                <div class="summary-item">
                    <span>${item.item}</span>
                    <span>${item.price} BYN</span>
                </div>
            `;
        });
        
        resultHTML += `
            <div class="summary-item">
                <span><strong>Итого (предварительно):</strong></span>
                <span><strong>${totalPrice} BYN</strong></span>
            </div>
        `;
        
        resultEl.innerHTML = resultHTML;
    }

    submitForm() {
        // Сохранить данные последнего шага
        this.saveStepData();
        
        // Здесь можно отправить данные на сервер
        console.log('Form data:', this.formData);
        
        // Показать сообщение об успехе
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время для уточнения деталей и окончательного расчета стоимости.');
        
        this.closeModal();
    }
}

// Инициализация калькулятора
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new PriceCalculator();
});
