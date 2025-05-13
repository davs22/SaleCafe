document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pagamento-form")
  const nomeInput = document.getElementById("nome")
  const copyButton = document.getElementById("copy-button")
  const copyText = document.getElementById("copy-text")
  const confirmarButton = document.getElementById("confirmar-pagamento")
  const pixCode = document.querySelector(".pix-code").textContent.trim()

  // Função para copiar o código PIX
  copyButton.addEventListener("click", () => {
    navigator.clipboard
      .writeText(pixCode)
      .then(() => {
        copyText.textContent = "Copiado!"
        setTimeout(() => {
          copyText.textContent = "Copiar"
        }, 2000)
      })
      .catch((err) => {
        console.error("Erro ao copiar texto: ", err)
      })
  })

  // Validação do formulário
  nomeInput.addEventListener("input", () => {
    if (nomeInput.value.trim() !== "") {
      confirmarButton.disabled = false
    } else {
      confirmarButton.disabled = true
    }
  })

  // Inicialmente desabilitar o botão
  confirmarButton.disabled = true

  // Envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nome = nomeInput.value.trim()
    if (!nome) return

    // Mudar o texto do botão
    confirmarButton.textContent = "Processando..."
    confirmarButton.disabled = true

    // Simular processamento do pagamento
    setTimeout(() => {
      // Redirecionar para a página de confirmação com o nome como parâmetro
      window.location.href = `confirmacao.html?nome=${encodeURIComponent(nome)}`
    }, 1500)
  })
})
