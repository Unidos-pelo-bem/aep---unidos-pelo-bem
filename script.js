function testeJava() {
    console.log('a');
}

const modalONG = document.getElementById('modalAdicionarItens');
const modalLogin = document.getElementById('modal-login');
const buttonClose = document.getElementById("botao-fechar");
const buttonFecharLogin = document.getElementById("botao-fechar-login");

function openModal() {
    modalONG.showModal()
}
buttonClose.onclick = function () {
    modalONG.close();
}
function openLogin() {
    modalLogin.showModal()
}
buttonFecharLogin.onclick = function () {
    modalLogin.close();
}

function mostrarDetalhes(row) {
    var nextTr = row.nextElementSibling;

    if (nextTr && nextTr.classList.contains('details-row')) {
        nextTr.classList.toggle('hidden');
    }
}


/* Inicio do CRUD */

const listaDeOngs = JSON.parse(localStorage.getItem('listaDeOngs')) || [];
let listaOngs = [];


function salvarLista() {
    localStorage.setItem('listaDeOngs', JSON.stringify(listaDeOngs));
}

function limpar() {
    document.getElementById('nome').value = '';
    document.getElementById('ramo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('imagem').value = '';
    document.getElementById('registro').value = '';

}

function validarForm() {
    let nome = document.getElementById('nome').value;
    let ramo = document.getElementById('ramo').value;
    let caminhoImagem = document.getElementById('imagem').value;
    let registro = document.getElementById('registro').value;
    let cnpj = document.getElementById('cnpj').value;


    if (!nome || !ramo || !caminhoImagem || !registro || !cnpj) {
        return false;
    } else {
        return true;
    }
}

function create() {
    if (validarForm) {
        let nome = document.getElementById('nome').value;
        let ramo = document.getElementById('ramo').value;
        let descricao = document.getElementById('descricao').value;
        let caminhoImagem = document.getElementById('imagem').value;
        let registro = document.getElementById('registro').value;
        let cnpj = document.getElementById('cnpj').value;


        //pergunta para o array se existe um obj extritamente igual ao item do input
        let indiceExistente = -1;
        let objExistente = listaDeOngs.find(
            (objElemento, indiceObj) => {
                if (objElemento.nome === nome) {
                    indiceExistente = indiceObj;
                    return true;
                } else {
                    return false;
                }
            }
        );

        if (indiceExistente >= 0) {
            listaDeOngs[indiceExistente] = { nome, ramo, caminhoImagem, descricao, registro, cnpj };
        } else {
            listaDeOngs.push({ nome, ramo, caminhoImagem, descricao, registro, cnpj });
        }

        salvarLista();
        limpar();
        read();
    }
}

function read() {
    let listagem = document.getElementById('listagem');
    listagem.innerHTML = '';

    listaDeOngs.forEach(
        (obj, indice) => {
            let tr = document.createElement('tr');
            tr.classList.add('tr1');
            let detailsRowVisible = false;
            tr.addEventListener('click', function () {
                var nextTr = this.nextElementSibling;
                if (nextTr && nextTr.classList.contains('detail-row')) {
                    nextTr.classList.toggle('hidden');
                    if (detailsRowVisible) {
                        nextTr.classList.add('hidden');
                        this.classList.remove('active');
                    } else {
                        nextTr.classList.remove('hidden');
                        this.classList.add('active');
                    }
                    detailsRowVisible = !detailsRowVisible; // Toggle the state
                }
            });
            tr.innerHTML = `
                <td><img src="${obj.caminhoImagem}" id='imagemPrincipal'></td>
                <td id='nomeTd'>${obj.nome}</td>
                <td id='ramoTd'>${obj.ramo}</td>
            `;
            listagem.appendChild(tr);
            let tr2 = document.createElement('tr');
            tr2.classList.add('hidden', 'detail-row');
            tr2.innerHTML = `
                <td id='descricaoTd'>${obj.descricao}</td>
                <td id='botoesTable'>
                    <button class="button-editar" onclick="update(${indice})" id='editar'>Editar</button>
                    <button class="button-excluir" onclick="excluir(${indice})" id='excluir'>Excluir</button>
                </td>
                <td id='btnFazerDoacao'>
                    <button class="button-doacao" onclick="" id='fazerDoacao'>Fazer Doação</button>
                </td>
                <br>
                <br>
            `;
            listagem.appendChild(tr2);
        });
}

function update(indice) {
    const obj = listaDeOngs[indice];
    document.getElementById('nome').value = obj.nome;
    document.getElementById('ramo').value = obj.ramo;
    document.getElementById('imagem').value = obj.caminhoImagem;
    document.getElementById('descricao').value = obj.descricao;
    document.getElementById('registro').value = obj.registro;
    document.getElementById('cnpj').value = obj.cnpj;
    openModal();
}


function excluir(indice) {
    if (confirm(`Tem certeza que deseja excluir a ONG ${listaDeOngs[indice].nome}?`)) {
        listaDeOngs.splice(indice, 1);
        salvarLista();
        read();
    }
}

read();