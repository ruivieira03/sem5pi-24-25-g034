:-dynamic agenda_operation_room/3.
:-dynamic agenda_operation_room_tmp/3.
:-dynamic total_surgery_time/2.

% surgery(SurgeryType, TAnesthesia, TSurgery, TCleaning).
surgery(so2, 45, 60, 45).
surgery(so3, 45, 90, 45).
surgery(so4, 45, 75, 45).

% surgery_id(Id, SurgeryType).
surgery_id(so100001, so2).
surgery_id(so100002, so3).
surgery_id(so100003, so4).
surgery_id(so100004, so2).
surgery_id(so100005, so4).
surgery_id(so100006, so2).
surgery_id(so100007, so3).
surgery_id(so100008, so2).
surgery_id(so100009, so2).
surgery_id(so100010, so2).
surgery_id(so100011, so4).
surgery_id(so100012, so2).
surgery_id(so100013, so2).

% surgeries(NSurgeries).
surgeries(13).

% agenda_operation_room(Room, Day, ListOfOccupiedTimes)
agenda_operation_room(or1, 20241028, [(520, 579, so100000), (1000, 1059, so099999)]).
agenda_operation_room(or2, 20241028, [(700, 800, so200000)]).
agenda_operation_room(or3, 20241028, [(650, 800, so300000), (950, 1050, so088888)]).

% Main function
assign_surgeries_to_rooms(Day):-
    retractall(total_surgery_time(_, _)),
    retractall(agenda_operation_room_tmp(_, _, _)),
    findall(_, (agenda_operation_room(Room, Date, Agenda), assertz(agenda_operation_room_tmp(Room, Date, Agenda))), _),
    findall(SurgeryID, surgery_id(SurgeryID, _), LSurgeries),
    calculate_total_times(LSurgeries),
    sort_surgeries_by_duration(SortedSurgeries),
    findall(Room, agenda_operation_room_tmp(Room, Day, _), LRooms),
    allocate_surgeries(SortedSurgeries, LRooms, Day).

% Calculate the total times of the surgeries
calculate_total_times([]):- !.
calculate_total_times([Surgery|TSurgeries]):-
    surgery_id(Surgery, Type),
    surgery(Type, TimeA, TimeS, TimeC),
    Time is TimeA + TimeS + TimeC,
    assertz(total_surgery_time(Surgery, Time)),
    calculate_total_times(TSurgeries).

% Sort surgeries by the total required time
sort_surgeries_by_duration(SortedSurgeries):-
    findall((Time, Surgery), total_surgery_time(Surgery, Time), SurgeriesWithTimes),
    sort(1, @=<, SurgeriesWithTimes, SortedByTime),
    findall(Surgery, member((_, Surgery), SortedByTime), SortedSurgeries).

% Distribute surgeries among rooms in a rotating manner
allocate_surgeries([], _, _):- !.
allocate_surgeries([Surgery|RemainingSurgeries], Rooms, Day):-
    nth1(_, Rooms, Room),
    place_surgery_in_room(Surgery, Room, Day),
    rotate_room_list(Rooms, RotatedRooms),
    allocate_surgeries(RemainingSurgeries, RotatedRooms, Day).

% Try to schedule the surgery in a room
place_surgery_in_room(Surgery, Room, Day):-
    total_surgery_time(Surgery, Duration),
    agenda_operation_room_tmp(Room, Day, Agenda),
    find_free_slots(Agenda, FreeSlots),
    filter_suitable_slots(Duration, FreeSlots, AvailableSlots),
    select_first_slot(Duration, AvailableSlots, (TStart, _)),

    TEnd is TStart + Duration,
    retract(agenda_operation_room_tmp(Room, Day, OldAgenda)),
    update_agenda((TStart, TEnd, Surgery), OldAgenda, NewAgenda),
    assertz(agenda_operation_room_tmp(Room, Day, NewAgenda)),
    write("Scheduled "), write(Surgery), write(" (with duration="), write(Duration), write(") in room "), write(Room), nl,
    write("Updated room "), write(Room), write("'s agenda: "), write(NewAgenda), nl.

% Insert a surgery into the agenda
update_agenda((TinS, TfinS, OpCode), [], [(TinS, TfinS, OpCode)]).
update_agenda((TinS, TfinS, OpCode), [(Tin, Tfin, OpCode1)|LA], [(TinS, TfinS, OpCode), (Tin, Tfin, OpCode1)|LA]):- TfinS < Tin, !.
update_agenda((TinS, TfinS, OpCode), [(Tin, Tfin, OpCode1)|LA], [(Tin, Tfin, OpCode1)|LA1]):- update_agenda((TinS, TfinS, OpCode), LA, LA1).

% Remove unsuitable intervals
filter_suitable_slots(_, [], []).
filter_suitable_slots(TSurgery, [(Tin, Tfin)|LA], [(Tin, Tfin)|LA1]):- DT is Tfin-Tin+1, TSurgery =< DT, !,
    filter_suitable_slots(TSurgery, LA, LA1).
filter_suitable_slots(TSurgery, [_|LA], LA1):- filter_suitable_slots(TSurgery, LA, LA1).

% Select the first available interval
select_first_slot(TSurgery, [(Tin, _)|_], (Tin, TfinS)):-
    TfinS is Tin + TSurgery - 1.

% Find free agenda intervals
find_free_slots([], [(0, 1440)]).
find_free_slots([(0, Tfin, _)|LT], LT1):- !, process_free_slots([(0, Tfin, _)|LT], LT1).
find_free_slots([(Tin, Tfin, _)|LT], [(0, T1)|LT1]):- T1 is Tin-1,
    process_free_slots([(Tin, Tfin, _)|LT], LT1).

process_free_slots([(_, Tfin, _)], [(T1, 1440)]):- Tfin \== 1440, !, T1 is Tfin+1.
process_free_slots([(_, _, _)], []).
process_free_slots([(_, T, _), (T1, Tfin2, _)|LT], LT1):- Tx is T+1, T1 == Tx, !,
    process_free_slots([(T1, Tfin2, _)|LT], LT1).
process_free_slots([(_, Tfin1, _), (Tin2, Tfin2, _)|LT], [(T1, T2)|LT1]):- T1 is Tfin1+1, T2 is Tin2-1,
    process_free_slots([(Tin2, Tfin2, _)|LT], LT1).

% Rotate the list of rooms
rotate_room_list([H|T], Rotated):- append(T, [H], Rotated).
