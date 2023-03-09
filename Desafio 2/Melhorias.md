# Propostas de melhorias

## Melhorias de legibilidade da função handleGetCameraDiaQuery() 

### Problemas:

**1. Dificuldade de leitura / baixa expressividade do código:** 
- A função possui uma longa cadeia de *if statements* [platform.route linhas 52 : 88] cujos blocos de teste são difíceis de entender à primeira leitura. E.g.:
```
 if (req.query.hour_init && req.query.hour_init != 'undefined' && req.query.hour_final && req.query.hour_final != 'undefined') {...} 
 ```

- Também fica difícil de entender como cada *if statement* interage com a *Array* `elements` [linha 51], cujo nome é pouco expressivo e, também, como esla interage com a função `queryEvents()` [platform.route linha 90 &  \_mocks_\/MongoEvent linha 20], que a usa como parâmetro.

**2. Repetição de lógica:** 
Todos os *if statements* executam, em essência, comandos idênticos: após checar a existência de uma query, incorporam o valor do parâmetro em uma expressão de filtro `{${$exp} : ${parâmetro}}` e, em seguida, empurram essa expressão para a *Array* `elements` . E.g.:

```
 if (req.query.visualized && req.query.visualized != 'undefined') {
        elements.push({
          $eq: ['$$event.visualized', req.query.visualized == 'true']
        })
}
```

### Melhorias sugeridas
1. Renomear a *Array* `elements`: 
Usar um nome mais expressivo, como `projection`, que é o nome do parâmetro na função `queryEvents()` ou `filterList` / `queryFilterList`, já que o conteúdo da *Array* consistirá de filtros de query para selecionar informações no banco de dados;

2. Traduzir a lógica dos *if statements* em variáveis com nome expressivo:
Os *if statements* da função cumprem papeis similares: checar se a query existe para então popular a *Array* `elements`. 
Uma sugestão seria criar variáveis com um padrão de nome similar e expressivo, como `${query}IsQuery`, deixando claro o que se está testando:
```
const favoritedIsQuery = req.query.favorited;

const visualizedIsQuery = req.query.visualized && req.query.visualized != 'undefined';

const hourInitialAndFinalIsQuery = req.query.hour_init && req.query.hour_init != 'undefined' && req.query.hour_final && req.query.hour_final != 'undefined'; 
```
```
if (visualizedIsQuery) {...}

if (favoritedIsQuery) {...}

if (hourInitialAndFinalIsQuery) {
        elements.push({
          $gte: ['$$event.timestamp', parseFloat(<string>req.query.hour_init)]
        })
        (...)
}
```

 3. Encapsular a lógica repetida em uma ou mais funções com assinatura expressiva, para facilitar tanto a manutenção quanto a legibilidade: 
 Como sugestão, uma função `convertQueryIntoFilter()` pode transformar os parâmetros existentes na query em uma expressão de filtro e uma segunda função `addFilterToList()` pode empurrar essa expressão para a *Array*. 

 ## Sugestões de casos de teste:

 ### Problema: 

 - Os casos de teste escritos (tests/gravacao_continuous.test) focam em testar comportamentos esperados e válidos, que retornam códigos de sucesso (200). Não há nenhum teste de *requests* inválidas, que deveriam retornar um erro.

 ### Melhorias sugeridas:

 - Escrever casos de teste que devem retornar erros. E.g.: consulta de uma câmera-dia que não existe; consulta de uma câmera-dia com valores errados ou atributos inexistentes; inclusão de uma câmera-dia com atributos faltantes/valores de tipo incorreto/ Id duplicada; atualização de uma câmera-dia com atributos inválidos, etc.  

