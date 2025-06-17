document.addEventListener('DOMContentLoaded', function () {

  const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  const venda = vendas.length ? vendas[vendas.length - 1] : null;

  const resumoDiv = document.getElementById('resumoCompra');
  if (!venda) {
    resumoDiv.innerHTML = '<p>Compra não encontrada.</p>';
    document.getElementById('qrcode').style.display = 'none';
    return;
  }

  resumoDiv.innerHTML = `
    <h3>Resumo da Passagem</h3>
    <p><b>Origem:</b> ${venda.origem}</p>
    <p><b>Destino:</b> ${venda.destino}</p>
    <p><b>Data:</b> ${venda.data}</p>
    <p><b>Assento:</b> ${venda.assento}</p>
    <p><b>Preço:</b> R$ ${venda.preco.toFixed(2)}</p>
    <p><b>Status:</b> Confirmada</p>
  `;


  const qrData = `Passagem:${venda.origem}->${venda.destino}|Data:${venda.data}|Assento:${venda.assento}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}`;
  document.getElementById('qrcode').src = qrUrl;
});