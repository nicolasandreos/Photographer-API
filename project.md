# Projeto: LensFlow

## Visão Geral

O LensFlow é um SaaS (Software as a Service) voltado para fotógrafos profissionais e pequenos estúdios. Seu objetivo é centralizar toda a operação do fotógrafo em uma única plataforma, desde o primeiro contato com o cliente até a entrega final das fotografias.

Atualmente, muitos fotógrafos utilizam diversas ferramentas diferentes para gerenciar o trabalho:

* WhatsApp para conversar com clientes.
* Google Agenda para marcar eventos.
* Google Drive para entregar fotos.
* Planilhas para controlar pagamentos.
* Word para contratos.
* PIX manualmente.
* Blocos de notas para lembrar tarefas.

Isso gera perda de informações, esquecimentos, conflitos de agenda e falta de organização financeira.

O LensFlow nasce para resolver esse problema.

O sistema não é apenas um cadastro de clientes. Ele representa o funcionamento completo de um negócio de fotografia.

---

# Objetivo do Backend

O backend será responsável por toda a inteligência da plataforma.

Ele não terá responsabilidade sobre telas ou experiência do usuário.

Sua função será proteger as regras de negócio, garantir a consistência dos dados e orquestrar todas as operações do sistema.

Toda decisão importante acontecerá dentro do domínio da aplicação.

---

# Público-alvo

O sistema será utilizado por:

* Fotógrafos autônomos
* Estúdios fotográficos
* Empresas de fotografia para eventos
* Fotógrafos de casamento
* Fotógrafos corporativos
* Fotógrafos de ensaios
* Videomakers (futuramente)

---

# Fluxo completo do negócio

## 1. Lead

Tudo começa quando um possível cliente entra em contato.

Esse contato pode vir por:

* WhatsApp
* Instagram
* Site
* Indicação
* Facebook
* Google

O sistema registra esse contato como um Lead.

Nesse momento ainda não existe um cliente.

Existe apenas alguém interessado.

O Lead possui:

* Nome
* Telefone
* Email
* Origem
* Cidade
* Tipo de evento
* Data desejada
* Observações
* Status

Status possíveis:

Novo

↓

Em negociação

↓

Proposta enviada

↓

Aguardando resposta

↓

Convertido

↓

Perdido

---

# 2. Conversão

Quando o fotógrafo identifica que existe interesse real, o Lead torna-se Cliente.

A partir desse momento ele passa a possuir histórico.

O cliente poderá ter diversos eventos ao longo dos anos.

Exemplo:

* Casamento
* Gestante
* Newborn
* Aniversário
* Ensaio de família

Todo relacionamento permanece registrado.

---

# 3. Verificação da agenda

Antes de qualquer orçamento o sistema verifica disponibilidade.

Não basta verificar apenas a data.

É necessário analisar:

* Horário
* Cidade
* Tempo de deslocamento
* Tipo do evento
* Quantidade de fotógrafos disponíveis
* Equipamentos necessários

Exemplo:

Um casamento ocupa praticamente um dia inteiro.

Já um ensaio pode ocupar apenas duas horas.

Logo, dois ensaios podem coexistir no mesmo dia.

Dois casamentos provavelmente não.

Essa decisão pertence ao domínio.

---

# 4. Catálogo de serviços

O fotógrafo pode oferecer diferentes serviços.

Exemplo:

Ensaio Individual

Ensaio Casal

Casamento

Corporativo

Aniversário

Cada serviço possui regras próprias.

Exemplo:

Casamento Premium

* 10 horas
* 2 fotógrafos
* Drone
* Álbum
* 600 fotos editadas

Enquanto um ensaio simples possui:

* 1 hora
* 1 fotógrafo
* 30 fotos

Essas informações não podem ser alteradas após a contratação sem gerar um aditivo contratual.

---

# 5. Orçamento

Após selecionar um pacote, nasce um orçamento.

O orçamento possui validade.

Pode receber descontos.

Pode conter observações.

Pode sofrer negociação.

Pode ser recusado.

Pode expirar.

Pode ser aceito.

Quando aceito, diversos processos acontecem automaticamente.

---

# 6. Reserva de agenda

Aceitar um orçamento não significa reservar imediatamente.

A reserva somente acontece quando determinadas condições forem satisfeitas.

Exemplo:

Contrato assinado

E

Pagamento do sinal confirmado

Somente então o evento ocupa oficialmente a agenda.

---

# 7. Contrato

O sistema gera automaticamente um contrato baseado no pacote contratado.

O contrato possui:

* Cliente
* Serviço
* Local
* Valor
* Forma de pagamento
* Regras de cancelamento
* Direitos autorais
* Cláusulas específicas

O contrato pode estar em diferentes estados:

Rascunho

↓

Enviado

↓

Assinado pelo cliente

↓

Assinado pelo fotógrafo

↓

Finalizado

---

# 8. Pagamentos

O sistema controla toda a parte financeira.

Um evento pode possuir diversas parcelas.

Exemplo:

30% na assinatura

40% trinta dias antes

30% após entrega das fotos

Cada parcela possui estados próprios.

Pendente

↓

Pago

↓

Atrasado

↓

Cancelado

O backend calcula automaticamente:

Valor restante

Total recebido

Parcelas vencidas

Multas

Juros

---

# 9. Execução do evento

Quando chega a data do evento, o sistema altera automaticamente o estado.

Agendado

↓

Em andamento

↓

Concluído

O fotógrafo pode registrar ocorrências.

Exemplo:

Cliente atrasou.

Choveu.

Evento cancelado.

Necessário reagendar.

---

# 10. Pós-produção

Após o evento inicia-se uma nova etapa.

Importação das fotos.

Seleção.

Edição.

Exportação.

Entrega.

Cada fase possui seu próprio status.

---

# 11. Aprovação

O cliente poderá aprovar ou solicitar alterações.

Enquanto não aprovar, o projeto permanece aberto.

---

# 12. Encerramento

Após:

Pagamento final

Entrega concluída

Cliente satisfeito

O projeto é encerrado.

Todas as métricas são atualizadas.

---

# Dashboard

O sistema fornecerá indicadores importantes.

Receita mensal.

Lucro.

Eventos futuros.

Agenda da semana.

Clientes recorrentes.

Conversão de Leads.

Tempo médio de negociação.

Faturamento anual.

Pacotes mais vendidos.

Origem dos clientes.

---

# Inteligência Artificial

A IA será utilizada para automatizar processos.

Exemplos.

Receber uma mensagem do WhatsApp.

Extrair automaticamente:

Nome

Cidade

Tipo de evento

Data

Criar um Lead automaticamente.

Outra funcionalidade.

Receber uma conversa inteira.

Gerar um resumo.

Criar tarefas automaticamente.

Outra possibilidade.

Responder perguntas frequentes utilizando contexto do fotógrafo.

---

# Arquitetura

O projeto seguirá Arquitetura Hexagonal.

O domínio será completamente independente.

Toda regra de negócio ficará isolada.

Banco de dados poderá ser trocado sem alterar o domínio.

Gateway de pagamento poderá ser substituído.

Sistema de notificações poderá mudar.

A API será apenas uma porta de entrada.

---

# Regras de Negócio

Alguns exemplos.

Um evento não pode existir sem cliente.

Um orçamento expirado não pode ser aceito.

Um contrato não pode ser assinado após cancelamento.

Uma agenda não pode possuir conflitos.

Uma parcela paga não pode ser alterada.

Um fotógrafo não pode ser removido de um evento concluído.

Um pacote vendido não pode sofrer alterações retroativas.

Uma entrega não pode ocorrer antes da conclusão do evento.

---

# Objetivo Técnico

O projeto servirá como laboratório para estudar:

Arquitetura Hexagonal

Domain Driven Design

SOLID

Clean Architecture

Ports and Adapters

Testes Unitários

Testes de Integração

Eventos de Domínio

Filas

Mensageria

Docker

Autenticação

Autorização

Integração com APIs externas

Cache

CI/CD

Observabilidade

Documentação

Versionamento de API

Escalabilidade

---

# Evolução do Produto

O projeto será desenvolvido em versões incrementais.

A primeira versão entregará apenas o núcleo do domínio.

As próximas versões adicionarão módulos independentes, mantendo o domínio desacoplado e permitindo que novas funcionalidades sejam incorporadas sem comprometer a arquitetura existente.

O objetivo final não é construir apenas um backend funcional, mas um software cuja organização se aproxime da utilizada em produtos SaaS reais, permitindo que o projeto cresça continuamente sem perda de qualidade arquitetural.
