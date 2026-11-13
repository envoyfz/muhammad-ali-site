# Muhammad Ali — The Greatest

Site estático em português para uma apresentação escolar sobre a vida, a carreira, o ativismo e o legado de Muhammad Ali.

## Arquivos

- index.html — estrutura e conteúdo semântico
- css/style.css — identidade visual responsiva e acessível
- js/script.js — navegação, linha do tempo, galeria e QR Code
- assets/images/credits.md — fontes e créditos das imagens

As fotografias são servidas pelo Wikimedia Commons e precisam de conexão à internet. Cada legenda liga à página do arquivo, onde constam autor e termos de reutilização. Para tornar as imagens locais, baixe-as a partir dessas páginas, confira cada licença e atualize os caminhos no HTML.

## 1. Abrir localmente

Abra index.html em um navegador atualizado. Para simular a hospedagem, você pode iniciar um servidor simples na pasta do projeto:

    python -m http.server 8000

Depois, abra http://localhost:8000. O site não exige backend, banco de dados, cadastro nem instalação de aplicativo. As fotografias e a biblioteca de QR Code precisam de internet.

## 2. Criar uma conta no GitHub

1. Acesse https://github.com/ e selecione Sign up.
2. Informe seu e-mail, crie uma senha e conclua a verificação solicitada.
3. Confirme o e-mail para ativar a conta.

## 3. Enviar os arquivos

1. No GitHub, crie um repositório público, por exemplo, muhammad-ali-site.
2. Selecione Add file e depois Upload files.
3. Envie o conteúdo desta pasta de entrega. index.html deve ficar na raiz do repositório, junto do README.md e das pastas css, js e assets.
4. Escreva uma mensagem, como “Adicionar site biográfico”, e selecione Commit changes.

Também é possível enviar os arquivos usando Git no computador. Mantenha a estrutura de pastas.

## 4. Publicar gratuitamente com GitHub Pages

1. Abra Settings no repositório e selecione Pages na barra lateral.
2. Em Build and deployment, escolha Deploy from a branch.
3. Escolha a branch main e a pasta /(root), depois selecione Save.
4. Aguarde o GitHub concluir a publicação; a área de Pages mostrará o endereço público.

O repositório precisa ser público para usar o GitHub Pages no plano gratuito. Para instruções atualizadas, consulte https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site e https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.

### Alternativa: Netlify

Crie uma conta gratuita no Netlify e importe o repositório do GitHub (Add new site / Import an existing project). Este site não precisa de comando de build; configure a raiz do projeto como diretório de publicação. Consulte https://docs.netlify.com/start/quickstarts/deploy-from-repository/ para as instruções atuais.

## 5. Encontrar o endereço

O endereço padrão de um projeto GitHub Pages segue este formato:

    https://seu-usuario.github.io/muhammad-ali-site/

Use o endereço que aparecer nas configurações de Pages, pois o usuário e o nome real do repositório determinam o link. Teste-o em uma janela anônima antes de compartilhar.

## 6. Gerar o QR Code

1. Abra o site já publicado.
2. Role até “Compartilhe a história”.
3. Cole o endereço público HTTPS e selecione Gerar QR.
4. Selecione Baixar QR Code para salvar a imagem.

O projeto não inclui QR Code para endereço fictício ou localhost. O código só aparece depois de informar um link HTTPS público. O endereço pode ficar salvo localmente naquele navegador. A biblioteca qrcodejs vem do cdnjs; se a rede bloquear esse serviço, conecte-se a outra rede e tente novamente.

## 7. Testar pelo celular

1. Mostre o QR Code em outra tela ou imprima-o.
2. Abra a câmera do celular e aponte para o código.
3. Toque na notificação e confirme que o site abre sem pedir login.
4. Teste navegação, links e fotografias em uma conexão móvel.

## Acessibilidade e recursos

- Layout adaptável para celulares, tablets e telas grandes.
- Navegação por teclado, atalho para pular ao conteúdo e foco visível.
- Imagens com texto alternativo e legendas com créditos.
- Menu móvel, progresso de leitura, botão de retorno ao topo e animações discretas.
- Animações reduzidas conforme a preferência do sistema.
- Filtros da linha do tempo e galeria com visualização ampliada.
- QR Code gerado somente após informar um endereço público.

## Fontes históricas

O rodapé reúne links para o Muhammad Ali Center, Comitê Olímpico Internacional, a decisão da Suprema Corte dos EUA em Clay v. United States e referências de carreira. Confira as fontes ao adaptar ou ampliar o conteúdo.