document.addEventListener("DOMContentLoaded", () => {
  // Obter parâmetros da URL
  const urlParams = new URLSearchParams(window.location.search)
  const nome = urlParams.get("nome") || "Cliente"

  // Gerar ID de pedido aleatório
  const pedidoId = "#" + Math.floor(100000 + Math.random() * 900000)

  // Formatar data atual
  const dataAtual = new Date().toLocaleDateString("pt-BR")

  // Preencher os dados na página
  document.getElementById("cliente-nome").textContent = nome
  document.getElementById("pedido-id").textContent = pedidoId
  document.getElementById("data-pedido").textContent = dataAtual
})
