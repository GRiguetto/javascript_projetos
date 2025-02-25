
//Calcula Idade
function calculaIdade()
{
    let dataNasc=new Date(document.getElementById('dataNascimento').value)
    if(isNaN(dataNasc.getTime()))
        {
            document.getElementById('idade').textContent = "Valor Invalido!"
            return
        }
    let hoje = new Date()
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    let mes = hoje.getMonth() - dataNasc.getMonth()
    if(mes <0 || (mes === 0 && hoje.getDate() <dataNasc.getDate()))
        {
            idade--
        }
        document.getElementById('idade').textContent = `Idade: ${idade} anos`
}

//validar cpf
function validaCpf(){
    cpf = document.getElementById('cpf').value.replace(/[^\d]+/g,'')
    if(cpf.length !== 11){
        new bootstrap.Modal(document.getElementById('cpfinvalidoModal'))
        return
    }
    //calculo primeiro digito
    let soma = 0
    //multiplica cada digito por um peso decresente
    for(let i = 1; i <=9; i++){
        soma += parseInt(cpf.substring(i-1,i))*(11-i)
    }

    //calculo o resto da divisao por 1
    let restp = (soma*10)%11
    if(resto === 10 || resto === 11) resto = 0

    //verifica se o resto é diferente do primeiro digito
    if(resto !==parseInt(cpf.substring(9,10))){
        new bootstrap.Modal(document.getElementById('cpfinvalidoModal'))
        return false
    }

    //calcule do segunto digito por um peso decrescente
    soma = 0
    for(let i = 1; i <= 10; i++){
        soma += parseInt(cpf.substring(i-1,i)*(12 - i))
    }
    resto = (soma*10) % 11
    if (resto === 10 || resto === 11) resto = 0

    if(resto !== parseInt(cpf.substring(10,11))){
        new bootstrap.Modal(document.getElementById('cpfinvalidoModal'))
        return false
    }
}

// Função assíncrona que será chamada quando o campo CEP perder o foco

async function buscarEndereco() {
    let cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert("CEP INVÁLIDO");
        return;
    }

    try {
        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        
        if (!resposta.ok) {
            alert("ERRO AO CONSULTAR");
            return;
        }

        let endereco = await resposta.json();
        
        if (endereco.erro) {
            alert("CEP não encontrado");
            return;
        }

        document.getElementById('endereco').value = `Rua: ${endereco.logradouro}, Bairro: ${endereco.bairro}, Cidade: ${endereco.localidade}`;
    } catch (erro) {
        alert("ERRO AO BUSCAR");
    }
}




// Evento para sugestão de email
document.addEventListener('DOMContentLoaded', () => {
    const entradaEmail = document.getElementById('email');
    const caixaSugestao = document.getElementById('emailSuggestions');
    const dominios = ['gmail.com', 'yahoo.com', 'outlook.com'];

    entradaEmail.addEventListener('input', (e) => {
        const valorEntrada = e.target.value;
        if (valorEntrada.includes('@')) {
            const dominioInserido = valorEntrada.split('@')[1];
            const sugestoes = dominios.filter(dominio =>
                dominio.startsWith(dominioInserido)
            );

            caixaSugestao.innerHTML = sugestoes.map(dominio =>
                `<div class="email-suggestions">${valorEntrada.split('@')[0]}@${dominio}</div>`
            ).join('');

            caixaSugestao.style.display = sugestoes.length ? 'block' : 'none';
        } else {
            caixaSugestao.style.display = 'none';
        }
    });

    caixaSugestao.addEventListener('click', (e) => {
        if (e.target.classList.contains('email-suggestions')) {
            entradaEmail.value = e.target.textContent;
            caixaSugestao.style.display = 'none';
        }
    });
});
