let ckTodos = document.getElementById("ckTodos")
let btAdicionar = document.getElementById("btAdicionar")

btAdicionar.addEventListener("click", (e) => {
   e.preventDefault()
   // criar referencia aos campos de entrada
   let inTitulo = document.getElementById("inTitulo")
   let inGenero = document.getElementById("inGenero")
   let tbFilmes = document.getElementById("tbFilmes")
   
   let titulo = inTitulo.value 
   let genero = inGenero.value
   
   // valida preenchimento
   if(titulo == "" || genero == ""){
      alert("Informe corretamente os dados ")
      inTitulo.focus()
      return
   }
   // chama funcao que ira inserir o filme na tabela
   inserirLinha(tbFilmes, titulo, genero)
   
   // chama funcao que ira gravar dados em localStorage
   gravarFilmes(titulo, genero)
   
   inTitulo.value = ""
   inGenero.value = ""
   inTitulo.focus()
})

function inserirLinha(tabela, titulo, genero){
   let linha = tabela.insertRow(-1)
   let col1 = linha.insertCell(0) // cria coluna na linha inserida
   let col2 = linha.insertCell(1)
   let col3 = linha.insertCell(2)
   
   col1.textContent = titulo // joga conteudo em cada celular
   col2.textContent = genero // joga conteudo em cada celular
   col3.innerHTML = "<input type='checkbox'>" //renderiza codigo
}

function gravarFilmes(titulo, genero){
   
   
   
   // se ha filmes no localstorage 
   if(localStorage.getItem("filmesTitulo")){
      let filmesTitulo = localStorage.getItem("filmesTitulo") + ";" + titulo 
      let filmesGenero = localStorage.getItem("filmesGenero") + ";" + genero
      
      localStorage.setItem("filmesTitulo", filmesTitulo)
      localStorage.setItem("filmesGenero", filmesGenero)
   }else{
      // senao e a primeira inclusao  
      localStorage.setItem("filmesTitulo", titulo)
      localStorage.setItem("filmesGenero", genero)
   }
}


function recuperaFilmes(){
   // se ha dados salvos no localstorage 
   if(localStorage.getItem("filmesTitulo")){
      // obtem o conteudo e xonverte o elemento de vetor
      let titulos = localStorage.getItem("filmesTitulo").split(";")
      let generos = localStorage.getItem("filmesGenero").split(";")
   
      let tbFilmes = document.getElementById("tbFilmes")
      
      //percorre elemento no vetor e adiciona na tabela
      for(let i = 0; i < titulos.length; i++){
         inserirLinha(tbFilmes, titulos[i], generos[i])
      }
   }
}
recuperaFilmes()

ckTodos.addEventListener("click", (e)=>{
   e.preventDefault()
   
   let tbFilmes = document.getElementById("tbFilmes")
   let ckExcluir = document.getElementsByTagName("input")
   let status = ckTodos.checked
   
   for(let i=0; i < ckExcluir.length; i++){
      ckExcluir[i].checked = status
   }
})


function removerFilmes(){
   let tbFilmes = document.getElementById("tbFilmes")
   let ckExcluir = document.getElementsByTagName("input")
   
   let temSelecionado = false
   
   for(let i = 0; i < ckExcluir.length; i++){
      if(ckExcluir[i].checked){
         temSelecionado = true 
         break
      }
   }
   if(!temSelecionado){
      alert("Nao ha filmes selecionados")
      return
   }
   
   let confirmacao = confirm("Confirma exclusao dos filmes selecionados?")
   setTimeout(()=>{
      location.reload()
   }, 500)
   
   if(confirmacao){
      localStorage.removeItem("filmesTitulo")
      localStorage.removeItem("filmesGenero")
      
      for (i = 1; i < ckExcluir.length; i++) {
         if(!ckExcluir[i].checked){
            let titulo = tbFilmes.rows[i].cells[0].textContent
            let genero = tbFilmes.rows[i].cells[1].textContent
            gravarFilmes(titulo, genero)
         }
      }
      
      for (i = ckExcluir.length - 1; i > 0; i--) {
         if(ckExcluir[i].checked){
            tbFilmes.deleteRow(i)
            
         }
      }
      ckExcluir[0].checked = false
   }
}

let btExcluir = document.getElementById("btExcluir")
btExcluir.addEventListener("click", removerFilmes)



