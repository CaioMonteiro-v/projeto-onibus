document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  const tbody = document.querySelector('.tabela-vendas tbody');
  const dataInicioInput = document.getElementById('data-inicio');
  const dataFimInput = document.getElementById('data-fim');
  const btnFiltrar = document.getElementById('btn-filtrar');
  const btnExportar = document.getElementById('btn-exportar');

  // Função para formatar data no padrão YYYY-MM-DD
  const formatarData = (dataString) => {
    if (!dataString) return null;
    const [dia, mes, ano] = dataString.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };

  // Função para renderizar as vendas
  const renderizarVendas = (vendasParaRenderizar = vendas) => {
    tbody.innerHTML = '';
    let totalValor = 0;
    let totalPassagensValidas = 0;

    if (vendasParaRenderizar.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:20px;">
            Nenhuma venda encontrada para o período selecionado.
          </td>
        </tr>`;
    } else {
      vendasParaRenderizar.forEach((v, idx) => {
        const cancelado = v.status === 'cancelado';
        const valorLinha = cancelado ? 0 : v.preco;
        if (!cancelado) totalPassagensValidas++;
        totalValor += valorLinha;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${v.id || idx + 1}</td>
          <td>${v.cliente || '—'}</td>
          <td>${v.origem}</td>
          <td>${v.destino}</td>
          <td>${v.data}</td>
          <td>
            <span class="status ${cancelado ? 'cancelado' : 'confirmado'}">
              ${cancelado ? 'Cancelado' : 'Confirmado'}
            </span>
          </td>
          <td>
            <button class="btn-acao" data-index="${idx}" title="Detalhes">
              <i class="fas fa-eye"></i>
            </button>
          </td>
          <td>
            ${cancelado ? '-' : `<button class="btn-cancelar" data-index="${idx}">Cancelar</button>`}
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    // Atualiza os cartões de resumo
    document.getElementById('total-arrecadado').textContent = `R$ ${totalValor.toFixed(2)}`;
    document.getElementById('total-passagens').textContent = totalPassagensValidas;
    document.getElementById('media-venda').textContent =
      totalPassagensValidas ? `R$ ${(totalValor / totalPassagensValidas).toFixed(2)}` : 'R$ 0,00';
  };

  // Função para filtrar vendas por data
  const filtrarPorData = () => {
    const dataInicio = dataInicioInput.value;
    const dataFim = dataFimInput.value;

    // Se não há filtro selecionado, mostra todas as vendas
    if (!dataInicio && !dataFim) {
      renderizarVendas();
      return;
    }

    const vendasFiltradas = vendas.filter(v => {
      const dataVenda = formatarData(v.data);
      if (!dataVenda) return false;

      const dataVendaObj = new Date(dataVenda);
      const inicioObj = dataInicio ? new Date(dataInicio) : null;
      const fimObj = dataFim ? new Date(dataFim) : null;

      // Verifica se a data da venda está dentro do intervalo
      const maiorQueInicio = !inicioObj || dataVendaObj >= inicioObj;
      const menorQueFim = !fimObj || dataVendaObj <= fimObj;

      return maiorQueInicio && menorQueFim;
    });

    renderizarVendas(vendasFiltradas);
  };

  // Event listeners
  btnFiltrar.addEventListener('click', filtrarPorData);

  // Ação de detalhes
  tbody.addEventListener('click', e => {
    if (e.target.closest('.btn-acao')) {
      const btn = e.target.closest('.btn-acao');
      const venda = vendas[+btn.dataset.index];
      alert(
        `Detalhes da Venda:\n` +
        `ID: ${venda.id || '—'}\n` +
        `Cliente: ${venda.cliente || '—'}\n` +
        `Origem: ${venda.origem}\n` +
        `Destino: ${venda.destino}\n` +
        `Data: ${venda.data}\n` +
        `Valor: R$ ${venda.preco?.toFixed(2) || '0,00'}\n` +
        `Status: ${venda.status || 'Confirmado'}`
      );
    }
  });

  // Ação de cancelamento
  tbody.addEventListener('click', e => {
    if (e.target.closest('.btn-cancelar')) {
      const btn = e.target.closest('.btn-cancelar');
      const index = +btn.dataset.index;
      const confirmacao = confirm("Deseja realmente cancelar esta passagem?");
      if (confirmacao) {
        vendas[index].status = 'cancelado';
        localStorage.setItem('vendas', JSON.stringify(vendas));
        alert("Passagem cancelada com sucesso.");
        renderizarVendas();
      }
    }
  });

  // Renderiza todas as vendas inicialmente
  renderizarVendas();
});