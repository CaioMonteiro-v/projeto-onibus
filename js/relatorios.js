document.addEventListener('DOMContentLoaded', function() {
    // Configura datas padrão
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    
    document.getElementById('data-fim-rel').valueAsDate = hoje;
    document.getElementById('data-inicio-rel').valueAsDate = trintaDiasAtras;
    
    // Mostra/oculta datas personalizadas
    document.getElementById('periodo').addEventListener('change', function() {
        const customDates = document.querySelectorAll('.custom-dates');
        if (this.value === 'custom') {
            customDates.forEach(el => el.style.display = 'flex');
        } else {
            customDates.forEach(el => el.style.display = 'none');
        }
    });
    
    // Configura logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    });
    
    // Gráfico de vendas por dia
    const vendasDiaCtx = document.getElementById('vendasDiaChart').getContext('2d');
    const vendasDiaChart = new Chart(vendasDiaCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (29 - i));
                return date.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'});
            }),
            datasets: [{
                label: 'Vendas por Dia',
                data: Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 5),
                backgroundColor: 'rgba(58, 123, 213, 0.2)',
                borderColor: 'rgba(58, 123, 213, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `R$ ${(context.raw * 72.46).toFixed(2)} (${context.raw} passagens)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de vendas por cidade
    const vendasCidadeCtx = document.getElementById('vendasCidadeChart').getContext('2d');
    const vendasCidadeChart = new Chart(vendasCidadeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Cuiabá', 'Rondonópolis', 'Sinop', 'Cáceres', 'Barra do Garças', 'Outros'],
            datasets: [{
                data: [120, 85, 65, 45, 30, 15],
                backgroundColor: [
                    '#3a7bd5',
                    '#00d2ff',
                    '#00c6ff',
                    '#11998e',
                    '#38ef7d',
                    '#a8ff78'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.raw;
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} passagens (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de vendas por empresa
    const vendasEmpresaCtx = document.getElementById('vendasEmpresaChart').getContext('2d');
    const vendasEmpresaChart = new Chart(vendasEmpresaCtx, {
        type: 'bar',
        data: {
            labels: ['Viação MT', 'Expresso Verde', 'Ônibus Pantanal', 'Viação Cerrado', 'Expresso Araguaia'],
            datasets: [{
                label: 'Passagens Vendidas',
                data: [95, 80, 65, 50, 40],
                backgroundColor: 'rgba(58, 123, 213, 0.7)',
                borderColor: 'rgba(58, 123, 213, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de vendas por vendedor
    const vendasVendedorCtx = document.getElementById('vendasVendedorChart').getContext('2d');
    const vendasVendedorChart = new Chart(vendasVendedorCtx, {
        type: 'polarArea',
        data: {
            labels: ['Você', 'Maria', 'Carlos', 'Ana', 'Pedro'],
            datasets: [{
                data: [150, 120, 80, 60, 40],
                backgroundColor: [
                    'rgba(58, 123, 213, 0.7)',
                    'rgba(0, 210, 255, 0.7)',
                    'rgba(0, 198, 255, 0.7)',
                    'rgba(17, 153, 142, 0.7)',
                    'rgba(56, 239, 125, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
    
    // Simulação de filtro
    document.querySelector('.btn-filtrar').addEventListener('click', function() {
        alert('Filtro aplicado com sucesso! Os gráficos seriam atualizados aqui.');
    });
    
    // Simulação de exportação
    document.querySelectorAll('.btn-exportar').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.querySelector('i').className.split('-')[2];
            alert(`Exportando relatório para ${format.toUpperCase()}...`);
        });
    });
});