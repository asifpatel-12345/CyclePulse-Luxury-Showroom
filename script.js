// Data Array - 10 High Performance Bicycles
const cycleData = [
    {
        id: 1,
        name: "Apex Carbon X-1",
        category: "road",
        price: 3499,
        icon: "fa-person-biking",
        specs: "Carbon Fiber Frame • 22 Speed • 6.8kg",
        description: "Pure aerodynamic excellence engineered for professional asphalt sprint races."
    },
    {
        id: 2,
        name: "Vortex E-Blade Pro",
        category: "electric",
        price: 4899,
        icon: "fa-bolt",
        specs: "750W Motor • 120km Range • Smart App",
        description: "Hyper-electric pedal assist system integrated into a minimalist futuristic chassis."
    },
    {
        id: 3,
        name: "Terra Trailblazer 900",
        category: "mtb",
        price: 2799,
        icon: "fa-mountain",
        specs: "Full Suspension • Air Shock • Hydraulic Brakes",
        description: "Rugged downhill mountain conqueror with responsive dual air suspension."
    },
    {
        id: 4,
        name: "CyberStealth BMX X",
        category: "bmx",
        price: 1299,
        icon: "fa-dharmachakra",
        specs: "360 Spin Rotor • Titanium Alloy • Pegs Included",
        description: "Freestyle urban street machine reinforced for maximum impact tolerance."
    },
    {
        id: 5,
        name: "AeroGlide SL Carbon",
        category: "road",
        price: 3999,
        icon: "fa-person-biking",
        specs: "Shimano Dura-Ace • Integrated Cockpit",
        description: "Ultra-light endurance road bike crafted for steep alpine ascents."
    },
    {
        id: 6,
        name: "VoltRunner E-Cruiser",
        category: "electric",
        price: 3199,
        icon: "fa-bolt",
        specs: "500W Mid-Drive • Regenerative Braking",
        description: "Smooth urban commuting bicycle equipped with active power regeneration."
    },
    {
        id: 7,
        name: "MudSmasher Pro 29er",
        category: "mtb",
        price: 2199,
        icon: "fa-mountain",
        specs: "Hardtail Carbon • 12-Speed SRAM Eagle",
        description: "Aggressive trail hardtail optimized for cross-country velocity."
    },
    {
        id: 8,
        name: "Urban Pulse Hybrid",
        category: "road",
        price: 1599,
        icon: "fa-bicycle",
        specs: "Disc Brakes • Puncture-Resistant Tires",
        description: "Versatile hybrid bicycle balancing road speed with upright city comfort."
    },
    {
        id: 9,
        name: "HyperE-MTB Beast",
        category: "electric",
        price: 5499,
        icon: "fa-bolt",
        specs: "Dual Motor 1000W • All-Terrain Fat Tires",
        description: "Unstoppable electric mountain machine designed for extreme terrain."
    },
    {
        id: 10,
        name: "NeonRider Street BMX",
        category: "bmx",
        price: 999,
        icon: "fa-dharmachakra",
        specs: "Chromoly Steel Frame • Neon Finish",
        description: "Street-style stunt cycle featuring glowing UV reactive paintwork."
    }
];

let cart = [];

// DOM Elements
const cycleGrid = document.getElementById('cycleGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cycleModal = document.getElementById('cycleModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// Initialize Showroom Grid
function renderCycles(items) {
    cycleGrid.innerHTML = items.map(cycle => `
        <div class="glass-card cycle-card">
            <div class="card-img-wrapper">
                <span class="type-tag">${cycle.category}</span>
                <i class="fa-solid ${cycle.icon}"></i>
            </div>
            <div class="card-info">
                <h3 class="card-title">${cycle.name}</h3>
                <p class="card-specs-brief">${cycle.specs}</p>
                <div class="card-price">$${cycle.price}</div>
            </div>
            <div class="card-actions">
                <button class="btn btn-secondary btn-sm" onclick="openDetails(${cycle.id})">Details</button>
                <button class="btn btn-primary btn-sm" onclick="addToCart(${cycle.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        if (filter === 'all') {
            renderCycles(cycleData);
        } else {
            const filtered = cycleData.filter(item => item.category === filter);
            renderCycles(filtered);
        }
    });
});

// Cart Management
function addToCart(id) {
    const item = cycleData.find(c => c.id === id);
    cart.push(item);
    updateCartUI();
    cartDrawer.classList.add('open');
}

function updateCartUI() {
    cartBadge.innerText = cart.length;
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartTotal.innerText = '$0';
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <h5 style="color: #fff; font-family: var(--font-heading);">${item.name}</h5>
                <small style="color: var(--neon-green);">$${item.price}</small>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4757; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');

    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    cartTotal.innerText = `$${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Detail Modal
function openDetails(id) {
    const item = cycleData.find(c => c.id === id);
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <i class="fa-solid ${item.icon}" style="font-size: 4rem; color: var(--neon-cyan); margin-bottom: 1rem;"></i>
            <h2 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">${item.name}</h2>
            <p style="color: var(--neon-green); font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">$${item.price}</p>
            <p style="color: var(--text-muted); margin-bottom: 1rem;">${item.description}</p>
            <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: left;">
                <p><strong>Specifications:</strong> ${item.specs}</p>
            </div>
            <button class="btn btn-primary" onclick="addToCart(${item.id}); cycleModal.style.display='none';">Add To Cart</button>
        </div>
    `;
    cycleModal.style.display = 'flex';
}

// Event Listeners for Drawer & Modal
cartBtn.addEventListener('click', () => cartDrawer.classList.toggle('open'));
closeCart.addEventListener('click', () => cartDrawer.classList.remove('open'));
closeModal.addEventListener('click', () => cycleModal.style.display = 'none');

window.onclick = (e) => {
    if (e.target === cycleModal) cycleModal.style.display = 'none';
};

// Form Handler
function handleFormSubmit(e) {
    e.preventDefault();
    alert('Thank you! Your test ride request has been recorded. Our team will contact you shortly.');
    e.target.reset();
}

// Initial Render
renderCycles(cycleData);
