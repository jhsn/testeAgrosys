if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../../index.html";
}

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
}

/*function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    loadItens()
}*/

function loadItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td >${item.id}</td>
    <td class="col-md-3">${item.name}</td>
    <td class="col-md-2">${item.cpf}</td>
    <td class="col-md-2">${item.date}</td>
    <td class="col-md-2">${item.fone}</td>
    <td class="col-md-2">${item.cel}</td>
    <td class="acao">
      <button onclick="endereco(${item.id})" class="col-md-1"><i class="fa fa-address-book-o" aria-hidden="true"></i></button>
    </td>
    <!--<td class="acao">
      <button onclick="editItem(${item.id})" class="col-md-1"><i class="fa fa-pencil" aria-hidden="true"></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${item.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </td>-->
  `
    tbody.appendChild(tr)
}

function endereco(idCliente) {
    console.log(idCliente)
    window.location = "Endereco.html?id=" + idCliente;
}

btnSalvar.onclick = e => {

    e.preventDefault();
    const name = document.querySelector('input#client_name').value;
    const cpf = Number(document.querySelector('input#client_cpf').value);
    const date = document.querySelector('input#client_date').value;
    const fone = Number(document.querySelector('input#client_fone').value);
    const cel = Number(document.querySelector('input#client_cel').value);
    const cep = Number(document.querySelector('input#ad_cep').value);

    const rua = document.querySelector('input#ad_rua').value;
    const bairro = document.querySelector('input#ad_bairro').value;
    const cidade = document.querySelector('input#ad_cidade').value;
    const estado = document.querySelector('input#ad_estado').value;
    const pais = document.querySelector('input#ad_pais').value;
    const principal = document.querySelector('input#ad_principal').checked ? 1 : 0
    if (!cpf) return alert('Digite o CPF do cliente');

    console.log(`passou`)

    newCliente({ name, cpf, date, fone, cel, cep, rua, bairro, cidade, estado, pais, principal });

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

async function newCliente(dados) {

    var result = alasql('SELECT * FROM clientes WHERE cpf = "' + dados.cpf + '"');
    if (result.length = 0) {
        return alert('O CPF informado já está cadastrado no banco de dados');
    }
    alasql("INSERT INTO clientes (id, name, cpf, date,fone,cel,principal) VALUES ('','" + dados.name + "','" + dados.cpf + "','" + dados.date + "','" + dados.fone + "','" + dados.cel + "','" + dados.principal + "' )");

    var result = alasql('SELECT * FROM clientes WHERE cpf = "' + dados.cpf + '"');
    alasql("INSERT INTO enderecos (id ,cep , rua, bairro , cidade , estado , pais , principal, idcliente) VALUES ('','" + dados.cep + "','" + dados.rua + "','" + dados.bairro + "','" + dados.cidade + "','" + dados.estado + "','" + dados.pais + "','" + dados.principal + "'," + parseInt(result[0].id) + ")");

    return alert('Cliente cadastrado!');

}

function loadItens() {
    tbody.innerHTML = ''
    var result = alasql('SELECT * FROM clientes ');
    if (result.length > 0) {
        let clients = result;
        clients.forEach((item, index) => loadItem(item, index))
    } else {
        []
    }
}

loadItens()