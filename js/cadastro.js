document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('mensagemCadastro').innerHTML = "<span style='color:green;'>Cadastro realizado com sucesso!</span>";
  this.reset();
});