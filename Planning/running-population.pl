Support to ALGAV – Sprint 3 Planning of Surgeries in Operation Rooms of Hospitals - 5
Advanced Algorithms
Informatics Engineering BSc Programme (ISEP)

  Sprint 3 - ALGAV
• 7.3.1 - As an Admin, I want an automatic method to assign a set of operations (surgeries) to several operation rooms (assign is just to decide in which operation room the surgery will be done)
• 7.3.2 - As an Admin, I want to be able to schedule surgeries to several operations rooms using Genetic Algorithms (Genetic Algorithm parameters need to be tuned according conditions like number of genes, desired time for solution, etc)
• 7.3.3 - I want a study of state of the art of application of Robots and Computer Vision in Hospitals, namely in the context of surgeries. The combination of human- based study and Generative AI is adequate. However, it must be clear what was done by each part.
Groups of 5: additional 7.3.4 - As an Admin, I want the schedule system selects in an adequate way the method (generate all & select better; heuristic; Genetic Algorithm) to use for scheduling operations for each operation room according the dimension of the problem and useful time to generate the solution
Groups of 3: In 7.3.3 it is sufficient to perform the study according one of the technologies (Robotics or Computer Vision; just one of them)
 Notes TP - ALGAV LEI/ISEP

  Sprint C - ALGAV
We will start with 7.3.2 (Genetic Algorithm) still considering 1 operation room
A Genetic Algorithm implementation is available in Moodle, and we will explain it here
But...
• This implementation isn’t for Scheduling Operation Rooms, it is for Scheduling Tasks in Machines of Factories – You will need to adapt to your problem
• The implementation suffers from some problems, you will need to make it better (and we suggest to start here, still for the scheduling of tasks in machines)
Before that we will explain the Genetic Algorithm
 Notes TP - ALGAV LEI/ISEP

          P’t  Select Pt
Select the most fit
Basic Genetic Algorithm
Generate P0
t0
Evaluate Pt
while not Final Condition of Pt do
Initial Population Iteration (1st)
Solutions’ Population in iteration t
 P’’t  Apply recombination operators P’t
P’’’t  Apply mutation operators P’’t
  Evaluate P’’’t
Pt+1  Select the survivors from Pt and P’’’t
tt+1
endwhile
return Better Global Solution
Evaluate the fitness of solutions
 Generate new individuals
 Notes TP - ALGAV LEI/ISEP 46
New iteration

  Copy the genes in the middle of A, the remaining will be replaced by H
Shift B 2 positions (those after the 2nd crossover point)
Remove genes already in A
Replace the H’s by the previous after the 2nd crossover point
218456793
Crossover
 Order 1 crossover
AB
123456789 HHH4567HH
             934521876
             93218
452187693
    Notes TP - ALGAV LEI/ISEP
5

  Mutation
Mutation in sequences:
• select 2 positions (e.g. position 2 and 8)
• Swap the values of these positions
   Genes sequences
218456793
Notes TP - ALGAV LEI/ISEP
6
298456713
Swap elements between two positions

  Example – Task sequencing
Schedule 5 tasks in one machine
 Notes TP - ALGAV LEI/ISEP
49
•
For each task j (j=1, ..., 5),
• pj - processing time,
• dj - due date
• wj - weight of the penalty in case of delay
Goal: minimize the weighted sum of delays ΣwjTj , where Tj is task j delay
•

  Processing Time
p1=2 p2=4 p3=1 p4=3 p5=3
Tasks
Time
Due date
d1=5
d2=7 d3=11 d4=9 d5=8
Example (cont)
To visualize a sequence, a Gantt chart of tasks x time is often used.
For the task sequence [3,1,2,5,4], the following corresponding calendar is obtained
    Notes TP - ALGAV LEI/ISEP
50

  Example – Task sequencing
 Due date
p3=1 d3=11 p4=3 d4=9 p5=3 d5=8
Weight
w1=1 w2=6 w3=2 w4=3 w5=2
Processing Time
   GANTT chart for one possible solution [t3,t1,t2,t5,t4]
p1=2
d1=5 p2=4 d2=7
 ΣwjTj = 0+0+0+(13-9)x3+(10-8)x2=4x3+2x2=16 Notes TP - ALGAV LEI/ISEP
9

  Example (cont)
Recombination Method
Order 1 crossover
1. Assuming the following pair of individuals, 2 crossing points are selected (4th and 7th).
2. The genes located between the two crossing points are copied to their descendants, with the remaining positions filled with an H character.
 Notes TP - ALGAV LEI/ISEP
51
A=123456789 B=452187693
A’=HHH4567HH B’=HHH1876HH

  Example (cont)
Recombination Method (cont.)
3. Then, and starting at the second crossing point of father B, a new order for the genes is defined:
[9 3 4 5 2 1 8 7 6]
4. After removing genes 4, 5, 6 and 7 already defined in child A', we are left with the genes [9 3 2 1 8]. The positions at A’ containing H will be filled by this sequence starting at the second crossing point:
A’=218456793
  Notes TP - ALGAV LEI/ISEP
11
B was 452187693
 A’ was HHH4567HH

  Example (cont)
Recombination Method (cont.)
5. In the same way to generate the second descendant B ', a new sequence is defined starting from A:
[8 9 1 2 3 4 5 6 7].
6. Eliminating the genes already defined in B', we obtain the sequence: [9 2 3 4 5]. Then the sequence obtained is replaced in the gaps (H) of B ', starting at the 2nd crossing point, obtaining the descendant B'.
B’=345187692
  Notes TP - ALGAV LEI/ISEP
12
A was 123456789

  A possible implementation in PROLOG
 % task(Id,ProcessTime,DueTime,PenaltyWeight).
:-dynamic generations/1.
:-dynamic population/1.
:-dynamic prob_crossover/1.
:-dynamic prob_mutation/1.
task(t1,2,5,1).
task(t2,4,7,6).
task(t3,1,11,2).
task(t4,3,9,3).
task(t5,3,8,2).
% tasks(NTasks).
tasks(5).
Tasks definition
  % parameters initialization
initialize:-write('Number of new generations: '),read(NG),
    (retract(generations(_));true), asserta(generations(NG)),
    write('Population size: '),read(PS),
    (retract(population(_));true), asserta(population(PS)),
    write('Probability of crossover (%):'), read(P1),
    PC is P1/100,
    (retract(prob_crossover(_));true),  asserta(prob_crossover(PC)),
    write('Probability of mutation (%):'), read(P2),
    PM is P2/100,
    (retract(prob_mutation(_));true), asserta(prob_mutation(PM)).
Notes TP - ALGAV LEI/ISEP
GA parameter initialization

   generate:-
    initialize,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopValue),
    write('PopValue='),write(PopValue),nl,
    order_population(PopValue,PopOrd),
    generations(NG),
    generate_generation(0,NG,PopOrd).
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
generate_population(PopSize,TasksList,NumT,L):-
    generate_population(PopSize,TasksList,NumT,L).
  Notes TP - ALGAV LEI/ISEP
generate_population/1 creates a population of individuals
PopOrd is the list with the initial generation Each element of the list is of type LT * Value where LT is a task list (individual), for example [t3, t1, t5, t2, t4], and Value the respective assessment in terms of the weighted sum of the delays, an element PopOrd could be
[t3, t1, t5, t2, t4] * 16, where * is a mere separator

   generate_individual([G],1,[G]):-!.
generate_individual(TasksList,NumT,[G|Rest]):- NumTemp is NumT + 1, % to use with random random(1,NumTemp,N), remove(N,TasksList,G,NewList),
    NumT1 is NumT-1,
    generate_individual(NewList,NumT1,Rest).
remove(1,[G|Rest],G,Rest).
remove(N,[G1|Rest],G,[G1|Rest1]):- N1 is N-1,
            remove(N1,Rest,G,Rest1).
 Notes TP - ALGAV LEI/ISEP
Generate_individual/3 creates an individual with all tasks, each task is a gene and the individual corresponds to the chromosome

   evaluate_population([],[]). evaluate_population([Ind|Rest],[Ind*V|Rest1]):-
evaluate(Ind,V), evaluate_population(Rest,Rest1).
evaluate(Seq,V):- evaluate(Seq,0,V).
   evaluate([ ],_,0).
   evaluate([T|Rest],Inst,V):-
       task(T,Dur,Due,Pen),
       FinInst is Inst+Dur,
       evaluate(Rest,FinInst,VRest),
((FinInst =< Due,!, VT is 0) ; (VT is (FinInst- Due)*Pen)),
V is VT+VRest. Notes TP - ALGAV LEI/ISEP
 Evaluate_population/2 evaluates all individuals in the population (each individual is a list of all tasks) according to the heavy sum of delays V and creates a list (second argument) with elements in the format individual * evaluation

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
 Notes TP - ALGAV LEI/ISEP
Sorts population elements in ascending order of evaluations by the weighted sum of delays

   generate_generation(G,G,Pop):-!,
    write('Generation '), write(G), write(':'), nl, write(Pop), nl.
generate_generation(N,G,Pop):-
write('Generation '), write(N), write(':'), nl, write(Pop), nl, crossover(Pop,NPop1),
mutation(NPop1,NPop),
evaluate_population(NPop,NPopValue), order_population(NPopValue,NPopOrd),
N1 is N+1,
generate_generation(N1,G,NPopOrd).
generate_crossover_points(P1,P2):- generate_crossover_points1(P1,P2).
generate_crossover_points1(P1,P2):-
    tasks(N),
    NTemp is N+1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11\==P21,!,
    ((P11<P21,!,P1=P11,P2=P21);P1=P21,P2=P11).
generate_crossover_points1(P1,P2):-
    generate_crossover_points1(P1,P2).
 Notes TP - ALGAV LEI/ISEP
Generate_generation/3 –the new generations of the population are created after the crossover, mutations and evaluation of the new individuals of each population
 Generate crossover points P1 (start) e P2 (end), if, for example P1 = 2 and P2 = 4 the cut points will be between the 1o and the 2o gene, and between the 4o and the 5o gene
Note that as it is implemented, there are no cuts that only have 1 gene in the middle, because P11 is different from P21

   crossover([ ],[ ]).
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
fillh([ ],[ ]).
fillh([_|R1],[h|R2]):-
    fillh(R1,R2).
 Notes TP - ALGAV LEI/ISEP
Crossover is attempted on successive individuals 2 to 2 of the population, which may be a limitation
To find out if the crossing takes place, a random number between 0 and 1 is generated and compared with the parameterized crossing probability, if it is lower, the crossing is made.
 Auxiliary predicates for order crossover crossing, which is suitable for task sequencing

      sublist(L1,I1,I2,L):-I1 < I2,!,
       sublist1(L1,I1,I2,L).
   sublist(L1,I1,I2,L):-sublist1(L1,I2,I1,L).
   sublist1([X|R1],1,1,[X|H]):-!, fillh(R1,H).
   sublist1([X|R1],1,N2,[X|R2]):-!,N3 is N2 - 1,
       sublist1(R1,1,N3,R2).
   sublist1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1,
           N4 is N2 - 1,
           sublist1(R1,N3,N4,R2).
   rotate_right(L,K,L1):- tasks(N),
       T is N - K,
       rr(T,L,L1).
   rr(0,L,L):-!.
   rr(N,[X|R],R2):- N1 is N - 1,
       append(R,[X],R1),
rr(N1,R1,R2). Notes TP - ALGAV LEI/ISEP
 Auxiliary predicates for order crossover suitable for task sequencing

   remove([],_,[]):-!.
remove([X|R1],L,[X|R2]):- not(member(X,L)),!,
remove(R1,L,R2). remove([_|R1],L,R2):-
remove(R1,L,R2).
insert([],L,_,L):-!. insert([X|R],L,N,L2):-
tasks(T),
((N>T,!,N1 is N mod T);N1 = N), insert1(X,N1,L,L1),
N2 is N + 1, insert(R,L1,N2,L2).
insert1(X,1,L,[X|L]):-!. insert1(X,N,[Y|L],[Y|L1]):-
N1 is N-1, insert1(X,N1,L,L1).
 Notes TP - ALGAV LEI/ISEP
Auxiliary predicates for order crossover suitable for task sequencing

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
Notes TP - ALGAV LEI/ISEP
Auxiliary predicates for order crossover suitable for task sequencing

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
P11 is P1-1, P21 is P2-1, mutacao22(Ind,P11,P21,NInd).
mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P-1,
    mutacao23(G1,P1,Ind,G2,NInd).
Notes TP - ALGAV LEI/ISEP
•
The mutation is attempted on each individual in the population
To find out if the mutation takes place, a random number between 0 and 1 is generated and compared with the probability of a parameterized mutation, if lower, the mutation is performed.

  Running the Genetic Algorithm
 ?- generate.
Number of new generations: 6.
Population size: |: 8.
Probability of crossover (%):|: 50.
Probability of mutation (%):|: 25.
Pop=[[t5,t3,t2,t1,t4],[t4,t1,t2,t5,t3],[t1,t2,t3,t5,t4],[t2,t1,t5,t4,t3],[t5,t1,t2,t4,t3],[t4,t3,t2,t5,t1],[t3,t4,t1,t2,t5],[t4,t5,t2,t1,t3]]
PopValue=[[t5,t3,t2,t1,t4]*23,[t4,t1,t2,t5,t3]*24,[t1,t2,t3,t5,t4]*16,[t2,t1,t5,t4,t3]*16,[t5,t1,t2,t4,t3]*25,[t4,t3,t2,t5,t1]*20,[t3,t4,t1,t2,t5]*29,[t4,t5,t 2,t1,t3]*29]
Generation 0: [[t1,t2,t3,t5,t4]*16,[t2,t1,t5,t4,t3]*16,[t4,t3,t2,t5,t1]*20,[t5,t3,t2,t1,t4]*23,[t4,t1,t2,t5,t3]*24,[t5,t1,t2,t4,t3]*25,[t3,t4,t1,t2,t5]*29,[t4,t5,t2,t1,t3]*29] Generation 1: [[t1,t2,t3,t5,t4]*16,[t2,t1,t5,t4,t3]*16,[t4,t2,t1,t5,t3]*16,[t2,t1,t5,t4,t3]*16,[t2,t3,t5,t1,t4]*17,[t4,t3,t2,t5,t1]*20,[t3,t4,t1,t2,t5]*29,[t4,t5,t2,t1,t3]*29] Generation 2: [[t2,t1,t4,t5,t3]*13,[t1,t2,t3,t5,t4]*16,[t2,t1,t5,t4,t3]*16,[t4,t2,t1,t5,t3]*16,[t2,t3,t5,t1,t4]*17,[t4,t3,t2,t5,t1]*20,[t4,t1,t2,t5,t3]*24,[t3,t4,t1,t2,t5]*29] Generation 3: [[t4,t2,t3,t5,t1]*14,[t2,t4,t1,t5,t3]*16,[t2,t3,t5,t1,t4]*17,[t4,t3,t2,t5,t1]*20,[t4,t1,t2,t5,t3]*24,[t5,t1,t2,t4,t3]*25,[t3,t4,t1,t2,t5]*29,[t3,t1,t4,t5,t2]*38] Generation 4: [[t1,t2,t4,t3,t5]*10,[t2,t4,t1,t3,t5]*14,[t1,t2,t5,t4,t3]*15,[t2,t3,t5,t1,t4]*17,[t3,t2,t1,t5,t4]*18,[t4,t3,t2,t5,t1]*20,[t5,t1,t3,t4,t2]*36,[t3,t1,t4,t5,t2]*38] Generation 5: [[t2,t4,t1,t3,t5]*14,[t2,t3,t5,t4,t1]*14,[t1,t2,t5,t4,t3]*15,[t4,t3,t2,t5,t1]*20,[t1,t3,t4,t2,t5]*28,[t5,t1,t3,t2,t4]*30,[t3,t1,t4,t5,t2]*38,[t3,t4,t1,t5,t2]*39] Generation 6: [[t1,t3,t2,t4,t5]*13,[t2,t4,t1,t3,t5]*14,[t2,t3,t5,t4,t1]*14,[t5,t2,t1,t4,t3]*17,[t4,t5,t2,t3,t1]*26,[t5,t1,t4,t2,t3]*34,[t3,t1,t4,t5,t2]*38,[t3,t4,t1,t5,t2]*39]
true .
Notes TP - ALGAV LEI/ISEP

 ALGAV Sprint C has two directions concerning the Genetic Algorithm (GA)
• Enhance the provided Genetic Algorithm to find better solutions.
• Adapt it to our problem (Scheduling Operations/Surgeries in the Operation’s Room).
  Notes TP - ALGAV LEI/ISEP

  Improving GA
• Ensure that at least the best individual between the current population and the new population goes to the next population
• Avoid that the crossover sequence always takes place between 1st and 2nd chromosome of the population, then between 3rd and 4th, 5th and 6th,...
• Apply a selection method that is not purely elitist, giving some likelihood that an individual with the worst assessment can pass to the next generation, even though they are not among the PS (population size) best evaluated from the previous population and their descendants
• The stopping condition may be different (consider other possibilities such as time, solution stabilization, etc.)
 Notes TP - ALGAV LEI/ISEP

 Keep Best individuals for the next generation
  • The GA provided replaces the current population, pair by pair, with their descendants and there is no guarantee that the best individual will go to the next generation
• If it is intended that the best, or some of the best individuals, moves to the next generation, it is sufficient to find them in a list that combines the elements of the previous population with their descendants obtained through crossover and mutation.
• Subsequently, the selection of the remaining individuals from the list can be done by some method that is not purely elitist, we will suggest a method
Notes TP - ALGAV LEI/ISEP

Avoid having the crossover sequence always be between elements in previously defined pairs.
• In the GA provided, the crossover sequence takes place between 1st and 2nd chromosome of the population, then between 3rd and 4th, and so on
• A simple way to avoid the problem is to perform a random permutation between the elements of the list before the crossover
• How to make a random permutation between individuals of a population?
• Use random_permutation/2 from SWI Prolog
?- random_permutation([[t2,t5,t4,t3,t1]*11,[t2,t1,t4,t5,t3]*13,[t2,t4,t3,t5,t 1]*14,[t2,t5,t3,t4,t1]*14,[t2,t3,t4,t1,t5]*15,[t2,t1,t5,t4,t3]*16,[t4,t3,t1,t2 ,t5]*29,[t1,t4,t5,t2,t3]*34],LRP),nl,write('LRP='),write(LRP),nl.
LRP=[[t2,t5,t4,t3,t1]*11,[t4,t3,t1,t2,t5]*29,[t2,t5,t3,t4,t1]*14,[t1,t4,t5,t2 ,t3]*34,[t2,t4,t3,t5,t1]*14,[t2,t1,t5,t4,t3]*16,[t2,t3,t4,t1,t5]*15,[t2,t1,t4,t 5,t3]*13]
   Notes TP - ALGAV LEI/ISEP

  Apply a selection method that is not purely elitist
• Merge the N individuals from the current population with their descendants obtained through crossover and mutation, and remove duplicate individuals (let's assume we end up with T individuals)
• Sort them (in ascending order since the goal is minimization) according to the evaluation of each one and choose the top P (P greater than or equal to 1 to ensure that the top P individuals go through, values like 20% or 30% of N are suitable).
• Remove those elements from the list (they go to the next generation) and create a new list with the remaining T-P individuals, associating with each one the product of the evaluation by a randomly generated number between 0 and 1. Then, sort the individuals in this new list in ascending order according to this product. Pass the first N-P elements of this list to the next generation. Note that only the value of the evaluation should be retained (and not the value of the product of the evaluation by the randomly generated number between 0 and 1).
 Notes TP - ALGAV LEI/ISEP

  Stopping Condition
• The provided Genetic Algorithm runs for NG generations, but the stopping condition can be different.
• It can depend on time, for example, assuming a relative time during which it will run or assuming an absolute time after which it will end. In the end, the best solution is presented.
• It can run until it reaches a value with a specific evaluation, for example, it runs until it finds a solution with an evaluation equal to or lower than a given value.
• Keep in mind that the specified value may be lower than the optimal solution of the problem, so another way to end should be allowed to avoid an infinite loop.
• It can run until the population stabilizes.
• Stabilization means that the population has not changed for G generations.
• Achieving population stabilization is easier if the selection criterion is purely elitist.
• Note that the fact that a population remains the same for two or more generations does not necessarily mean it has stabilized
• The crossovers can be different next.
• Mutations may not have occurred, and then they may occur.
• It is also necessary to plan a way to end the Genetic Algorithm if stability is not achieved
• Implement the termination considering, in addition to the number of generations, at least two other possibilities (until reaching a solution with a cost lower than a certain value, or until the population stabilizes for G consecutive generations). These termination possibilities should also account for a time limit to generate the solution (given the fact that they may not be met, as explained earlier).
 Notes TP - ALGAV LEI/ISEP

Adaptation to the problem of sequencing Surgeries in the Operations’ Room
• The problem of sequencing surgeries in Operations’ Rooms is similar to that of task sequencing in machines.
• The only thing that changes is the evaluation of the solution, which in the illustrated case was a sum of weighted delays, and in the case of surgeries sequence, it is the result of the evaluation function (for example the time of finishing the last operation’s procedure).
   Notes TP - ALGAV LEI/ISEP
