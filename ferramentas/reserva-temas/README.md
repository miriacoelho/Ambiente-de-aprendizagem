# Escolha de temas — Fundamentos de Banco de Dados

Aplicativo web com 25 temas cadastrados. Cada grupo informa seus integrantes e reserva um tema. A resposta do trabalho é entregue separadamente no Google Forms do docente.

## Executar localmente

Requer Node.js 22.13 ou superior. No terminal, dentro desta pasta:

```powershell
$env:ADMIN_TOKEN = 'troque-por-uma-senha-longa-e-aleatoria'
node server.js
```

Acesse `http://localhost:3000`. O banco é criado automaticamente em `data/grupos.sqlite`.

## Publicar

Você pode colocar **o código** em um repositório GitHub. Contudo, o **GitHub Pages sozinho não executa Node.js nem mantém este banco SQLite**. Para alunos acessarem o formulário, hospede o aplicativo completo em um serviço que execute Node.js, ofereça HTTPS e mantenha arquivos persistentes. Configure `ADMIN_TOKEN` como variável de ambiente e faça backup de `data/grupos.sqlite`. Defina `DATA_DIR` se o serviço usar outro diretório persistente.

Não publique a pasta `data/` nem o token do docente no repositório. O arquivo `.gitignore` já exclui o banco.

Para consultar os grupos, faça GET em `/api/exportar` com cabeçalho `Authorization: Bearer <ADMIN_TOKEN>`. A resposta é JSON com tema, integrantes e data da reserva.

Se você quiser usar **GitHub Pages como hospedagem da página**, será necessário substituir a API e o SQLite por um serviço externo de banco de dados. Uma página HTML isolada não consegue garantir que apenas um grupo escolha cada tema.
