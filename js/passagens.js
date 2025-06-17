
document.getElementById('buscaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const origem = document.getElementById('origem').value.trim().toLowerCase();
    const destino = document.getElementById('destino').value.trim().toLowerCase();
    const data = document.getElementById('data').value;

    const lista = document.querySelector('.passagens-list');
    lista.innerHTML = '';

    if (!origem || !destino || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (origem === destino) {
        alert("Origem e destino não podem ser iguais.");
        return;
    }

    const cidadesMT = [
        "cuiabá", "várzea grande", "sinop", "rondonópolis", "cáceres",
        "tangará da serra", "barra do garças", "alta floresta", "sorriso", "lucas do rio verde",
        "pontes e lacerda", "juína", "nobres", "colíder", "campo verde", "juara",
        "mirassol d'oeste", "nortelândia", "rosário oeste", "guarantã do norte"
    ];

    if (!cidadesMT.includes(origem) || !cidadesMT.includes(destino)) {
        alert("Por favor, digite cidades válidas do estado de Mato Grosso.");
        return;
    }

    const empresas = [
        "Expresso MT",
        "TransMT",
        "Rotas do Norte",
        "ViaBus",
        "MT Express",
        "Pioneira Bus",
        "Cerrado Transportes",
        "Portal do Oeste",
        "Verde Vale",
        "Central Norte"
    ];

    const horarios = ["06:00", "08:30", "14:00", "18:45"];
    const containerResultados = document.getElementById('resultados');
    containerResultados.style.display = 'block';

    empresas.forEach(empresa => {
        const preco = Math.floor(Math.random() * 50 + 100); // R$100 a R$150
        const horario = randomItem(horarios);

        const card = document.createElement('div');
        card.className = 'passagem-card';

        card.innerHTML = `
            <div class="passagem-info">
                <h3>${capitalize(origem)} → ${capitalize(destino)}</h3>
                <p>Data: ${formataData(data)} - ${horario}</p>
                <p>Empresa: ${empresa}</p>
            </div>
            <div class="passagem-preco">R$ ${preco.toFixed(2)}</div>
            <button class="btn-comprar">Comprar</button>
        `;

        const btn = card.querySelector('.btn-comprar');
        btn.addEventListener('click', () => {
            const passagem = {
                origem: capitalize(origem),
                destino: capitalize(destino),
                data: formataData(data),
                horario,
                empresa,
                preco
            };
            localStorage.setItem('passagem', JSON.stringify(passagem));
            window.location.href = "selecionar-assento.html";
        });

        lista.appendChild(card);
    });
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formataData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
