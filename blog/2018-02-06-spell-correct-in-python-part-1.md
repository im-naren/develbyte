---
slug: spell-correct-in-python-part-1
title: Spell-correct in Python - Part 1
authors: [narendra]
tags: [python, machine-learning, probability, bayes-theorem, nlp]
date: 2018-02-06
---

# Spell-correct in Python - Part 1

One of the most common problem to face while solving a text processing use case is wrongly spelt words, swapping every wrongly spelt word with a mapping dictionary is a tedious solution. the major problem with this solution is the dictionary keeps growing and hard to manage.

There is a beautiful solution demonstrated by [Peter Norvig](http://norvig.com/) which solves the problem of wrong spelling for 70% of the cases. 

## Solution

Here are 36 lines of code which solves the problem fairly easily and quickly. The basic idea here is to find the most probable word to replace the wrongly spelt word up to 2 edits.

### spell_check.py

```python
import re
from collections import Counter

def words(text): return re.findall(r'\w+', text.lower())

# Note: You'll need to provide a text corpus file (big.txt) 
# containing a large amount of text in your target language
WORDS = Counter(words(open('big.txt').read()))

def P(word, N=sum(WORDS.values())): 
    "Probability of `word`."
    return WORDS[word] / N

def correction(word): 
    "Most probable spelling correction for word."
    return max(candidates(word), key=P)

def candidates(word): 
    "Generate possible spelling corrections for word."
    return (known([word]) or known(edits1(word)) or known(edits2(word)) or [word])

def known(words): 
    "The subset of `words` that appear in the dictionary of WORDS."
    return set(w for w in words if w in WORDS)

def edits1(word):
    "All edits that are one edit away from `word`."
    letters    = 'abcdefghijklmnopqrstuvwxyz'
    splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
    deletes    = [L + R[1:]               for L, R in splits if R]
    transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
    replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
    inserts    = [L + c + R               for L, R in splits for c in letters]
    return set(deletes + transposes + replaces + inserts)

def edits2(word): 
    "All edits that are two edits away from `word`."
    return (e2 for e1 in edits1(word) for e2 in edits1(e1))
```

### Output

```python
>>> correction('speling')
'spelling'

>>> correction('korrectud')
'corrected'
```

## How does it works

first of all, we compute the probability of occurrence all the word words in the preferred language in the example above we have chosen English as the language of preference and we will call if the language model.

next step is to figure all the possible word can be made after doing two edits (delete, insert, replaces, transposes) to a given word. the example above is limited to only two edits for now

after we have a distinct list of all the possible word the one with the highest probability score in the language model is accepted as the correct spelling.
