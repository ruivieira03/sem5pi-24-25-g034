
:- dynamic availability/3.
:- dynamic agenda_staff/3.
:- dynamic agenda_staff1/3.
:- dynamic agenda_operation_room/3.
:- dynamic agenda_operation_room1/3.
:- dynamic better_sol/5.
:- dynamic final_time/1.

:- use_module(library(http/http_server)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).

server(Port) :- http_server(http_dispatch, [port(Port)]).

agenda_staff(d001,20241028,[(1080,1140,c01)]).
agenda_staff(d002,20241028,[(850,900,m02)]).
agenda_staff(d003,20241028,[(760,790,m01)]).
agenda_staff(n001,20241028,[(750,790,m01)]).
agenda_staff(n002,20241028,[(950,980,m02)]).
agenda_staff(n003,20241028,[(1000,1050,m01)]).
agenda_staff(d005,20241028,[(720,850,m01)]).
agenda_staff(m001,20241028,[]).
agenda_staff(m002,20241028,[]).

timetable(d001,20241028,(280,1200)).
timetable(d002,20241028,(300,1440)).
timetable(d003,20241028,(320,1320)).
timetable(n001,20241028,(300,1200)).
timetable(n002,20241028,(350,1250)).
timetable(n003,20241028,(290,1440)).
timetable(d005,20241028,(300,1300)).
timetable(m001,20241028,(250,1000)).
timetable(m002,20241028,(390,1440)).

staff(d001,doctor,orthopaedist,[so2,so3,so4]).
staff(d002,doctor,orthopaedist,[so2,so3,so4]).
staff(d003,doctor,orthopaedist,[so2,so3,so4]).
staff(n001,nurse,anaesthetist,[so2,so3,so4]).
staff(n002,nurse,instrumenting,[so2,so3,so4]).
staff(n003,nurse,circulating,[so2,so3,so4]).
staff(d005,doctor,anaesthetist,[so2,so3,so4]).
staff(m001,assistant,medicalaction,[so2,so3,so4]).
staff(m002,assistant,medicalaction,[so2,so3,so4]).

surgery(so2,45,60,45).
surgery(so3,45,90,45).
surgery(so4,45,75,45).

surgery_id(so100001,so2).
surgery_id(so100002,so3).
surgery_id(so100003,so4).
surgery_id(so100004,so2).

assignment_surgery(so100001,d001,2).
assignment_surgery(so100001,n001,1).
assignment_surgery(so100001,m001,3).

assignment_surgery(so100002,d002,2).
assignment_surgery(so100002,n002,1).
assignment_surgery(so100002,m002,3).

assignment_surgery(so100003,d003,2).
assignment_surgery(so100003,d005,1).
assignment_surgery(so100003,n003,1).
assignment_surgery(so100003,m001,3).

assignment_surgery(so100004,d001,2).
assignment_surgery(so100004,d002,2).
assignment_surgery(so100004,n001,1).
assignment_surgery(so100004,n002,3).
assignment_surgery(so100004,m002,3).

agenda_operation_room(or1,20241028,[(520,579,so100000),(1000,1059,so099999)]).

free_agenda0([],[(0,1440)]).
free_agenda0([(0,Tfin,_)|LT],LT1):-!,free_agenda1([(0,Tfin,_)|LT],LT1).
free_agenda0([(Tin,Tfin,_)|LT],[(0,T1)|LT1]):- T1 is Tin-1,free_agenda1([(Tin,Tfin,_)|LT],LT1).

free_agenda1([(_,Tfin,_)],[(T1,1440)]):-Tfin\==1440,!,T1 is Tfin+1.
free_agenda1([(_,_,_)],[]).
free_agenda1([(_,T,_),(T1,Tfin2,_)|LT],LT1):-Tx is T+1,T1==Tx,!,free_agenda1([(T1,Tfin2,_)|LT],LT1).
free_agenda1([(_,Tfin1,_),(Tin2,Tfin2,_)|LT],[(T1,T2)|LT1]):-T1 is Tfin1+1,T2 is Tin2-1,free_agenda1([(Tin2,Tfin2,_)|LT],LT1).

adapt_timetable(D,Date,LFA,LFA2):-timetable(D,Date,(InTime,FinTime)),treatin(InTime,LFA,LFA1),treatfin(FinTime,LFA1,LFA2).

treatin(InTime,[(In,Fin)|LFA],[(In,Fin)|LFA]):-InTime=<In,!.
treatin(InTime,[(_,Fin)|LFA],LFA1):-InTime>Fin,!,treatin(InTime,LFA,LFA1).
treatin(InTime,[(_,Fin)|LFA],[(InTime,Fin)|LFA]).
treatin(_,[],[]).

treatfin(FinTime,[(In,Fin)|LFA],[(In,Fin)|LFA1]):-FinTime>=Fin,!,treatfin(FinTime,LFA,LFA1).
treatfin(FinTime,[(In,_)|_],[]):-FinTime=<In,!.
treatfin(FinTime,[(In,_)|_],[(In,FinTime)]).
treatfin(_,[],[]).

intersect_all_agendas([Name],Date,LA):-!,availability(Name,Date,LA).
intersect_all_agendas([Name|LNames],Date,LI):-
    availability(Name,Date,LA),
    intersect_all_agendas(LNames,Date,LI1),
    intersect_2_agendas(LA,LI1,LI).

intersect_2_agendas([],_,[]).
intersect_2_agendas([D|LD],LA,LIT):- intersect_availability(D,LA,LI,LA1),
                    intersect_2_agendas(LD,LA1,LID),
                    append(LI,LID,LIT).

intersect_availability((_,_),[],[],[]).

intersect_availability((_,Fim),[(Ini1,Fim1)|LD],[],[(Ini1,Fim1)|LD]):- Fim<Ini1,!.

intersect_availability((Ini,Fim),[(_,Fim1)|LD],LI,LA):- Ini>Fim1,!,intersect_availability((Ini,Fim),LD,LI,LA).

intersect_availability((Ini,Fim),[(Ini1,Fim1)|LD],[(Imax,Fmin)],[(Fim,Fim1)|LD]):- Fim1>Fim,!,
    min_max(Ini,Ini1,_,Imax),
    min_max(Fim,Fim1,Fmin,_).

intersect_availability((Ini,Fim),[(Ini1,Fim1)|LD],[(Imax,Fmin)|LI],LA):- Fim>=Fim1,!,
    min_max(Ini,Ini1,_,Imax),
    min_max(Fim,Fim1,Fmin,_),
    intersect_availability((Fim1,Fim),LD,LI,LA).

min_max(I,I1,I,I1):- I<I1,!.
min_max(I,I1,I1,I).

schedule_all_surgeries(Room, Day) :-
    retractall(agenda_staff1(_, _, _)),
    retractall(agenda_operation_room1(_, _, _)),
    retractall(availability(_, _, _)),
    findall(_, (agenda_staff(D, Day, Agenda), assertz(agenda_staff1(D, Day, Agenda))), _),
    agenda_operation_room(Or, Date, Agenda),
    assert(agenda_operation_room1(Or, Date, Agenda)),
    findall(_, (agenda_staff1(D, Date, L), free_agenda0(L, LFA), adapt_timetable(D, Date, LFA, LFA2), assertz(availability(D, Date, LFA2))), _),
    findall(OpCode, surgery_id(OpCode, _), LOpCode),
    availability_all_surgeries(LOpCode, Room, Day),
    !.

availability_all_surgeries([], _, _).
availability_all_surgeries([OpCode | LOpCode], Room, Day) :-
    schedule_phases(OpCode, Room, Day),
    availability_all_surgeries(LOpCode, Room, Day).

schedule_phases(OpCode, Room, Day) :-
    surgery_id(OpCode, OpType),
    surgery(OpType, TAnaesthesia, TSurgery, TCleaning),
    TotalDuration is TAnaesthesia + TSurgery + TCleaning,
    findall(Staff, assignment_surgery(OpCode, Staff, _), LStaff),
    intersect_all_agendas(LStaff, Day, LA),
    agenda_operation_room1(Room, Day, LAgendaRoom),
    free_agenda0(LAgendaRoom, LFAgRoom),
    intersect_2_agendas(LA, LFAgRoom, LIntADoctorsRoom),
    remove_unf_intervals(TotalDuration, LIntADoctorsRoom, LAPossibilities),
    schedule_first_interval(TotalDuration, LAPossibilities, (TStart, _)),
    TEndAnaesthesia is TStart + TAnaesthesia,
    TEndSurgery is TEndAnaesthesia + TSurgery,
    TEndCleaning is TEndSurgery + TCleaning,
    retract(agenda_operation_room1(Room, Day, Agenda)),
    insert_agenda((TStart, TEndAnaesthesia, OpCode), Agenda, Agenda1),
    insert_agenda((TEndAnaesthesia, TEndSurgery, OpCode), Agenda1, Agenda2),
    insert_agenda((TEndSurgery, TEndCleaning, OpCode), Agenda2, Agenda3),
    assertz(agenda_operation_room1(Room, Day, Agenda3)),
    findall(Staff, assignment_surgery(OpCode, Staff, 1), LAStaff),
    insert_agenda_doctors((TStart, TEndAnaesthesia, OpCode), Day, LAStaff),
    findall(Staff, assignment_surgery(OpCode, Staff, 2), LSStaff),
    insert_agenda_doctors((TEndAnaesthesia, TEndSurgery, OpCode), Day, LSStaff),
    findall(Staff, assignment_surgery(OpCode, Staff, 3), LCStaff),
    insert_agenda_doctors((TEndSurgery, TEndCleaning, OpCode), Day, LCStaff).

remove_unf_intervals(_, [], []).
remove_unf_intervals(TSurgery, [(Tin, Tfin) | LA], [(Tin, Tfin) | LA1]) :-
    DT is Tfin - Tin + 1,
    TSurgery =< DT,
    !,
    remove_unf_intervals(TSurgery, LA, LA1).
remove_unf_intervals(TSurgery, [_ | LA], LA1) :-
    remove_unf_intervals(TSurgery, LA, LA1).

schedule_first_interval(TSurgery, [(Tin, _) | _], (Tin, TfinS)) :-
    TfinS is Tin + TSurgery - 1.

insert_agenda((TinS, TfinS, OpCode), [], [(TinS, TfinS, OpCode)]).
insert_agenda((TinS, TfinS, OpCode), [(Tin, Tfin, OpCode1) | LA], [(TinS, TfinS, OpCode), (Tin, Tfin, OpCode1) | LA]) :-
    TfinS < Tin,
    !.
insert_agenda((TinS, TfinS, OpCode), [(Tin, Tfin, OpCode1) | LA], [(Tin, Tfin, OpCode1) | LA1]) :-
    insert_agenda((TinS, TfinS, OpCode), LA, LA1).

insert_agenda_doctors(_, _, []).
insert_agenda_doctors((TinS, TfinS, OpCode), Day, [Doctor | LDoctors]) :-
    retract(agenda_staff1(Doctor, Day, Agenda)),
    insert_agenda((TinS, TfinS, OpCode), Agenda, Agenda1),
    assert(agenda_staff1(Doctor, Day, Agenda1)),
    insert_agenda_doctors((TinS, TfinS, OpCode), Day, LDoctors).

obtain_better_sol(Room, Day, AgOpRoomBetter, LAgDoctorsBetter, TFinOp) :-
    get_time(Ti),
    (obtain_better_sol1(Room, Day) ; true),
    retract(better_sol(Day, Room, AgOpRoomBetter, LAgDoctorsBetter, TFinOp)),
    get_time(Tf),
    T is Tf - Ti,
    write('Tempo de geracao da solucao: '), write(T), nl.

obtain_better_sol1(Room, Day) :-
    asserta(better_sol(Day, Room, _, _, 1441)),
    findall(OpCode, surgery_id(OpCode, _), LOC),
    !,
    permutation(LOC, LOpCode),
    retractall(agenda_staff1(_, _, _)),
    retractall(agenda_operation_room1(_, _, _)),
    retractall(availability(_, _, _)),
    findall(_, (agenda_staff(D, Day, Agenda), assertz(agenda_staff1(D, Day, Agenda))), _),
    agenda_operation_room(Room, Day, Agenda),
    assert(agenda_operation_room1(Room, Day, Agenda)),
    findall(_, (agenda_staff1(D, Day, L), free_agenda0(L, LFA), adapt_timetable(D, Day, LFA, LFA2), assertz(availability(D, Day, LFA2))), _),
    availability_all_surgeries(LOpCode, Room, Day),
    agenda_operation_room1(Room, Day, AgendaR),
    update_better_sol(Day, Room, AgendaR, LOpCode),
    fail.

update_better_sol(Day, Room, Agenda, LOpCode) :-
    better_sol(Day, Room, _, _, FinTime),
    reverse(Agenda, AgendaR),
    evaluate_final_time(AgendaR, LOpCode, FinTime1),
    write('Analysing for LOpCode='), write(LOpCode), nl,
    write('now: FinTime1='), write(FinTime1), write(' FinTime='), write(FinTime), nl,
    FinTime1 < FinTime,
    write('best solution updated'), nl,
    retract(better_sol(_, _, _, _, _)),
    findall(Doctor, assignment_surgery(_, Doctor, _), LDoctors1),
    remove_equals(LDoctors1, LDoctors),
    list_doctors_agenda(Day, LDoctors, LDAgendas),
    asserta(better_sol(Day, Room, Agenda, LDAgendas, FinTime1)).


% -------------------------------Evaluation1------------------------------


evaluate_final_time([],_,1441).
evaluate_final_time([(_,Tfin,OpCode)|_],LOpCode,Tfin):-member(OpCode,LOpCode),!.
evaluate_final_time([_|AgR],LOpCode,Tfin):-evaluate_final_time(AgR,LOpCode,Tfin).

list_doctors_agenda(_,[],[]).
list_doctors_agenda(Day,[D|LD],[(D,AgD)|LAgD]):-agenda_staff1(D,Day,AgD),list_doctors_agenda(Day,LD,LAgD).

remove_equals([],[]).
remove_equals([X|L],L1):-member(X,L),!,remove_equals(L,L1).
remove_equals([X|L],[X|L1]):-remove_equals(L,L1).


% ------------------------------Heuristic1-------------------------------

heuristic_schedule_all(Room, Day) :-
    get_time(Ti),
    findall(OpCode,surgery_id(OpCode,_),LOpCode),

    try_each_permutation(Room, Day, LOpCode),

    final_time(TFinal),
    get_time(Tf),
    T is Tf - Ti,
    write('Escalonamento concluido. Tempo final da Ultima operacao: '), write(TFinal), nl, write('Tempo de execucao: '), write(T), write('s'),nl.


try_each_permutation(Room, Day, LOpCode) :-
    permutation(LOpCode, Permuted),
    \+attempt_schedule(Room, Day, Permuted), % Falhou? Impede novas tentativas.
    !, % Corta futuras execucoes de permutacao.
    fail. % Indica que todo o processo yey.

try_each_permutation(Room, Day, LOpCode) :-
    permutation(LOpCode, Permuted),
    \+attempt_schedule(Room, Day, Permuted), fail. % Bem-sucedido? Continua normalmente.

attempt_schedule(Room, Day, LOpCode) :-
    write('PermutedLOpCode='),write(LOpCode),nl,
    % Limpar estado temporario antes de cada tentativa
    retractall(agenda_staff1(_,_,_)),
    retractall(agenda_operation_room1(_,_,_)),
    retractall(availability(_,_,_)),
    findall(_,(agenda_staff(D,Day,Agenda),assertz(agenda_staff1(D,Day,Agenda))),_),
    agenda_operation_room(Room,Day,Agenda),assert(agenda_operation_room1(Room,Day,Agenda)),
    findall(_,(agenda_staff1(D,Day,L),free_agenda0(L,LFA),adapt_timetable(D,Day,LFA,LFA2),assertz(availability(D,Day,LFA2))),_),
    % Tentar escalonar com a permuta��o atual
    \+heuristic_schedule(Room, Day, LOpCode),fail.

heuristic_schedule(_, _, []) :- fail,!.
heuristic_schedule(Room, Day, LOpCode) :-
    write('List='), write(LOpCode),nl,
    select_next_surgery(Day, LOpCode, OpCode),
    write(OpCode),nl,
    schedule_phases(OpCode, Room, Day),
    delete(LOpCode, OpCode, RemainingOpCodes),
    \+heuristic_schedule(Room, Day, RemainingOpCodes), fail.

% Seleciona a proxima cirurgia a ser escalonada com base na disponibilidade inicial dos medicos
select_next_surgery(Day, LOpCode, SelectedOpCode) :-
    findall((OpCode, EarliestTime), (
        member(OpCode, LOpCode),
        surgery_id(OpCode, OpType),
        surgery(OpType, TAnaesthesia, TSurgery, TCleaning),
        TotalTime is TAnaesthesia + TSurgery + TCleaning,
        assignment_surgery(OpCode, Doctor, 2),
        %write('Doctor for '), write(OpCode), write('='), write(Doctor),nl,
        availability(Doctor, Day, LA),
        earliest_sufficient_interval(TotalTime, LA, EarliestTime)
    ), Options),
    sort(2, @=<, Options, SortedOptions), % Ordena pelas janelas de tempo mais cedo
    SortedOptions = [(SelectedOpCode, _) | _].

% Encontra a primeira janela disponivel suficiente para uma cirurgia
earliest_sufficient_interval(_, [], inf). % Nenhuma janela suficiente
earliest_sufficient_interval(TotalTime, [(Tin, Tfin) | _], Tin) :-
    Tfin - Tin + 1 >= TotalTime, !. % Janela suficiente encontrada
earliest_sufficient_interval(TotalTime, [_ | Rest], Earliest) :-
    earliest_sufficient_interval(TotalTime, Rest, Earliest).


    % ------------------------------Sprint C-------------------------------


% ------------------------------US7.3.1: Automatic room assignment-------------------------------

    assign_surgeries_to_rooms(Rooms, Day) :-
    findall(Room, agenda_operation_room(Room, Day, _), Rooms),
    retractall(agenda_operation_room1(_, _, _)),
    retractall(availability(_, _, _)),
    % Initialize agendas for all rooms
    forall(
        member(Room, Rooms),
        (
            agenda_operation_room(Room, Day, Agenda),
            assertz(agenda_operation_room1(Room, Day, Agenda)),
            free_agenda0(Agenda, FreeSlots),
            adapt_timetable(Room, Day, FreeSlots, AdjustedSlots),
            assertz(availability(Room, Day, AdjustedSlots))
        )
    ),
    % Assign surgeries
    findall(OpCode, surgery_id(OpCode, _), Surgeries),
    assign_surgeries(Surgeries, Rooms, Day).

assign_surgeries([], _, _).
assign_surgeries([OpCode | RemainingSurgeries], Rooms, Day) :-
    surgery_id(OpCode, OpType),
    surgery(OpType, TAnaesthesia, TSurgery, TCleaning),
    TotalDuration is TAnaesthesia + TSurgery + TCleaning,
    find_best_room(Rooms, Day, TotalDuration, OpCode, SelectedRoom),
    (SelectedRoom \= none ->
        schedule_phases(OpCode, SelectedRoom, Day),
        assign_surgeries(RemainingSurgeries, Rooms, Day)
    ;
        write('Could not assign surgery '), write(OpCode), nl,
        assign_surgeries(RemainingSurgeries, Rooms, Day)
    ).

find_best_room([], _, _, _, none).
find_best_room([Room | RemainingRooms], Day, Duration, OpCode, SelectedRoom) :-
    availability(Room, Day, FreeSlots),
    remove_unf_intervals(Duration, FreeSlots, ValidSlots),
    (ValidSlots = [] ->
        find_best_room(RemainingRooms, Day, Duration, OpCode, SelectedRoom)
    ;
        SelectedRoom = Room
    ).

% ------------------------------US7.3.2: Genetic Algorithm for Surgery Scheduling-------------------------------

schedule_surgeries_ga(Rooms, Day, Solution) :-
    findall(OpCode, surgery_id(OpCode, _), Surgeries),
    length(Surgeries, NumGenes),
    % Define GA parameters
    PopulationSize = 50,
    MaxGenerations = 100,
    MutationRate = 0.1,
    CrossoverRate = 0.8,
    % Initialize population
    initialize_population(PopulationSize, NumGenes, Rooms, InitialPopulation),
    % Run the genetic algorithm
    ga_loop(InitialPopulation, MaxGenerations, MutationRate, CrossoverRate, Rooms, Day, Solution).

initialize_population(0, _, _, []) :- !.
initialize_population(PopulationSize, NumGenes, Rooms, [Chromosome | Rest]) :-
    random_chromosome(NumGenes, Rooms, Chromosome),
    NewPopulationSize is PopulationSize - 1,
    initialize_population(NewPopulationSize, NumGenes, Rooms, Rest).

random_chromosome(0, _, []) :- !.
random_chromosome(NumGenes, Rooms, [Gene | Rest]) :-
    random_member(Gene, Rooms),
    NewNumGenes is NumGenes - 1,
    random_chromosome(NewNumGenes, Rooms, Rest).

% Genetic Algorithm Loop
ga_loop(Population, 0, _, _, _, _, BestChromosome) :-
    evaluate_population(Population, EvaluatedPopulation),
    select_best_chromosome(EvaluatedPopulation, BestChromosome).
ga_loop(Population, Generations, MutationRate, CrossoverRate, Rooms, Day, BestChromosome) :-
    evaluate_population(Population, EvaluatedPopulation),
    select_best_chromosome(EvaluatedPopulation, BestChromosome),
    generate_new_population(EvaluatedPopulation, MutationRate, CrossoverRate, Rooms, Day, NewPopulation),
    NewGenerations is Generations - 1,
    ga_loop(NewPopulation, NewGenerations, MutationRate, CrossoverRate, Rooms, Day, BestChromosome).

evaluate_population([], []).
evaluate_population([Chromosome | Rest], [(Chromosome, Fitness) | EvaluatedRest]) :-
    fitness_function(Chromosome, Fitness),
    evaluate_population(Rest, EvaluatedRest).

fitness_function(Chromosome, Fitness) :-
    % Calculate fitness based on room conflicts, idle times, etc.
    findall(OpCode, surgery_id(OpCode, _), Surgeries),
    compute_fitness(Surgeries, Chromosome, Fitness).

compute_fitness(_, _, Fitness) :-
    % Example fitness logic
    Fitness = 100. % Replace with actual computation

select_best_chromosome(EvaluatedPopulation, BestChromosome) :-
    sort(2, @>=, EvaluatedPopulation, [(BestChromosome, _) | _]).

generate_new_population(EvaluatedPopulation, MutationRate, CrossoverRate, Rooms, Day, NewPopulation) :-
    length(EvaluatedPopulation, PopulationSize),
    generate_offspring(EvaluatedPopulation, MutationRate, CrossoverRate, Rooms, Day, PopulationSize, NewPopulation).

generate_offspring(_, _, _, _, _, 0, []) :- !.
generate_offspring(EvaluatedPopulation, MutationRate, CrossoverRate, Rooms, Day, PopulationSize, [Offspring | Rest]) :-
    select_parents(EvaluatedPopulation, Parent1, Parent2),
    crossover(Parent1, Parent2, CrossoverRate, Child),
    mutate(Child, MutationRate, Rooms, MutatedChild),
    PopulationSize1 is PopulationSize - 1,
    generate_offspring(EvaluatedPopulation, MutationRate, CrossoverRate, Rooms, Day, PopulationSize1, Rest).

select_parents(EvaluatedPopulation, Parent1, Parent2) :-
    % Use roulette wheel or tournament selection
    random_member((Parent1, _), EvaluatedPopulation),
    random_member((Parent2, _), EvaluatedPopulation).

crossover(Parent1, Parent2, CrossoverRate, Child) :-
    random(0.0, 1.0, Rand),
    (Rand =< CrossoverRate ->
        % Perform crossover
        length(Parent1, Length),
        random(1, Length, CrossoverPoint),
        append(Prefix, Suffix, Parent1),
        length(Prefix, CrossoverPoint),
        append(Prefix, Suffix2, Child),
        append(_, Suffix, Parent2),
        append(Suffix2, _, Child)
    ;
        % No crossover, copy Parent1
        Child = Parent1
    ).

mutate(Chromosome, MutationRate, Rooms, MutatedChromosome) :-
    random(0.0, 1.0, Rand),
    (Rand =< MutationRate ->
        random_chromosome(1, Rooms, [Gene]),
        random(1, Length, MutationPoint),
        nth1(MutationPoint, Chromosome, _, Rest),
        nth1(MutationPoint, MutatedChromosome, Gene, Rest)
    ;
        MutatedChromosome = Chromosome
    ).




































