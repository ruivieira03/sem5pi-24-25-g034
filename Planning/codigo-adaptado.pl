:- dynamic generations/1.
:- dynamic population/1.
:- dynamic prob_crossover/1.
:- dynamic prob_mutation/1.

% task(Id,ProcessTime,DueTime,PenaltyWeight).
task(t1,2,5,1).
task(t2,4,7,6).
task(t3,1,11,2).
task(t4,3,9,3).
task(t5,3,8,2).

% tasks(NTasks).
tasks(5).

% parameters initialization
initialize:-write('Number of new generations: '),read(NG), 
    (retract(generations(_));true), asserta(generations(NG)),
	write('Population size: '),read(PS),
	(retract(population(_));true), asserta(population(PS)),
	write('Probability of crossover (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_crossover(_));true), asserta(prob_crossover(PC)),
	write('Probability of mutation (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutation(_));true), asserta(prob_mutation(PM)).

generate:-
    initialize,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopValue),
    write('PopValue='),write(PopValue),nl,
    order_population(PopValue,PopOrd),
    generations(NG),
    generate_generation(0,NG,PopOrd).

% Generate initial population
generate_population(Pop):-
    population(PopSize),
    tasks(NumT),
    findall(Task,task(Task,_,_,_),TasksList),
    generate_population(PopSize,TasksList,NumT,Pop).

generate_population(0,_,_,[]):-!.
generate_population(PopSize,TasksList,NumT,[Ind|Rest]):-
    PopSize1 is PopSize-1,
    generate_population(PopSize1,TasksList,NumT,Rest),
    generate_individual(TasksList,NumT,Ind),
    not(member(Ind,Rest)).

generate_individual([G],1,[G]):-!.

generate_individual(TasksList,NumT,[G|Rest]):-
    NumTemp is NumT + 1,
    random(1,NumTemp,N),
    remove(N,TasksList,G,NewList),
    NumT1 is NumT-1,
    generate_individual(NewList,NumT1,Rest).

remove(1,[G|Rest],G,Rest).
remove(N,[G1|Rest],G,[G1|Rest1]):- N1 is N-1,
            remove(N1,Rest,G,Rest1).

% Evaluate population
evaluate_population([],[]).
evaluate_population([Ind|Rest],[Ind*V|Rest1]):-
    evaluate(Ind,V),
    evaluate_population(Rest,Rest1).

% Evaluation function (adapted for surgery scheduling)
evaluate(Seq,V):- evaluate(Seq,0,V).

evaluate([],_,0).
evaluate([T|Rest],Inst,V):-
    task(T,Dur,Due,Pen),
    FinInst is Inst+Dur,
    evaluate(Rest,FinInst,VRest),
    ((FinInst =< Due,!, VT is 0) ; (VT is (FinInst-Due)*Pen)),
    V is VT+VRest.

% Order population by fitness
order_population(PopValue,PopValueOrd):-
    bsort(PopValue,PopValueOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    bchange([X|Zs],Ys).

bchange([X],[X]):-!.

bchange([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX>VY,!,
    bchange([X*VX|L1],L2).

bchange([X|L1],[X|L2]):-bchange(L1,L2).
    
% Generate new generations
generate_generation(G,G,Pop):-!,
	write('Generation '), write(G), write(':'), nl, write(Pop), nl.
generate_generation(N,G,Pop):-
	write('Generation '), write(N), write(':'), nl, write(Pop), nl,
	select_next_generation(Pop,NextPop),
	N1 is N+1,
	generate_generation(N1,G,NextPop).

% Selection method: hybrid elitism
select_next_generation(Pop,NextPop):-
    population(PopSize),
    crossover_and_mutation(Pop,Descendants),
    append(Pop,Descendants,Merged),
    sort_population(Merged,Sorted),
    select_elites(Sorted,Elites),
    select_non_elites(Sorted,Elites,PopSize,NonElites),
    append(Elites,NonElites,NextPop).

% Sort population by fitness
sort_population(Pop,Sorted):-
    sort(2, @=<, Pop, Sorted).

% Select top P% as elites
select_elites(Sorted,Elites):-
    population(PopSize),
    P is round(PopSize * 0.3), % Select top 30%
    length(Elites,P),
    append(Elites,_,Sorted).

% Select non-elites based on randomized fitness
select_non_elites(Sorted,Elites,PopSize,NonElites):-
    length(Elites,NumElites),
    Remaining is PopSize - NumElites,
    exclude(memberchk,Elites,Sorted,NonEliteCandidates),
    assign_random_weights(NonEliteCandidates,Weighted),
    sort(2, @=<, Weighted, WeightedSorted),
    length(NonElites,Remaining),
    append(NonElites,_,WeightedSorted).

assign_random_weights([],[]).
assign_random_weights([Ind*Fitness|Rest],[Ind*(Random*Fitness)|WeightedRest]):-
    random(0.0,1.0,Random),
    assign_random_weights(Rest,WeightedRest).

% Crossover and mutation
crossover_and_mutation(Pop,Descendants):-
    random_permutation(Pop,Shuffled),
    crossover(Shuffled,Crossovered),
    mutation(Crossovered,Descendants).

% Generate random crossover points
generate_crossover_points(P1, P2):-
    tasks(NumT),
    NumT > 1,
    random(1, NumT+1, P1),
    random(1, NumT+1, P2),
    P1 \= P2.

% Crossover logic
crossover([],[]).
crossover([Ind*_],[Ind]).
crossover([Ind1*_,Ind2*_|Rest],[NInd1,NInd2|Rest1]):-
    generate_crossover_points(P1,P2),
    prob_crossover(Pcruz),random(0.0,1.0,Pc),
    ((Pc =< Pcruz,!,
        cross(Ind1,Ind2,P1,P2,NInd1),
	  cross(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	crossover(Rest,Rest1).

cross(Ind1,Ind2,P1,P2,NInd11):-
    sublist(Ind1,P1,P2,Sub1),
    tasks(NumT),
    R is NumT-P2,
    rotate_right(Ind2,R,Ind21),
    remove(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insert(Sub2,Sub1,P3,NInd1),
    removeh(NInd1,NInd11).

removeh([],[]).
removeh([h|R1],R2):-!,
    removeh(R1,R2).
removeh([X|R1],[X|R2]):-
    removeh(R1,R2).

% Mutation
mutation([],[]).
mutation([Ind|Rest],[NInd|Rest1]):-
	prob_mutation(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutation(Rest,Rest1).

mutacao1(Ind,NInd):-
	generate_crossover_points(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).
