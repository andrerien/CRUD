// Lista de pessoas cadastradas
let listaDePessoas = [];

// Função para gerar IDs únicos
function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Função para cadastrar uma nova pessoa com validação.
 * @param {Object} pessoa - Objeto que representa a pessoa a ser cadastrada.
 * @param {string} pessoa.nome - Nome da pessoa.
 * @param {number} pessoa.idade - Idade da pessoa.
 * @param {string} pessoa.cidade - Cidade onde a pessoa reside.
 * @throws {Error} Lança um erro se os dados forem inválidos.
 */
function cadastrarPessoa(pessoa) {
    // Validação dos campos obrigatórios
    if (!pessoa.nome || typeof pessoa.nome !== 'string') {
        throw new Error('Nome é obrigatório e deve ser uma string.');
    }
    if (!pessoa.idade || typeof pessoa.idade !== 'number') {
        throw new Error('Idade é obrigatória e deve ser um número.');
    }
    if (!pessoa.cidade || typeof pessoa.cidade !== 'string') {
        throw new Error('Cidade é obrigatória e deve ser uma string.');
    }

    // Atribui um ID único à pessoa
    pessoa.id = gerarIdUnico();
    // Adiciona o objeto pessoa à lista de pessoas
    listaDePessoas.push(pessoa);
}

/**
 * Função para atualizar uma pessoa existente.
 * @param {string} id - ID da pessoa a ser atualizada.
 * @param {Object} novosDados - Objeto contendo os novos dados da pessoa.
 * @throws {Error} Lança um erro se a pessoa não for encontrada.
 */
function atualizarPessoa(id, novosDados) {
    const pessoa = listaDePessoas.find(p => p.id === id);
    if (!pessoa) {
        throw new Error('Pessoa não encontrada.');
    }
    Object.assign(pessoa, novosDados);
}

/**
 * Função para deletar uma pessoa existente.
 * @param {string} id - ID da pessoa a ser deletada.
 * @throws {Error} Lança um erro se a pessoa não for encontrada.
 */
function deletarPessoa(id) {
    const index = listaDePessoas.findIndex(p => p.id === id);
    if (index === -1) {
        throw new Error('Pessoa não encontrada.');
    }
    listaDePessoas.splice(index, 1);
}

/**
 * Função para listar todas as pessoas cadastradas.
 * @returns {Array} Lista de pessoas cadastradas.
 */
function listarPessoas() {
    return listaDePessoas;
}

/**
 * Função para atualizar a lista de pessoas na interface.
 */
function atualizarListaDePessoas() {
    const listaElement = document.getElementById('lista-pessoas');
    listaElement.innerHTML = '';
    
    listaDePessoas.forEach(pessoa => {
        const item = document.createElement('li');
        item.textContent = `ID: ${pessoa.id}, Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Cidade: ${pessoa.cidade}`;
        listaElement.appendChild(item);
    });
}

/**
 * Função para exibir uma mensagem ao usuário.
 * @param {string} mensagem - Texto da mensagem a ser exibida.
 */
function exibirMensagem(mensagem) {
    alert(mensagem);
}

// Adiciona o evento de submit ao formulário de cadastro
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cidade = document.getElementById('cidade').value;
    
    const novaPessoa = {
        nome: nome,
        idade: idade,
        cidade: cidade
    };
    
    try {
        if (id) {
            atualizarPessoa(id, novaPessoa);
            exibirMensagem('Pessoa atualizada com sucesso!');
        } else {
            cadastrarPessoa(novaPessoa);
            exibirMensagem('Pessoa cadastrada com sucesso!');
        }
        atualizarListaDePessoas();
    } catch (error) {
        console.error('Erro ao processar pessoa:', error.message);
        exibirMensagem('Erro ao processar pessoa: ' + error.message);
    }
    
    // Limpa o formulário após o cadastro/atualização
    document.getElementById('form-cadastro').reset();
});

// Adiciona o evento de submit ao formulário de deleção
document.getElementById('form-deletar').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const idDeletar = document.getElementById('id-deletar').value;
    
    try {
        deletarPessoa(idDeletar);
        atualizarListaDePessoas();
        exibirMensagem('Pessoa deletada com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar pessoa:', error.message);
        exibirMensagem('Erro ao deletar pessoa: ' + error.message);
    }
    
    // Limpa o campo de ID após a deleção
    document.getElementById('form-deletar').reset();
});

// Adiciona o evento de clique ao botão "Listar"
document.getElementById('listar-btn').addEventListener('click', function() {
    const listaElement = document.getElementById('lista-pessoas');
    if (listaElement.style.display === 'none' || listaElement.style.display === '') {
        atualizarListaDePessoas();
        listaElement.style.display = 'block';
    } else {
        listaElement.style.display = 'none';
    }
});
