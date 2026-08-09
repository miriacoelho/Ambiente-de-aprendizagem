# Portal das Disciplinas — 2026/2

Este pacote contém o portal das disciplinas FBD, FTW e BDA da Prof.ª Miriã Corrêa.

Nesta etapa, apenas a Semana 1 de cada disciplina está visível no portal. As semanas seguintes poderão ser liberadas gradualmente após a atualização de seus links, imagens e arquivos HTML.

## Requisitos

- Node.js 22.13 ou superior
- npm ou pnpm

## Executar localmente

1. Instale as dependências com `npm install` ou `pnpm install`.
2. Inicie o ambiente local com `npm run dev` ou `pnpm dev`.
3. Abra o endereço informado no terminal.

## Gerar a versão de produção

1. Execute `npm run build` ou `pnpm build`.
2. A saída de produção será criada na pasta `dist`.

## Publicação

O projeto utiliza vinext e gera uma aplicação compatível com Cloudflare Workers. Para publicar com o código-fonte, importe o repositório em uma plataforma compatível e configure o comando de build como `npm run build`.

O pacote de produção fornecido separadamente já contém a pasta `dist` gerada e os metadados necessários para uma implantação compatível.

## Conteúdos

Os arquivos HTML e as imagens das disciplinas estão em `public/conteudos`, organizados por disciplina. Os três arquivos da Semana 1 incluem declaração UTF-8 para preservar acentos, emojis e ícones.
