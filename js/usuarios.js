document.addEventListener('DOMContentLoaded', function() {
  const tbody = document.querySelector('.admin-table tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td>1</td>
        <td>João Silva</td>
        <td>joao@email.com</td>
        <td>
          <button class="btn">Editar</button>
          <button class="btn" style="background:#e74c3c;">Excluir</button>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Maria Souza</td>
        <td>maria@email.com</td>
        <td>
          <button class="btn">Editar</button>
          <button class="btn" style="background:#e74c3c;">Excluir</button>
        </td>
      </tr>
    `;
  }
  document.getElementById('btn-add-usuario').addEventListener('click', function() {
    alert('Funcionalidade de adicionar usuário simulada!');
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Simulação de dados (pode usar localStorage se quiser persistir)
  let usuarios = [
    { id: 1, nome: "João Silva", email: "joao@email.com" },
    { id: 2, nome: "Maria Souza", email: "maria@email.com" }
  ];
  let editandoId = null;

  const tbody = document.querySelector('.admin-table tbody');
  const modal = document.getElementById('modalUsuario');
  const form = document.getElementById('formUsuario');
  const modalTitulo = document.getElementById('modalTitulo');
  const usuarioId = document.getElementById('usuarioId');
  const usuarioNome = document.getElementById('usuarioNome');
  const usuarioEmail = document.getElementById('usuarioEmail');

  function renderUsuarios() {
    tbody.innerHTML = usuarios.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.nome}</td>
        <td>${u.email}</td>
        <td>
          <button class="btn-editar" data-id="${u.id}">Editar</button>
          <button class="btn-excluir" data-id="${u.id}">Excluir</button>
        </td>
      </tr>
    `).join('');
  }

  // Abrir modal para novo usuário
  document.getElementById('btn-add-usuario').onclick = function() {
    modalTitulo.textContent = "Novo Usuário";
    usuarioId.value = "";
    usuarioNome.value = "";
    usuarioEmail.value = "";
    modal.style.display = "flex";
    editandoId = null;
  };

  // Fechar modal
  document.getElementById('fecharModal').onclick = function() {
    modal.style.display = "none";
  };

  // Salvar usuário (novo ou edição)
  form.onsubmit = function(e) {
    e.preventDefault();
    if (editandoId) {
      // Editar
      const idx = usuarios.findIndex(u => u.id === editandoId);
      usuarios[idx].nome = usuarioNome.value;
      usuarios[idx].email = usuarioEmail.value;
    } else {
      // Novo
      const novoId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
      usuarios.push({
        id: novoId,
        nome: usuarioNome.value,
        email: usuarioEmail.value
      });
    }
    renderUsuarios();
    modal.style.display = "none";
  };

  // Delegação para editar/excluir
  tbody.onclick = function(e) {
    if (e.target.classList.contains('btn-editar')) {
      const id = Number(e.target.dataset.id);
      const usuario = usuarios.find(u => u.id === id);
      modalTitulo.textContent = "Editar Usuário";
      usuarioId.value = usuario.id;
      usuarioNome.value = usuario.nome;
      usuarioEmail.value = usuario.email;
      modal.style.display = "flex";
      editandoId = id;
    }
    if (e.target.classList.contains('btn-excluir')) {
      const id = Number(e.target.dataset.id);
      if (confirm("Deseja excluir este usuário?")) {
        usuarios = usuarios.filter(u => u.id !== id);
        renderUsuarios();
      }
    }
  };

  // Fecha modal ao clicar fora do formulário
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };

  renderUsuarios();
});