// SACH CARS - Official Self-Drive Rental Interactive Controller (sachcars.com)

// Authentic Fleet Data Matrix from sachcars.com
const fleetData = [
  {
    id: 'thar-4x4',
    name: 'Mahindra Thar 4x4 Hardtop',
    category: 'offroad',
    categoryLabel: '4x4 Offroad SUV',
    image: 'assets/thar_front_real.png',
    rate12h: 2400,
    rate: 3800,
    deposit: 5000,
    fuel: 'Diesel / Petrol',
    transmission: 'Automatic / Manual',
    seats: 4,
    power: '150 BHP',
    badge: 'Most Popular 4x4',
    desc: 'Iconic 4x4 offroad SUV built for Kerala mountain roads, Munnar, Wayanad & coastal highways.'
  },
  {
    id: 'bmw-3series',
    name: 'BMW 3 Series M Sport',
    category: 'luxury',
    categoryLabel: 'Executive Luxury Sedan',
    image: 'assets/bmw_luxury.png',
    rate12h: 5500,
    rate: 8500,
    deposit: 15000,
    fuel: '2.0L Turbo Petrol',
    transmission: '8-Speed Steptronic',
    seats: 5,
    power: '258 BHP',
    badge: 'Ultra Luxury',
    desc: 'Executive German engineering delivering unmatched comfort, prestige, and high-performance driving.'
  },
  {
    id: 'fortuner-legender',
    name: 'Toyota Fortuner Legender',
    category: 'suv',
    categoryLabel: '7-Seater Premium SUV',
    image: 'assets/fortuner_suv.png',
    rate12h: 3800,
    rate: 5500,
    deposit: 10000,
    fuel: '2.8L Turbo Diesel',
    transmission: '6-Speed Automatic',
    seats: 7,
    power: '201 BHP',
    badge: 'Flagship SUV',
    desc: 'Commanding road presence with luxury 7-seater space for VIP tours, wedding arrivals, and long family trips.'
  },
  {
    id: 'creta-sx',
    name: 'Hyundai Creta SX Auto',
    category: 'suv',
    categoryLabel: 'Compact SUV',
    image: 'assets/creta_suv.png',
    rate12h: 1800,
    rate: 2600,
    deposit: 3000,
    fuel: 'Petrol / Diesel',
    transmission: 'CVT Automatic',
    seats: 5,
    power: '115 BHP',
    badge: 'Best Value SUV',
    desc: 'Panoramic sunroof, ventilated seating, and supreme comfort. Kochi Airport favorite.'
  },
  {
    id: 'baleno-alpha',
    name: 'Maruti Suzuki Baleno Alpha',
    category: 'hatchback',
    categoryLabel: 'Premium Hatchback',
    image: 'assets/baleno_hatchback.png',
    rate12h: 1100,
    rate: 1600,
    deposit: 2500,
    fuel: 'Petrol DualJet',
    transmission: 'Automatic / Manual',
    seats: 5,
    power: '89 BHP',
    badge: 'Eco Efficient',
    desc: 'High mileage economic hatchback with 360-degree camera & HUD. Excellent for city commutes.'
  },
  {
    id: 's1000rr-bike',
    name: 'BMW S1000RR Superbike',
    category: 'bike',
    categoryLabel: 'Liter Class Superbike',
    image: 'assets/superbike.png',
    rate12h: 3000,
    rate: 4500,
    deposit: 10000,
    fuel: 'High Octane Petrol',
    transmission: '6-Speed Quickshifter',
    seats: 2,
    power: '205 BHP',
    badge: 'Superbike Series',
    desc: 'Pure adrenaline with Kerala premier self-drive superbike. Dual-channel ABS & quickshifter.'
  }
];

// Initialize UI Elements on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  setupDates();
  renderFleet('all');
  setupEventListeners();
  calculateEstimatedPrice();
  setupHubSwitcher();
  setupFAQAccordion();
  setupMobileNav();
  initScrollAnimations();
  initRealVehicleShowroom();
});

function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const drawerCloseBtn = document.getElementById('navDrawerClose');
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMenu);
  }

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeMenu();
  });
}

// Setup Scroll Animations Observer
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Real Vehicle Interactive Photography Inspector
const showroomPerspectives = [
  {
    img: 'assets/thar_front_real.png',
    tag: '📷 REAL PHOTO: FRONT STUDIO VIEW',
    title: 'Mahindra Thar 4x4 Front Stance',
    desc: 'High ground clearance, iconic vertical grille, and LED projector headlights built for offroad adventure.'
  },
  {
    img: 'assets/thar_side_real.png',
    tag: '📷 REAL PHOTO: SIDE PROFILE ANGLE',
    title: 'Thar 4x4 Hardtop Side Profile',
    desc: 'All-terrain alloy wheels, 226mm water wading depth, and rugged hardtop body styling.'
  },
  {
    img: 'assets/bmw_luxury.png',
    tag: '📷 REAL PHOTO: EXECUTIVE LUXURY SEDAN',
    title: 'BMW 3 Series M Sport',
    desc: 'German luxury engineering, leather upholstery, and twin-turbo acceleration.'
  },
  {
    img: 'assets/fortuner_suv.png',
    tag: '📷 REAL PHOTO: FLAGSHIP 7-SEATER SUV',
    title: 'Toyota Fortuner Legender',
    desc: 'Dominating road presence, 2.8L diesel engine, and plush 7-seater interior comfort.'
  }
];

let currentPerspectiveIndex = 0;

function initRealVehicleShowroom() {
  const container = document.getElementById('realShowroomContainer');
  const imgElem = document.getElementById('realShowroomImg');
  const tagElem = document.getElementById('realShowroomTag');
  const titleElem = document.getElementById('showroomTitle');
  const descElem = document.getElementById('showroomDesc');
  const hotspotCards = document.querySelectorAll('.hotspot-card');

  if (!imgElem || !tagElem) return;

  hotspotCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      hotspotCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      switchPerspective(idx);
    });
  });

  let startX = 0;
  if (container) {
    container.addEventListener('mousedown', (e) => { startX = e.clientX; });
    container.addEventListener('mouseup', (e) => {
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          nextPerspective();
        } else {
          prevPerspective();
        }
      }
    });

    container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    container.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          nextPerspective();
        } else {
          prevPerspective();
        }
      }
    });
  }
}

function nextPerspective() {
  currentPerspectiveIndex = (currentPerspectiveIndex + 1) % showroomPerspectives.length;
  updateHotspotActiveState(currentPerspectiveIndex);
  switchPerspective(currentPerspectiveIndex);
}

function prevPerspective() {
  currentPerspectiveIndex = (currentPerspectiveIndex - 1 + showroomPerspectives.length) % showroomPerspectives.length;
  updateHotspotActiveState(currentPerspectiveIndex);
  switchPerspective(currentPerspectiveIndex);
}

function updateHotspotActiveState(index) {
  const hotspotCards = document.querySelectorAll('.hotspot-card');
  hotspotCards.forEach((card, idx) => {
    if (idx === index) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function switchPerspective(index) {
  currentPerspectiveIndex = index;
  const p = showroomPerspectives[index];
  const imgElem = document.getElementById('realShowroomImg');
  const tagElem = document.getElementById('realShowroomTag');
  const titleElem = document.getElementById('showroomTitle');
  const descElem = document.getElementById('showroomDesc');

  if (imgElem && p) {
    imgElem.classList.add('fade-out');
    setTimeout(() => {
      imgElem.src = p.img;
      if (tagElem) tagElem.textContent = p.tag;
      if (titleElem) titleElem.textContent = p.title;
      if (descElem) descElem.textContent = p.desc;
      imgElem.classList.remove('fade-out');
    }, 200);
  }
}

// Setup Dates
function setupDates() {
  const pickupInput = document.getElementById('pickupDate');
  const returnInput = document.getElementById('returnDate');

  if (pickupInput && returnInput) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const defaultReturn = new Date(tomorrow);
    defaultReturn.setDate(tomorrow.getDate() + 3);

    pickupInput.value = tomorrow.toISOString().slice(0, 16);
    returnInput.value = defaultReturn.toISOString().slice(0, 16);
  }
}

// Render Fleet Grid
function renderFleet(filterCategory) {
  const fleetGrid = document.getElementById('fleetGrid');
  if (!fleetGrid) return;

  fleetGrid.innerHTML = '';

  const filtered = filterCategory === 'all' 
    ? fleetData 
    : fleetData.filter(item => item.category === filterCategory);

  filtered.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = `car-card reveal-on-scroll reveal-delay-${(index % 3) + 1}`;
    card.setAttribute('data-category', car.category);

    card.innerHTML = `
      <div class="car-thumb">
        <img src="${car.image}" alt="${car.name}" class="car-img">
        <div class="car-badge">${car.badge}</div>
        <div class="car-price-tag">₹${car.rate.toLocaleString('en-IN')}<span style="font-size:0.7rem; color:var(--brand-black);">/day</span></div>
      </div>
      <div class="car-body">
        <div class="car-category-label">${car.categoryLabel}</div>
        <h3 class="car-title">${car.name}</h3>
        <p class="car-subtitle">${car.desc}</p>
        
        <div class="car-specs-grid">
          <div class="spec-cell">
            <div class="spec-icon">⚡</div>
            <div class="spec-val">${car.power}</div>
          </div>
          <div class="spec-cell">
            <div class="spec-icon">⚙️</div>
            <div class="spec-val">${car.transmission}</div>
          </div>
          <div class="spec-cell">
            <div class="spec-icon">💺</div>
            <div class="spec-val">${car.seats} Seats</div>
          </div>
        </div>

        <div class="car-footer">
          <button class="btn-standard btn-primary inspect-btn" onclick="openCarModal('${car.id}')">
            <span>Inspect & Reserve</span> ➔
          </button>
        </div>
      </div>
    `;
    fleetGrid.appendChild(card);
  });

  initScrollAnimations();
}

// Setup Event Listeners
function setupEventListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-filter');
      renderFleet(cat);
    });
  });

  // Segmented Plan Control
  const segmentBtns = document.querySelectorAll('#planSegmentedControl .segment-btn');
  const packageTypeSelect = document.getElementById('packageTypeSelect');
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const plan = btn.getAttribute('data-plan');
      if (packageTypeSelect) {
        packageTypeSelect.value = plan;
        calculateEstimatedPrice();
      }
    });
  });

  const pickupInput = document.getElementById('pickupDate');
  const returnInput = document.getElementById('returnDate');
  const vehicleSelect = document.getElementById('vehicleSelect');
  const kmPackageSelect = document.getElementById('kmPackageSelect');
  const airportDeliveryCheckbox = document.getElementById('airportDeliveryCheckbox');
  const promoInput = document.getElementById('promoInput');

  [pickupInput, returnInput, vehicleSelect, packageTypeSelect, kmPackageSelect, airportDeliveryCheckbox, promoInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('change', calculateEstimatedPrice);
      elem.addEventListener('input', calculateEstimatedPrice);
    }
  });
}

// Price Calculation Logic using sachcars.com formula
function calculateEstimatedPrice() {
  const pickupInput = document.getElementById('pickupDate');
  const returnInput = document.getElementById('returnDate');
  const vehicleSelect = document.getElementById('vehicleSelect');
  const packageTypeSelect = document.getElementById('packageTypeSelect');
  const kmPackageSelect = document.getElementById('kmPackageSelect');
  const airportDeliveryCheckbox = document.getElementById('airportDeliveryCheckbox');
  const promoInput = document.getElementById('promoInput');

  const daysValElem = document.getElementById('calcDaysVal');
  const totalValElem = document.getElementById('calcTotalVal');

  if (!pickupInput || !returnInput || !vehicleSelect) return;

  const start = new Date(pickupInput.value);
  const end = new Date(returnInput.value);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    if (daysValElem) daysValElem.textContent = 'Invalid Dates';
    if (totalValElem) totalValElem.textContent = '₹0';
    return;
  }

  const diffHours = Math.abs(end - start) / 36e5;
  const pkgType = packageTypeSelect?.value || '24h';

  let days = 1;
  if (pkgType === '12h') {
    days = 0.5;
  } else {
    days = Math.max(1, Math.ceil(diffHours / 24));
  }

  const selectedVehId = vehicleSelect.value;
  const vehicle = fleetData.find(v => v.id === selectedVehId) || fleetData[0];

  let baseRate = (pkgType === '12h') ? vehicle.rate12h : vehicle.rate;
  
  // Kilometer Package calculation
  const kmPkg = kmPackageSelect?.value || '150km';
  let kmFeePerDay = 0;
  if (kmPkg === 'unlimited') {
    kmFeePerDay = 400; // ₹400/day for unlimited KM
  } else if (kmPkg === '300km') {
    kmFeePerDay = 200; // ₹200/day for 300km package
  }

  let totalFare = (baseRate + kmFeePerDay) * (pkgType === '12h' ? 1 : days);

  // Airport delivery fee
  if (airportDeliveryCheckbox && airportDeliveryCheckbox.checked) {
    totalFare += 300;
  }

  // Promo coupon discount OFF300
  const promoCode = (promoInput?.value || '').trim().toUpperCase();
  let discountMsg = '';
  if (promoCode === 'OFF300') {
    totalFare = Math.max(0, totalFare - 300);
    discountMsg = ' (Promo OFF300 Applied: -₹300)';
  }

  if (daysValElem) daysValElem.textContent = (pkgType === '12h') ? '12 Hours' : `${days} Day${days > 1 ? 's' : ''}`;
  if (totalValElem) totalValElem.textContent = `₹${totalFare.toLocaleString('en-IN')}`;

  const whatsappBtn = document.getElementById('whatsappBookingBtn');
  if (whatsappBtn) {
    const location = document.getElementById('pickupLocation')?.value || 'Kochi HQ';
    const message = encodeURIComponent(
      `Hello SACH CARS, I want to reserve a self-drive rental:\n` +
      `• Vehicle: ${vehicle.name}\n` +
      `• Pickup Location: ${location}\n` +
      `• Rental Option: ${pkgType === '12h' ? '12 Hours Package' : days + ' Days Rental'}\n` +
      `• Km Package: ${kmPkg.toUpperCase()}\n` +
      `• Airport Pickup Fee: ${airportDeliveryCheckbox?.checked ? 'Yes (+₹300)' : 'No'}\n` +
      `• Promo Code: ${promoCode === 'OFF300' ? 'OFF300 (-₹300 applied)' : 'None'}\n` +
      `• Estimated Total Fare: ₹${totalFare.toLocaleString('en-IN')}`
    );
    whatsappBtn.href = `https://wa.me/917034060000?text=${message}`;
  }
}

// Hub Switcher Handler
function setupHubSwitcher() {
  const hubCards = document.querySelectorAll('.hub-card');
  const hubTitleElem = document.getElementById('selectedHubTitle');
  const hubAddressElem = document.getElementById('selectedHubAddress');

  hubCards.forEach(card => {
    card.addEventListener('click', () => {
      hubCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const name = card.getAttribute('data-hub-name');
      const address = card.getAttribute('data-hub-address');

      if (hubTitleElem && name) hubTitleElem.textContent = name;
      if (hubAddressElem && address) hubAddressElem.textContent = address;
    });
  });
}

// FAQ Accordion Handler
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(fi => fi.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Modal Inspection Handler
function openCarModal(vehicleId) {
  const car = fleetData.find(v => v.id === vehicleId);
  if (!car) return;

  const modalBackdrop = document.getElementById('carModal');
  const container = document.getElementById('modalContentContainer');
  if (!modalBackdrop || !container) return;

  container.innerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
      <span class="car-category-label">${car.categoryLabel}</span>
      <h2 style="font-size:1.8rem; font-weight:800; margin-top:4px; color:var(--brand-black);">${car.name}</h2>
    </div>

    <div style="background:var(--bg-surface); padding:20px; border-radius:14px; text-align:center; margin-bottom:20px; border:1px solid var(--border-card);">
      <img src="${car.image}" alt="${car.name}" style="max-height:180px; max-width:100%; object-fit:contain;">
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:16px; margin-bottom:20px;">
      <div style="background:rgba(250, 175, 24, 0.15); border:1px solid var(--brand-yellow); padding:12px 16px; border-radius:10px;">
        <div style="font-size:0.75rem; color:var(--brand-black); font-weight:800;">DAILY RENTAL RATE</div>
        <div style="font-size:1.4rem; font-weight:900; color:var(--brand-black);">₹${car.rate.toLocaleString('en-IN')} <span style="font-size:0.8rem; color:var(--text-muted);">/ day</span></div>
      </div>
      <div style="background:var(--bg-surface); border:1px solid var(--border-card); padding:12px 16px; border-radius:10px;">
        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">REFUNDABLE DEPOSIT</div>
        <div style="font-size:1.4rem; font-weight:900; color:var(--brand-black);">₹${car.deposit.toLocaleString('en-IN')}</div>
      </div>
    </div>

    <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:20px;">${car.desc}</p>

    <div style="background:var(--bg-surface); border:1px solid var(--border-card); border-radius:12px; padding:16px; margin-bottom:24px;">
      <h4 style="font-size:0.95rem; margin-bottom:12px; color:var(--brand-black);">Key Specifications & Rental Policies</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px; font-size:0.88rem; color:var(--text-main);">
        <div>⚡ <strong>Power:</strong> ${car.power}</div>
        <div>⚙️ <strong>Transmission:</strong> ${car.transmission}</div>
        <div>💺 <strong>Capacity:</strong> ${car.seats} Persons</div>
        <div>⛽ <strong>Fuel Type:</strong> ${car.fuel}</div>
        <div>🛡️ <strong>Permit:</strong> All India Tourist Permit</div>
        <div>🚨 <strong>Speed Advisory:</strong> 80 km/h Monitored</div>
      </div>
    </div>

    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <a href="https://wa.me/917034060000?text=${encodeURIComponent('Hello SACH CARS, I would like to reserve the ' + car.name + ' with Promo Code OFF300')}" target="_blank" class="btn-standard btn-whatsapp" style="flex:1; min-width:200px;">
        Reserve ${car.name} via WhatsApp 💬
      </a>
    </div>
  `;

  modalBackdrop.classList.add('active');
}

function closeModal() {
  const modalBackdrop = document.getElementById('carModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
  }
}
