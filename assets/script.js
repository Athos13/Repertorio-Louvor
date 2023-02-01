let campoBusca = document.getElementById("campo-busca");
let botaoAdoracao = document.getElementById("Adoracao");
let botaoCelebracao = document.getElementById("Celebracao");
let botaoTodosTemas = document.getElementById("Todos-temas");
let botaoMenuAdicionar = document.querySelector("#botao-adicionar");
let ulFormMenuAdicionar = document.getElementsByClassName("ul-externa-form")[0];
let ulFormListaMusica = document.getElementsByClassName("ul-lista-musicas")[0];

let lisDaLista 
let nomesMusicas
let temasMusicas=[]

let nomeForm = document.getElementById("nome");
let autorForm = document.getElementById("autor");
let tomForm = document.getElementById("tom");
let temaForm = document.getElementById("tema");
let linkForm = document.getElementById("link");

let nome 
let autor  
let tom  
let inputsObrigatorios 
let tema
let link 


//Mostra e Esconde o form para adicionar
function mostraFormAdicionar(){
    ulFormMenuAdicionar.style.display="block";
}

function escondeFormAdicionar(){
    ulFormMenuAdicionar.style.display="none"
}



/*Checa se foi digitado número e barra ele. O "e" representa o que foi digitado, variável keyCode recebe
o valor do if ternário, entre parenteses, que testa qual o código da tecla digitada e o retorna.
O segundo if testa se o keyCode está no rank dos que são números, se sim nós o impedimos de ser digitado
e retornamos um alert para o usuário */
nomeForm.addEventListener("keypress", function(e){
    let keyCode = (e.keyCode ? e.keyCode: e.which)

    if(keyCode > 45 && keyCode < 58){
        e.preventDefault()
        alert("Use apenas Letras")
    }
})

tomForm.addEventListener("keypress", function(e){
    let keyCode = (e.keyCode ? e.keyCode: e.which)

    if(keyCode > 45 && keyCode < 58){
        e.preventDefault()
        alert("Use apenas Letras")
        return
    }
})

temaForm.addEventListener("keypress", function(e){
    let keyCode = (e.keyCode ? e.keyCode: e.which)
    
    if(keyCode > 45 && keyCode < 58){
        e.preventDefault()
        alert("Use apenas Letras")
        return
    }
})
    


//Checa se campos obrigatórios foram preenchidos
function checaVazio(){
     nome = nomeForm.value
     autor = autorForm.value
     tom = tomForm.value
     tema = temaForm.value
     link = linkForm.value

     inputsObrigatorios=[nome ,autor ,tom]

    let test = inputsObrigatorios.some(item => item == "")

    if(test){
        alert("Verifique se não esqueceu algum campo obrigatório em branco")
    }
    else if(tema == "Nenhum"||!link){
        alert("ATENÇÃO - Você não adicionou Tema e/ou Link, sem o Tema essa música não aparecerá ao usar botões de temas")
        criaAdicionaItem()
    }
    else{
        criaAdicionaItem()    
    }
}



//Cria e adiciona item a ul
function criaAdicionaItem(){
    
    //cria li 
    let liCriada = document.createElement("li")

    //cria dados dos inputs exceto link
    let textNome = document.createElement('p')
    textNome.setAttribute("class", "titulo")
    textNome.textContent=nomeForm.value
    textNome.style.color = "blue";
    textNome.style.fontWeight = "bold";
    textNome.style.textAlign = "center"
    textNome.style.marginRight= "35px"


    let textAutor = document.createElement('p')
    textAutor.textContent="Autor: "+autorForm.value
    
    let textTom = document.createElement('p')
    textTom.textContent="Tom Original: "+tomForm.value

    let textTema = document.createElement('p')
    textTema.textContent="Tema: "+temaForm.value



    //cria dados do Link na li
    let textLink = document.createElement('p')
    textLink.textContent="Link: "
    let linkDoP = document.createElement('a')
    linkDoP.textContent="Click aqui !"
    linkDoP.href=linkForm.value
    linkDoP.target="_blank"
    textLink.appendChild(linkDoP)


    //cria botão excluir e da suas formatações
    let botaoExcluir = document.createElement("button")
    botaoExcluir.textContent="Excluir"
    botaoExcluir.style.width="100px"; 
    botaoExcluir.style.height="30px";
    botaoExcluir.style.color="red"
    botaoExcluir.style.alignSelf="center"
    botaoExcluir.style.marginTop="10px"
    botaoExcluir.style.fontSize="0.7em"
    botaoExcluir.style.cursor="pointer"

    //insere os dados na li
    liCriada.appendChild(textNome)
    liCriada.appendChild(textAutor)
    liCriada.appendChild(textTom)
    liCriada.appendChild(textTema)
    liCriada.appendChild(textLink)
    liCriada.appendChild(botaoExcluir)
    botaoExcluir.addEventListener('click', function(){
        alert("Você deseja excluir essa música ? Clique em 'OK'.")
        ulFormListaMusica.removeChild(liCriada)
    })

    //Insere li na ul(comentar para validação de repetidos)
    ulFormListaMusica.appendChild(liCriada);

    //Atribui array das lis e array dos nomes das músicas as suas variáveis
    lisDaLista = Array.from(ulFormListaMusica.querySelectorAll("li"))
    nomesMusicas = Array.from(ulFormListaMusica.querySelectorAll(".titulo"))
    temasMusicas.push(temaForm.value)
    

}



//FILTRO DO CAMPO DE BUSCA
//Ao input chama função que verifica se valor existe no campo, existindo chama filtro com valor, se não mostraTodas()
campoBusca.addEventListener("input", function(){
    var valor = this.value
    if(valor){
        filtraMusicasPesquisar(valor)
    }else{
        mostraTodas()
    }
})

//Da display flex a todas as lis(usei block e quebrei o layout kkkk)
function mostraTodas(){
    lisDaLista.forEach(item => item.style.display="flex")
}

/*Faz loop no array das lis e checa se cada item, em seu conteúdo de texto, transformado em minusculo, com seus caracteres
normalizados e trocados todos com acento ( no caso, representados pelo código \u0300-\u036f) por sua versão sem (representados
por "") inclui o valor do input também passando pelo mesmo processo, removidos espaços no inicio e no final( trim()).
OBS. troca de acentos usa RegexExp
*/
function filtraMusicasPesquisar(valor){
    
    for(let i=0; i<lisDaLista.length; i++){

        if(nomesMusicas[i].textContent.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g,"")
        .includes(valor.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g,"").trim())
        ){
            lisDaLista[i].style.display="flex"
        }else{
            lisDaLista[i].style.display="none"
        }
    }  
}



//FILTRO DOS TEMAS
//Adoração
botaoAdoracao.addEventListener('click', function(){
    var valorAdoracao = this.textContent

    if(valorAdoracao){
        filtraMusicasAdoracao(valorAdoracao)
    }
    else{
        mostraTodas()
    }  
})

function filtraMusicasAdoracao(valorAdoracao){
    for(let i=0; i<lisDaLista.length; i++){
        if(temasMusicas[i].includes(valorAdoracao)){
            lisDaLista[i].style.display="flex"
        }else{
            lisDaLista[i].style.display="none" 
        }
    }
}



//Celebração
botaoCelebracao.addEventListener('click', function(){
    var valorCelebracao= this.textContent

    if(valorCelebracao){
        filtraMusicasCelebracao(valorCelebracao)
    }
    else{
        mostraTodas()
    }  
})

function filtraMusicasCelebracao(valorCelebracao){
    for(let i=0; i<lisDaLista.length; i++){
        if(temasMusicas[i].includes(valorCelebracao)){
            lisDaLista[i].style.display="flex"
        }else{
            lisDaLista[i].style.display="none" 
        }
    }
}


//Mostra todos os temas
botaoTodosTemas.addEventListener('click', mostraTodas)



