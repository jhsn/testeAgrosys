if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../../index.html";
}
var idCliente = ''

// função pra ler querystring
function queryString(parameter) {
    var loc = location.search.substring(1, location.search.length);
    var param_value = false;
    var params = loc.split("&");
    for (i = 0; i < params.length; i++) {
        param_name = params[i].substring(0, params[i].indexOf('='));
        if (param_name == parameter) {
            param_value = params[i].substring(params[i].indexOf('=') + 1)
        }
    }
    if (param_value) {
        return param_value;
    }
    else {
        return undefined;
    }
}

var idCliente = queryString("id");

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function sair() {
    localStorage.removeItem("token");
    window.location.href = "../../index.html";
}
function openModalEndereco(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

}
/*
function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    getEnderecos(idCliente, '4')
}*/

function montaHtmlEndereco(item, index) {
    let tr = document.createElement('tr')

    let iconPrincipalcheked = `<i class="fa fa-check " aria-hidden="true" style="color:green; font-size: 20px; align: center" ></i>`
    let iconPrincipal = ``

    let icon = Number(item.principal) === 1 ? iconPrincipalcheked : iconPrincipal

    tr.innerHTML = `
    <td >${item.id}</td>
    <td style="display:none;">${item.idcliente}</td>
    <td class="col-md-1">${item.cep}</td>
    <td class="col-md-2">${item.rua}</td>
    <td class="col-md-2">${item.bairro}</td>
    <td class="col-md-2">${item.cidade}</td>
    <td class="col-md-2">${item.estado}</td>
    <td class="col-md-2">${item.pais}</td>
    <td class="col-lg-2" style="align: center">${icon}</td>
    <!--<td class="acao">
      <button onclick="endereco(${item.id})" class="col-md-1"><i class="fa fa-address-book-o" aria-hidden="true"></i></button>
    </td>
    <td class="acao">
      <button onclick="editItem(${item.id})" class="col-md-1"><i class="fa fa-pencil" aria-hidden="true"></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${item.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </td>-->
  `
    tbody.appendChild(tr)
}

function endereco(idCliente) {
    window.location = "Endereco.html?id=" + idCliente;
}

btnSalvar.onclick = e => {

    e.preventDefault();
    const cep = Number(document.querySelector('input#ad_cep').value);
    const rua = document.querySelector('input#ad_rua').value;
    const bairro = document.querySelector('input#ad_bairro').value;
    const cidade = document.querySelector('input#ad_cidade').value;
    const estado = document.querySelector('input#ad_estado').value;
    const pais = document.querySelector('input#ad_pais').value;
    const principal = document.querySelector('input#ad_principal').checked ? 1 : 0
    novoEndereco({ cep, rua, bairro, cidade, estado, pais, principal });

    modal.classList.remove('active')
    getEnderecos(idCliente, '3')
    id = undefined
}

function novoEndereco(dados) {

    if (parseInt(dados.principal) > 0) {
        var result = alasql('SELECT * FROM enderecos WHERE idcliente = ' + parseInt(idCliente));
        if (result.length > 0) {
            let enderecos = result
            enderecos.forEach((item) => updateEndereco(item))
        }
    }

    alasql("INSERT INTO enderecos (id ,cep , rua, bairro , cidade , estado , pais , principal, idcliente) VALUES ('','" + dados.cep + "','" + dados.rua + "','" + dados.bairro + "','" + dados.cidade + "','" + dados.estado + "','" + dados.pais + "','" + parseInt(dados.principal) + "','" + parseInt(idCliente) + "')");


    alert('Endereco cadastrado!');

    getEnderecos(idCliente, '1')

}

function updateEndereco(item) {

    var result = alasql("UPDATE enderecos SET principal = ? WHERE id = ?", ['0', parseInt(item.id)]);

}

function getEnderecos(idCliente, daonde) {
    tbody.innerHTML = ''
    var result = alasql('SELECT * FROM enderecos WHERE idcliente = ' + parseInt(idCliente));

    if (result.length > 0) {
        let enderecos = result;
        enderecos.forEach((item, index) => montaHtmlEndereco(item, index))
    } else {
        []
    }
}

getEnderecos(idCliente, '2')