---
slug: probability
title: Refreshing Probability
authors: [narendra]
tags: [machine-learning, data-science, probability, statistics]
date: 2017-04-10
---

# Refreshing Probability

## Probability:

is defined as the measure of the likelihood that an event will occur. Measured by the ratio of the favorable event to the whole number of events possible. Probability is quantified as a number between 0 and 1 (where 0 indicates impossibility and 1 indicates certainty). The higher the probability of an event, the more certain that the event will occur.

## Probability Key Terms:

### Experiment:-
An experiment in probability is a test to see what will happen in case you do something. A simple example is flipping a coin. When you flip a coin, you are performing an experiment to see what side of the coin you'll end up with.

### Random Experiment:-
An experiment whose outcome has to be among a set of events that are completely known but whose exact outcome is unknown is a random experiment (e.g. Throwing of a dice, tossing of a coin). Most questions on probability are based on random experiments.

### Outcome:-
An outcome in probability refers to a single (one) result of an experiment. In the example of an experiment above, one outcome would be heads and the other would be tails.

### Event:-
An event in probability is the set of a group of different outcomes of an experiment. Suppose you flip a coin multiple times, an example of an event would the getting a certain number of heads.

### Non-event:-
The outcome that is opposite the desired outcome is the non-event. Note that if the event occurs, the non-event does not occur and vice-verse.

### Sample space:-
The collection of all possible results is called the sample space of an probabilistic experiment.

### Independent Event:-
Two events are said to be independent, if the outcome of one of the events doesn't affect the outcome of another. For example, if we throw two dice, the probability of getting a 6 on the second die is the same, no matter what we get with the first one- it's still 1/6.

### Dependent Event:-
When the probability of one event depends on another, the events are called dependent event. For example, if we have a bag containing 2 red and 2 blue balls. If we pick 2 balls out of the bag, the probability that the second is blue depends upon what the color of the first ball picked was. If the first ball was blue, there will be 1 blue and 2 red balls in the bag when we pick the second ball. So the probability of getting a blue is 1/3. However, if the first ball was red, there will be 1 red and 2 blue balls left so the probability the second ball is blue is 2/3.

### Mutually exclusive events:-
A set of events is mutually exclusive when the occurrence of any one of them means that the other events cannot occur. For a given sample space, its either one or the other but not both. As a consequence, mutually exclusive events have their probability defined as follows:

		`P(A) + P(B) = 1`

An example of mutually exclusive events are the outcomes of a fair coin flip. When you flip a fair coin, you either get a head or a tail but not both, we can prove that these events are mutually exclusive by adding their probabilities

		P(head) + P(tail) = 1/2 + 1/2 =  1

If A and B are Mutually Exclusive Events:

		`P(A intersection B) = 0`
		`P(A + B) = 1`
		`P(A union B)' = 0`
		`P(B|A) = 0`

### Equally Likely Events:-
If two events have the same probability or chance of occurrence they are called equally likely events. (In a throw of a dice, the chance of 1 showing on the dice is equal to 2 is equal to 3 is equal to 4 is equal to 5 is equal to 6 appearing on the dice.)

## Conditional probability:

It is the probability of the occurrence of an event `A` given that the event `B` has already occurred. This is denoted by `P(A/B)`. (E.g. The probability that in two throws of a dices we get a total of 7 or more given that in the first throw of the dices the number 5 had occurred.)

Conditional probability is denoted by the following: `P(B|A)`

The probability that `B` occurs given that `A` has already occurred

The above is mathematically defined as:

		`P(B|A) = P(A intersection B)/P(A)`

## The concept of Odds For and Odds Against:

Sometimes, probability is also viewed in terms of odds for and odds against an event.

Odds in favor of event E is defined as: `P(E)/P(E)'`
Odds against as event is defined as: `P(E)/P(E)'`

## Notation of Probability

sample space : `S={A, B}`, where A and  B are independent events. example `S={head, tail}`

The probability of an event `A` to occur is written as `P(A)`, `p(A)` or `Pr(A)`

The probability of an event `A` to not occur is written as `-A`, `~A`, `A'`;

Its probability is given by

		P(not A) = 1 − P(A) = P(A)'

## Set Theory in Probability:

The entire sample space of S is given by:

		`S = {A, B, C}`

Remember the following from set theory:

		`C = (A union B)'`

		`(A union B) = A + B - (A intersection B)`

## Rules of Probability:

	For `S = {A, B, C}`
		`P(S) = P (A union B union C) = 1`

- **Multiplication Rule** `(A intersection B)`

	If A and B are dependent events, the probability of this event happening can be calculated as shown below:

		`P(A intersection B) = P(A*B) = P(A.B) = P(A union B) - (P(A) + P(B))`

	If A and B are independent events, the probability of this event happening can be calculated as shown below:

		`P(A intersection B) = P(A*B) = P(A.B) = P(A) * P(B)`

	Conditional probability for two independent events can be redefined using the relationship above to become:

		`P(B|A) = P(A intersection B)/P(A)`

		`P(B|A) = P(A) * P(B)/ P(A)`

		`P(B|A) = P(B)`

- **Additive Rule** (A union B):

		`P(A + B) = P(A union B)`

		`P(A + B) = P(A) + P(B) - P(A intersection B)`
