// Variables globales
let products = loadProducts();
let saleProducts = loadSaleProducts();
let stockItems = loadStockItems();
let lots = loadLots();
let currentImage = null;
let currentSaleImages = [];
let currentStockPhoto = null;
let currentLotPhoto = null;
let currentCardLotPhoto = null;
let currentEditingLotId = null;
let editingProductId = null;
let editingSaleId = null;
let editingStockId = null;
let salesChart = null;

const collectionColors = {
    "Carte à l'unité": 'text-black',
    "Carte gradée": 'text-red-600',
    "Booster": 'text-green-600',
    "Bundle": 'text-blue-600',
    "ETB": 'text-purple-600',
    "Tripack": 'text-yellow-600',
    "Duopack": 'text-yellow-600',
    "SPC": 'text-amber-700',
    "Autre": 'text-gray-500'
};

// Fonctions de sauvegarde/chargement
function saveProducts() {
    localStorage.setItem('pokemonCollection', JSON.stringify(products));
}

function loadProducts() {
    const saved = localStorage.getItem('pokemonCollection');
    return saved ? JSON.parse(saved) : [];
}

function saveSaleProducts() {
    localStorage.setItem('pokemonSales', JSON.stringify(saleProducts));
}

function loadSaleProducts() {
    const saved = localStorage.getItem('pokemonSales');
    return saved ? JSON.parse(saved) : [];
}

function saveStockItems() {
    localStorage.setItem('pokemonStock', JSON.stringify(stockItems));
}

function loadStockItems() {
    const saved = localStorage.getItem('pokemonStock');
    return saved ? JSON.parse(saved) : [];
}

function saveLots() {
    localStorage.setItem('pokemonLots', JSON.stringify(lots));
}

function loadLots() {
    const saved = localStorage.getItem('pokemonLots');
    return saved ? JSON.parse(saved) : [];
}

// Navigation
function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    const allMenus = document.querySelectorAll('.dropdown-content');
    
    allMenus.forEach(m => {
        if (m.id !== menuId) {
            m.classList.remove('show');
        }
    });
    
    menu.classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
        const allMenus = document.querySelectorAll('.dropdown-content');
        allMenus.forEach(m => m.classList.remove('show'));
    }
}

function showTab(tab) {
    const allMenus = document.querySelectorAll('.dropdown-content');
    allMenus.forEach(m => m.classList.remove('show'));
    
    // Masquer tous les contenus
    const allContents = document.querySelectorAll('[id^="content-"]');
    allContents.forEach(content => content.style.display = 'none');
    
    // Afficher le bon contenu
    const contentId = 'content-' + tab;
    const contentElement = document.getElementById(contentId);
    
    if (contentElement) {
        contentElement.style.display = 'block';
        
        // Actions spécifiques par onglet
        if (tab === 'my-collection') {
            filterProducts();
        } else if (tab === 'sale-list') {
            filterSaleProducts();
        } else if (tab === 'dashboard') {
            updateDashboard();
        } else if (tab === 'stock-list') {
            filterStockItems();
        } else if (tab === 'stock-lots') {
            updateLotSelect();
            renderLotsTable();
        }
    }
}

// Menu burger mobile
function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    const burger = document.querySelector('.burger-menu');
    
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileNavOnOverlay(event) {
    if (event.target.id === 'mobile-nav') {
        toggleMobileNav();
    }
}

function navigateMobile(tab) {
    showTab(tab);
    toggleMobileNav();
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = isDark ? '☀️' : '🌙';
    const footerToggle = document.getElementById('footer-dark-toggle');
    if (footerToggle) footerToggle.textContent = icon;
}

function loadDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const footerToggle = document.getElementById('footer-dark-toggle');
        if (footerToggle) footerToggle.textContent = '☀️';
    }
}

// Gestion du scroll pour le header transparent
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.main-header');
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Gestion du drag-to-scroll pour les tableaux
document.addEventListener('DOMContentLoaded', () => {
    loadDarkMode();
    loadAllContent();
    showTab('home');
    
    const scrollContainers = document.querySelectorAll('.overflow-x-auto');
    
    scrollContainers.forEach(container => {
        initDragScroll(container);
    });
    
    const observer = new MutationObserver(() => {
        const newContainers = document.querySelectorAll('.overflow-x-auto');
        newContainers.forEach(container => {
            if (!container.dataset.dragScrollInit) {
                container.dataset.dragScrollInit = 'true';
                initDragScroll(container);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

function initDragScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = container.scrollLeft;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX) * 1.5;
        container.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });
}

// Export/Import
function exportData() {
    const data = {
        collection: products,
        sales: saleProducts,
        stock: stockItems,
        lots: lots
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pokemon-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('Données exportées avec succès ! 🎉');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            if (confirm(`Importer les données ?\n\nAttention : cela remplacera vos données actuelles.`)) {
                products = importedData.collection || [];
                saleProducts = importedData.sales || [];
                stockItems = importedData.stock || [];
                lots = importedData.lots || [];
                saveProducts();
                saveSaleProducts();
                saveStockItems();
                saveLots();
                updateSummary();
                filterProducts();
                filterSaleProducts();
                filterStockItems();
                updateLotSelect();
                renderLotsTable();
                alert('Données importées avec succès ! ✅');
            }
        } catch (error) {
            alert('Erreur lors de l\'importation. Fichier invalide.');
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

// PWA Installation
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.style.display = 'flex';
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.style.display = 'none';
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        console.log('Service Worker non disponible');
    });
}
// === CARD SEARCH API FUNCTIONS ===

const pokemonTranslations = {
    'bulbizarre': 'bulbasaur', 'herbizarre': 'ivysaur', 'florizarre': 'venusaur',
    'salamèche': 'charmander', 'reptincel': 'charmeleon', 'dracaufeu': 'charizard',
    'carapuce': 'squirtle', 'carabaffe': 'wartortle', 'tortank': 'blastoise',
    'chenipan': 'caterpie', 'chrysacier': 'metapod', 'papilusion': 'butterfree',
    'aspicot': 'weedle', 'coconfort': 'kakuna', 'dardargnan': 'beedrill',
    'roucool': 'pidgey', 'roucoups': 'pidgeotto', 'roucarnage': 'pidgeot',
    'rattata': 'rattata', 'rattatac': 'raticate', 'piafabec': 'spearow', 'rapasdepic': 'fearow',
    'abo': 'ekans', 'arbok': 'arbok', 'pikachu': 'pikachu', 'raichu': 'raichu',
    'sabelette': 'sandshrew', 'sablaireau': 'sandslash', 'nidoran♀': 'nidoran-f', 'nidorina': 'nidorina',
    'nidoqueen': 'nidoqueen', 'nidoran♂': 'nidoran-m', 'nidorino': 'nidorino', 'nidoking': 'nidoking',
    'mélofée': 'clefairy', 'mélodelfe': 'clefable', 'goupix': 'vulpix', 'feunard': 'ninetales',
    'rondoudou': 'jigglypuff', 'grodoudou': 'wigglytuff', 'nosferapti': 'zubat', 'nosferalto': 'golbat',
    'mystherbe': 'oddish', 'ortide': 'gloom', 'rafflesia': 'vileplume', 'paras': 'paras',
    'parasect': 'parasect', 'mimitoss': 'venonat', 'aéromite': 'venomoth', 'taupiqueur': 'diglett',
    'triopikeur': 'dugtrio', 'miaouss': 'meowth', 'persian': 'persian', 'psykokwak': 'psyduck',
    'akwakwak': 'golduck', 'férosinge': 'mankey', 'colossinge': 'primeape', 'caninos': 'growlithe',
    'arcanin': 'arcanine', 'ptitard': 'poliwag', 'têtarte': 'poliwhirl', 'tartard': 'poliwrath',
    'abra': 'abra', 'kadabra': 'kadabra', 'alakazam': 'alakazam', 'machoc': 'machop',
    'machopeur': 'machoke', 'mackogneur': 'machamp', 'chétiflor': 'bellsprout', 'boustiflor': 'weepinbell',
    'empiflor': 'victreebel', 'tentacool': 'tentacool', 'tentacruel': 'tentacruel', 'racaillou': 'geodude',
    'gravalanch': 'graveler', 'grolem': 'golem', 'ponyta': 'ponyta', 'galopa': 'rapidash',
    'ramoloss': 'slowpoke', 'flagadoss': 'slowbro', 'magnéti': 'magnemite', 'magnéton': 'magneton',
    'canarticho': 'farfetchd', 'doduo': 'doduo', 'dodrio': 'dodrio', 'otaria': 'seel',
    'lamantine': 'dewgong', 'tadmorv': 'grimer', 'grotadmorv': 'muk', 'kokiyas': 'shellder',
    'crustabri': 'cloyster', 'fantominus': 'gastly', 'spectrum': 'haunter', 'ectoplasma': 'gengar',
    'onix': 'onix', 'soporifik': 'drowzee', 'hypnomade': 'hypno', 'krabby': 'krabby',
    'krabboss': 'kingler', 'voltorbe': 'voltorb', 'électrode': 'electrode', 'noeunoeuf': 'exeggcute',
    'noadkoko': 'exeggutor', 'osselait': 'cubone', 'ossatueur': 'marowak', 'kicklee': 'hitmonlee',
    'tygnon': 'hitmonchan', 'excelangue': 'lickitung', 'smogo': 'koffing', 'smogogo': 'weezing',
    'rhinocorne': 'rhyhorn', 'rhinoféros': 'rhydon', 'leveinard': 'chansey', 'saquedeneu': 'tangela',
    'kangourex': 'kangaskhan', 'hypotrempe': 'horsea', 'hypocéan': 'seadra', 'poissirène': 'goldeen',
    'poissoroy': 'seaking', 'stari': 'staryu', 'staross': 'starmie', 'M.mime': 'mr-mime',
    'insécateur': 'scyther', 'lippoutou': 'jynx', 'élektek': 'electabuzz', 'magmar': 'magmar',
    'scarabrute': 'pinsir', 'tauros': 'tauros', 'magicarpe': 'magikarp', 'léviator': 'gyarados',
    'lokhlass': 'lapras', 'métamorph': 'ditto', 'évoli': 'eevee', 'aquali': 'vaporeon',
    'voltali': 'jolteon', 'pyroli': 'flareon', 'porygon': 'porygon', 'amonita': 'omanyte',
    'amonistar': 'omastar', 'kabuto': 'kabuto', 'kabutops': 'kabutops', 'ptéra': 'aerodactyl',
    'ronflex': 'snorlax', 'artikodin': 'articuno', 'électhor': 'zapdos', 'sulfura': 'moltres',
    'minidraco': 'dratini', 'draco': 'dragonair', 'dracolosse': 'dragonite', 'mewtwo': 'mewtwo',
    'mew': 'mew',
    'germignon': 'chikorita', 'macronium': 'bayleef', 'méganium': 'meganium',
    'héricendre': 'cyndaquil', 'feurisson': 'quilava', 'typhlosion': 'typhlosion',
    'kaiminus': 'totodile', 'crocrodil': 'croconaw', 'aligatueur': 'feraligatr',
    'fouinette': 'sentret', 'fouinar': 'furret', 'hoothoot': 'hoothoot', 'noarfang': 'noctowl',
    'coxy': 'ledyba', 'coxyclaque': 'ledian', 'mimigal': 'spinarak', 'migalos': 'ariados',
    'nostenfer': 'crobat', 'loupio': 'chinchou', 'lanturn': 'lanturn', 'pichu': 'pichu',
    'mélo': 'cleffa', 'toudoudou': 'igglybuff', 'togepi': 'togepi', 'togetic': 'togetic',
    'natu': 'natu', 'xatu': 'xatu', 'wattouat': 'mareep', 'lainergie': 'flaaffy',
    'pharamp': 'ampharos', 'joliflor': 'bellossom', 'marill': 'marill', 'azumarill': 'azumarill',
    'simularbre': 'sudowoodo', 'tarpaud': 'politoed', 'granivol': 'hoppip', 'floravol': 'skiploom',
    'cotovol': 'jumpluff', 'capumain': 'aipom', 'tournegrin': 'sunkern', 'héliatronc': 'sunflora',
    'yanma': 'yanma', 'axoloto': 'wooper', 'maraiste': 'quagsire', 'mentali': 'espeon',
    'noctali': 'umbreon', 'cornèbre': 'murkrow', 'feuforêve': 'misdreavus', 'zarbi': 'unown',
    'qulbutoké': 'wobbuffet', 'girafarig': 'girafarig', 'pomdepik': 'pineco', 'foretress': 'forretress',
    'insolourdo': 'dunsparce', 'scorplane': 'gligar', 'steelix': 'steelix', 'snubbull': 'snubbull',
    'granbull': 'granbull', 'qwilfish': 'qwilfish', 'cizayox': 'scizor', 'caratroc': 'shuckle',
    'scarhino': 'heracross', 'farfuret': 'sneasel', 'teddiursa': 'teddiursa', 'ursaring': 'ursaring',
    'limagma': 'slugma', 'volcaropod': 'magcargo', 'marcacrin': 'swinub', 'cochignon': 'piloswine',
    'corayon': 'corsola', 'rémoraid': 'remoraid', 'octillery': 'octillery', 'cadoizo': 'delibird',
    'démanta': 'mantine', 'airmure': 'skarmory', 'malosse': 'houndour', 'démolosse': 'houndoom',
    'hyporoi': 'kingdra', 'phanpy': 'phanpy', 'donphan': 'donphan', 'porygon2': 'porygon2',
    'cerfrousse': 'stantler', 'queulorior': 'smeargle', 'debugant': 'tyrogue', 'kapoera': 'hitmontop',
    'lippouti': 'smoochum', 'élekid': 'elekid', 'magby': 'magby', 'écrémeuh': 'miltank',
    'leuphorie': 'blissey', 'raikou': 'raikou', 'entei': 'entei', 'suicune': 'suicune',
    'embrylex': 'larvitar', 'ymphect': 'pupitar', 'tyranocif': 'tyranitar', 'lugia': 'lugia',
    'ho-oh': 'ho-oh', 'celebi': 'celebi'
};

function translatePokemonName(name) {
    const normalized = name.toLowerCase().trim();
    return pokemonTranslations[normalized] || name;
}

async function searchCards() {
    const query = document.getElementById('api-search').value.trim();
    const limit = document.getElementById('result-limit').value;
    
    if (!query) {
        alert('Veuillez entrer un terme de recherche');
        return;
    }

    const resultsDiv = document.getElementById('search-results');
    const loadingDiv = document.getElementById('search-loading');
    const infoDiv = document.getElementById('search-info');
    
    resultsDiv.innerHTML = '';
    loadingDiv.style.display = 'block';
    infoDiv.style.display = 'none';

    const startTime = Date.now();

    try {
        const translatedQuery = translatePokemonName(query);
        const displayQuery = translatedQuery !== query.toLowerCase() ? 
            `${query} (${translatedQuery})` : query;
        
        const url = `https://api.pokemontcg.io/v2/cards?q=name:"${translatedQuery}"&pageSize=${limit}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        const endTime = Date.now();
        const searchTime = ((endTime - startTime) / 1000).toFixed(2);
        
        loadingDiv.style.display = 'none';

        if (!data.data || data.data.length === 0) {
            resultsDiv.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    Aucune carte trouvée pour "${displayQuery}" 😞
                    <br><small>Essayez un autre nom ou vérifiez l'orthographe</small>
                </div>
            `;
            return;
        }

        infoDiv.style.display = 'block';
        let infoHTML = `<strong>${data.data.length} carte(s) trouvée(s)</strong> en ${searchTime}s`;
        
        if (translatedQuery !== query.toLowerCase()) {
            infoHTML += ` • 🔄 Traduit: <strong>${query}</strong> → <strong>${translatedQuery}</strong>`;
        }
        
        if (data.totalCount > data.data.length) {
            infoHTML += ` • <span class="text-orange-600">${data.totalCount} cartes au total (affichage limité à ${limit})</span>`;
        }
        
        infoDiv.innerHTML = infoHTML;

        const fragment = document.createDocumentFragment();
        
        data.data.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition';
            cardDiv.style.animationDelay = `${index * 0.02}s`;
            
            const price = card.cardmarket?.prices?.averageSellPrice || card.tcgplayer?.prices?.normal?.market || 0;
            const rarity = card.rarity || 'Commune';
            const setName = card.set?.name || 'Inconnu';
            
            cardDiv.innerHTML = `
                <img src="${card.images.small}" 
                     alt="${card.name}" 
                     loading="lazy"
                     class="w-full h-64 object-contain bg-gray-50 p-2">
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-2">${card.name}</h3>
                    <p class="text-sm text-gray-600 mb-1">🎴 ${setName}</p>
                    <p class="text-sm text-gray-600 mb-1">✨ ${rarity}</p>
                    <p class="text-sm font-semibold text-green-600 mb-3">💰 ~${price > 0 ? price.toFixed(2) : '?'}€</p>
                    <button onclick='addCardToCollection(${JSON.stringify(card).replace(/'/g, "&#39;")})' 
                        class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 font-semibold">
                        ➕ Ajouter
                    </button>
                </div>
            `;
            
            fragment.appendChild(cardDiv);
        });
        
        resultsDiv.appendChild(fragment);
        
    } catch (error) {
        loadingDiv.style.display = 'none';
        resultsDiv.innerHTML = `
            <div class="col-span-full text-center py-8">
                <div class="text-red-500 text-xl mb-2">❌ Erreur lors de la recherche</div>
                <div class="text-sm text-gray-600">Détails: ${error.message}</div>
                <div class="text-xs text-gray-500 mt-2">Vérifiez votre connexion internet</div>
            </div>
        `;
    }
}

function addCardToCollection(card) {
    const price = card.cardmarket?.prices?.averageSellPrice || 0;
    
    const newProduct = {
        id: Date.now(),
        collection: 'Carte à l\'unité',
        ere: determineEra(card.set?.series || ''),
        nom: `${card.name} - ${card.set?.name || ''} #${card.number}`,
        prix: price,
        prixRevente: price,
        etat: 'Neuf',
        lieu: 'API Pokémon TCG',
        details: `Rareté: ${card.rarity || 'Commune'}`,
        image: card.images.large
    };

    products.push(newProduct);
    saveProducts();
    updateSummary();
    
    alert(`✅ "${card.name}" ajouté à votre collection !`);
}

function determineEra(series) {
    const eraMap = {
        'Scarlet & Violet': 'EV',
        'Sword & Shield': 'EB',
        'Sun & Moon': 'SL',
        'XY': 'XY',
        'Black & White': 'NB',
        'Diamond & Pearl': 'DP',
        'EX': 'EX',
        'Base': 'WIZARD'
    };
    
    for (const [key, value] of Object.entries(eraMap)) {
        if (series.includes(key)) return value;
    }
    return 'EV';
}
// === COLLECTION FUNCTIONS ===

function handleImage(event) {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            currentImage = reader.result;
            document.getElementById('image-status').innerHTML = '<span class="text-green-600 text-sm">✓ Image ajoutée</span>';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Format non supporté. Utilisez JPG, JPEG, PNG ou WEBP');
    }
}

function addProduct() {
    const nom = document.getElementById('nom').value;
    const prix = parseFloat(document.getElementById('prix').value);
    
    if (!nom || !prix) {
        alert('Veuillez remplir au moins le nom et le prix d\'achat');
        return;
    }

    const product = {
        id: editingProductId || Date.now(),
        collection: document.getElementById('collection').value,
        ere: document.getElementById('ere').value,
        nom: nom,
        prix: prix,
        prixRevente: parseFloat(document.getElementById('prix-revente').value) || 0,
        etat: document.getElementById('etat').value,
        lieu: document.getElementById('lieu').value,
        details: document.getElementById('details').value,
        image: currentImage
    };

    if (editingProductId) {
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = product;
        }
        editingProductId = null;
    } else {
        products.push(product);
    }
    
    saveProducts();
    resetForm();
    updateSummary();
    filterProducts();
}

function resetForm() {
    document.getElementById('nom').value = '';
    document.getElementById('prix').value = '';
    document.getElementById('prix-revente').value = '';
    document.getElementById('lieu').value = '';
    document.getElementById('details').value = '';
    document.getElementById('image').value = '';
    document.getElementById('image-status').innerHTML = '';
    document.getElementById('submit-btn-text').textContent = '➕ Ajouter';
    document.getElementById('cancel-btn').style.display = 'none';
    currentImage = null;
    editingProductId = null;
}

function cancelEdit() {
    resetForm();
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingProductId = id;
    document.getElementById('collection').value = product.collection;
    document.getElementById('ere').value = product.ere;
    document.getElementById('nom').value = product.nom;
    document.getElementById('prix').value = product.prix;
    document.getElementById('prix-revente').value = product.prixRevente || '';
    document.getElementById('etat').value = product.etat;
    document.getElementById('lieu').value = product.lieu;
    document.getElementById('details').value = product.details;
    currentImage = product.image;
    
    if (product.image) {
        document.getElementById('image-status').innerHTML = '<span class="text-green-600 text-sm">✓ Image ajoutée</span>';
    }

    document.getElementById('submit-btn-text').textContent = '💾 Modifier';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    showTab('add-collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProduct(id) {
    if (confirm('Supprimer ce produit ?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        updateSummary();
        filterProducts();
    }
}

function updateSummary() {
    const total = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.prix, 0);
    const totalResale = products.reduce((sum, p) => sum + (p.prixRevente || 0), 0);

    document.getElementById('total-products').textContent = total;
    document.getElementById('total-value').textContent = totalValue.toFixed(2) + '€';
    document.getElementById('total-resale').textContent = totalResale.toFixed(2) + '€';

    const globalPercentageElement = document.getElementById('global-percentage');
    if (totalResale > 0 && totalValue > 0) {
        const percentage = ((totalResale - totalValue) / totalValue * 100).toFixed(2);
        const isPositive = percentage >= 0;
        const color = isPositive ? 'text-green-700' : 'text-red-700';
        const icon = isPositive ? '📈' : '📉';
        globalPercentageElement.className = `text-3xl font-bold ${color}`;
        globalPercentageElement.textContent = `${icon} ${isPositive ? '+' : ''}${percentage}%`;
    } else {
        globalPercentageElement.className = 'text-3xl font-bold text-gray-700';
        globalPercentageElement.textContent = '-';
    }
}

function filterProducts() {
    const search = document.getElementById('search').value.toLowerCase();
    const filterCol = document.getElementById('filter-collection').value;
    const filterEre = document.getElementById('filter-ere').value;
    const filterEtat = document.getElementById('filter-etat').value;
    const sort = document.getElementById('sort').value;

    let filtered = products.filter(p => {
        const matchSearch = p.nom.toLowerCase().includes(search) || p.collection.toLowerCase().includes(search);
        const matchCol = !filterCol || p.collection === filterCol;
        const matchEre = !filterEre || p.ere === filterEre;
        const matchEtat = !filterEtat || p.etat === filterEtat;
        return matchSearch && matchCol && matchEre && matchEtat;
    });

    if (sort === 'nom') filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    if (sort === 'collection') filtered.sort((a, b) => a.collection.localeCompare(b.collection));
    if (sort === 'prix-asc') filtered.sort((a, b) => a.prix - b.prix);
    if (sort === 'prix-desc') filtered.sort((a, b) => b.prix - a.prix);

    const totalValue = filtered.reduce((sum, p) => sum + p.prix, 0);
    document.getElementById('filter-summary').textContent = 
        `${filtered.length} produit(s) • Valeur totale: ${totalValue.toFixed(2)}€`;

    renderTable(filtered);
}

function renderTable(productList) {
    const tbody = document.getElementById('product-table');
    tbody.innerHTML = '';

    productList.forEach((product, idx) => {
        const etatClass = {
            'Neuf': 'bg-green-100 text-green-800',
            'Excellent': 'bg-blue-100 text-blue-800',
            'Bon': 'bg-yellow-100 text-yellow-800',
            'Moyen': 'bg-orange-100 text-orange-800',
            'Abîmé': 'bg-red-100 text-red-800'
        }[product.etat];

        let percentageHtml = '-';
        if (product.prixRevente && product.prix) {
            const percentage = ((product.prixRevente - product.prix) / product.prix * 100).toFixed(2);
            const isPositive = percentage >= 0;
            const color = isPositive ? 'text-green-600' : 'text-red-600';
            const icon = isPositive ? '📈' : '📉';
            percentageHtml = `<span class="${color} font-bold">${icon} ${isPositive ? '+' : ''}${percentage}%</span>`;
        }

        const row = `
            <tr class="${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                <td class="px-4 py-3 sticky left-0 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                    ${product.image 
                        ? `<img src="${product.image}" alt="${product.nom}" class="w-16 h-16 object-cover rounded">`
                        : '<div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">📷</div>'
                    }
                </td>
                <td class="px-4 py-3 font-bold ${collectionColors[product.collection]}">${product.collection}</td>
                <td class="px-4 py-3 font-semibold text-blue-600">${product.ere}</td>
                <td class="px-4 py-3">${product.nom}</td>
                <td class="px-4 py-3 font-semibold">${product.prix.toFixed(2)}€</td>
                <td class="px-4 py-3 font-semibold">${product.prixRevente ? product.prixRevente.toFixed(2) + '€' : '-'}</td>
                <td class="px-4 py-3">${percentageHtml}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs font-semibold ${etatClass}">${product.etat}</span>
                </td>
                <td class="px-4 py-3">${product.lieu}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${product.details}</td>
                <td class="px-4 py-3 text-center sticky right-0 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                    <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Modifier">⚙️</button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800" title="Supprimer">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// === SALE FUNCTIONS ===

function handleSaleImages(event) {
    const files = Array.from(event.target.files);
    if (files.length > 4) {
        alert('Maximum 4 images autorisées');
        return;
    }

    currentSaleImages = [];
    const preview = document.getElementById('sale-images-preview');
    preview.innerHTML = '';

    let processed = 0;
    files.forEach((file) => {
        if (['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                currentSaleImages.push(reader.result);
                const img = document.createElement('img');
                img.src = reader.result;
                img.className = 'w-20 h-20 object-cover rounded border';
                preview.appendChild(img);
                
                processed++;
                if (processed === files.length) {
                    document.getElementById('sale-images-status').innerHTML = 
                        `<span class="text-green-600 text-sm">✓ ${currentSaleImages.length} image(s) ajoutée(s)</span>`;
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

function addSaleProduct() {
    const nom = document.getElementById('sale-nom').value;
    const prixAchat = parseFloat(document.getElementById('sale-prix-achat').value);
    
    if (!nom || !prixAchat) {
        alert('Veuillez remplir au moins le nom et le prix d\'achat');
        return;
    }

    const saleProduct = {
        id: editingSaleId || Date.now(),
        nom: nom,
        etat: document.getElementById('sale-etat').value,
        prixAchat: prixAchat,
        statut: document.getElementById('sale-statut').value,
        prixPotentiel: parseFloat(document.getElementById('sale-prix-potentiel').value) || 0,
        prixRevente: parseFloat(document.getElementById('sale-prix-revente').value) || 0,
        details: document.getElementById('sale-details').value,
        images: currentSaleImages,
        dateVente: document.getElementById('sale-statut').value === 'Vendu' ? new Date().toISOString() : null
    };

    if (editingSaleId) {
        const index = saleProducts.findIndex(p => p.id === editingSaleId);
        if (index !== -1) {
            if (saleProduct.statut === 'Vendu' && !saleProducts[index].dateVente) {
                saleProduct.dateVente = new Date().toISOString();
            }
            saleProducts[index] = saleProduct;
        }
        editingSaleId = null;
    } else {
        saleProducts.push(saleProduct);
    }
    
    saveSaleProducts();
    resetSaleForm();
    filterSaleProducts();
}

function resetSaleForm() {
    document.getElementById('sale-nom').value = '';
    document.getElementById('sale-prix-achat').value = '';
    document.getElementById('sale-prix-potentiel').value = '';
    document.getElementById('sale-prix-revente').value = '';
    document.getElementById('sale-details').value = '';
    document.getElementById('sale-images').value = '';
    document.getElementById('sale-images-status').innerHTML = '';
    document.getElementById('sale-images-preview').innerHTML = '';
    document.getElementById('sale-submit-btn-text').textContent = '➕ Ajouter';
    document.getElementById('sale-cancel-btn').style.display = 'none';
    currentSaleImages = [];
    editingSaleId = null;
}

function cancelSaleEdit() {
    resetSaleForm();
}

function editSaleProduct(id) {
    const product = saleProducts.find(p => p.id === id);
    if (!product) return;

    editingSaleId = id;
    document.getElementById('sale-nom').value = product.nom;
    document.getElementById('sale-etat').value = product.etat;
    document.getElementById('sale-prix-achat').value = product.prixAchat;
    document.getElementById('sale-statut').value = product.statut;
    document.getElementById('sale-prix-potentiel').value = product.prixPotentiel || '';
    document.getElementById('sale-prix-revente').value = product.prixRevente || '';
    document.getElementById('sale-details').value = product.details;
    currentSaleImages = product.images || [];
    
    const preview = document.getElementById('sale-images-preview');
    preview.innerHTML = '';
    currentSaleImages.forEach(img => {
        const imgEl = document.createElement('img');
        imgEl.src = img;
        imgEl.className = 'w-20 h-20 object-cover rounded border';
        preview.appendChild(imgEl);
    });

    if (currentSaleImages.length > 0) {
        document.getElementById('sale-images-status').innerHTML = 
            `<span class="text-green-600 text-sm">✓ ${currentSaleImages.length} image(s) ajoutée(s)</span>`;
    }

    document.getElementById('sale-submit-btn-text').textContent = '💾 Modifier';
    document.getElementById('sale-cancel-btn').style.display = 'inline-block';

    showTab('add-sale');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteSaleProduct(id) {
    if (confirm('Supprimer ce produit ?')) {
        saleProducts = saleProducts.filter(p => p.id !== id);
        saveSaleProducts();
        filterSaleProducts();
        updateDashboard();
    }
}

function filterSaleProducts() {
    const search = document.getElementById('sale-search').value.toLowerCase();

    let filtered = saleProducts.filter(p => {
        return p.nom.toLowerCase().includes(search);
    });

    renderSaleTable(filtered);
}

function renderSaleTable(productList) {
    const tbody = document.getElementById('sale-table');
    tbody.innerHTML = '';

    productList.forEach((product, idx) => {
        const etatClass = {
            'Neuf': 'bg-green-100 text-green-800',
            'Excellent': 'bg-blue-100 text-blue-800',
            'Bon': 'bg-yellow-100 text-yellow-800',
            'Moyen': 'bg-orange-100 text-orange-800',
            'Abîmé': 'bg-red-100 text-red-800'
        }[product.etat];

        const statutClass = {
            'En vente': 'bg-blue-100 text-blue-800',
            'Vendu': 'bg-green-100 text-green-800',
            'Pas listé': 'bg-gray-100 text-gray-800'
        }[product.statut];

        const imagesHtml = (product.images && product.images.length > 0)
            ? product.images.map(img => `<img src="${img}" class="w-12 h-12 object-cover rounded inline-block mr-1">`).join('')
            : '<div class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">📷</div>';

        const rowClass = product.statut === 'Vendu' ? 'bg-green-50' : (idx % 2 === 0 ? 'bg-gray-50' : 'bg-white');

        const row = `
            <tr class="${rowClass}">
                <td class="px-4 py-3">${imagesHtml}</td>
                <td class="px-4 py-3 font-semibold">${product.nom}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs font-semibold ${etatClass}">${product.etat}</span>
                </td>
                <td class="px-4 py-3">${product.prixAchat.toFixed(2)}€</td>
                <td class="px-4 py-3">${product.prixPotentiel ? product.prixPotentiel.toFixed(2) + '€' : '-'}</td>
                <td class="px-4 py-3 font-semibold">${product.prixRevente ? product.prixRevente.toFixed(2) + '€' : '-'}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs font-semibold ${statutClass}">${product.statut}</span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-600">${product.details}</td>
                <td class="px-4 py-3 text-center">
                    <button onclick="editSaleProduct(${product.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Modifier">⚙️</button>
                    <button onclick="deleteSaleProduct(${product.id})" class="text-red-600 hover:text-red-800" title="Supprimer">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function updateDashboard() {
    const soldProducts = saleProducts.filter(p => p.statut === 'Vendu' && p.prixRevente > 0);
    const soldCount = soldProducts.length;
    const totalRevenue = soldProducts.reduce((sum, p) => sum + p.prixRevente, 0);
    const totalCost = soldProducts.reduce((sum, p) => sum + p.prixAchat, 0);
    const netProfit = totalRevenue - totalCost;

    document.getElementById('sold-count').textContent = soldCount;
    document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2) + '€';
    document.getElementById('net-profit').textContent = netProfit.toFixed(2) + '€';

    const salesByMonth = {};
    soldProducts.forEach(p => {
        if (p.dateVente) {
            const date = new Date(p.dateVente);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            if (!salesByMonth[monthYear]) {
                salesByMonth[monthYear] = 0;
            }
            salesByMonth[monthYear] += p.prixRevente;
        }
    });

    const sortedMonths = Object.keys(salesByMonth).sort((a, b) => {
        const [ma, ya] = a.split('/').map(Number);
        const [mb, yb] = b.split('/').map(Number);
        return (ya - yb) || (ma - mb);
    });

    const chartData = {
        labels: sortedMonths,
        datasets: [{
            label: 'Revenus (€)',
            data: sortedMonths.map(m => salesByMonth[m]),
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderColor: 'rgba(147, 51, 234, 1)',
            borderWidth: 2,
            tension: 0.4
        }]
    };

    if (salesChart) {
        salesChart.destroy();
    }

    const ctx = document.getElementById('salesChart');
    if (ctx) {
        salesChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '€';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Init
updateSummary();
