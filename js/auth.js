document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Modificação: Aceita qualquer combinação de usuário/senha
    // Apenas verifica se os campos não estão vazios
    if (username.trim() !== '' && password.trim() !== '') {
        // Salva o nome do vendedor no localStorage
        localStorage.setItem('vendedor', username);

        // Redireciona para o painel após "login"
        window.location.href = 'pages/home.html';
    } else {
        alert('Por favor, preencha ambos os campos!');
    }
});
