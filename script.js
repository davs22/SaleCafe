// Dados do cardápio
const menuItems = [
    {
      id: 1,
      name: "Suco de Laranja",
      description: "Uma bebida gelada, saborosa e natural.",
      price: 8.0,
      image:
        "https://images.unsplash.com/photo-1650547001322-145ff2c0bed7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "bebidas",
    },
    {
      id: 2,
      name: "Açai 500Ml",
      description: "Açai delicioso, com diversas opções de personalização.",
      price: 16.0,
      image:
        "https://images.unsplash.com/photo-1583238620415-1e363e11aedf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "sobremesas",
    },
    {
      id: 3,
      name: "Coca-Cola",
      description: "Bebida gasificada sabor Coca-Cola.",
      price: 6.0,
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "bebidas",
    },
    {
      id: 4,
      name: "Pão de Queijo",
      description: "Com uma massa deliciosa e fresca, derretendo a cada mordida.",
      price: 3.0,
      image:
        "https://images.pexels.com/photos/20450299/pexels-photo-20450299/free-photo-of-brazilian-cheese-bread-in-the-oven.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "salgados",
    },
    {
      id: 5,
      name: "Coxinha",
      description: "Salgado com frango e massa leve. Levando um toque de sabor macio.",
      price: 7.0,
      image:
        "https://images.pexels.com/photos/31724197/pexels-photo-31724197/free-photo-of-delicious-brazilian-coxinha-appetizers-in-tray.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "salgados",
    },
    {
      id: 6,
      name: "Doce de chocolate",
      description: "Pequeno e requintado pedaço de Chocolate, misturado com cacau 70% e leite condesado.",
      price: 5.0,
      image:
        "https://images.pexels.com/photos/31731620/pexels-photo-31731620/free-photo-of-delicious-chocolate-cake-with-icing-on-glass-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "sobremesas",
    },
    {
      id: 7,
      name: "Cachorro Quente",
      description: "Massa fresca com molho cremoso de queijo, finalizado com frango grelhado e manjericão.",
      price: 10.0,
      image:
        "https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "salgados",
    },
    {
      id: 8,
      name: "Bolo de Chocolate",
      description: "Bolo quente de chocolate com centro derretido, servido com sorvete de creme.",
      price: 5.0,
      image:
        "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      category: "sobremesas",
    },
    {
      id: 9,
      name: "Cheesecake de Frutas Vermelhas",
      description: "Torta cremosa de cream cheese com cobertura de calda de frutas vermelhas.",
      price: 12.0,
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      category: "sobremesas",
    },
    {
      id: 10,
      name: "Pave",
      description: "Sobremesa italiana com camadas de biscoito champagne, café, queijo mascarpone e cacau.",
      price: 9.0,
      image:
        "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "sobremesas",
    },
    {
      id: 11,
      name: "Agua com Gás",
      description: "Bebida natural H2O gasificada.",
      price: 5.0,
      image:
        "https://images.tcdn.com.br/img/img_prod/1023690/agua_mineral_crystal_com_gas_500_ml_com_12_7885_1_6ced39bcb78ecaf9d11e598967e15773.jpg",
      category: "bebidas",
    },
    {
      id: 12,
      name: "Pastel de Carne e Queijo",
      description: "Massa crocante. Carne moida e fresca. Queijo derretido a parmesão.",
      price: 12.9,
      image: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/08/Pastel-paulista-freepik.jpg",
      category: "salgados",
    },
    {
      id: 13,
      name: "Gatorade",
      description: "Suco de frutas frescas. Contendo gás e taurina.",
      price: 6.0,
      image:
        "https://images.pexels.com/photos/18925017/pexels-photo-18925017/free-photo-of-beverages-in-fridge-in-store.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "bebidas",
    },
    {
      id: 14,
      name: "Água Mineral",
      description: "Água mineral sem gás. Garrafa 500ml.",
      price: 2.0,
      image:
        "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      category: "bebidas",
    },
  ]
  
  // Formatar preço para o formato brasileiro
  function formatPrice(price) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }
  
  // Renderizar itens do cardápio
  function renderMenuItems(items) {
    const menuContainer = document.getElementById("menu-items")
    menuContainer.innerHTML = ""
  
    if (items.length === 0) {
      menuContainer.innerHTML = '<div class="no-results">Nenhum item encontrado</div>'
      return
    }
  
    items.forEach((item) => {
      const menuItem = document.createElement("div")
      menuItem.className = "menu-item"
      menuItem.setAttribute("data-category", item.category)
  
      menuItem.innerHTML = `
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">${formatPrice(item.price)}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <span class="menu-item-category">${getCategoryName(item.category)}</span>
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                    </button>
                </div>
            `
  
      menuContainer.appendChild(menuItem)
    })
  
    // Adicionar evento aos botões de adicionar ao carrinho
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = Number.parseInt(this.getAttribute("data-id"))
        addToCart(itemId)
      })
    })
  }
  
  // Obter nome da categoria em português
  function getCategoryName(category) {
    const categories = {
      entradas: "Entradas",
      principais: "Pratos Principais",
      sobremesas: "Sobremesas",
      bebidas: "Bebidas",
    }
  
    return categories[category] || category
  }
  
  // Filtrar itens por categoria
  function filterByCategory(category) {
    if (category === "todos") {
      return menuItems
    } else {
      return menuItems.filter((item) => item.category === category)
    }
  }
  
  // Filtrar itens por termo de busca
  function filterBySearchTerm(items, term) {
    if (!term) return items
  
    term = term.toLowerCase()
    return items.filter((item) => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term))
  }
  
  // Funções do Carrinho de Compras
  let cart = []
  
  // Carregar carrinho do localStorage
  function loadCart() {
    const savedCart = localStorage.getItem("salecafe_cart")
    if (savedCart) {
      cart = JSON.parse(savedCart)
      updateCartCount()
      updateCartTotal()
    }
  }
  
  // Salvar carrinho no localStorage
  function saveCart() {
    localStorage.setItem("salecafe_cart", JSON.stringify(cart))
  }
  
  // Adicionar item ao carrinho
  function addToCart(itemId) {
    const item = menuItems.find((item) => item.id === itemId)
    if (!item) return
  
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)
  
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    }
  
    saveCart()
    updateCartCount()
    updateCartTotal()
    renderCartItems()
  
    // Mostrar feedback visual
    showNotification(`${item.name} adicionado ao carrinho!`)
  }
  
  // Remover item do carrinho
  function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId)
    saveCart()
    updateCartCount()
    updateCartTotal()
    renderCartItems()
  }
  
  // Atualizar quantidade de um item
  function updateItemQuantity(itemId, quantity) {
    const item = cart.find((item) => item.id === itemId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(itemId)
      } else {
        saveCart()
        updateCartTotal()
        renderCartItems()
      }
    }
  }
  
  // Atualizar contador de itens no carrinho
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count")
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  }
  
  // Calcular e atualizar o total do carrinho
  function updateCartTotal() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const cartTotalElement = document.getElementById("cart-total-price")
    if (cartTotalElement) {
      cartTotalElement.textContent = formatPrice(totalPrice)
    }
  }
  
  // Renderizar itens do carrinho
  function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items")
    if (!cartItemsContainer) return
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Seu carrinho está vazio</p>
          <p>Adicione itens para continuar</p>
        </div>
      `
      return
    }
  
    cartItemsContainer.innerHTML = ""
  
    cart.forEach((item) => {
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
  
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-controls">
            <div class="quantity-control">
              <button class="decrease-quantity" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-quantity" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `
  
      cartItemsContainer.appendChild(cartItem)
    })
  
    // Adicionar eventos aos botões
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = Number.parseInt(this.getAttribute("data-id"))
        const item = cart.find((item) => item.id === itemId)
        if (item) {
          updateItemQuantity(itemId, item.quantity - 1)
        }
      })
    })
  
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = Number.parseInt(this.getAttribute("data-id"))
        const item = cart.find((item) => item.id === itemId)
        if (item) {
          updateItemQuantity(itemId, item.quantity + 1)
        }
      })
    })
  
    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = Number.parseInt(this.getAttribute("data-id"))
        removeFromCart(itemId)
      })
    })
  }
  
  // Abrir o carrinho
  function openCart() {
    document.getElementById("cart-modal").classList.add("show")
    document.getElementById("cart-overlay").style.display = "block"
    renderCartItems()
  }
  
  // Fechar o carrinho
  function closeCart() {
    document.getElementById("cart-modal").classList.remove("show")
    document.getElementById("cart-overlay").style.display = "none"
  }
  
  // Finalizar compra
  function checkout() {
    if (cart.length === 0) {
      showNotification("Adicione itens ao carrinho para finalizar a compra", "error")
      return
    }
  
    // Aqui você implementaria a lógica de finalização de compra
    // Por exemplo, redirecionar para uma página de pagamento
  
    showNotification("Compra finalizada com sucesso! Obrigado pela preferência.", "success")
    cart = []
    saveCart()
    updateCartCount()
    renderCartItems()
    closeCart()
  }
  
  // Mostrar notificação
  function showNotification(message, type = "success") {
    // Verificar se já existe uma notificação e removê-la
    const existingNotification = document.querySelector(".notification")
    if (existingNotification) {
      existingNotification.remove()
    }
  
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
      </div>
    `
  
    document.body.appendChild(notification)
  
    // Adicionar evento para fechar a notificação
    notification.querySelector(".notification-close").addEventListener("click", () => {
      notification.remove()
    })
  
    // Remover a notificação automaticamente após 3 segundos
    setTimeout(() => {
      notification.classList.add("hide")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }
  
  // Inicializar a página
  document.addEventListener("DOMContentLoaded", () => {
    // Renderizar todos os itens inicialmente
    renderMenuItems(menuItems)
  
    // Adicionar evento de clique aos links de categoria
    const categoryLinks = document.querySelectorAll("nav ul li a")
    categoryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Remover classe 'active' de todos os links
        categoryLinks.forEach((l) => l.classList.remove("active"))
  
        // Adicionar classe 'active' ao link clicado
        link.classList.add("active")
  
        // Filtrar itens pela categoria selecionada
        const category = link.getAttribute("data-category")
        const filteredItems = filterByCategory(category)
  
        // Aplicar filtro de busca, se houver
        const searchTerm = document.getElementById("search-input").value
        const searchFilteredItems = filterBySearchTerm(filteredItems, searchTerm)
  
        // Renderizar itens filtrados
        renderMenuItems(searchFilteredItems)
      })
    })
  
    // Adicionar evento de busca
    const searchButton = document.getElementById("search-button")
    const searchInput = document.getElementById("search-input")
  
    function performSearch() {
      const searchTerm = searchInput.value
  
      // Obter categoria ativa
      const activeCategory = document.querySelector("nav ul li a.active")?.getAttribute("data-category") || "todos"
  
      // Filtrar por categoria
      const categoryFilteredItems = filterByCategory(activeCategory)
  
      // Filtrar por termo de busca
      const searchFilteredItems = filterBySearchTerm(categoryFilteredItems, searchTerm)
  
      // Renderizar itens filtrados
      renderMenuItems(searchFilteredItems)
    }
  
    searchButton.addEventListener("click", performSearch)
  
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  
    // Toggle menu mobile
    const menuToggle = document.getElementById("menu-toggle")
    const menuList = document.getElementById("menu-list")
  
    menuToggle.addEventListener("click", () => {
      menuList.classList.toggle("show")
    })
  
    // Fechar menu ao clicar em um item (mobile)
    menuList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          menuList.classList.remove("show")
        }
      })
    })
  
    // Inicializar o carrinho
    loadCart()
  
    // Eventos do carrinho
    document.getElementById("cart-button").addEventListener("click", openCart)
    document.getElementById("close-cart").addEventListener("click", closeCart)
    document.getElementById("cart-overlay").addEventListener("click", closeCart)
    document.getElementById("checkout-button").addEventListener("click", checkout)
  })
  