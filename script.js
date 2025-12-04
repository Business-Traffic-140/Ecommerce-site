
        document.addEventListener('DOMContentLoaded', () => {
            const hamburgerBtn = document.getElementById('hamburger-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            // Desktop Dropdown Elements
            const dropdownToggle = document.querySelector('.dropdown-container .btn-effect'); // Target the button inside the container
            const dropdownMenu = document.querySelector('.dropdown-menu');

            // Mobile Dropdown Elements
            const mobileCountryToggle = document.getElementById('mobile-country-toggle');
            const mobileCountryMenu = document.getElementById('mobile-country-menu');


            // 1. Responsive Screen Logic (500px breakpoint)
            const mediaQuery = window.matchMedia('(max-width: 500px)');

            function handleScreenSizeChange(e) {
                if (!e.matches) {
                    // Desktop View (> 500px): Ensure mobile menu is closed
                    mobileMenu.classList.remove('active');
                    hamburgerBtn.classList.remove('open');
                }
            }
            handleScreenSizeChange(mediaQuery);
            mediaQuery.addListener(handleScreenSizeChange);

            // 2. Hamburger Menu Toggle
            if (hamburgerBtn && mobileMenu) {
                hamburgerBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('active');
                    hamburgerBtn.classList.toggle('open');
                    // Ensure mobile country menu is closed when main menu opens/closes
                    if (mobileCountryMenu) {
                        mobileCountryMenu.style.display = 'none';
                    }
                });
            }
            
            // 3. Desktop Dropdown Toggle Logic
            function closeDropdown(e) {
                // Check if the click was outside the menu and the button
                if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
                    dropdownMenu.classList.remove('visible');
                    dropdownToggle.classList.remove('open');
                    document.removeEventListener('click', closeDropdown);
                }
            }
            
            if (dropdownToggle && dropdownMenu) {
                dropdownToggle.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    
                    const isVisible = dropdownMenu.classList.contains('visible');

                    if (isVisible) {
                        dropdownMenu.classList.remove('visible');
                        dropdownToggle.classList.remove('open');
                        document.removeEventListener('click', closeDropdown);
                    } else {
                        dropdownMenu.classList.add('visible');
                        dropdownToggle.classList.add('open');
                        
                        // Close if clicking outside
                        e.stopPropagation(); 
                        document.addEventListener('click', closeDropdown);
                    }
                });
            }

            // 4. Mobile Sub-Menu Toggle Logic
            if (mobileCountryToggle && mobileCountryMenu) {
                mobileCountryToggle.addEventListener('click', () => {
                    const isVisible = mobileCountryMenu.style.display === 'block';
                    mobileCountryMenu.style.display = isVisible ? 'none' : 'block';
                });
            }
        });
