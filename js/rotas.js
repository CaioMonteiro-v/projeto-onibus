document.addEventListener('DOMContentLoaded', function() {
  const tbody = document.querySelector('.admin-table tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td>1</td>
        <td>Cuiabá</td>
        <td>Rondonópolis</td>
        <td>R$ 120,00</td>
        <td>
          <button class="btn">Editar</button>
          <button class="btn" style="background:#e74c3c;">Excluir</button>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Sinop</td>
        <td>Cuiabá</td>
        <td>R$ 150,00</td>
        <td>
          <button class="btn">Editar</button>
          <button class="btn" style="background:#e74c3c;">Excluir</button>
        </td>
      </tr>
    `;
  }
  document.getElementById('btn-add-rota').addEventListener('click', function() {
    alert('Funcionalidade de adicionar rota simulada!');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let rotas = [
    { id: 1, origem: "Cuiabá", destino: "Rondonópolis", preco: 120.00 },
    { id: 2, origem: "Sinop", destino: "Cuiabá", preco: 150.00 }
  ];
  let editandoId = null;

  const tbody = document.querySelector('.admin-table tbody');
  const modal = document.getElementById('modalRota');
  const form = document.getElementById('formRota');
  const modalTitulo = document.getElementById('modalTituloRota');
  const rotaId = document.getElementById('rotaId');
  const rotaOrigem = document.getElementById('rotaOrigem');
  const rotaDestino = document.getElementById('rotaDestino');
  const rotaPreco = document.getElementById('rotaPreco');
  const precoMedioSpan = document.getElementById('preco-medio');

  function renderRotas() {
    tbody.innerHTML = rotas.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.origem}</td>
        <td>${r.destino}</td>
        <td>R$ ${r.preco.toFixed(2)}</td>
        <td>
          <button class="btn-editar" data-id="${r.id}">Editar</button>
          <button class="btn-excluir" data-id="${r.id}">Excluir</button>
        </td>
      </tr>
    `).join('');
    atualizarPrecoMedio();
  }

  function atualizarPrecoMedio() {
    if (rotas.length === 0) {
      precoMedioSpan.textContent = "0,00";
      return;
    }
    const soma = rotas.reduce((acc, r) => acc + r.preco, 0);
    const media = soma / rotas.length;
    precoMedioSpan.textContent = media.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Abrir modal para nova rota
  document.getElementById('btn-add-rota').onclick = function() {
    modalTitulo.textContent = "Nova Rota";
    rotaId.value = "";
    rotaOrigem.value = "";
    rotaDestino.value = "";
    rotaPreco.value = "";
    modal.style.display = "flex";
    editandoId = null;
  };

  // Fechar modal
  document.getElementById('fecharModalRota').onclick = function() {
    modal.style.display = "none";
  };

  // Salvar rota (nova ou edição)
  form.onsubmit = function(e) {
    e.preventDefault();
    if (editandoId) {
      // Editar
      const idx = rotas.findIndex(r => r.id === editandoId);
      rotas[idx].origem = rotaOrigem.value;
      rotas[idx].destino = rotaDestino.value;
      rotas[idx].preco = parseFloat(rotaPreco.value);
    } else {
      // Nova
      const novoId = rotas.length ? Math.max(...rotas.map(r => r.id)) + 1 : 1;
      rotas.push({
        id: novoId,
        origem: rotaOrigem.value,
        destino: rotaDestino.value,
        preco: parseFloat(rotaPreco.value)
      });
    }
    renderRotas();
    modal.style.display = "none";
  };

  // Delegação para editar/excluir
  tbody.onclick = function(e) {
    if (e.target.classList.contains('btn-editar')) {
      const id = Number(e.target.dataset.id);
      const rota = rotas.find(r => r.id === id);
      modalTitulo.textContent = "Editar Rota";
      rotaId.value = rota.id;
      rotaOrigem.value = rota.origem;
      rotaDestino.value = rota.destino;
      rotaPreco.value = rota.preco;
      modal.style.display = "flex";
      editandoId = id;
    }
    if (e.target.classList.contains('btn-excluir')) {
      const id = Number(e.target.dataset.id);
      if (confirm("Deseja excluir esta rota?")) {
        rotas = rotas.filter(r => r.id !== id);
        renderRotas();
      }
    }
  };

  // Fecha modal ao clicar fora do formulário
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };

  renderRotas();
});