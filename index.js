const espresso = require('express');
const meuServidor = espresso();
meuServidor.use(espresso.json());

//ATIVIDADE USUARIOS
const listaUsuarios = [
    {
        id: 1,
        nome: 'Patrick',
        idade: 13,
        CPF: '12345678911',
        codigoCargo :""
    },
    {
        id: 2,
        nome: 'Edison',
        idade: 50,
        CPF: '12335678911',
        codigoCargo: ""
    }
];

//Ver usuario no chrome
meuServidor.get('/usuarios', (requisicao, resposta) => {
    let respostaUsuarios = '';
    for (let index = 0; index < listaUsuarios.length; index++) {
        const usuario = listaUsuarios[index];
        respostaUsuarios += '<p>';
        respostaUsuarios += 'Código: ';
        respostaUsuarios += usuario.id;
        respostaUsuarios += '</br>Nome: ';
        respostaUsuarios += usuario.nome;
        respostaUsuarios += '</br>Idade: ';
        respostaUsuarios += usuario.idade;
        respostaUsuarios += '</br>CPF: ';
        respostaUsuarios += usuario.CPF;

        const cargoEncontrado = listaCargos.find(cargo => cargo.id === usuario.codigoCargo);
        if (cargoEncontrado){
            respostaUsuarios += '</br>Cargo:';
            respostaUsuarios += cargoEncontrado.nome;
            respostaUsuarios += '</br>Descrição:';
            respostaUsuarios += cargoEncontrado.descricao;
        }
        respostaUsuarios += '</p>';
    }
    resposta.send(respostaUsuarios);
});

// Cadastra usuario
meuServidor.post('/usuarios', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;
    const cpf = requisicao.body.cpf;

//novas linhas:
    const codigoCargo = requisicao.body.codigoCargo;

    const cargoEncontrado = listaCargos.find(cargo => cargo.id=== codigoCargo);

    if (!cargoEncontrado){
        resposta.send("Cargo não encontrado.");
        return;
    }
// fim novas linhas
    let codigo = -99999999999999999;
    for (let index = 0; index < listaUsuarios.length;index++) {
        const usuarioAtual = listaUsuarios[index];
        if (usuarioAtual.id > codigo) {
            codigo = usuarioAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }
    const novoUsuario = {
        id: codigo + 1,
        nome: nome,
        idade: idade,
        CPF: cpf,
        codigoCargo: codigoCargo,
        cargo:{
            nome: cargoEncontrado.nome,
            descricao: cargoEncontrado.descricao
        }
    };
    listaUsuarios.push(novoUsuario);
    resposta.send();
});

// Atualiza um usuário
meuServidor.put('/usuarios/:usuarioId', (requisicao, resposta) => {
    const codigoUsuario = requisicao.params.usuarioId;
    const usuarioEncontrado = listaUsuarios.find((usuarioAtual) => {
        return usuarioAtual.id == codigoUsuario;
    });

    if (!usuarioEncontrado) {
        resposta.status(404).send("Usuário não encontrado.");
        return;
    }

    // Atualiza os campos do usuário
    usuarioEncontrado.nome = requisicao.body.nome;
    usuarioEncontrado.idade = requisicao.body.idade;
    usuarioEncontrado.CPF = requisicao.body.cpf;
    usuarioEncontrado.codigoCargo = requisicao.body.codigoCargo;

    // Procura o cargo correspondente
    const cargoEncontrado = listaCargos.find(cargo => cargo.id === usuarioEncontrado.codigoCargo);

    if (!cargoEncontrado) {
        resposta.status(404).send("Cargo não encontrado.");
        return;
    }

    // Atualiza as informações do cargo no usuário
    usuarioEncontrado.cargo = {
        nome: cargoEncontrado.nome,
        descricao: cargoEncontrado.descricao
    };

    resposta.send(usuarioEncontrado);
});


meuServidor.listen(4300, () => {
    console.log('Meu primeiro servidor na porta 4300.');
});

// Remove um usuário
meuServidor.delete('/usuarios/:usuarioId', (requisicao, resposta) => {
    const codigoUsuario = parseInt(requisicao.params.usuarioId);
    const indiceUsuario = listaUsuarios.findIndex(usuarioAtual => usuarioAtual.id === codigoUsuario);
    
    if (indiceUsuario === -1) {
        resposta.send("Usuário não encontrado.");
        return;
    }

    listaUsuarios.splice(indiceUsuario, 1);
    
    resposta.send("Usuário removido com sucesso.");
});

// ************************************************************************************************
//ATIVIDADE CARGOS

const listaCargos = [
    {
        id: 1,
        nome: 'Professor de Geografia',
        descricao: "Lecionar materia de geografia"
    },
    {
        id: 2,
        nome: 'Professor de Historia',
        descricao: "Lecionar materia de historia"
    }
];

//Ver cargo no chrome
meuServidor.get('/cargos', (requisicao, resposta) => {
    let respostaCargos = '';
    for (let index = 0; index < listaCargos.length; index++) {
        const cargo = listaCargos[index];
        respostaCargos += '<p>';
        respostaCargos += 'Código: ';
        respostaCargos += cargo.id;
        respostaCargos += '</br>Nome: ';
        respostaCargos += cargo.nome;
        respostaCargos += '</br>Descricao: ';
        respostaCargos += cargo.descricao;
        respostaCargos += '</p>';
    }
    resposta.send(respostaCargos);
});

// Cadastra um cargo
meuServidor.post('/cargos', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const descricao = requisicao.body.descricao;
    let codigo = -99999999999999999;
    for (let index = 0; index < listaCargos.length;index++) {
        const cargoAtual = listaCargos[index];
        if (cargoAtual.id > codigo) {
            codigo = cargoAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }
    const novoCargo = {
        id: codigo + 1,
        nome: nome,
        descricao: descricao
    };
    listaCargos.push(novoCargo);
    resposta.send();
});

// Atualiza um cargo
meuServidor.put('/cargos/:cargoId', (requisicao, resposta) => {
    const codigoCargo = requisicao.params.cargoId;
    const cargoEncontrado = listaCargos.find((cargoAtual) => {
        return cargoAtual.id == codigoCargo;
    });
    const nome = requisicao.body.nome;
    const descricao = requisicao.body.descricao;
    cargoEncontrado.nome = nome;
    cargoEncontrado.descricao = descricao;
    resposta.send();
});

//meuServidor.listen(4300, () => {
   // console.log('Meu primeiro servidor na porta 4300.');
//});

// Remove um cargo
meuServidor.delete('/cargos/:cargoId', (requisicao, resposta) => {
    const codigoCargo = parseInt(requisicao.params.cargoId);
    const indiceCargo = listaCargos.findIndex(cargoAtual => cargoAtual.id === codigoCargo);
    
    if (indiceCargo === -1) {
        resposta.send("Cargo não encontrado.");
        return;
    }

    listaCargos.splice(indiceCargo, 1);
    
    resposta.send("Cargo removido com sucesso.");
});