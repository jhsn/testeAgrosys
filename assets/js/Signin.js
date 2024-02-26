let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

function entrar() {
    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#userLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError')
    console.log(usuario.value, senha.value);

    var result = alasql('SELECT * FROM login WHERE name ="' + usuario.value + '" and password = "' + senha.value + '"');
    console.log(result)
    if (result.length == 0) {
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos'
        usuario.focus()

    } else {

        let token = btoa(usuario.value) + btoa(senha.value)
        console.log(token, btoa(usuario.value))
        localStorage.setItem('token', token)

        window.location.href = '../assets/html/Sistema.html'

    }
}