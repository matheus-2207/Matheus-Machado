---
name: Matheus Machado
description: Portfólio editorial de engenharia de software
colors:
  primary: "#c0ef79"
  background: "#101210"
  surface: "#171a16"
  foreground: "#edf0e8"
  muted: "#a1a89b"
  border: "#30362c"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(64px, 6.7vw, 96px)"
    fontWeight: 550
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    lineHeight: 1.9
rounded:
  control: "5px"
  panel: "12px"
spacing:
  small: "12px"
  medium: "24px"
  section: "116px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#17200d"
    rounded: "{rounded.control}"
    padding: "13px 23px"
---
# Design System: Matheus Machado

## Overview
Ambiente de desenvolvimento editorial: tipografia ampla, superfícies escuras e diagrama de competências. A expressão técnica vem do código e das interações reais, preservando o perfil de estudante.

## Colors
Verde suave destaca ações e estados selecionados. Tons carvão estruturam o fundo e o editor; off-white privilegia a leitura. Azul, âmbar e violeta identificam sintaxe.

## Typography
DM Sans local para títulos e conteúdo; JetBrains Mono local para código. Títulos equilibrados e tracking limitado a -0.04em. No celular, texto de formulário em 16px evita zoom automático e código mantém rolagem horizontal interna.

## Layout
Contêiner máximo de 1280px. Hero e seções alternam duas colunas; abaixo de 800px, painéis principais se empilham. Breakpoints em 1100, 800, 560 e 360px. Margens de 20px em celulares; espaçamento vertical de 72px. Imagem com proporção explícita e altura automática.

## Elevation & Depth
Camadas tonais e bordas finas. Sem sombras ou halos decorativos.

## Shapes
Controles levemente arredondados, editor com cantos de painel, linha contínua na timeline. Ícones SVG com traço consistente.

## Components
Hero com digitação acessível e diagrama de tecnologias navegável. Botões com deslocamento magnético sutil em mouse. Abas com teclado e terminal demonstrativo. Timeline em details/summary nativo. Projeto com prévia em HTML. Formulário com validação e confirmação de preparação, sem alegar envio. Menu mobile com Escape e fechamento ao navegar. Movimento respeita preferências do sistema e pausa manual.

## Do's and Don'ts
- Preservar as informações reais e os links confirmados.
- Manter o conteúdo visível sem animações ou JavaScript.
- Reservar monoespaçada para código e informação técnica.
- Não inventar senioridade, percentuais ou experiência.
- Não transformar preparação de e-mail em confirmação de envio.
