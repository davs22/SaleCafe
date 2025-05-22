// Dados de exemplo para o painel do funcionário
// Em um ambiente real, esses dados viriam de um banco de dados

// Dados de produtos com estoque
let produtos = []

// Dados de pedidos
let pedidos = []

// Formatar preço para o formato brasileiro
function formatPrice(price) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

// Funções para manipulação de dados
function getPedidosPendentes() {
  return pedidos.filter((pedido) => pedido.status !== "entregue" && pedido.status !== "cancelado")
}

function getPedidosHistorico() {
  return pedidos.filter((pedido) => pedido.status === "entregue" || pedido.status === "cancelado")
}

function getProdutoById(id) {
  return produtos.find((produto) => produto.id === id)
}

function getPedidoById(id) {
  return pedidos.find((pedido) => pedido.id === id)
}

// Funções para renderização das tabelas
function renderPedidosTable(pedidosList, tableId) {
  const tableBody = document.getElementById(tableId)
  tableBody.innerHTML = ""

  if (pedidosList.length === 0) {
    const row = document.createElement("tr")
    row.innerHTML = `<td colspan="7" class="text-center">Nenhum pedido encontrado</td>`
    tableBody.appendChild(row)
    return
  }

  pedidosList.forEach((pedido) => {
    const row = document.createElement("tr")

    // Resumo dos itens
    const itemsResumidos = pedido.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")
    const itemsExibidos = itemsResumidos.length > 50 ? itemsResumidos.substring(0, 50) + "..." : itemsResumidos

    row.innerHTML = `
      <td>#${pedido.id}</td>
      <td>${pedido.cliente}</td>
      <td title="${itemsResumidos}">${itemsExibidos}</td>
      <td>${formatPrice(pedido.total)}</td>
      <td><span class="status-badge status-${pedido.status}">${pedido.status}</span></td>
      <td>${pedido.horario}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-action btn-view" data-id="${pedido.id}" title="Ver detalhes">
            <i class="fas fa-eye"></i>
          </button>
          ${
            pedido.status === "pronto"
              ? `
            <button class="btn-action btn-deliver" data-id="${pedido.id}" title="Marcar como entregue">
              <i class="fas fa-check"></i>
            </button>
          `
              : ""
          }
        </div>
      </td>
    `

    tableBody.appendChild(row)
  })

  // Adicionar eventos aos botões
  document.querySelectorAll(".btn-view").forEach((button) => {
    button.addEventListener("click", function () {
      const pedidoId = Number.parseInt(this.getAttribute("data-id"))
      openPedidoModal(pedidoId)
    })
  })

  document.querySelectorAll(".btn-deliver").forEach((button) => {
    button.addEventListener("click", function () {
      const pedidoId = Number.parseInt(this.getAttribute("data-id"))
      marcarComoEntregue(pedidoId)
    })
  })
}

function renderEstoqueTable(produtosList) {
  const tableBody = document.getElementById("estoque-table-body")
  tableBody.innerHTML = ""

  if (produtosList.length === 0) {
    const row = document.createElement("tr")
    row.innerHTML = `<td colspan="7" class="text-center">Nenhum produto encontrado</td>`
    tableBody.appendChild(row)
    return
  }

  produtosList.forEach((produto) => {
    const row = document.createElement("tr")

    // Status de estoque
    let estoqueStatus = ""
    if (produto.stock <= 5) {
      estoqueStatus = `<span class="status-badge status-pendente">${produto.stock} unid.</span>`
    } else if (produto.stock <= 10) {
      estoqueStatus = `<span class="status-badge status-preparando">${produto.stock} unid.</span>`
    } else {
      estoqueStatus = `<span class="status-badge status-entregue">${produto.stock} unid.</span>`
    }

    row.innerHTML = `
      <td>#${produto.id}</td>
      <td><img src="${produto.image}" alt="${produto.name}"></td>
      <td>${produto.name}</td>
      <td>${produto.category}</td>
      <td>${formatPrice(produto.price)}</td>
      <td>${estoqueStatus}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-action btn-edit" data-id="${produto.id}" title="Editar estoque">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </td>
    `

    tableBody.appendChild(row)
  })

  // Adicionar eventos aos botões
  document.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", function () {
      const produtoId = Number.parseInt(this.getAttribute("data-id"))
      openEstoqueModal(produtoId)
    })
  })
}

// Funções para manipulação de modais
function openPedidoModal(pedidoId) {
  const pedido = getPedidoById(pedidoId)
  if (!pedido) return

  // Preencher os dados do pedido no modal
  document.getElementById("pedido-id").textContent = pedido.id
  document.getElementById("pedido-cliente").textContent = pedido.cliente
  document.getElementById("pedido-data").textContent = `${pedido.data} às ${pedido.horario}`

  const statusElement = document.getElementById("pedido-status")
  statusElement.textContent = pedido.status
  statusElement.className = "status-badge status-" + pedido.status

  // Preencher os itens do pedido
  const itemsBody = document.getElementById("pedido-items-body")
  itemsBody.innerHTML = ""

  pedido.items.forEach((item) => {
    const row = document.createElement("tr")
    const subtotal = item.price * item.quantity

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${formatPrice(item.price)}</td>
      <td>${formatPrice(subtotal)}</td>
    `

    itemsBody.appendChild(row)
  })

  // Preencher o total
  document.getElementById("pedido-total").textContent = formatPrice(pedido.total)

  // Configurar o select de status
  const selectStatus = document.getElementById("update-status")
  selectStatus.value = pedido.status

  // Configurar o botão de marcar como entregue
  const btnEntregue = document.getElementById("mark-delivered")
  if (pedido.status === "entregue") {
    btnEntregue.disabled = true
    btnEntregue.classList.add("disabled")
  } else {
    btnEntregue.disabled = false
    btnEntregue.classList.remove("disabled")
  }

  // Abrir o modal
  document.getElementById("pedido-modal").classList.add("show")
  document.getElementById("modal-overlay").style.display = "block"
}

function openEstoqueModal(produtoId) {
  const produto = getProdutoById(produtoId)
  if (!produto) return

  // Preencher os dados do produto no modal
  document.getElementById("produto-id").value = produto.id
  document.getElementById("produto-nome").textContent = produto.name
  document.getElementById("produto-quantidade").value = produto.stock
  document.getElementById("adicionar-quantidade").value = 0
  document.getElementById("produto-preco").value = produto.price

  // Abrir o modal
  document.getElementById("estoque-modal").classList.add("show")
  document.getElementById("modal-overlay").style.display = "block"
}

function openNovoProdutoModal() {
  // Limpar o formulário
  document.getElementById("novo-produto-form").reset()
  document.getElementById("preview-img").src = "https://via.placeholder.com/150"

  // Abrir o modal
  document.getElementById("novo-produto-modal").classList.add("show")
  document.getElementById("modal-overlay").style.display = "block"
}

function closeModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("show")
  })
  document.getElementById("modal-overlay").style.display = "none"
}

// Funções para ações nos pedidos e estoque
function marcarComoEntregue(pedidoId) {
  const pedido = getPedidoById(pedidoId)
  if (!pedido) return

  pedido.status = "entregue"

  // Atualizar as tabelas
  renderPedidosTable(getPedidosPendentes(), "pedidos-table-body")
  renderPedidosTable(getPedidosHistorico(), "historico-table-body")

  // Mostrar notificação
  showNotification(`Pedido #${pedidoId} marcado como entregue!`, "success")
}

function atualizarStatusPedido(pedidoId, novoStatus) {
  const pedido = getPedidoById(pedidoId)
  if (!pedido) return

  pedido.status = novoStatus

  // Atualizar as tabelas
  renderPedidosTable(getPedidosPendentes(), "pedidos-table-body")
  renderPedidosTable(getPedidosHistorico(), "historico-table-body")

  // Fechar o modal
  closeModals()

  // Mostrar notificação
  showNotification(`Status do pedido #${pedidoId} atualizado para ${novoStatus}!`, "success")
}

function atualizarEstoque(produtoId, novaQuantidade, novoPreco) {
  const produto = getProdutoById(produtoId)
  if (!produto) return

  produto.stock = novaQuantidade
  produto.price = novoPreco

  // Atualizar a tabela
  renderEstoqueTable(produtos)

  // Fechar o modal
  closeModals()

  // Mostrar notificação
  showNotification(`Estoque do produto ${produto.name} atualizado!`, "success")
}

function adicionarNovoProduto(novoProduto) {
  // Gerar um novo ID
  const novoId = Math.max(...produtos.map((p) => p.id)) + 1

  // Adicionar o novo produto
  produtos.push({
    id: novoId,
    name: novoProduto.nome,
    description: novoProduto.descricao,
    price: novoProduto.preco,
    image: novoProduto.imagem,
    category: novoProduto.categoria,
    stock: novoProduto.estoque,
  })

  // Atualizar a tabela
  renderEstoqueTable(produtos)

  // Fechar o modal
  closeModals()

  // Mostrar notificação
  showNotification(`Produto ${novoProduto.nome} adicionado com sucesso!`, "success")
}

// Função para mostrar notificações
function showNotification(message, type = "success") {
  // Verificar se já existe uma notificação e removê-la
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.position = "fixed"
  notification.style.top = "20px"
  notification.style.right = "20px"
  notification.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545"
  notification.style.color = "white"
  notification.style.padding = "15px 20px"
  notification.style.borderRadius = "5px"
  notification.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)"
  notification.style.zIndex = "2000"
  notification.style.transition = "all 0.3s ease"

  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close" style="background: none; border: none; color: white; margin-left: 10px; cursor: pointer;">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  document.body.appendChild(notification)

  // Adicionar evento para fechar a notificação
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.remove()
  })

  // Remover a notificação automaticamente após 3 segundos
  setTimeout(() => {
    notification.style.opacity = "0"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Funções para navegação entre seções
function showSection(sectionId) {
  // Esconder todas as seções
  document.querySelectorAll(".dashboard-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Mostrar a seção selecionada
  document.getElementById(sectionId + "-section").classList.add("active")

  // Atualizar o link ativo
  document.querySelectorAll("#funcionario-menu-list li a").forEach((link) => {
    link.classList.remove("active")
  })

  document.querySelector(`#funcionario-menu-list li a[data-section="${sectionId}"]`).classList.add("active")
}

// Funções para filtros e busca
function filtrarPedidosPorStatus(status) {
  if (status === "todos") {
    return getPedidosPendentes()
  } else {
    return getPedidosPendentes().filter((pedido) => pedido.status === status)
  }
}

function filtrarProdutosPorCategoria(categoria) {
  if (categoria === "todos") {
    return produtos
  } else {
    return produtos.filter((produto) => produto.category === categoria)
  }
}

function buscarPedidos(termo, lista) {
  if (!termo) return lista

  termo = termo.toLowerCase()
  return lista.filter(
    (pedido) =>
      pedido.cliente.toLowerCase().includes(termo) ||
      pedido.id.toString().includes(termo) ||
      pedido.items.some((item) => item.name.toLowerCase().includes(termo)),
  )
}

function buscarProdutos(termo) {
  if (!termo) return produtos

  termo = termo.toLowerCase()
  return produtos.filter(
    (produto) =>
      produto.name.toLowerCase().includes(termo) ||
      produto.description.toLowerCase().includes(termo) ||
      produto.category.toLowerCase().includes(termo),
  )
}

// Funções para login e painel de funcionário
function showLoginModal() {
  document.getElementById("login-overlay").style.display = "flex"
  document.getElementById("username").focus()
}

function hideLoginModal() {
  document.getElementById("login-overlay").style.display = "none"
  document.getElementById("login-form").reset()
}

function showFuncionarioPanel() {
  document.getElementById("funcionario-panel").classList.add("show")
  document.body.style.overflow = "hidden" // Impedir rolagem da página principal
}

function hideFuncionarioPanel() {
  document.getElementById("funcionario-panel").classList.remove("show")
  document.body.style.overflow = "" // Restaurar rolagem da página principal
}

function fazerLogin(username, password) {
  // Em um ambiente real, isso seria validado no servidor
  // Aqui estamos apenas simulando
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("salecafe_funcionario_logado", "true")
    localStorage.setItem("salecafe_funcionario_nome", "Administrador")
    document.getElementById("funcionario-nome").textContent = "Administrador"
    hideLoginModal()
    showFuncionarioPanel()
    showNotification("Login realizado com sucesso!", "success")
    return true
  } else {
    showNotification("Usuário ou senha incorretos!", "error")
    return false
  }
}

function fazerLogout() {
  localStorage.removeItem("salecafe_funcionario_logado")
  localStorage.removeItem("salecafe_funcionario_nome")
  hideFuncionarioPanel()
}

// Carregar dados iniciais
function carregarDadosIniciais() {
  // Declaração da variável menuItems (simulando import)
  const menuItems = [
    {
      id: 1,
      name: "Suco de Laranja",
      description: "Uma bebida gelada, saborosa e natural.",
      price: 28.9,
      image:
        "https://images.unsplash.com/photo-1650547001322-145ff2c0bed7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "bebidas",
    },
    {
      id: 2,
      name: "Açai 500Ml",
      description: "Açai delicioso, com diversas opções de personalização.",
      price: 42.9,
      image:
        "https://images.unsplash.com/photo-1583238620415-1e363e11aedf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "sobremesas",
    },
    {
      id: 3,
      name: "Coca-Cola",
      description: "Bebida gasificada sabor Coca-Cola.",
      price: 54.9,
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "bebidas",
    },
  ]

  // Carregar produtos do script.js
  if (typeof menuItems !== "undefined") {
    produtos = menuItems.map((item) => ({
      ...item,
      stock: Math.floor(Math.random() * 30) + 5, // Adicionar estoque aleatório entre 5 e 35
    }))
  } else {
    // Dados de exemplo caso menuItems não esteja disponível
    produtos = [
      {
        id: 1,
        name: "Suco de Laranja",
        description: "Uma bebida gelada, saborosa e natural.",
        price: 28.9,
        image:
          "https://images.unsplash.com/photo-1650547001322-145ff2c0bed7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "bebidas",
        stock: 25,
      },
      {
        id: 2,
        name: "Açai 500Ml",
        description: "Açai delicioso, com diversas opções de personalização.",
        price: 42.9,
        image:
          "https://images.unsplash.com/photo-1583238620415-1e363e11aedf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "sobremesas",
        stock: 15,
      },
      {
        id: 3,
        name: "Coca-Cola",
        description: "Bebida gasificada sabor Coca-Cola.",
        price: 54.9,
        image:
          "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "bebidas",
        stock: 40,
      },
    ]
  }

  // Criar pedidos de exemplo
  pedidos = [
    {
      id: 1001,
      cliente: "João Silva",
      items: [
        { id: 1, name: "Suco de Laranja", price: 28.9, quantity: 2 },
        { id: 4, name: "Pão de Queijo", price: 78.9, quantity: 1 },
      ],
      total: 136.7,
      status: "pendente",
      data: "2024-05-06",
      horario: "10:30",
    },
    {
      id: 1002,
      cliente: "Maria Oliveira",
      items: [
        { id: 2, name: "Açai 500Ml", price: 42.9, quantity: 1 },
        { id: 6, name: "Doce de chocolate", price: 72.9, quantity: 2 },
      ],
      total: 188.7,
      status: "preparando",
      data: "2024-05-06",
      horario: "11:15",
    },
    {
      id: 1003,
      cliente: "Pedro Santos",
      items: [
        { id: 3, name: "Coca-Cola", price: 54.9, quantity: 3 },
        { id: 5, name: "Coxinha", price: 68.9, quantity: 4 },
      ],
      total: 440.3,
      status: "pronto",
      data: "2024-05-06",
      horario: "12:00",
    },
    {
      id: 1004,
      cliente: "Ana Ferreira",
      items: [
        { id: 7, name: "Cachorro Quente", price: 58.9, quantity: 2 },
        { id: 8, name: "Bolo de Chocolate", price: 32.9, quantity: 1 },
      ],
      total: 150.7,
      status: "entregue",
      data: "2024-05-05",
      horario: "15:45",
    },
    {
      id: 1005,
      cliente: "Carlos Mendes",
      items: [
        { id: 1, name: "Suco de Laranja", price: 28.9, quantity: 1 },
        { id: 2, name: "Açai 500Ml", price: 42.9, quantity: 1 },
        { id: 5, name: "Coxinha", price: 68.9, quantity: 2 },
      ],
      total: 209.6,
      status: "entregue",
      data: "2024-05-05",
      horario: "16:30",
    },
  ]
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Carregar dados iniciais
  carregarDadosIniciais()

  // Verificar se o usuário já está logado
  const isLoggedIn = localStorage.getItem("salecafe_funcionario_logado")
  if (isLoggedIn) {
    const funcionarioNome = localStorage.getItem("salecafe_funcionario_nome") || "Funcionário"
    document.getElementById("funcionario-nome").textContent = funcionarioNome
  }

  // Evento para abrir o modal de login
  document.getElementById("login-button").addEventListener("click", showLoginModal)

  // Evento para cancelar o login
  document.getElementById("cancel-login").addEventListener("click", hideLoginModal)

  // Evento para fechar o modal de login ao clicar fora
  document.getElementById("login-overlay").addEventListener("click", function (e) {
    if (e.target === this) {
      hideLoginModal()
    }
  })

  // Evento para fazer login
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    fazerLogin(username, password)
  })

  // Evento para voltar à visualização de cliente
  document.getElementById("voltar-cliente-button").addEventListener("click", hideFuncionarioPanel)

  // Evento para logout
  document.getElementById("logout-button").addEventListener("click", fazerLogout)

  // Eventos de navegação no painel de funcionário
  document.querySelectorAll("#funcionario-menu-list li a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("data-section")
      if (section) {
        showSection(section)
      }
    })
  })

  // Eventos para modais
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", closeModals)
  })

  document.getElementById("modal-overlay").addEventListener("click", closeModals)

  // Eventos para ações nos modais
  document.getElementById("mark-delivered").addEventListener("click", () => {
    const pedidoId = Number.parseInt(document.getElementById("pedido-id").textContent)
    marcarComoEntregue(pedidoId)
    closeModals()
  })

  document.getElementById("save-status").addEventListener("click", () => {
    const pedidoId = Number.parseInt(document.getElementById("pedido-id").textContent)
    const novoStatus = document.getElementById("update-status").value
    atualizarStatusPedido(pedidoId, novoStatus)
  })

  document.getElementById("save-estoque").addEventListener("click", () => {
    const produtoId = Number.parseInt(document.getElementById("produto-id").value)
    const quantidadeAtual = Number.parseInt(document.getElementById("produto-quantidade").value)
    const adicionar = Number.parseInt(document.getElementById("adicionar-quantidade").value)
    const novaQuantidade = quantidadeAtual + adicionar
    const novoPreco = Number.parseFloat(document.getElementById("produto-preco").value)

    atualizarEstoque(produtoId, novaQuantidade, novoPreco)
  })

  // Evento para adicionar novo produto
  document.getElementById("add-produto-btn").addEventListener("click", openNovoProdutoModal)

  document.getElementById("save-novo-produto").addEventListener("click", () => {
    const nome = document.getElementById("novo-nome").value
    const descricao = document.getElementById("novo-descricao").value
    const categoria = document.getElementById("novo-categoria").value
    const preco = Number.parseFloat(document.getElementById("novo-preco").value)
    const estoque = Number.parseInt(document.getElementById("novo-estoque").value)
    const imagem = document.getElementById("novo-imagem").value

    if (!nome || !descricao || !categoria || isNaN(preco) || isNaN(estoque) || !imagem) {
      showNotification("Por favor, preencha todos os campos corretamente", "error")
      return
    }

    adicionarNovoProduto({
      nome,
      descricao,
      categoria,
      preco,
      estoque,
      imagem,
    })
  })

  // Preview da imagem
  document.getElementById("novo-imagem").addEventListener("input", function () {
    const url = this.value
    if (url) {
      document.getElementById("preview-img").src = url
    } else {
      document.getElementById("preview-img").src = "https://via.placeholder.com/150"
    }
  })

  // Eventos de filtros
  document.getElementById("filter-status").addEventListener("change", function () {
    const status = this.value
    const filteredPedidos = filtrarPedidosPorStatus(status)
    renderPedidosTable(filteredPedidos, "pedidos-table-body")
  })

  document.getElementById("filter-categoria").addEventListener("change", function () {
    const categoria = this.value
    const filteredProdutos = filtrarProdutosPorCategoria(categoria)
    renderEstoqueTable(filteredProdutos)
  })

  // Eventos de busca
  document.getElementById("search-pedidos-button").addEventListener("click", () => {
    const termo = document.getElementById("search-pedidos").value
    const status = document.getElementById("filter-status").value
    const baseList = filtrarPedidosPorStatus(status)
    const filteredPedidos = buscarPedidos(termo, baseList)
    renderPedidosTable(filteredPedidos, "pedidos-table-body")
  })

  document.getElementById("search-estoque-button").addEventListener("click", () => {
    const termo = document.getElementById("search-estoque").value
    const filteredProdutos = buscarProdutos(termo)
    renderEstoqueTable(filteredProdutos)
  })

  document.getElementById("search-historico-button").addEventListener("click", () => {
    const termo = document.getElementById("search-historico").value
    const filteredHistorico = buscarPedidos(termo, getPedidosHistorico())
    renderPedidosTable(filteredHistorico, "historico-table-body")
  })

  // Evento para filtro por data
  document.getElementById("apply-date-filter").addEventListener("click", () => {
    const dateFrom = document.getElementById("date-from").value
    const dateTo = document.getElementById("date-to").value

    if (!dateFrom || !dateTo) {
      showNotification("Por favor, selecione as datas de início e fim", "error")
      return
    }

    const filteredHistorico = getPedidosHistorico().filter((pedido) => {
      return pedido.data >= dateFrom && pedido.data <= dateTo
    })

    renderPedidosTable(filteredHistorico, "historico-table-body")
  })

  // Renderizar tabelas iniciais
  renderPedidosTable(getPedidosPendentes(), "pedidos-table-body")
  renderPedidosTable(getPedidosHistorico(), "historico-table-body")
  renderEstoqueTable(produtos)
})


   const modal = document.getElementById("statusMOdal");
   const btn = document.getElementById("opneModalBtn");
   const closeBtn = document.querySelector(".close");

   btn.onclick = function (){
      modal.style.display = "block";
     };

     closeBtn.onclick = function () {
      modal.style.display ="none";
     };

     window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
    }
};
