# TicTacToe-js
Tic Tac Toe in JavaScript

#Tic Tac Toe API docs:

##Rotas com /waitlist:
	As rotas com /waitlist irão auxiliar o cliente nas partes anteriores aos jogos. Pensamos em implementá-las para efetivamente tornar possível a conexão entre dois jogadores online.
	Um jogador que esteja na waitlist, será colocado com seus dados num arquivo JSON que conterá a lista de todos os jogadores que não estejam jogando. Uma vez que dois jogadores  estejam nessa lista, cria-se um jogo para aqueles que estão esperando e os remove dessa lista. O cliente ficará verificando essa lista de tempos em tempos para verificar se ele se inclui nela ou se seu jogo já começou.

###/waitlist/join/<player>
<player>: O username do jogador que deseja entrar na waitlist
Essa rota inclui um novo jogador, dado o parâmetro, na base de dados.

##/waitlist/check/<player>
	<player>: O username do jogador que checa da waitlist
	Essa rota checa se o jogador está na waitlist ou se seu jogo já começou. Caso haja começado, o retorna para o cliente.

##Rotas com /game:
	As rotas com /game irão fazer as movimentações e as jogadas. Os arquivos dos jogos que estão rodando no momento estão colocados num arquivo JSON e serão modificados na medida que requisições forem sendo feitas. Os jogos que acabarem serão deletados desse arquivo.
	
###/game/play/<code>/<player>/<x>/<y>
<code>: O código da sala de jogo
<player>: Qual jogador está usando
<x>: O index X na matriz do jogo
<y>: O index Y na matriz do jogo
Essa rota modifica o objeto do jogo da velha nas posições especificadas. Caso o jogo já tenha um vencedor, o jogo é retornado com o sinal dizendo que acabou e, depois, deletado.

###/game/delete/<code>
<code>: O código da sala de jogo
Deleta o jogo do arquivo JSON onde ele estaria armazenado.
