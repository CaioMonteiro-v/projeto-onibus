document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const totalAssentos = 40; // Exemplo: 40 assentos
  const ocupados = JSON.parse(localStorage.getItem('assentosOcupados')) || [];
  let assentoSelecionado = null;

  // Renderiza os assentos
  let html = `<h2>Selecione seu assento</h2>
    <div class="assentos">`;
  for (let i = 1; i <= totalAssentos; i++) {
    const ocupado = ocupados.includes(i);
    html += `<div class="assento${ocupado ? ' ocupado' : ''}" data-num="${i}">
      ${i}
    </div>`;
    if (i % 4 === 0) html += '<br/>'; // Nova linha a cada 4 assentos
  }
  html += `</div>
    <div class="resumo"></div>
    <button id="confirmar" disabled>Confirmar Assento</button>`;

  container.innerHTML = html;

  // Seleção de assento
  document.querySelectorAll('.assento').forEach(div => {
    if (!div.classList.contains('ocupado')) {
      div.addEventListener('click', function () {
        document.querySelectorAll('.assento').forEach(a => a.classList.remove('selecionado'));
        this.classList.add('selecionado');
        assentoSelecionado = parseInt(this.dataset.num);
        document.querySelector('.resumo').textContent = `Assento selecionado: ${assentoSelecionado}`;
        document.getElementById('confirmar').disabled = false;
      });
    }
  });

  // Confirmação
  document.getElementById('confirmar').addEventListener('click', function () {
    if (assentoSelecionado) {
      // Salva assento escolhido no localStorage
      localStorage.setItem('assento', assentoSelecionado);
      // Marca como ocupado (mock)
      ocupados.push(assentoSelecionado);
      localStorage.setItem('assentosOcupados', JSON.stringify(ocupados));
      // Redireciona para pagamento
      window.location.href = 'pagamento.html';
    }
  });
});