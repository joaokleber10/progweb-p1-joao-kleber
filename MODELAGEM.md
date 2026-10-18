
*Modelagem do Projeto* 
Aluno: João Kleber Sousa Medeiros
Domínio: A barbearia oferece serviços de corte de cabelo e barba aos clientes. Cada agendamento registra qual cliente marcou o horário, qual barbeiro foi escolhido e a data e hora do atendimento. Um agendamento só pode ser confirmado se o barbeiro estiver disponível no horário solicitado. O sistema também permite cancelar agendamentos, registrar justificativas de faltas e notificar o barbeiro sobre os horários reservados.

*ENTIDADE*: Barbeiro;  *ATRIBUTOS*: Nome, Numero_Whatsapp, Habilidade_principal, Rede_social;      *RELACIONAMENTO*: Barbeiro recebe cliente;

*ENTIDADE*: AGENDAMENTO;  *ATRIBUTOS:* Horários_disponíveis, Justificativa_falta, notifica_barbeiro;  *RELACIONAMENTO*: Agendamento notifica um barbeiro;

*ENTIDADE*: CLIENTE; *ATRIBUTOS*: NOME, ID, EMAIL, TELEFONE, IDADE; *RELACIONAMENTO*: CLiente faz vários agendamentos;

## Diagrama de Classes — Sistema de Agendamento de Barbearia

```mermaid
classDiagram
    class Barbeiro {
        -String nome
        -String numeroWhatsapp
        -String habilidadePrincipal
        -String redeSocial
    }

    class Cliente {
        -String nome
        -int id
        -String email
        -String telefone
        -int idade
    }

    class Agendamento {
        -DateTime horario
        -String justificativaFalta
        -boolean notificaBarbeiro
        +confirmar()
        +cancelar()
        +registrarFalta()
    }

    class AgendamentoService {
        +realizarAgendamento()
        +cancelarAgendamento()
        +verificarDisponibilidade()
    }

    class BarbeiroRepository {
        +salvar()
        +buscarPorId()
        +listar()
    }

    class ClienteRepository {
        +salvar()
        +buscarPorId()
        +listar()
    }

    class AgendamentoRepository {
        +salvar()
        +buscarPorId()
        +listarPorCliente()
        +listarPorBarbeiro()
    }

    class Notificador {
        +notificarBarbeiro()
    }

    Cliente "1" --> "0..*" Agendamento : realiza
    Barbeiro "1" --> "0..*" Agendamento : atende

    AgendamentoService ..> Agendamento : gerencia
    AgendamentoService ..> ClienteRepository : consulta
    AgendamentoService ..> BarbeiroRepository : consulta
    AgendamentoService ..> AgendamentoRepository : persiste
    AgendamentoService ..> Notificador : solicita notificacao
```

### Relacionamentos

- Um cliente pode realizar vários agendamentos.
- Um barbeiro pode estar associado a vários agendamentos.
- Cada agendamento está associado a um cliente e a um barbeiro.
- O agendamento pode notificar o barbeiro sobre o horário reservado.


## Responsabilidades
```mermaid
## 4. Responsabilidades

| Classe | Papel | Único motivo para mudar |
|---|---|---|
| `Barbeiro` | Entidade | Alterações nos dados ou nas regras próprias do barbeiro. |
| `Cliente` | Entidade | Alterações nos dados ou nas regras próprias do cliente. |
| `Agendamento` | Entidade | Alterações nas regras do agendamento, como horário, cancelamento ou registro de falta. |
```


