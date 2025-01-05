:- dynamic geracoes/1.
:- dynamic populacao/1.
:- dynamic prob_cruzamento/1.
:- dynamic prob_mutacao/1.

% sala(IdSala).
sala(s1).
sala(s2).
sala(s3).

% cirurgia(IdCirurgia, Duracao, Prioridade).
cirurgia(c1, 2, alta).
cirurgia(c2, 3, media).
cirurgia(c3, 1, baixa).
cirurgia(c4, 2, alta).
cirurgia(c5, 4, media).

% total_cirurgias(NumeroCirurgias).
total_cirurgias(5).

% total_salas(NumeroSalas).
total_salas(3).

% Parâmetros do algoritmo genético
inicializa :-
    write('Numero de novas Geracoes: '), read(NG),
    (retract(geracoes(_)) ; true), asserta(geracoes(NG)),
    write('Dimensao da Populacao: '), read(DP),
    (retract(populacao(_)) ; true), asserta(populacao(DP)),
    write('Probabilidade de Cruzamento (%): '), read(P1),
    PC is P1 / 100,
    (retract(prob_cruzamento(_)) ; true), asserta(prob_cruzamento(PC)),
    write('Probabilidade de Mutacao (%): '), read(P2),
    PM is P2 / 100,
    (retract(prob_mutacao(_)) ; true), asserta(prob_mutacao(PM)).

% Fluxo principal do algoritmo genético
gera :-
    inicializa,
    gera_populacao(Pop),
    write('População Inicial: '), write(Pop), nl,
    avalia_populacao(Pop, PopAv),
    write('População Avaliada: '), write(PopAv), nl,
    ordena_populacao(PopAv, PopOrd),
    geracoes(NG),
    gera_geracao(0, NG, PopOrd).

% Geração da população inicial
gera_populacao(Pop) :-
    populacao(TamPop),
    findall(C, cirurgia(C, _, _), Cirurgias),
    findall(S, sala(S), Salas),
    gera_populacao(TamPop, Cirurgias, Salas, Pop).

gera_populacao(0, _, _, []) :- !.

gera_populacao(TamPop, Cirurgias, Salas, [Ind|Resto]) :-
    TamPop1 is TamPop - 1,
    gera_populacao(TamPop1, Cirurgias, Salas, Resto),
    gera_individuo(Cirurgias, Salas, Ind),
    not(member(Ind, Resto)).

gera_individuo(Cirurgias, Salas, Ind) :-
    maplist(aleatorio_sala(Salas), Cirurgias, Ind).

aleatorio_sala(Salas, Cirurgia, Cirurgia-Sala) :-
    random_member(Sala, Salas).

% Avaliação de um indivíduo
avalia_populacao([], []).
avalia_populacao([Ind|Resto], [Ind*Fitness|Resto1]) :-
    avalia(Ind, Fitness),
    avalia_populacao(Resto, Resto1).

avalia(Ind, Fitness) :-
    total_salas(TotalSalas),
    calcula_uso_salas(Ind, TotalSalas, SalasUso),
    penalidade_salas(SalasUso, PenalidadeSalas),
    calcula_prioridade(Ind, BonusPrioridade),
    Fitness is PenalidadeSalas - BonusPrioridade.

calcula_uso_salas(Ind, TotalSalas, SalasUso) :-
    findall(Sala, member(_-Sala, Ind), TodasSalas),
    findall(Uso, (between(1, TotalSalas, _), select(_, TodasSalas, Uso)), SalasUso).

penalidade_salas(SalasUso, PenalidadeSalas) :-
    sumlist(SalasUso, TotalUso),
    length(SalasUso, NumSalas),
    PenalidadeSalas is TotalUso * NumSalas.

calcula_prioridade(Ind, BonusPrioridade) :-
    findall(Bonus, (
        member(Cirurgia-_, Ind),
        cirurgia(Cirurgia, _, Prioridade),
        prioridade_bonus(Prioridade, Bonus)
    ), BonusList),
    sumlist(BonusList, BonusPrioridade).

prioridade_bonus(alta, 10).
prioridade_bonus(media, 5).
prioridade_bonus(baixa, 1).

% Cruzamento
cruzamento([], []).
cruzamento([Ind*_], [Ind]).
cruzamento([Ind1*_, Ind2*_|Resto], [NInd1, NInd2|Resto1]) :-
    prob_cruzamento(PCruz), random(0.0, 1.0, P),
    (P =< PCruz -> cruzar(Ind1, Ind2, NInd1, NInd2) ; (NInd1 = Ind1, NInd2 = Ind2)),
    cruzamento(Resto, Resto1).

cruzar(Ind1, Ind2, NInd1, NInd2) :-
    length(Ind1, Len),
    random(1, Len, PontoCorte),
    split_at(PontoCorte, Ind1, Ind1A, Ind1B),
    split_at(PontoCorte, Ind2, Ind2A, Ind2B),
    append(Ind1A, Ind2B, NInd1),
    append(Ind2A, Ind1B, NInd2).

split_at(0, L, [], L).
split_at(N, [H|T], [H|L1], L2) :-
    N1 is N - 1,
    split_at(N1, T, L1, L2).

% Mutação
mutacao([], []).
mutacao([Ind|Resto], [NInd|Resto1]) :-
    prob_mutacao(PMut), random(0.0, 1.0, P),
    (P =< PMut -> mutacao1(Ind, NInd) ; NInd = Ind),
    mutacao(Resto, Resto1).

mutacao1(Ind, NInd) :-
    length(Ind, Len),
    random(1, Len, Pos1),
    random(1, Len, Pos2),
    swap(Pos1, Pos2, Ind, NInd).

swap(Pos1, Pos2, Ind, NInd) :-
    nth1(Pos1, Ind, Elem1),
    nth1(Pos2, Ind, Elem2),
    select(Elem1, Ind, Temp),
    select(Elem2, Temp, Inter),
    nth1(Pos1, NInd, Elem2, Inter),
    nth1(Pos2, NInd, Elem1, Inter).

% Ordenação
ordena_populacao(PopAv, PopOrd) :-
    predsort(compare_fitness, PopAv, PopOrd).

compare_fitness(Delta, _*Fitness1, _*Fitness2) :-
    compare(Delta, Fitness1, Fitness2).

% Geração de novas gerações
gera_geracao(G, G, Pop) :- !,
    write('Geração '), write(G), write(': '), nl, write(Pop), nl.

gera_geracao(N, G, Pop) :-
    write('Geração '), write(N), write(': '), nl, write(Pop), nl,
    cruzamento(Pop, PopCruz),
    mutacao(PopCruz, PopMut),
    avalia_populacao(PopMut, PopAv),
    ordena_populacao(PopAv, PopOrd),
    N1 is N + 1,
    gera_geracao(N1, G, PopOrd).
