var url = 'http://localhost:3000/'

function cadastrarAdocao()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'nomeAnimal': document.getElementById('nomeAnimal').value,
		'nomeUsuario': document.getElementById('nomeUsuario').value,
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "cadastrarAdocao",
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

function listarAdocoes()
{
	//da um GET no endpoint "usuarios"
	fetch(url + 'adocoes' )
	.then(response => response.json())
	.then((adocoes) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaAdocoes = document.getElementById('lista-adocoes')
		
		//limpa div
		while(listaAdocoes.firstChild)
		{
			listaAdocoes.removeChild(listaAdocoes.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let adocao of adocoes)
		{
			//cria div para as informacoes de um usuario
			let divAdocao = document.createElement('div')
			divAdocao.setAttribute('class', 'form')
            divAdocao.classList.add("flex")
			divAdocao.classList.add("flex-col")
			divAdocao.classList.add("justify-center")
			divAdocao.classList.add("my-5")
			divAdocao.classList.add("border-t-2")
			divAdocao.classList.add("pt-5")
			
			//pega o nome do usuario
			let divNomeAnimal = document.createElement('input')
			divNomeAnimal.placeholder = 'Nome Completo'
			divNomeAnimal.value = usuario.nome
			divAdocao.appendChild(divNomeAnimal)
            divNomeAnimal.classList.add("border-2");
			divNomeAnimal.classList.add("border-black");
			divNomeAnimal.classList.add("p-1");
			divNomeAnimal.classList.add("my-2");
			
			//pega o email do usuario
			let divNomeUsuario = document.createElement('input')
			divNomeUsuario.placeholder = 'Email'
			divNomeUsuario.value = usuario.email
			divAdocao.appendChild(divNomeUsuario)
            divNomeUsuario.classList.add("border-2");
			divNomeUsuario.classList.add("border-black");
			divNomeUsuario.classList.add("p-1");
			divNomeUsuario.classList.add("my-2");
			
			
			//cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerUsuario(adocao.id)
			btnRemover.classList.add("border-2");
			btnRemover.classList.add("border-black");
			btnRemover.classList.add("px-5");
			btnRemover.classList.add("mx-5");
			
			//cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(usuario.id, divNomeAnimal, divNomeUsuario)
			btnAtualizar.classList.add("border-2");
			btnAtualizar.classList.add("border-black");
			btnAtualizar.classList.add("px-5");
			btnAtualizar.classList.add("mx-5");
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divAdocao.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaAdocoes.appendChild(divAdocao)
		}
	})
}

function atualizar(id, divNomeAnimal, divNomeUsuario)
{
	let body =
	{
		'nomeAnimal': divNomeAnimal.value,
		'nomeUsuario': divNomeUsuario.value,
	}
	
	fetch(url + "atualizarUsuario/" + id,
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
		listarUsuarios()
		console.log(output)
		alert('Usuário atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o usuário :/')
	})
}

function removerUsuario(id)
{
	fetch(url + 'deletarUsuario/' + id,
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
