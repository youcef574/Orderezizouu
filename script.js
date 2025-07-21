// Global variables
let orders = [];
let filteredOrders = [];
let currentLanguage = 'fr';
let currentOrder = null;

// Language translations
const translations = {
    fr: {
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
        dashboard: "Tableau de bord",
        settings: "Paramètres",
        logout: "Déconnexion",
        id: "ID",
        nom: "Nom",
        phone: "Téléphone",
        wilaya: "Wilaya",
        produit: "Produit",
        variants: "Variantes",
        quantity: "Qté",
        total: "Total",
        date: "Date",
        statut: "Statut",
        action: "Action",
        invoiceTitle: "Confirmation de Commande",
        print: "Imprimer",
        save: "Sauvegarder",
        close: "Fermer",
        variantes: "Variantes",
        quantite: "Quantité",
        telephone: "Téléphone",
        commune: "Commune",
        prixProduit: "Prix produit",
        fraisLivraison: "Frais de livraison",
        callClient: "📞 Appeler le client",
        memos: "📝 Mémos / Notes",
        delete: "Supprimer",
        confirmDeleteTitle: "Confirmer la suppression",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer cette commande ?",
        confirmDeleteMessage: "Cette action est irréversible.",
        cancel: "Annuler",
        confirm: "Supprimer",
        customerName: "Nom du client",
        city: "Commune",
        product: "Produit",
        totalPrice: "Prix total (€)",
        customerNotes: "Notes du client",
        cancelOrder: "Annuler",
        saveOrder: "Enregistrer",
        addNewOrder: "Ajouter une nouvelle commande",
        sendWhatsAppNotification: "Envoyer notification WhatsApp",
        whatsappConfirmTitle: "Envoyer notification WhatsApp ?",
        whatsappConfirmMessage: "Voulez-vous envoyer une notification WhatsApp au client pour l'informer du changement de statut ?",
        send: "Envoyer",
        dontSend: "Ne pas envoyer"
    },
    ar: {
        pageTitle: "إدارة الطلبات",
        newOrders: "جديدة",
        processing: "قيد المعالجة",
        shipped: "مشحونة", 
        completed: "مكتملة",
        searchPlaceholder: "البحث بالاسم، الهاتف، الولاية أو المنتج...",
        allStatuses: "جميع الحالات",
        new: "جديد",
        cancelled: "ملغي",
        statusReturn: "إرجاع",
        statusExchange: "استبدال",
        to: "إلى",
        export: "تصدير",
        addTestOrder: "طلب تجريبي",
        addManually: "إضافة يدوية",
        dashboard: "لوحة التحكم",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
        id: "المعرف",
        nom: "الاسم",
        phone: "الهاتف",
        wilaya: "الولاية",
        produit: "المنتج",
        variants: "المتغيرات",
        quantity: "الكمية",
        total: "المجموع",
        date: "التاريخ",
        statut: "الحالة",
        action: "الإجراء",
        invoiceTitle: "تأكيد الطلب",
        print: "طباعة",
        save: "حفظ",
        close: "إغلاق",
        variantes: "المتغيرات",
        quantite: "الكمية",
        telephone: "الهاتف",
        commune: "البلدية",
        prixProduit: "سعر المنتج",
        fraisLivraison: "رسوم التوصيل",
        callClient: "📞 اتصال بالعميل",
        memos: "📝 مذكرات / ملاحظات",
        delete: "حذف",
        confirmDeleteTitle: "تأكيد الحذف",
        confirmDelete: "هل أنت متأكد من حذف هذا الطلب؟",
        confirmDeleteMessage: "هذا الإجراء لا يمكن التراجع عنه.",
        cancel: "إلغاء",
        confirm: "حذف",
        customerName: "اسم العميل",
        city: "البلدية",
        product: "المنتج",
        totalPrice: "السعر الإجمالي (€)",
        customerNotes: "ملاحظات العميل",
        cancelOrder: "إلغاء",
        saveOrder: "حفظ",
        addNewOrder: "إضافة طلب جديد",
        sendWhatsAppNotification: "إرسال إشعار واتساب",
        whatsappConfirmTitle: "إرسال إشعار واتساب؟",
        whatsappConfirmMessage: "هل تريد إرسال إشعار واتساب للعميل لإعلامه بتغيير حالة الطلب؟",
        send: "إرسال",
        dontSend: "عدم الإرسال"
    }
};

// Sample orders data
const sampleOrders = [
    {
        id: 1,
        nom: "أحمد بن علي",
        phone: "+213555123456",
        wilaya: "الجزائر",
        commune: "باب الوادي",
        produit: "ساعة ذكية",
        variants: "أسود، 42مم",
        quantity: 1,
        total: 15000,
        date: "2024-01-15",
        statut: "new",
        notes: "يفضل التوصيل مساءً",
        isUnread: true
    },
    {
        id: 2,
        nom: "فاطمة محمد",
        phone: "+213666789012",
        wilaya: "وهران",
        commune: "السانيا",
        produit: "حقيبة يد",
        variants: "بني، متوسط",
        quantity: 2,
        total: 8500,
        date: "2024-01-14",
        statut: "processing",
        notes: "",
        isUnread: false
    },
    {
        id: 3,
        nom: "محمد الأمين",
        phone: "+213777345678",
        wilaya: "قسنطينة",
        commune: "قسنطينة",
        produit: "سماعات لاسلكية",
        variants: "أبيض",
        quantity: 1,
        total: 12000,
        date: "2024-01-13",
        statut: "shipped",
        notes: "عنوان دقيق مطلوب",
        isUnread: false
    },
    {
        id: 4,
        nom: "خديجة بوعلام",
        phone: "+213888901234",
        wilaya: "تيزي وزو",
        commune: "تيزي وزو",
        produit: "فستان صيفي",
        variants: "أزرق، مقاس M",
        quantity: 1,
        total: 6500,
        date: "2024-01-12",
        statut: "completed",
        notes: "",
        isUnread: false
    },
    {
        id: 5,
        nom: "يوسف كريم",
        phone: "+213999567890",
        wilaya: "سطيف",
        commune: "سطيف",
        produit: "حذاء رياضي",
        variants: "أسود، مقاس 42",
        quantity: 1,
        total: 9500,
        date: "2024-01-11",
        statut: "cancelled",
        notes: "طلب الإلغاء بسبب تغيير الرأي",
        isUnread: false
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    orders = [...sampleOrders];
    filteredOrders = [...orders];
    
    initializeEventListeners();
    renderOrders();
    updateStats();
    updateLanguage();
    
    // Show scroll hint on mobile
    if (window.innerWidth <= 767) {
        showScrollHint();
    }
});

// Initialize event listeners
function initializeEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // User menu toggle
    document.getElementById('menuToggle').addEventListener('click', toggleUserMenu);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Filter functionality
    document.getElementById('statusFilter').addEventListener('change', handleFilter);
    document.getElementById('dateFrom').addEventListener('change', handleFilter);
    document.getElementById('dateTo').addEventListener('change', handleFilter);
    
    // Toolbar buttons
    document.getElementById('exportBtn').addEventListener('click', exportOrders);
    document.getElementById('addTestOrderBtn').addEventListener('click', addTestOrder);
    document.getElementById('addManualOrderBtn').addEventListener('click', toggleManualOrderForm);
    
    // Manual order form
    document.getElementById('cancelManualOrder').addEventListener('click', hideManualOrderForm);
    document.getElementById('saveManualOrder').addEventListener('click', saveManualOrder);
    
    // Modal functionality
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Modal buttons
    document.getElementById('printBtn').addEventListener('click', printInvoice);
    document.getElementById('saveBtn').addEventListener('click', saveInvoice);
    document.getElementById('callBtn').addEventListener('click', callClient);
    document.getElementById('addNotesBtn').addEventListener('click', toggleNotes);
    document.getElementById('deleteOrderBtn').addEventListener('click', showDeleteConfirmation);
    
    // Delete confirmation
    document.getElementById('cancelDelete').addEventListener('click', hideDeleteConfirmation);
    document.getElementById('confirmDelete').addEventListener('click', deleteOrder);
    
    // Quick notes
    document.querySelectorAll('.quick-note-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const note = this.getAttribute('data-note');
            const textarea = document.getElementById('notesTextarea');
            const currentNotes = textarea.value;
            const timestamp = new Date().toLocaleString('fr-FR');
            const newNote = `[${timestamp}] ${note}`;
            
            if (currentNotes) {
                textarea.value = currentNotes + '\n' + newNote;
            } else {
                textarea.value = newNote;
            }
            
            // Save notes to current order
            if (currentOrder) {
                currentOrder.notes = textarea.value;
                updateOrderInArray(currentOrder);
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const userMenu = document.querySelector('.user-menu');
        const dropdown = document.getElementById('dropdownMenu');
        
        if (!userMenu.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Handle window resize for scroll hint
    window.addEventListener('resize', function() {
        const scrollHint = document.getElementById('scrollHint');
        if (window.innerWidth <= 767) {
            showScrollHint();
        } else {
            scrollHint.classList.remove('show');
        }
    });
}

// Language toggle functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'ar' : 'fr';
    updateLanguage();
    
    // Update language button text
    const langText = document.getElementById('langText');
    langText.textContent = currentLanguage === 'fr' ? 'Français' : 'العربية';
    
    // Update document direction
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
}

// Update language for all elements
function updateLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-key-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-key-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// User menu toggle
function toggleUserMenu() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        filteredOrders = [...orders];
    } else {
        filteredOrders = orders.filter(order => 
            order.nom.toLowerCase().includes(searchTerm) ||
            order.phone.toLowerCase().includes(searchTerm) ||
            order.wilaya.toLowerCase().includes(searchTerm) ||
            order.produit.toLowerCase().includes(searchTerm) ||
            order.id.toString().includes(searchTerm)
        );
    }
    
    renderOrders();
}

// Filter functionality
function handleFilter() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    
    filteredOrders = orders.filter(order => {
        let matchesStatus = !statusFilter || order.statut === statusFilter;
        let matchesDate = true;
        
        if (dateFrom || dateTo) {
            const orderDate = new Date(order.date);
            if (dateFrom) {
                matchesDate = matchesDate && orderDate >= new Date(dateFrom);
            }
            if (dateTo) {
                matchesDate = matchesDate && orderDate <= new Date(dateTo);
            }
        }
        
        return matchesStatus && matchesDate;
    });
    
    renderOrders();
}

// Render orders in table
function renderOrders() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    filteredOrders.forEach(order => {
        const row = createOrderRow(order);
        tbody.appendChild(row);
    });
    
    // Update stats after rendering
    updateStats();
}

// Create order row
function createOrderRow(order) {
    const row = document.createElement('tr');
    if (order.isUnread) {
        row.classList.add('unread');
    }
    
    row.innerHTML = `
        <td class="col-id">${order.id}</td>
        <td class="col-nom">
            <div class="truncate" title="${order.nom}">${order.nom}</div>
        </td>
        <td class="col-phone">
            <div class="truncate" title="${order.phone}">${order.phone}</div>
        </td>
        <td class="col-wilaya">
            <div class="truncate" title="${order.wilaya}">${order.wilaya}</div>
        </td>
        <td class="col-produit">
            <div class="truncate" title="${order.produit}">${order.produit}</div>
        </td>
        <td class="col-variants">
            <div class="truncate" title="${order.variants}">${order.variants}</div>
        </td>
        <td class="col-quantity">${order.quantity}</td>
        <td class="col-total">${formatCurrency(order.total)}</td>
        <td class="col-date">${formatDate(order.date)}</td>
        <td class="col-statut">
            <div class="status-dropdown">
                <select class="status-select" onchange="changeOrderStatus(${order.id}, this.value)">
                    <option value="new" ${order.statut === 'new' ? 'selected' : ''}>Nouveau</option>
                    <option value="processing" ${order.statut === 'processing' ? 'selected' : ''}>En cours</option>
                    <option value="shipped" ${order.statut === 'shipped' ? 'selected' : ''}>Expédié</option>
                    <option value="completed" ${order.statut === 'completed' ? 'selected' : ''}>Terminé</option>
                    <option value="cancelled" ${order.statut === 'cancelled' ? 'selected' : ''}>Annulé</option>
                    <option value="return" ${order.statut === 'return' ? 'selected' : ''}>Retour</option>
                    <option value="exchange" ${order.statut === 'exchange' ? 'selected' : ''}>Échange</option>
                </select>
                <div class="status-display ${order.statut}">
                    ${getStatusIcon(order.statut)} ${getStatusText(order.statut)}
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

// Change order status with WhatsApp confirmation
function changeOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const oldStatus = order.statut;
    
    // Show WhatsApp confirmation dialog
    showWhatsAppConfirmation(order, newStatus, oldStatus);
}

// Show WhatsApp confirmation dialog
function showWhatsAppConfirmation(order, newStatus, oldStatus) {
    const confirmationHtml = `
        <div class="confirmation-dialog show" id="whatsappConfirmDialog">
            <div class="confirmation-content">
                <h3>${translations[currentLanguage].whatsappConfirmTitle}</h3>
                <p>${translations[currentLanguage].whatsappConfirmMessage}</p>
                <div class="confirmation-actions">
                    <button class="btn btn-secondary" onclick="updateStatusWithoutNotification(${order.id}, '${newStatus}', '${oldStatus}')">${translations[currentLanguage].dontSend}</button>
                    <button class="btn btn-primary" onclick="updateStatusWithNotification(${order.id}, '${newStatus}', '${oldStatus}')">${translations[currentLanguage].send}</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHtml);
}

// Update status without WhatsApp notification
function updateStatusWithoutNotification(orderId, newStatus, oldStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.statut = newStatus;
        updateOrderInArray(order);
        renderOrders();
        
        // Show success message without WhatsApp
        showStatusUpdateMessage(false);
    }
    
    // Remove confirmation dialog
    const dialog = document.getElementById('whatsappConfirmDialog');
    if (dialog) {
        dialog.remove();
    }
}

// Update status with WhatsApp notification
function updateStatusWithNotification(orderId, newStatus, oldStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.statut = newStatus;
        updateOrderInArray(order);
        renderOrders();
        
        // Send WhatsApp notification
        sendWhatsAppNotification(order, newStatus);
        
        // Show success message with WhatsApp
        showStatusUpdateMessage(true);
    }
    
    // Remove confirmation dialog
    const dialog = document.getElementById('whatsappConfirmDialog');
    if (dialog) {
        dialog.remove();
    }
}

// Send WhatsApp notification
function sendWhatsAppNotification(order, status) {
    const statusMessages = {
        'new': 'تم استلام طلبكم وسيتم معالجته قريباً',
        'processing': 'طلبكم قيد المعالجة حالياً',
        'shipped': 'تم شحن طلبكم وسيصل قريباً',
        'completed': 'تم تسليم طلبكم بنجاح',
        'cancelled': 'تم إلغاء طلبكم',
        'return': 'تم استلام طلب الإرجاع',
        'exchange': 'تم استلام طلب الاستبدال'
    };
    
    const message = `مرحباً ${order.nom}،\n\n${statusMessages[status]}\n\nرقم الطلب: ${order.id}\nالمنتج: ${order.produit}\n\nشكراً لثقتكم بنا\nYouzinElegancia`;
    
    // Simulate WhatsApp API call
    console.log('Sending WhatsApp message:', message);
    
    // In a real application, you would make an API call here
    // Example: await sendWhatsAppMessage(order.phone, message);
}

// Show status update message
function showStatusUpdateMessage(withWhatsApp) {
    const message = withWhatsApp ? 
        'تم تحديث حالة الطلب وإرسال إشعار واتساب للعميل' : 
        'تم تحديث حالة الطلب بنجاح';
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${withWhatsApp ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Get status icon
function getStatusIcon(status) {
    const icons = {
        'new': '🆕',
        'processing': '⏳',
        'shipped': '🚚',
        'completed': '✅',
        'cancelled': '❌',
        'return': '↩️',
        'exchange': '🔄'
    };
    return icons[status] || '📦';
}

// Get status text
function getStatusText(status) {
    const texts = {
        'new': 'Nouveau',
        'processing': 'En cours',
        'shipped': 'Expédié',
        'completed': 'Terminé',
        'cancelled': 'Annulé',
        'return': 'Retour',
        'exchange': 'Échange'
    };
    return texts[status] || status;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

// Update statistics
function updateStats() {
    const stats = {
        new: orders.filter(o => o.statut === 'new').length,
        processing: orders.filter(o => o.statut === 'processing').length,
        shipped: orders.filter(o => o.statut === 'shipped').length,
        completed: orders.filter(o => o.statut === 'completed').length
    };
    
    document.getElementById('newOrdersCount').textContent = stats.new;
    document.getElementById('processingOrdersCount').textContent = stats.processing;
    document.getElementById('shippedOrdersCount').textContent = stats.shipped;
    document.getElementById('completedOrdersCount').textContent = stats.completed;
}

// Export orders
function exportOrders() {
    const csvContent = generateCSV(filteredOrders);
    downloadCSV(csvContent, 'orders.csv');
}

// Generate CSV content
function generateCSV(orders) {
    const headers = ['ID', 'Nom', 'Téléphone', 'Wilaya', 'Commune', 'Produit', 'Variantes', 'Quantité', 'Total', 'Date', 'Statut', 'Notes'];
    const rows = orders.map(order => [
        order.id,
        order.nom,
        order.phone,
        order.wilaya,
        order.commune,
        order.produit,
        order.variants,
        order.quantity,
        order.total,
        order.date,
        order.statut,
        order.notes || ''
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    return csvContent;
}

// Download CSV file
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add test order
function addTestOrder() {
    const newOrder = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        nom: "عميل تجريبي",
        phone: "+213555000000",
        wilaya: "الجزائر",
        commune: "الجزائر الوسطى",
        produit: "منتج تجريبي",
        variants: "متنوع",
        quantity: 1,
        total: 5000,
        date: new Date().toISOString().split('T')[0],
        statut: "new",
        notes: "طلب تجريبي للاختبار",
        isUnread: true
    };
    
    orders.unshift(newOrder);
    filteredOrders = [...orders];
    renderOrders();
    updateStats();
}

// Toggle manual order form
function toggleManualOrderForm() {
    const form = document.getElementById('manualOrderForm');
    form.classList.toggle('show');
    
    if (form.classList.contains('show')) {
        document.getElementById('manualCustomerName').focus();
    }
}

// Hide manual order form
function hideManualOrderForm() {
    document.getElementById('manualOrderForm').classList.remove('show');
    clearManualOrderForm();
}

// Clear manual order form
function clearManualOrderForm() {
    const form = document.getElementById('manualOrderForm');
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.value = '');
    document.getElementById('manualQuantity').value = '1';
}

// Save manual order
function saveManualOrder() {
    const form = document.getElementById('manualOrderForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['manualCustomerName', 'manualPhone', 'manualWilaya', 'manualCity', 'manualProduct', 'manualTotal'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#d1d5db';
        }
    });
    
    if (!isValid) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
    
    const newOrder = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        nom: document.getElementById('manualCustomerName').value,
        phone: document.getElementById('manualPhone').value,
        wilaya: document.getElementById('manualWilaya').value,
        commune: document.getElementById('manualCity').value,
        produit: document.getElementById('manualProduct').value,
        variants: document.getElementById('manualVariants').value || 'Standard',
        quantity: parseInt(document.getElementById('manualQuantity').value),
        total: parseFloat(document.getElementById('manualTotal').value),
        date: new Date().toISOString().split('T')[0],
        statut: "new",
        notes: document.getElementById('manualNotes').value || '',
        isUnread: true
    };
    
    orders.unshift(newOrder);
    filteredOrders = [...orders];
    renderOrders();
    updateStats();
    hideManualOrderForm();
    
    // Show success message
    alert('Commande ajoutée avec succès!');
}

// Open order modal
function openOrderModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    currentOrder = order;
    
    // Mark as read
    order.isUnread = false;
    updateOrderInArray(order);
    renderOrders();
    
    // Populate modal with order data
    document.getElementById('produitValue').textContent = order.produit;
    document.getElementById('couleurValue').textContent = order.variants;
    document.getElementById('quantiteValue').textContent = order.quantity;
    document.getElementById('nomValue').textContent = order.nom;
    document.getElementById('telephoneValue').textContent = order.phone;
    document.getElementById('wilayaValue').textContent = order.wilaya;
    document.getElementById('communeValue').textContent = order.commune;
    document.getElementById('prixProduitValue').textContent = formatCurrency(order.total - 500); // Assuming 500 delivery fee
    document.getElementById('fraisLivraisonValue').textContent = formatCurrency(500);
    document.getElementById('totalValue').textContent = formatCurrency(order.total);
    
    // Load notes
    document.getElementById('notesTextarea').value = order.notes || '';
    
    // Show modal
    document.getElementById('modalOverlay').classList.add('show');
}

// Close modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('notesSection').classList.remove('show');
    currentOrder = null;
}

// Print invoice
function printInvoice() {
    window.print();
}

// Save invoice
function saveInvoice() {
    if (!currentOrder) return;
    
    const invoiceData = {
        orderId: currentOrder.id,
        customer: currentOrder.nom,
        phone: currentOrder.phone,
        address: `${currentOrder.commune}, ${currentOrder.wilaya}`,
        product: currentOrder.produit,
        variants: currentOrder.variants,
        quantity: currentOrder.quantity,
        total: currentOrder.total,
        date: new Date().toLocaleDateString('fr-FR')
    };
    
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `facture-${currentOrder.id}.json`;
    link.click();
}

// Call client
function callClient() {
    if (!currentOrder) return;
    
    const phoneNumber = currentOrder.phone.replace(/\D/g, '');
    window.open(`tel:${phoneNumber}`, '_self');
    
    // Add call note
    const textarea = document.getElementById('notesTextarea');
    const timestamp = new Date().toLocaleString('fr-FR');
    const callNote = `[${timestamp}] Appel effectué`;
    
    if (textarea.value) {
        textarea.value += '\n' + callNote;
    } else {
        textarea.value = callNote;
    }
    
    // Save notes
    currentOrder.notes = textarea.value;
    updateOrderInArray(currentOrder);
}

// Toggle notes section
function toggleNotes() {
    const notesSection = document.getElementById('notesSection');
    notesSection.classList.toggle('show');
    
    if (notesSection.classList.contains('show')) {
        document.getElementById('notesTextarea').focus();
    }
}

// Show delete confirmation
function showDeleteConfirmation() {
    document.getElementById('confirmationDialog').classList.add('show');
}

// Hide delete confirmation
function hideDeleteConfirmation() {
    document.getElementById('confirmationDialog').classList.remove('show');
}

// Delete order
function deleteOrder() {
    if (!currentOrder) return;
    
    const orderIndex = orders.findIndex(o => o.id === currentOrder.id);
    if (orderIndex > -1) {
        orders.splice(orderIndex, 1);
        filteredOrders = [...orders];
        renderOrders();
        updateStats();
        closeModal();
        hideDeleteConfirmation();
        
        // Show success message
        alert('Commande supprimée avec succès');
    }
}

// Update order in array
function updateOrderInArray(updatedOrder) {
    const index = orders.findIndex(o => o.id === updatedOrder.id);
    if (index > -1) {
        orders[index] = { ...updatedOrder };
        filteredOrders = [...orders];
    }
}

// Show scroll hint
function showScrollHint() {
    const scrollHint = document.getElementById('scrollHint');
    scrollHint.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        scrollHint.classList.remove('show');
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
