### **3. Modelagem do Processo de Negócio**

#### **3.1. Modelagem da situação atual (Modelagem AS IS)**

A modelagem **AS IS** reflete os processos de registro e venda de veículos de uma concessionária de forma isolada e com gargalos visíveis, comuns em ambientes com pouca automação. O processo de Registro de Veículos mostra uma sequência linear de tarefas, desde a compra até o anúncio manual no Instagram, com a possibilidade de modificações e um registro em um "banco de dados físico". O processo de Venda de Veículos detalha a interação com o cliente, desde a escolha do anúncio até o fechamento da venda, com etapas que dependem de agendamentos e contato manual.


---
<img width="4530" height="2100" alt="as_is_canutomotorsVendaVeiculos" src="https://github.com/user-attachments/assets/f80aa81b-cbcc-4751-bb93-1fa6d5bb6f5f" />
<img width="4524" height="1080" alt="as_is_canutomotrsRegistroVeiculos" src="https://github.com/user-attachments/assets/9c465492-d6ad-454f-98a9-e16c70a013c1" />

#### **3.2. Análise dos processos**

Os problemas identificados na situação **AS IS** são:

* **Falta de Integração**: Os processos de registro e venda operam de forma desconectada. Um vendedor não tem acesso em tempo real ao status de preparação do veículo, e a equipe de registro não tem visibilidade da demanda. Isso causa **retrabalho** e **atrasos**, como a necessidade de verificar manualmente se um veículo está pronto para avaliação.

* **Inconsistência de Dados e Ineficiência**: O "banco de dados físico" é uma fonte de erros e desatualizações. A ausência de um sistema centralizado impede o acesso rápido às informações dos veículos, como documentação e histórico de modificações, o que prolonga o tempo de negociação.

* **Comunicação Manual e Desconexa**: A comunicação com o cliente é feita por canais como WhatsApp, Instagram ou telefone, dificultando o rastreamento das conversas e a centralização do histórico de interações. Isso pode levar à perda de informações e a uma experiência de compra insatisfatória para o cliente.

* **Gargalos na Negociação**: A negociação é um processo com poucas opções de ramificação. Se o negócio falha, o processo basicamente se encerra, sem um fluxo otimizado para a renegociação ou para apresentar propostas alternativas ao cliente de forma proativa.

---

#### **3.3. Desenho dos Processos (TO BE)**

**Proposta de Solução:**

A solução proposta é a criação de um sistema back-end que automatize e integre os processos de registro e venda de veículos. A modelagem **TO BE** sugere a unificação desses processos em uma plataforma digital.

As principais melhorias incluem:

* **Centralização de Dados**: O sistema atuaria como um **banco de dados único e digital** para o registro de veículos, eliminando a necessidade de registros físicos. Isso garantirá que todos os dados do veículo (documentação, status de modificações, preço final) estejam acessíveis em tempo real para a equipe de vendas.

* **Automação do Fluxo de Vendas**: O processo de venda será mais dinâmico. O sistema permitirá a **simulação de financiamento**, a **geração automática de propostas** e a **geração de um link de pagamento**, acelerando o fechamento das negociações. O cliente poderá interagir com a plataforma para agendar visitas e test drives.

* **Melhoria na Experiência do Cliente**: Com um fluxo mais transparente, o cliente terá acesso a informações claras sobre o veículo e o financiamento, e a comunicação será centralizada, proporcionando um serviço mais ágil e profissional.

**Limites da Solução:**

Apesar dos benefícios, a solução tem limites:

* **Integração com Plataformas Externas**: A automatização completa depende da integração com APIs de bancos e seguradoras, o que talvez não seja possível na implementação por ser uma tratativa real com dados sensíveis e de difícil acesso.

* **Indisponibilidade de tratar a troca de documentos**: Devido a trâmites burocráticos, a intermediação de documentos é inviável, pelo mesmo motivo de serem dados sensíveis e de difícil acesso.
