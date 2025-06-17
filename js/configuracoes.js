document.getElementById('form-config').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('msg-config').innerHTML = '<span style="color:green;">Configurações salvas com sucesso!</span>';
  this.reset();
});