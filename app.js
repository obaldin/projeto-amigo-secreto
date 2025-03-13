let amigos = []; // Declara um array vazio para armazenar os nomes dos amigos
let amigosSorteados = []; // Lista de amigos já sorteados
let sorteioAtivo = false; // Variável que indica se o sorteio está ativo

// Função que adiciona um nome à lista de amigos
function adicionarAmigo () {
    let inserirNome = document.getElementById("amigo"); // Captura o campo de entrada do usuário
    let nomeAmigo = inserirNome.value.trim();  // Obtém o valor digitado, removendo espaços extras

    // Verifica se o campo está vazio e exibe um alerta caso esteja
    if (nomeAmigo === "") {
        alert("Por favor, insira o nome de um amigo.");
        return;
    }
    
    if (amigos.includes(nomeAmigo)) {
        alert("Este nome já foi adicionado à lista.");
        return; 
    }

    amigos.push(nomeAmigo);

    // Adiciona o nome ao array de amigos
    inserirNome.value = "";
    inserirNome.focus();
    atualizarLista();
    
}

// Função que exibe a lista de amigos na tela
function atualizarLista(){
    let listaAmigos = document.getElementById("listaAmigos"); // Captura o elemento da lista no HTML
    listaAmigos.innerHTML = ""; // Limpa o conteúdo da lista antes de atualizá-la
    
    // Percorre o array de amigos e adiciona cada nome à lista
    for (let i = 0; i < amigos.length; i++) {
        let itemLista = document.createElement("li"); // Cria um novo item de lista
        itemLista.textContent = amigos[i]; // Define o nome como conteúdo do item
        listaAmigos.appendChild(itemLista); // Adiciona o item à lista na tela 
    }
}

// Função que sorteia um amigo secreto
function sortearAmigo() {

    // Verifica se há amigos na lista
    if (amigos.length === 0) {
        alert("Por favor, insira o nome de um amigo.");
        return
    }

    if (amigos.length < 3){
        alert("Adicionar o mínimo de 3 amigos para sortear");
        return;
    }
    
    //trava a lista após primeiro sorteio
    if (!sorteioAtivo) {
        sorteioAtivo = true;
        document.getElementById("listaAmigos").innerHTML = ""; // Exibe uma mensagem na tela
    }
    
    // Verifica se todos os amigos já foram sorteados
    if (amigosSorteados.length === amigos.length) {
        let resultado = document.getElementById("resultado");
        resultado.innerHTML = `Sorteio concluído! Todos os amigos foram sorteados!`; // Exibe uma mensagem na tela
        let tempoRestante = 5;
        const intervalo = setInterval(() => {
            resultado.innerHTML = `Sorteio concluído! Todos os amigos foram sorteados!<br>Jogo será reiniciado em ${tempoRestante}`;
            tempoRestante--;
            if (tempoRestante < 0) {
                clearInterval(intervalo);
                resetarSorteio();
            }
        }, 2000);
        return
    }
    
    let amigoSorteado; // Declara uma variável para armazenar o nome sorteado
    let indiceSorteado; // Declara uma variável para armazenar o índice sorteado
    do {
        indiceSorteado = Math.floor(Math.random() * amigos.length); // Gera um índice aleatório dentro do tamanho do array
        amigoSorteado = amigos[indiceSorteado]; // Gera um índice aleatório dentro do tamanho do array e obtém o nome sorteado
    } while (amigosSorteados.includes(amigoSorteado)); // Verifica se o amigo já foi sorteado

    amigosSorteados.push(amigoSorteado); // Adiciona o nome à lista de sorteados
    document.getElementById("resultado").innerHTML = `O Amigo Secreto foi: ${amigoSorteado}`; // Exibe o resultado na tela
    document.getElementById("resultado").setAttribute("data-indice", indiceSorteado); //Armazena o índice sorteado sorteado no elemento de resultado   
     
}

// Função para lidar com o clique no botão "Sorteei meu nome"
function sorteeiMeuNome() {
    let resultado = document.getElementById("resultado");
    let indiceSorteado = parseInt(resultado.getAttribute("data-indice")); // Obtém o índice sorteado

    if (isNaN(indiceSorteado)) {
        alert("Nenhum amigo foi sorteado ainda.");
        return;
    }

    let amigoSorteado = amigos[indiceSorteado];
    amigosSorteados = amigosSorteados.filter(nome => nome !== amigoSorteado); // Remove o amigo sorteado da lista de sorteados

    resultado.innerHTML = "Tudo bem, clique em sortear novamente.";
    resultado.removeAttribute("data-indice"); // Remove o índice armazenado
}

// Função para resetar a lista e iniciar um novo sorteio
function resetarSorteio() {
    amigos = [];
    amigosSorteados = [];
    sorteioAtivo = false;
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("amigo").focus();   
}

// Adiciona um evento para detectar quando a tecla "Enter" for pressionada no campo de entrada
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        event.preventDefault(); // Evita que o formulário seja enviado (caso esteja dentro de um form)
        adicionarAmigo(); // Chama a função de adicionar nome
    }
});
