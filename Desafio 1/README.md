# Villainbnb :city_sunset:
API REST para o gerenciamento de bases secretas ao redor do mundo. Implementado com Node Express e Mongoose

## Features :wrench:

- Endpoints com Express, 
- Validação de cadastro por meio do Mongoose,
- Integração com a WeatherAPI para incluir média de histórico temperatura de 7 dias no momento do cadastro

## Atendimento às regras de negócio :mailbox_with_mail:

- Utilização do MongoDB,
- Atributos: título, nome de fachada, cidade, tecnologias e média de temperatura,
- Validação de título único e nome de fachada diferente do título,
- Validação de cidades disponíveis,
- Validação de tecnologias disponíveis,
- Requisição POST para cadastro,
- Atualização de cadastro por PUT,
- Requisição GET com opções de queries, ocultando o campo título,
- Remoção de base com delete

## Weather API :sunny::cloud:

- Integração com a weatherAPI por meio da rota POST,
- Consulta ao histórico de 7 dias por meio do parâmetro cidade,
- Cálculo da média de temperatura e integração no banco de dados por meio de um hook pre-save do Mongoose

## Validação
- Validação e mensagens de erro implementadas com um Schema do Mongoose

