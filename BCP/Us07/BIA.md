
## Business Impact Analysis (BIA)
Objetivo
Avaliar o impacto e os riscos associados à solução final de backup e gerenciamento de arquivos, garantindo que os requisitos de retenção e confiabilidade sejam atendidos.
 
Riscos Identificados no Sprint Anterior
1.	Perda de dados devido à remoção excessiva de backups antigos:
o	Risco mitigado ao implementar políticas específicas de retenção para diferentes períodos (última semana, último mês e último ano).
2.	Falta de espaço em disco para armazenar novos backups:
o	Solucionado com a exclusão automatizada de backups desnecessários e redundantes.
3.	Falhas de logs ou dificuldades de rastreamento:
o	Adicionamos logs detalhados para rastrear todas as operações realizadas pelo script.
 
Impacto da Solução
1.	Operacional:
o	Automatização das tarefas de backup e limpeza de arquivos reduz o tempo e esforço manual, aumentando a eficiência operacional.
2.	Financeiro:
o	Otimização do armazenamento de backups economiza custos de infraestrutura de armazenamento.
3.	Segurança e Conformidade:
o	Retenção adequada de dados garante conformidade com políticas internas e requisitos legais.
 
Adaptações Implementadas
1.	Adicionamos verificações de datas nos nomes dos arquivos para evitar exclusões incorretas.
2.	Os logs agora detalham falhas e sucessos, permitindo melhor rastreabilidade e auditoria.
3.	O script foi projetado para ser configurável e ajustável, permitindo que administradores personalizem caminhos de backup e retenção conforme necessário.
 
Conclusão
O script final implementa soluções robustas que atendem aos requisitos operacionais e mitigam os riscos identificados, garantindo confiabilidade e eficiência na gestão de backups. Isso demonstra um impacto positivo para a organização em termos de segurança de dados e desempenho.
