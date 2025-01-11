:-dynamic generations/1.
:-dynamic population/1.
:-dynamic prob_crossover/1.
:-dynamic prob_mutation/1.
:-dynamic max_time/1.
:-dynamic min_evaluation/1.
:-dynamic stabilization_generations/1.

% surgery(Id, Duration, Room).
surgery(s1, 2, r1).
surgery(s2, 4, r2).
surgery(s3, 1, r1).
surgery(s4, 3, r3).
surgery(s5, 3, r2).

% rooms(NumberOfRooms).
rooms(3).

% surgeries(NumberOfSurgeries).
surgeries(5).

% parameters initialization
initialize:-
    write('Number of new generations: '), read(NG), 
    (retract(generations(_)); true), asserta(generations(NG)),
    write('Number of Desired Solutions '), read(PS),
    (retract(population(_)); true), asserta(population(PS)),
    write('Probability of crossover (%):'), read(P1),
    PC is P1/100, 
    (retract(prob_crossover(_)); true), asserta(prob_crossover(PC)),
    write('Probability of mutation (%):'), read(P2),
    PM is P2/100, 
    (retract(prob_mutation(_)); true), asserta(prob_mutation(PM)),
    write('Maximum runtime (seconds): '), read(MaxTime),
    (retract(max_time(_)); true), asserta(max_time(MaxTime)),
    write('Minimum evaluation value: '), read(MinEval),
    (retract(min_evaluation(_)); true), asserta(min_evaluation(MinEval)),
    write('Stabilization generations: '), read(StabGen),
    (retract(stabilization_generations(_)); true), asserta(stabilization_generations(StabGen)).

% Generate initial population
generate_population(Pop):-
    population(PopSize),
    surgeries(NumS),
    findall(Surgery, surgery(Surgery, _, _), SurgeryList),
    generate_population(PopSize, SurgeryList, NumS, Pop).

generate_population(0, _, _, []):- !.
generate_population(PopSize, SurgeryList, NumS, [Ind|Rest]):-
    PopSize1 is PopSize - 1,
    generate_population(PopSize1, SurgeryList, NumS, Rest),
    generate_individual(SurgeryList, NumS, Ind),
    not(member(Ind, Rest)).
generate_population(PopSize, SurgeryList, NumS, L):-
    generate_population(PopSize, SurgeryList, NumS, L).

generate_individual([], _, []).
generate_individual(SurgeryList, NumS, [(Surgery, Room)|Rest]):-
    random_member(Surgery, SurgeryList),
    findall(Room, surgery(_, _, Room), RoomList),
    random_member(Room, RoomList),
    delete(SurgeryList, Surgery, NewList),
    generate_individual(NewList, NumS - 1, Rest).

% Evaluation function
evaluate_population([], []).
evaluate_population([Ind|Rest], [Ind*V|Rest1]):-
    evaluate(Ind, V),
    evaluate_population(Rest, Rest1).

evaluate(Schedule, MaxEndTime):-
    findall(Room, surgery(_, _, Room), RoomList),
    calculate_end_times(Schedule, RoomList, EndTimes),
    max_list(EndTimes, MaxEndTime).

calculate_end_times(_, [], []).
calculate_end_times(Schedule, [Room|Rest], [EndTime|RestTimes]):-
    findall(Duration, (member((Surgery, Room), Schedule), surgery(Surgery, Duration, Room)), Durations),
    sum_list(Durations, EndTime),
    calculate_end_times(Schedule, Rest, RestTimes).

% Print schedule
print_schedule([]):- nl.
print_schedule([(Surgery, Room)|Rest]):-
    write('Surgery: '), write(Surgery), write(' -> Room: '), write(Room), nl,
    print_schedule(Rest).

% Main genetic algorithm loop
generate:-
    initialize,
    get_time(StartTime),
    generate_population(Pop),
    write('Initial Solution: '), nl,
    forall(member(Solution*_, Pop), (print_schedule(Solution), nl)),
    evaluate_population(Pop, PopValue),
    write('Initial Population Values: '), write(PopValue), nl,
    order_population(PopValue, PopOrd),
    generations(NG),
    generate_generation(0, NG, PopOrd, StartTime, []).

% Order population by surgery priority
order_population(PopValue, PopValueOrd):-
    bsort(PopValue, PopValueOrd).

bsort([X], [X]):- !.
bsort([X|Xs], Ys):-
    bsort(Xs, Zs),
    bchange([X|Zs], Ys).

bchange([X], [X]):- !.
bchange([X*VX, Y*VY|L1], [Y*VY|L2]):-
    VX > VY, !,
    bchange([X*VX|L1], L2).
bchange([X|L1], [X|L2]):-
    bchange(L1, L2).

% Generate new generations
generate_generation(G, NG, Pop, StartTime, PrevBestValues):-
    G < NG,
    write('Generation '), write(G), write(': '), nl,
    forall(member(Solution*_, Pop), (print_schedule(Solution), nl)),
    crossover(Pop, NPop1),
    mutation(NPop1, NPop),
    evaluate_population(NPop, NPopValue),
    order_population(NPopValue, NPopOrd),
    NewG is G + 1,
    generate_generation(NewG, NG, NPopOrd, StartTime, PrevBestValues).

generate_generation(_, _, Pop, _, _):-
    write(': '), nl,
    forall(member(Solution*_, Pop), (print_schedule(Solution), nl)).

% Crossover and mutation
crossover([], []).
crossover([Ind], [Ind]).
crossover([Ind1*_, Ind2*_|Rest], [NInd1, NInd2|Rest1]):-
    prob_crossover(Pc),
    random(0.0, 1.0, R),
    (R =< Pc -> crossover_individuals(Ind1, Ind2, NInd1, NInd2) ; NInd1 = Ind1, NInd2 = Ind2),
    crossover(Rest, Rest1).

crossover_individuals(Ind1, Ind2, NInd1, NInd2):-
    random_permutation(Ind1, Temp1),
    random_permutation(Ind2, Temp2),
    length(Ind1, L),
    CrossPoint is L // 2,
    append(A1, B1, Temp1),
    append(A2, B2, Temp2),
    length(A1, CrossPoint),
    length(A2, CrossPoint),
    append(A1, B2, NInd1),
    append(A2, B1, NInd2).

mutation([], []).
mutation([Ind|Rest], [NInd|Rest1]):-
    prob_mutation(Pm),
    random(0.0, 1.0, R),
    (R =< Pm -> mutate_individual(Ind, NInd) ; NInd = Ind),
    mutation(Rest, Rest1).

mutate_individual(Ind, NInd):-
    random_permutation(Ind, NInd).

% Additional utility functions
sum_list([], 0).
sum_list([H|T], Sum):-
    sum_list(T, Rest),
    Sum is H + Rest.

max_list([X], X).
max_list([X|Xs], Max):-
    max_list(Xs, MaxRest),
    Max is max(X, MaxRest).