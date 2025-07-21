// Global variables
let orders = [];
let filteredOrders = [];
let currentLanguage = 'fr';
let currentOrderId = null;
let selectedNewStatus = null;

// Language translations
const translations = {
    fr: {
        // Existing translations
        dashboard: "Tableau de bord",
        settings: "Paramètres",
        logout: "Déconnexion",
        pageTitle: "Gestion des Commandes",
        newOrders: "Nouvelles",
        processing: "En cours",
        shipped: "Expédiées",
        completed: "Terminées",
        searchPlaceholder: "Rechercher par nom, téléphone, wilaya ou produit...",
        allStatuses: "Tous les statuts",
        new: "Nouveau",
        cancelled: "Annulé",
        statusReturn: "Retour",
        statusExchange: "Échange",
        to: "à",
        export: "Exporter",
        addTestOrder: "Commande test",
        addManually: "Ajouter manuellement",
        addNewOrder: "Ajouter une nouvelle commande",
        customerName: "Nom du client",
        phone: "Téléphone",
        wilaya: "Wilaya",
        city: "Commune",
        product: "Produit",
        variants: "Variantes",
        quantity: "Quantité",
        totalPrice: "Prix total (€)",
        customerNotes: "Notes du client",
        cancelOrder: "Annuler",
        saveOrder: "Enregistrer",
        id: "ID",
        nom: "Nom",
        produit: "Produit",
        total: "Total",
        date: "Date",
        statut: "Statut",
        action: "Action",
        invoiceTitle: "Confirmation de Commande",
        print: "Imprimer",
        save: "Sauvegarder",
        close: "Fermer",
        quantite: "Quantité",
        telephone: "Téléphone",
        commune: "Commune",
        prixProduit: "Prix produit",
        fraisLivraison: "Frais de livraison",
        callClient: "Appeler le client",
        memos: "Mémos / Notes",
        delete: "Supprimer",
        confirmDeleteTitle: "Confirmer la suppression",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer cette commande ?",
        confirmDeleteMessage: "Cette action est irréversible.",
        cancel: "Annuler",
        confirm: "Confirmer",
        // New translations for status change modal
        changeStatus: "Changer le statut",
        currentStatus: "Statut actuel",
        selectNewStatus: "Sélectionner le nouveau statut",
        notifyCustomer: "Notifier le client via WhatsApp",
        whatsappDescription: "Le client recevra automatiquement un message WhatsApp l'informant du changement de statut de sa commande.",
        statusUpdated: "Statut mis à jour avec succès!",
        statusUpdatedWithWhatsApp: "Statut mis à jour et notification WhatsApp envoyée!",
        statusUpdatedWithoutWhatsApp: "Statut mis à jour sans notification."
    },
    en: {
        // Existing translations
        dashboard: "Dashboard",
        settings: "Settings",
        logout: "Logout",
        pageTitle: "Order Management",
        newOrders: "New",
        processing: "Processing",
        shipped: "Shipped",
        completed: "Completed",
        searchPlaceholder: "Search by name, phone, wilaya or product...",
        allStatuses: "All statuses",
        new: "New",
        cancelled: "Cancelled",
        statusReturn: "Return",
        statusExchange: "Exchange",
        to: "to",
        export: "Export",
        addTestOrder: "Test order",
        addManually: "Add manually",
        addNewOrder: "Add new order",
        customerName: "Customer name",
        phone: "Phone",
        wilaya: "Wilaya",
        city: "City",
        product: "Product",
        variants: "Variants",
        quantity: "Quantity",
        totalPrice: "Total price (€)",
        customerNotes: "Customer notes",
        cancelOrder: "Cancel",
        saveOrder: "Save",
        id: "ID",
        nom: "Name",
        produit: "Product",
        total: "Total",
        date: "Date",
        statut: "Status",
        action: "Action",
        invoiceTitle: "Order Confirmation",
        print: "Print",
        save: "Save",
        close: "Close",
        quantite: "Quantity",
        telephone: "Phone",
        commune: "City",
        prixProduit: "Product price",
        fraisLivraison: "Delivery fees",
        callClient: "Call client",
        memos: "Memos / Notes",
        delete: "Delete",
        confirmDeleteTitle: "Confirm deletion",
        confirmDelete: "Are you sure you want to delete this order?",
        confirmDeleteMessage: "This action is irreversible.",
        cancel: "Cancel",
        confirm: "Confirm",
        // New translations for status change modal
        changeStatus: "Change Status",
        currentStatus: "Current Status",
        selectNewStatus: "Select new status",
        notifyCustomer: "Notify customer via WhatsApp",
        whatsappDescription: "The customer will automatically receive a WhatsApp message informing them of their order status change.",
        statusUpdated: "Status updated successfully!",
        statusUpdatedWithWhatsApp: "Status updated and WhatsApp notification sent!",
        statusUpdatedWithoutWhatsApp: "Status updated without notification."
    }
};

// Sample orders data
const sampleOrders = [
    {
        id: 1,
        customerName: "Ahmed Benali",
        phone: "+213 555 123 456",
        wilaya: "Alger",
        city: "Bab Ezzouar",
        product: "Montre Élégante",
        variants: "Noir, 42mm",
        quantity: 1,
        total: 89.99,
        date: "2024-01-15",
        status: "new",
        notes: "Livraison urgente demandée",
        unread: true
    },
    {
        id: 2,
        customerName: "Fatima Khelifi",
        phone: "+213 666 789 012",
        wilaya: "Oran",
        city: "Es Senia",
        product: "Bracelet Premium",
        variants: "Or rose, Taille M",
        quantity: 2,
        total: 156.50,
        date: "2024-01-14",
        status: "processing",
        notes: "",
        unread: false
    },
    {
        id: 3,
        customerName: "Mohamed Saidi",
        phone: "+213 777 345 678",
        wilaya: "Constantine",
        city: "Ali Mendjeli",
        product: "Collier Diamant",
        variants: "Argent, 45cm",
        quantity: 1,
        total: 234.00,
        date: "2024-01-13",
        status: "shipped",
        notes: "Cadeau d'anniversaire",
        unread: false
    },
    {
        id: 4,
        customerName: "Amina Boudjema",
        phone: "+213 888 901 234",
        wilaya: "Annaba",
        city: "El Bouni",
        product: "Boucles d'oreilles",
        variants: "Perles, Blanc",
        quantity: 1,
        total: 67.25,
        date: "2024-01-12",
        status: "completed",
        notes: "",
        unread: false
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    orders = [...sampleOrders];
    filteredOrders = [...orders];
    
    initializeEventListeners();
    updateOrdersTable();
    updateStats();
    updateLanguage();
});

// Event listeners
function initializeEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Menu toggle
    document.getElementById('menuToggle').addEventListener('click', toggleMenu);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Filter functionality
    document.getElementById('statusFilter').addEventListener('change', handleFilter);
    document.getElementById('dateFrom').addEventListener('change', handleFilter);
    document.getElementById('dateTo').addEventListener('change', handleFilter);
    
    // Button actions
    document.getElementById('addTestOrderBtn').addEventListener('click', addTestOrder);
    document.getElementById('addManualOrderBtn').addEventListener('click', toggleManualOrderForm);
    document.getElementById('cancelManualOrder').addEventListener('click', hideManualOrderForm);
    document.getElementById('saveManualOrder').addEventListener('click', saveManualOrder);
    document.getElementById('exportBtn').addEventListener('click', exportOrders);
    
    // Modal actions
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Status change modal actions
    document.getElementById('cancelStatusChange').addEventListener('click', closeStatusChangeModal);
    document.getElementById('confirmStatusChange').addEventListener('click', confirmStatusChange);
    
    // Status option selection
    document.querySelectorAll('.status-option').forEach(option => {
        option.addEventListener('click', function() {
            selectNewStatus(this.dataset.status);
        });
    });
    
    // Print and save actions
    document.getElementById('printBtn').addEventListener('click', printInvoice);
    document.getElementById('saveBtn').addEventListener('click', saveInvoice);
    
    // Delete order
    document.getElementById('deleteOrderBtn').addEventListener('click', showDeleteConfirmation);
    document.getElementById('cancelDelete').addEventListener('click', hideDeleteConfirmation);
    document.getElementById('confirmDelete').addEventListener('click', deleteOrder);
    
    // Call button
    document.getElementById('callBtn').addEventListener('click', callCustomer);
    
    // Notes functionality
    document.getElementById('addNotesBtn').addEventListener('click', toggleNotes);
    document.querySelectorAll('.quick-note-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            addQuickNote(this.dataset.note);
        });
    });
    
    // Close modal when clicking outside
    document.getElementById('statusChangeModal').addEventListener('click', function(e) {
        if (e.target === this) closeStatusChangeModal();
    });
}

// Status change modal functions
function openStatusChangeModal(orderId, currentStatus) {
    currentOrderId = orderId;
    selectedNewStatus = null;
    
    // Update current status display
    const currentStatusDisplay = document.getElementById('currentStatusDisplay');
    const currentStatusText = document.getElementById('currentStatusText');
    
    currentStatusDisplay.className = `current-status-value ${currentStatus}`;
    currentStatusText.textContent = getStatusText(currentStatus);
    
    // Reset status options
    document.querySelectorAll('.status-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.status === currentStatus) {
            option.style.display = 'none';
        } else {
            option.style.display = 'block';
        }
    });
    
    // Reset confirm button
    document.getElementById('confirmStatusChange').disabled = true;
    
    // Show modal
    document.getElementById('statusChangeModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeStatusChangeModal() {
    document.getElementById('statusChangeModal').classList.remove('show');
    document.body.style.overflow = '';
    currentOrderId = null;
    selectedNewStatus = null;
}

function selectNewStatus(status) {
    selectedNewStatus = status;
    
    // Update visual selection
    document.querySelectorAll('.status-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelector(`[data-status="${status}"]`).classList.add('selected');
    
    // Enable confirm button
    document.getElementById('confirmStatusChange').disabled = false;
}

function confirmStatusChange() {
    if (!currentOrderId || !selectedNewStatus) return;
    
    const whatsappNotify = document.getElementById('whatsappNotify').checked;
    
    // Find and update the order
    const orderIndex = orders.findIndex(order => order.id === currentOrderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = selectedNewStatus;
        orders[orderIndex].unread = false;
        
        // Update the table
        updateOrdersTable();
        updateStats();
        
        // Show success message
        showSuccessMessage(whatsappNotify);
        
        // Open WhatsApp if enabled
        if (whatsappNotify) {
            openWhatsAppChat(orders[orderIndex]);
        }
    }
    
    closeStatusChangeModal();
}

function showSuccessMessage(withWhatsApp) {
    const successElement = document.getElementById('statusChangeSuccess');
    const messageElement = document.getElementById('successMessage');
    
    if (withWhatsApp) {
        messageElement.textContent = translations[currentLanguage].statusUpdatedWithWhatsApp;
    } else {
        messageElement.textContent = translations[currentLanguage].statusUpdatedWithoutWhatsApp;
    }
    
    successElement.classList.add('show');
    
    setTimeout(() => {
        successElement.classList.remove('show');
    }, 4000);
}

function openWhatsAppChat(order) {
    // Create WhatsApp message
    const statusText = getStatusText(order.status);
    const message = `Bonjour ${order.customerName},\n\nVotre commande #${order.id} (${order.product}) a été mise à jour.\n\nNouveau statut: ${statusText}\n\nMerci pour votre confiance!\n\nYouzinElegancia`;
    
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = order.phone.replace(/\D/g, '');
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    console.log(`Opening WhatsApp chat with ${order.customerName} (${order.phone})`);
}

function getStatusText(status) {
    const statusTexts = {
        new: translations[currentLanguage].new,
        processing: translations[currentLanguage].processing,
        shipped: translations[currentLanguage].shipped,
        completed: translations[currentLanguage].completed,
        cancelled: translations[currentLanguage].cancelled,
        return: translations[currentLanguage].statusReturn,
        exchange: translations[currentLanguage].statusExchange
    };
    return statusTexts[status] || status;
}

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    document.getElementById('langText').textContent = currentLanguage === 'fr' ? 'Français' : 'English';
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    document.querySelectorAll('[data-key-placeholder]').forEach(element => {
        const key = element.getAttribute('data-key-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// Menu functions
function toggleMenu() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// Search and filter functions
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    applyFilters();
}

function handleFilter() {
    applyFilters();
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    
    filteredOrders = orders.filter(order => {
        const matchesSearch = !searchTerm || 
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.phone.toLowerCase().includes(searchTerm) ||
            order.wilaya.toLowerCase().includes(searchTerm) ||
            order.product.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || order.status === statusFilter;
        
        const matchesDate = (!dateFrom || order.date >= dateFrom) && 
                           (!dateTo || order.date <= dateTo);
        
        return matchesSearch && matchesStatus && matchesDate;
    });
    
    updateOrdersTable();
}

// Table functions
function updateOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    filteredOrders.forEach(order => {
        const row = createOrderRow(order);
        tbody.appendChild(row);
    });
}

function createOrderRow(order) {
    const row = document.createElement('tr');
    if (order.unread) {
        row.classList.add('unread');
    }
    
    row.innerHTML = `
        <td class="col-id">${order.id}</td>
        <td class="col-nom">${order.customerName}</td>
        <td class="col-phone">${order.phone}</td>
        <td class="col-wilaya">${order.wilaya}</td>
        <td class="col-produit">
            <span class="truncate" title="${order.product}">${order.product}</span>
        </td>
        <td class="col-variants">
            <span class="truncate" title="${order.variants}">${order.variants}</span>
        </td>
        <td class="col-quantity">${order.quantity}</td>
        <td class="col-total">€${order.total.toFixed(2)}</td>
        <td class="col-date">${formatDate(order.date)}</td>
        <td class="col-statut">
            <div class="status-dropdown">
                <div class="status-display ${order.status}" onclick="openStatusChangeModal(${order.id}, '${order.status}')">
                    ${getStatusText(order.status)}
                </div>
            </div>
        </td>
        <td class="col-action">
            <button class="action-btn" onclick="openOrderModal(${order.id})" title="Voir détails">
                <i class="fas fa-eye"></i>
            </button>
        </td>
    `;
    
    return row;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Stats functions
function updateStats() {
    const stats = {
        new: orders.filter(o => o.status === 'new').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        completed: orders.filter(o => o.status === 'completed').length
    };
    
    document.getElementById('newOrdersCount').textContent = stats.new;
    document.getElementById('processingOrdersCount').textContent = stats.processing;
    document.getElementById('shippedOrdersCount').textContent = stats.shipped;
    document.getElementById('completedOrdersCount').textContent = stats.completed;
}

// Order management functions
function addTestOrder() {
    const newOrder = {
        id: orders.length + 1,
        customerName: "Client Test",
        phone: "+213 555 000 000",
        wilaya: "Alger",
        city: "Centre",
        product: "Produit Test",
        variants: "Test",
        quantity: 1,
        total: 50.00,
        date: new Date().toISOString().split('T')[0],
        status: "new",
        notes: "Commande de test",
        unread: true
    };
    
    orders.unshift(newOrder);
    applyFilters();
    updateStats();
}

function toggleManualOrderForm() {
    const form = document.getElementById('manualOrderForm');
    form.classList.toggle('show');
}

function hideManualOrderForm() {
    document.getElementById('manualOrderForm').classList.remove('show');
    clearManualOrderForm();
}

function clearManualOrderForm() {
    document.getElementById('manualCustomerName').value = '';
    document.getElementById('manualPhone').value = '';
    document.getElementById('manualWilaya').value = '';
    document.getElementById('manualCity').value = '';
    document.getElementById('manualProduct').value = '';
    document.getElementById('manualVariants').value = '';
    document.getElementById('manualQuantity').value = '1';
    document.getElementById('manualTotal').value = '';
    document.getElementById('manualNotes').value = '';
}

function saveManualOrder() {
    const newOrder = {
        id: orders.length + 1,
        customerName: document.getElementById('manualCustomerName').value,
        phone: document.getElementById('manualPhone').value,
        wilaya: document.getElementById('manualWilaya').value,
        city: document.getElementById('manualCity').value,
        product: document.getElementById('manualProduct').value,
        variants: document.getElementById('manualVariants').value,
        quantity: parseInt(document.getElementById('manualQuantity').value),
        total: parseFloat(document.getElementById('manualTotal').value),
        date: new Date().toISOString().split('T')[0],
        status: "new",
        notes: document.getElementById('manualNotes').value,
        unread: true
    };
    
    orders.unshift(newOrder);
    hideManualOrderForm();
    applyFilters();
    updateStats();
}

// Modal functions
function openOrderModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Mark as read
    order.unread = false;
    updateOrdersTable();
    updateStats();
    
    // Populate modal with order data
    document.getElementById('produitValue').textContent = order.product;
    document.getElementById('couleurValue').textContent = order.variants;
    document.getElementById('quantiteValue').textContent = order.quantity;
    document.getElementById('nomValue').textContent = order.customerName;
    document.getElementById('telephoneValue').textContent = order.phone;
    document.getElementById('wilayaValue').textContent = order.wilaya;
    document.getElementById('communeValue').textContent = order.city;
    document.getElementById('prixProduitValue').textContent = `€${order.total.toFixed(2)}`;
    document.getElementById('fraisLivraisonValue').textContent = "€0.00";
    document.getElementById('totalValue').textContent = `€${order.total.toFixed(2)}`;
    
    // Show modal
    document.getElementById('modalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Store current order for actions
    window.currentModalOrder = order;
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.body.style.overflow = '';
    hideNotes();
}

// Export function
function exportOrders() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "ID,Nom,Téléphone,Wilaya,Produit,Variantes,Quantité,Total,Date,Statut\n" +
        filteredOrders.map(order => 
            `${order.id},"${order.customerName}","${order.phone}","${order.wilaya}","${order.product}","${order.variants}",${order.quantity},${order.total},"${order.date}","${getStatusText(order.status)}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "commandes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Print and save functions
function printInvoice() {
    window.print();
}

function saveInvoice() {
    // Implementation for saving invoice as PDF
    console.log('Saving invoice...');
}

// Delete functions
function showDeleteConfirmation() {
    document.getElementById('confirmationDialog').classList.add('show');
}

function hideDeleteConfirmation() {
    document.getElementById('confirmationDialog').classList.remove('show');
}

function deleteOrder() {
    if (window.currentModalOrder) {
        const orderIndex = orders.findIndex(o => o.id === window.currentModalOrder.id);
        if (orderIndex !== -1) {
            orders.splice(orderIndex, 1);
            updateOrdersTable();
            updateStats();
            closeModal();
            hideDeleteConfirmation();
        }
    }
}

// Call function
function callCustomer() {
    if (window.currentModalOrder) {
        window.open(`tel:${window.currentModalOrder.phone}`);
    }
}

// Notes functions
function toggleNotes() {
    const notesSection = document.getElementById('notesSection');
    notesSection.classList.toggle('show');
}

function hideNotes() {
    document.getElementById('notesSection').classList.remove('show');
}

function addQuickNote(note) {
    const textarea = document.getElementById('notesTextarea');
    const currentNotes = textarea.value;
    const timestamp = new Date().toLocaleString('fr-FR');
    const newNote = `[${timestamp}] ${note}`;
    
    textarea.value = currentNotes ? `${currentNotes}\n${newNote}` : newNote;
    
    // Save to order
    if (window.currentModalOrder) {
        window.currentModalOrder.notes = textarea.value;
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu')) {
        document.getElementById('dropdownMenu').classList.remove('show');
    }
});

// Scroll hint for mobile
function showScrollHint() {
    const hint = document.getElementById('scrollHint');
    if (window.innerWidth <= 767) {
        hint.classList.add('show');
        setTimeout(() => {
            hint.classList.remove('show');
        }, 3000);
    }
}

// Show scroll hint on page load for mobile
window.addEventListener('load', () => {
    setTimeout(showScrollHint, 1000);
});

// Hide scroll hint when user scrolls
document.querySelector('.table-container').addEventListener('scroll', () => {
    document.getElementById('scrollHint').classList.remove('show');
});
