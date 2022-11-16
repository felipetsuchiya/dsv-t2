var url = 'http://localhost:3000/'

function cadastrar()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'nome': document.getElementById('nome').value,
		'descricao':  document.getElementById('descricao').value,
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "animais"
	fetch(url + "cadastrarAnimal",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
	
}

function listarAnimais()
{
	//da um GET no endpoint "animais"
	fetch(url + 'animal')
	.then(response => response.json())
	.then((animais) =>
	{
		//pega div que vai conter a lista de animais
		let listaAnimais = document.getElementById('lista-animais')
		
		//limpa div
		while(listaAnimais.firstChild)
		{
			listaAnimais.removeChild(listaAnimais.firstChild)
		}
		
		//preenche div com animais recebidos do GET
		for(let animal of animais)
		{
			//cria div para as informacoes de um usuario
			let divAnimal = document.createElement('div')
			divAnimal.setAttribute('class', 'form')
			divAnimal.classList.add("flex")
			divAnimal.classList.add("flex-col")
			divAnimal.classList.add("justify-center")
			divAnimal.classList.add("my-5")
			
			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo'
			divNome.value = animal.nome
			divAnimal.appendChild(divNome)
			divNome.classList.add("border-2");
			divNome.classList.add("border-black");
			divNome.classList.add("p-1");
			divNome.classList.add("my-2");
			
			//pega o descricao do usuario
			let divDescricao = document.createElement('input')
			divDescricao.placeholder = 'descricao'
			divDescricao.value = animal.descricao
			divAnimal.appendChild(divDescricao)
			divDescricao.classList.add("border-2");
			divDescricao.classList.add("border-black");
			divDescricao.classList.add("p-1");
			divDescricao.classList.add("my-2");
			
			
			//cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(animal.id)
			btnRemover.classList.add("border-2");
			btnRemover.classList.add("border-black");
			btnRemover.classList.add("px-5");
			btnRemover.classList.add("mx-5");
			
			//cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(animal.id, divNome, divDescricao)
			btnAtualizar.classList.add("border-2");
			btnAtualizar.classList.add("border-black");
			btnAtualizar.classList.add("px-5");
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divAnimal.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de animais
			listaAnimais.appendChild(divAnimal)
		}
	})
}

function atualizar(id, divNome, divDescricao)
{
	let body =
	{
		'nome': divNome.value,
		'descricao': divDescricao.value
	}
	
	fetch(url + "atualizarAnimal/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o animal :/')
	})
}

function remover(id)
{
	fetch(url + 'deletarAnimal/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o usuário :/')
	})
}
