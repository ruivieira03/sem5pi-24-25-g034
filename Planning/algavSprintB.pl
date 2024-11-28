
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

% -------------------------------Evaluation1------------------------------

evaluate_final_time([], _, 1441).
evaluate_final_time([(_, Tfin, OpCode) | _], LOpCode, Tfin) :-
    member(OpCode, LOpCode), !.
evaluate_final_time([_ | AgR], LOpCode, Tfin) :-
    evaluate_final_time(AgR, LOpCode, Tfin).

list_doctors_agenda(_, [], []).
list_doctors_agenda(Day, [D | LD], [(D, AgD) | LAgD]) :-
    agenda_staff1(D, Day, AgD),
    list_doctors_agenda(Day, LD, LAgD).

remove_equals([], []).
remove_equals([X | L], L1) :-
    member(X, L), !,
    remove_equals(L, L1).
remove_equals([X | L], [X | L1]) :-
    remove_equals(L, L1).

% ------------------------------Heuristic1-------------------------------

heuristic_schedule_all(Room, Day) :-
    get_time(Ti),
    findall(OpCode, surgery_id(OpCode, _), LOpCode),
    try_each_permutation(Room, Day, LOpCode),
    final_time(TFinal),
    get_time(Tf),
    T is Tf - Ti,
    write('Scheduling completed. Final operation time: '), write(TFinal), nl,
    write('Execution time: '), write(T), write('s'), nl.

try_each_permutation(Room, Day, LOpCode) :-
    permutation(LOpCode, Permuted),
    \+attempt_schedule(Room, Day, Permuted), !,
    fail.

try_each_permutation(Room, Day, LOpCode) :-
    permutation(LOpCode, Permuted),
    \+attempt_schedule(Room, Day, Permuted), fail.

attempt_schedule(Room, Day, LOpCode) :-
    write('PermutedLOpCode='), write(LOpCode), nl,
    retractall(agenda_staff1(_, _, _)),
    retractall(agenda_operation_room1(_, _, _)),
    retractall(availability(_, _, _)),
    findall(_, (agenda_staff(D, Day, Agenda), assertz(agenda_staff1(D, Day, Agenda))), _),
    agenda_operation_room(Room, Day, Agenda),
    assert(agenda_operation_room1(Room, Day, Agenda)),
    findall(_, (agenda_staff1(D, Day, L), free_agenda0(L, LFA), adapt_timetable(D, Day, LFA, LFA2), assertz(availability(D, Day, LFA2))), _),
    \+heuristic_schedule(Room, Day, LOpCode),
    fail.

heuristic_schedule(_, _, []) :- fail, !.
heuristic_schedule(Room, Day, LOpCode) :-
    write('List='), write(LOpCode), nl,
    select_next_surgery(Day, LOpCode, OpCode),
    write(OpCode), nl,
    schedule_phases(OpCode, Room, Day),
    delete(LOpCode, OpCode, RemainingOpCodes),
    \+heuristic_schedule(Room, Day, RemainingOpCodes),
    fail.

% Select the next surgery to schedule based on the initial availability of doctors
select_next_surgery(Day, LOpCode, SelectedOpCode) :-
    findall((OpCode, EarliestTime), (
        member(OpCode, LOpCode),
        surgery_id(OpCode, OpType),
        surgery(OpType, TAnaesthesia, TSurgery, TCleaning),
        TotalTime is TAnaesthesia + TSurgery + TCleaning,
        assignment_surgery(OpCode, Doctor, 2),
        availability(Doctor, Day, LA),
        earliest_sufficient_interval(TotalTime, LA, EarliestTime)
    ), Options),
    sort(2, @=<, Options, SortedOptions),
    SortedOptions = [(SelectedOpCode, _) | _].

% Find the first available interval sufficient for a surgery
earliest_sufficient_interval(_, [], inf). % No sufficient interval found
earliest_sufficient_interval(TotalTime, [(Tin, Tfin) | _], Tin) :-
    Tfin - Tin + 1 >= TotalTime, !.
earliest_sufficient_interval(TotalTime, [_ | Rest], Earliest) :-
    earliest_sufficient_interval(TotalTime, Rest, Earliest).































