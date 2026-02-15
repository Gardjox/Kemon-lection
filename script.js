// === VARIABLES GLOBALES ===
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

// === CONSTANTES ===
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

// === FONCTIONS DE MENU ===
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

// === FONCTIONS DE STOCKAGE LOCAL ===
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

// === NAVIGATION ENTRE ONGLETS ===
function showTab(tab) {
    const allMenus = document.querySelectorAll('.dropdown-content');
    allMenus.forEach(m => m.classList.remove('show'));
    
    document.getElementById('content-home').style.display = 'none';
    document.getElementById('content-card-search').style.display = 'none';
    document.getElementById('content-add-collection').style.display = 'none';
    document.getElementById('content-my-collection').style.display = 'none';
    document.getElementById('content-add-sale').style.display = 'none';
    document.getElementById('content-sale-list').style.display = 'none';
    document.getElementById('content-dashboard').style.display = 'none';
    document.getElementById('content-stock-add').style.display = 'none';
    document.getElementById('content-stock-list').style.display = 'none';
    document.getElementById('content-stock-lots').style.display = 'none';
    document.getElementById('content-mentions-legales').style.display = 'none';

    if (tab === 'home') {
        document.getElementById('content-home').style.display = 'block';
    } else if (tab === 'card-search') {
        document.getElementById('content-card-search').style.display = 'block';
    } else if (tab === 'add-collection') {
        document.getElementById('content-add-collection').style.display = 'block';
    } else if (tab === 'my-collection') {
        document.getElementById('content-my-collection').style.display = 'block';
        filterProducts();
    } else if (tab === 'add-sale') {
        document.getElementById('content-add-sale').style.display = 'block';
    } else if (tab === 'sale-list') {
        document.getElementById('content-sale-list').style.display = 'block';
        filterSaleProducts();
    } else if (tab === 'dashboard') {
        document.getElementById('content-dashboard').style.display = 'block';
        updateDashboard();
    } else if (tab === 'stock-add') {
        document.getElementById('content-stock-add').style.display = 'block';
    } else if (tab === 'stock-list') {
        document.getElementById('content-stock-list').style.display = 'block';
        filterStockItems();
    } else if (tab === 'stock-lots') {
        document.getElementById('content-stock-lots').style.display = 'block';
        updateLotSelect();
        renderLotsTable();
    } else if (tab === 'mentions-legales') {
        document.getElementById('content-mentions-legales').style.display = 'block';
    }
}

// === FONCTIONS DE RECHERCHE DE CARTES (API) ===
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

// === FONCTIONS DE COLLECTION ===
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
                <td class="px-4 py-3">
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
                <td class="px-4 py-3 text-center">
                    <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Modifier">⚙️</button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800" title="Supprimer">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// === FONCTIONS DE VENTE ===
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
    files.forEach((file, idx) => {
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

// === FONCTIONS DE STOCK ===
function handleStockPhoto(event) {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            currentStockPhoto = reader.result;
            document.getElementById('stock-photo-status').innerHTML = '<span class="text-green-600 text-sm">✓ Photo ajoutée</span>';
            
            const preview = document.getElementById('stock-photo-preview');
            const img = document.getElementById('stock-photo-img');
            img.src = currentStockPhoto;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Format non supporté. Utilisez JPG, JPEG, PNG ou WEBP');
    }
}

function zoomStockPhoto() {
    if (currentStockPhoto) {
        document.getElementById('photo-zoom-img').src = currentStockPhoto;
        document.getElementById('photo-zoom-modal').style.display = 'flex';
    }
}

function closePhotoZoom() {
    document.getElementById('photo-zoom-modal').style.display = 'none';
}

function zoomTablePhoto(photoSrc) {
    document.getElementById('photo-zoom-img').src = photoSrc;
    document.getElementById('photo-zoom-modal').style.display = 'flex';
}

function addStockItem() {
    const prixAchat = parseFloat(document.getElementById('stock-prix-achat').value);
    
    if (!prixAchat) {
        alert('Veuillez au moins renseigner le prix d\'achat');
        return;
    }

    const dateInput = document.getElementById('stock-date').value;
    const dateAchat = dateInput ? new Date(dateInput).toISOString() : new Date().toISOString();

    const stockItem = {
        id: editingStockId || Date.now(),
        objet: document.getElementById('stock-objet').value,
        photo: currentStockPhoto,
        collection: document.getElementById('stock-collection').value,
        dateAchat: dateAchat,
        etat: document.getElementById('stock-etat').value,
        detailsEtat: document.getElementById('stock-details-etat').value,
        lieuAchat: document.getElementById('stock-achat-lieu').value,
        prixAchat: prixAchat,
        prixRevente: parseFloat(document.getElementById('stock-prix-revente').value) || 0,
        etatActuel: document.getElementById('stock-etat-actuel').value,
        lot: document.getElementById('stock-lot').value,
        details: document.getElementById('stock-details').value
    };

    if (editingStockId) {
        const index = stockItems.findIndex(p => p.id === editingStockId);
        if (index !== -1) {
            stockItems[index] = stockItem;
        }
        editingStockId = null;
    } else {
        stockItems.push(stockItem);
    }
    
    saveStockItems();
    resetStockForm();
    filterStockItems();
    alert('✅ Article ajouté au stock !');
}

function resetStockForm() {
    document.getElementById('stock-prix-achat').value = '';
    document.getElementById('stock-prix-revente').value = '';
    document.getElementById('stock-details-etat').value = '';
    document.getElementById('stock-details').value = '';
    document.getElementById('stock-date').value = '';
    document.getElementById('stock-photo').value = '';
    document.getElementById('stock-photo-status').innerHTML = '';
    document.getElementById('stock-photo-preview').style.display = 'none';
    document.getElementById('stock-submit-btn-text').textContent = '➕ Ajouter au stock';
    document.getElementById('stock-cancel-btn').style.display = 'none';
    currentStockPhoto = null;
    editingStockId = null;
}

function cancelStockEdit() {
    resetStockForm();
}

function editStockItem(id) {
    const item = stockItems.find(p => p.id === id);
    if (!item) return;

    editingStockId = id;
    document.getElementById('stock-objet').value = item.objet;
    document.getElementById('stock-collection').value = item.collection;
    
    if (item.dateAchat) {
        const date = new Date(item.dateAchat);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        document.getElementById('stock-date').value = localDate;
    }
    
    document.getElementById('stock-etat').value = item.etat;
    document.getElementById('stock-details-etat').value = item.detailsEtat;
    document.getElementById('stock-achat-lieu').value = item.lieuAchat;
    document.getElementById('stock-prix-achat').value = item.prixAchat;
    document.getElementById('stock-prix-revente').value = item.prixRevente || '';
    document.getElementById('stock-etat-actuel').value = item.etatActuel;
    document.getElementById('stock-lot').value = item.lot || '';
    document.getElementById('stock-details').value = item.details;
    currentStockPhoto = item.photo;
    
    if (item.photo) {
        document.getElementById('stock-photo-status').innerHTML = '<span class="text-green-600 text-sm">✓ Photo ajoutée</span>';
        const preview = document.getElementById('stock-photo-preview');
        const img = document.getElementById('stock-photo-img');
        img.src = item.photo;
        preview.style.display = 'block';
    }

    document.getElementById('stock-submit-btn-text').textContent = '💾 Modifier';
    document.getElementById('stock-cancel-btn').style.display = 'inline-block';

    showTab('stock-add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteStockItem(id) {
    if (confirm('Supprimer cet article du stock ?')) {
        stockItems = stockItems.filter(p => p.id !== id);
        saveStockItems();
        filterStockItems();
    }
}

function filterStockItems() {
    const search = document.getElementById('stock-search').value.toLowerCase();

    let filtered = stockItems.filter(p => {
        return p.objet.toLowerCase().includes(search) || 
               p.collection.toLowerCase().includes(search) ||
               p.etatActuel.toLowerCase().includes(search) ||
               (p.lot && p.lot.toString().toLowerCase().includes(search));
    });

    const enStock = filtered.filter(item => item.etatActuel === 'Stock');
    const enVente = filtered.filter(item => item.etatActuel === 'En vente');
    const vendus = filtered.filter(item => item.etatActuel === 'Vendu');

    renderStockTable('stock-table-stock', enStock);
    renderStockTable('stock-table-vente', enVente);
    renderStockTable('stock-table-vendu', vendus);
}

function changeStockStatus(id, newStatus) {
    const item = stockItems.find(p => p.id === id);
    if (item) {
        item.etatActuel = newStatus;
        saveStockItems();
        filterStockItems();
    }
}

function renderStockTable(tableId, itemList) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    itemList.forEach((item, idx) => {
        const etatClass = {
            'Neuf': 'bg-green-100 text-green-800',
            'Excellent': 'bg-blue-100 text-blue-800',
            'Bon': 'bg-yellow-100 text-yellow-800',
            'Moyen': 'bg-orange-100 text-orange-800',
            'Abîmé': 'bg-red-100 text-red-800'
        }[item.etat];

        const statutClass = {
            'Stock': 'bg-blue-100 text-blue-800',
            'En vente': 'bg-orange-100 text-orange-800',
            'Vendu': 'bg-green-100 text-green-800'
        }[item.etatActuel];

        const photoHtml = item.photo
            ? `<img src="${item.photo}" class="w-16 h-16 object-cover rounded cursor-pointer" onclick="zoomTablePhoto('${item.photo}')" alt="Photo">`
            : '<div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">📷</div>';

        const dateFormatted = item.dateAchat ? new Date(item.dateAchat).toLocaleString('fr-FR') : '-';

        const lotName = item.lot ? (lots.find(l => l.id == item.lot)?.nom || item.lot) : '-';

        let valueHtml = '-';
        if (item.prixRevente && item.prixAchat) {
            const percentage = ((item.prixRevente - item.prixAchat) / item.prixAchat * 100).toFixed(2);
            const isPositive = percentage >= 0;
            const color = isPositive ? 'text-green-600' : 'text-red-600';
            const icon = isPositive ? '📈' : '📉';
            valueHtml = `<span class="${color} font-bold">${icon} ${isPositive ? '+' : ''}${percentage}%</span>`;
        }

        const detailsHtml = item.details 
            ? `<span class="cursor-help relative group">💬
                <span class="invisible group-hover:visible absolute left-0 top-6 bg-black text-white text-xs rounded p-2 w-48 z-10">
                    ${item.details}
                </span>
               </span>`
            : '-';

        const rowClass = idx % 2 === 0 ? 'bg-gray-50' : 'bg-white';

        const row = `
            <tr class="${rowClass}">
                <td class="px-4 py-3">${photoHtml}</td>
                <td class="px-4 py-3 font-semibold">${item.objet}</td>
                <td class="px-4 py-3">${item.collection}</td>
                <td class="px-4 py-3 text-sm">${dateFormatted}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs font-semibold ${etatClass}">${item.etat}</span>
                    ${item.detailsEtat ? `<br><small class="text-gray-500">${item.detailsEtat}</small>` : ''}
                </td>
                <td class="px-4 py-3">${item.lieuAchat}</td>
                <td class="px-4 py-3 text-sm">${lotName}</td>
                <td class="px-4 py-3 font-semibold">${item.prixAchat.toFixed(2)}€</td>
                <td class="px-4 py-3 font-semibold">${item.prixRevente ? item.prixRevente.toFixed(2) + '€' : '-'}</td>
                <td class="px-4 py-3">${valueHtml}</td>
                <td class="px-4 py-3">
                    <select onchange="changeStockStatus(${item.id}, this.value)" class="px-2 py-1 rounded text-xs font-semibold ${statutClass} border-none">
                        <option value="Stock" ${item.etatActuel === 'Stock' ? 'selected' : ''}>Stock</option>
                        <option value="En vente" ${item.etatActuel === 'En vente' ? 'selected' : ''}>En vente</option>
                        <option value="Vendu" ${item.etatActuel === 'Vendu' ? 'selected' : ''}>Vendu</option>
                    </select>
                </td>
                <td class="px-4 py-3">${detailsHtml}</td>
                <td class="px-4 py-3 text-center">
                    <button onclick="editStockItem(${item.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Modifier">⚙️</button>
                    <button onclick="deleteStockItem(${item.id})" class="text-red-600 hover:text-red-800" title="Supprimer">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// === FONCTIONS DE LOTS ===
function openCreateLotModal() {
    document.getElementById('create-lot-modal').style.display = 'flex';
}

function closeCreateLotModal(event) {
    if (!event || event.target.id === 'create-lot-modal') {
        document.getElementById('create-lot-modal').style.display = 'none';
        document.getElementById('lot-nom').value = '';
        document.getElementById('lot-date').value = '';
        document.getElementById('lot-prix').value = '';
        document.getElementById('lot-nb-cartes').value = '';
        document.getElementById('lot-details').value = '';
        document.getElementById('lot-photo').value = '';
        document.getElementById('lot-photo-status').innerHTML = '';
        currentLotPhoto = null;
    }
}

function handleLotPhoto(event) {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            currentLotPhoto = reader.result;
            document.getElementById('lot-photo-status').innerHTML = '<span class="text-green-600 text-sm">✓</span>';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Format non supporté. Utilisez JPG, JPEG, PNG ou WEBP');
    }
}

function createLot() {
    const nom = document.getElementById('lot-nom').value.trim();
    const prix = parseFloat(document.getElementById('lot-prix').value);
    const nbCartes = parseInt(document.getElementById('lot-nb-cartes').value) || 0;

    if (!nom || !prix) {
        alert('Veuillez renseigner au moins le nom et le prix du lot');
        return;
    }

    const dateInput = document.getElementById('lot-date').value;
    const dateAchat = dateInput ? new Date(dateInput).toISOString() : new Date().toISOString();

    const lot = {
        id: Date.now(),
        nom: nom,
        dateAchat: dateAchat,
        prix: prix,
        nbCartes: nbCartes,
        details: document.getElementById('lot-details').value,
        photo: currentLotPhoto,
        cartes: []
    };

    lots.push(lot);
    saveLots();
    updateLotSelect();
    renderLotsTable();
    closeCreateLotModal();
    alert('✅ Lot créé avec succès !');
}

function deleteLot(id) {
    if (confirm('Supprimer ce lot ? Les articles du stock associés à ce lot ne seront pas supprimés.')) {
        lots = lots.filter(l => l.id !== id);
        
        stockItems.forEach(item => {
            if (item.lot == id) {
                item.lot = '';
            }
        });
        
        saveLots();
        saveStockItems();
        updateLotSelect();
        renderLotsTable();
    }
}

function updateLotSelect() {
    const select = document.getElementById('stock-lot');
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">Aucun lot</option>';
    lots.forEach(lot => {
        const option = document.createElement('option');
        option.value = lot.id;
        option.textContent = lot.nom;
        select.appendChild(option);
    });
    
    select.value = currentValue;
}

function renderLotsTable() {
    const tbody = document.getElementById('lots-table');
    tbody.innerHTML = '';

    lots.forEach((lot, idx) => {
        const photoHtml = lot.photo
            ? `<img src="${lot.photo}" class="w-16 h-16 object-cover rounded cursor-pointer" onclick="zoomTablePhoto('${lot.photo}')" alt="Photo">`
            : '<div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">📷</div>';

        const dateFormatted = lot.dateAchat ? new Date(lot.dateAchat).toLocaleString('fr-FR') : '-';
        const rowClass = idx % 2 === 0 ? 'bg-gray-50' : 'bg-white';

        const nbCartesTotal = (lot.cartes || []).length;

        const row = `
            <tr class="${rowClass}">
                <td class="px-4 py-3">${photoHtml}</td>
                <td class="px-4 py-3 font-semibold">${lot.nom}</td>
                <td class="px-4 py-3 text-sm">${dateFormatted}</td>
                <td class="px-4 py-3 font-semibold">${lot.prix.toFixed(2)}€</td>
                <td class="px-4 py-3 text-sm">${nbCartesTotal} carte(s)</td>
                <td class="px-4 py-3 text-sm">${lot.details || '-'}</td>
                <td class="px-4 py-3 text-center">
                    <button onclick="openModifyLotModal(${lot.id})" class="text-purple-600 hover:text-purple-800 mr-2" title="Modifier le lot">⚙️</button>
                    <button onclick="deleteLot(${lot.id})" class="text-red-600 hover:text-red-800" title="Supprimer">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openModifyLotModal(lotId) {
    currentEditingLotId = lotId;
    const lot = lots.find(l => l.id === lotId);
    if (!lot) return;

    document.getElementById('modify-lot-title').textContent = `Modifier le lot: ${lot.nom}`;
    document.getElementById('modify-lot-modal').style.display = 'flex';
    
    renderLotCardsList();
}

function closeModifyLotModal(event) {
    if (!event || event.target.id === 'modify-lot-modal') {
        document.getElementById('modify-lot-modal').style.display = 'none';
        currentEditingLotId = null;
        renderLotsTable();
    }
}

function renderLotCardsList() {
    const lot = lots.find(l => l.id === currentEditingLotId);
    if (!lot) return;

    const listDiv = document.getElementById('lot-cards-list');

    if (!lot.cartes || lot.cartes.length === 0) {
        listDiv.innerHTML = '<p class="text-gray-500 text-center py-4">Aucune carte dans ce lot. Cliquez sur "Ajouter une carte au lot" pour commencer.</p>';
        return;
    }

    const prixAchatPotentiel = lot.prix / lot.cartes.length;

    listDiv.innerHTML = lot.cartes.map((carte, index) => {
        const photoHtml = carte.photo
            ? `<img src="${carte.photo}" class="w-20 h-20 object-cover rounded cursor-pointer" onclick="zoomTablePhoto('${carte.photo}')" alt="Photo">`
            : '<div class="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs">📷</div>';

        const typeColors = {
            'Basique': 'bg-gray-100 text-gray-800',
            'Reverse': 'bg-blue-100 text-blue-800',
            'Holo': 'bg-purple-100 text-purple-800',
            'Holo Reverse': 'bg-pink-100 text-pink-800'
        };

        const qualiteColors = {
            'Mint': 'bg-green-100 text-green-800',
            'Near Mint': 'bg-green-50 text-green-700',
            'Excellent +': 'bg-blue-100 text-blue-800',
            'Excellent': 'bg-blue-50 text-blue-700',
            'Très bon': 'bg-yellow-100 text-yellow-800',
            'Bon': 'bg-yellow-50 text-yellow-700',
            'Played': 'bg-orange-100 text-orange-800',
            'Mauvais': 'bg-red-100 text-red-800'
        };

        const prixReventeUnitaire = carte.prixRevente || 0;
        const prixReventeTotal = prixReventeUnitaire * (carte.quantite || 1);

        return `
            <div class="bg-white border rounded p-4 flex gap-4 items-start">
                ${photoHtml}
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="font-semibold text-lg">${carte.nom}</div>
                        ${carte.quantite > 1 ? `<span class="bg-purple-600 text-white text-xs px-2 py-1 rounded">×${carte.quantite}</span>` : ''}
                    </div>
                    <div class="flex gap-2 mb-2">
                        <span class="px-2 py-1 rounded text-xs font-semibold ${typeColors[carte.type] || 'bg-gray-100 text-gray-800'}">${carte.type}</span>
                        <span class="px-2 py-1 rounded text-xs font-semibold ${qualiteColors[carte.qualite] || 'bg-gray-100 text-gray-800'}">${carte.qualite}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span class="text-gray-600">Prix d'achat potentiel:</span>
                            <span class="font-semibold text-blue-600">${prixAchatPotentiel.toFixed(2)}€</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Prix de revente:</span>
                            <span class="font-semibold text-green-600">
                                ${prixReventeUnitaire > 0 ? `${prixReventeUnitaire.toFixed(2)}€/u` : '-'}
                                ${carte.quantite > 1 && prixReventeUnitaire > 0 ? ` (Total: ${prixReventeTotal.toFixed(2)}€)` : ''}
                            </span>
                        </div>
                    </div>
                    <div class="mt-2 text-sm">
                        <span class="text-gray-600">Description de l'état:</span>
                        <p class="text-gray-800 mt-1">${carte.descriptionEtat || 'Non renseigné'}</p>
                    </div>
                </div>
                <button onclick="removeCardFromLot(${index})" class="text-red-600 hover:text-red-800" title="Supprimer cette carte">
                    🗑️
                </button>
            </div>
        `;
    }).join('');
}

function openAddCardToLotModal() {
    const lot = lots.find(l => l.id === currentEditingLotId);
    if (!lot) return;

    const prixAchatPotentiel = lot.prix / (lot.cartes.length + 1);
    document.getElementById('card-lot-prix-achat').value = prixAchatPotentiel.toFixed(2);

    document.getElementById('add-card-lot-modal').style.display = 'flex';
}

function closeAddCardToLotModal(event) {
    if (!event || event.target.id === 'add-card-lot-modal') {
        document.getElementById('add-card-lot-modal').style.display = 'none';
        document.getElementById('card-lot-nom').value = '';
        document.getElementById('card-lot-type').value = 'Basique';
        document.getElementById('card-lot-quantite').value = '1';
        document.getElementById('card-lot-qualite').value = 'Mint';
        document.getElementById('card-lot-prix-revente').value = '';
        document.getElementById('card-lot-description-etat').value = '';
        document.getElementById('card-lot-photo').value = '';
        document.getElementById('card-lot-photo-status').innerHTML = '';
        currentCardLotPhoto = null;
    }
}

function handleCardLotPhoto(event) {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            currentCardLotPhoto = reader.result;
            document.getElementById('card-lot-photo-status').innerHTML = '<span class="text-green-600 text-sm">✓</span>';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Format non supporté. Utilisez JPG, JPEG, PNG ou WEBP');
    }
}

function addCardToLot() {
    const nom = document.getElementById('card-lot-nom').value.trim();
    const type = document.getElementById('card-lot-type').value;
    const quantite = parseInt(document.getElementById('card-lot-quantite').value) || 1;
    const qualite = document.getElementById('card-lot-qualite').value;
    const prixRevente = parseFloat(document.getElementById('card-lot-prix-revente').value) || 0;
    const descriptionEtat = document.getElementById('card-lot-description-etat').value.trim();

    if (!nom) {
        alert('Veuillez au moins renseigner le nom de la carte');
        return;
    }

    const lot = lots.find(l => l.id === currentEditingLotId);
    if (!lot) return;

    if (!lot.cartes) {
        lot.cartes = [];
    }

    const carte = {
        nom: nom,
        type: type,
        quantite: quantite,
        qualite: qualite,
        photo: currentCardLotPhoto,
        prixRevente: prixRevente,
        descriptionEtat: descriptionEtat
    };

    lot.cartes.push(carte);
    saveLots();
    
    closeAddCardToLotModal();
    renderLotCardsList();
    renderLotsTable();
    
    alert('✅ Carte ajoutée au lot !');
}

function removeCardFromLot(index) {
    if (confirm('Supprimer cette carte du lot ?')) {
        const lot = lots.find(l => l.id === currentEditingLotId);
        if (!lot) return;

        lot.cartes.splice(index, 1);
        saveLots();
        renderLotCardsList();
        renderLotsTable();
    }
}

// === EXPORT/IMPORT ===
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

// === MODE SOMBRE ===
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    // Mise à jour de tous les boutons dark mode
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

// === MENU BURGER MOBILE ===
function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    const burger = document.querySelector('.burger-menu');
    
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Empêcher le scroll du body quand le menu est ouvert
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

// === DRAG-TO-SCROLL POUR TABLEAUX ===
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
}

// === PWA INSTALLATION ===
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
        installBtn.style.display = 'flex';
    }
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
        console.log('Service Worker non disponible (normal en mode fichier local)');
    });
}

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation
    updateSummary();
    updateLotSelect();
    loadDarkMode();
    showTab('home');
    
    // Event listener pour la recherche avec Enter
    const searchInput = document.getElementById('api-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchCards();
        });
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
    
    // Init drag-to-scroll pour les tableaux
    const scrollContainers = document.querySelectorAll('.overflow-x-auto');
    scrollContainers.forEach(container => {
        initDragScroll(container);
    });

    // Observer pour détecter les nouveaux tableaux ajoutés dynamiquement
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
