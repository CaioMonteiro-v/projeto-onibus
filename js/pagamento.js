document.addEventListener('DOMContentLoaded', () => {
  const dados = JSON.parse(localStorage.getItem('passagem'));
  const assento = localStorage.getItem('assento');
  const resumo = document.getElementById('resumo');
  const infoExtra = document.getElementById('infoExtra');
  const formPagamento = document.getElementById('form-pagamento');
  const msgPagamento = document.getElementById('msg-pagamento');
  const nomeCliente = document.getElementById('nome-cliente');
  const cpfCliente = document.getElementById('cpf-cliente');
  const telefoneCliente = document.getElementById('telefone-cliente');

  // Máscaras para CPF e Telefone
  cpfCliente.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });

  telefoneCliente.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value.substring(0, 15);
  });

  if (!dados || !assento) {
    resumo.innerHTML = "<p>Informações da passagem não encontradas.</p>";
    formPagamento.style.display = "none";
  } else {
    resumo.innerHTML = `
      <p><strong>Origem:</strong> ${dados.origem}</p>
      <p><strong>Destino:</strong> ${dados.destino}</p>
      <p><strong>Data:</strong> ${dados.data} - ${dados.horario}</p>
      <p><strong>Empresa:</strong> ${dados.empresa}</p>
      <p><strong>Assento:</strong> ${assento}</p>
      <p><strong>Valor:</strong> R$ ${dados.preco.toFixed(2)}</p>
    `;
  }

  function gerarCamposCartao() {
    return `
      <div class="form-group">
        <label>Número do Cartão:</label>
        <input type="text" maxlength="19" placeholder="0000 0000 0000 0000" required>
      </div>
      <div class="form-group">
        <label>Nome no Cartão:</label>
        <input type="text" placeholder="Nome completo" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Validade:</label>
          <input type="text" maxlength="5" placeholder="MM/AA" required>
        </div>
        <div class="form-group">
          <label>CVV:</label>
          <input type="password" maxlength="3" placeholder="123" required>
        </div>
      </div>
    `;
  }

  document.getElementById('formaPagamento')
    .addEventListener('change', e => {
      const forma = e.target.value;
      if (forma === 'pix') {
        infoExtra.innerHTML = `
          <div class="pix-box">
            <p>Use a chave PIX:</p>
            <strong>pagamento@sistemamt.com.br</strong>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=pagamento@sistemamt.com.br&size=180x180"
                 class="qr-code" alt="QR Code PIX">
          </div>
        `;
      } else {
        infoExtra.innerHTML = gerarCamposCartao();
      }
    });

  // Dispara para mostrar já ao carregar
  document.getElementById('formaPagamento')
    .dispatchEvent(new Event('change'));

  formPagamento.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar dados do cliente
    if (!nomeCliente.value || !cpfCliente.value || !telefoneCliente.value) {
      msgPagamento.style.color = "red";
      msgPagamento.textContent = "Por favor, preencha todos os dados do passageiro!";
      return;
    }

    // Criar objeto com os dados da venda
    const venda = {
      ...dados,
      assento,
      cliente: nomeCliente.value,
      cpf: cpfCliente.value,
      telefone: telefoneCliente.value,
      dataVenda: new Date().toLocaleDateString('pt-BR'),
      status: 'confirmado'
    };

    // Salvar no histórico de vendas
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    vendas.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));
    
    // Limpar dados temporários
    localStorage.removeItem('passagem');
    localStorage.removeItem('assento');
    
    // Feedback ao usuário
    msgPagamento.style.color = "green";
    msgPagamento.textContent = "Pagamento confirmado! Passagem comprada com sucesso.";
    setTimeout(() => window.location.href = "minhas-viagens.html", 1500);
  });
});