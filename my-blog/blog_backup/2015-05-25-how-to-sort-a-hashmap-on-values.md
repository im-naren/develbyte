---
slug: how-to-sort-a-hashmap-on-values
title: How to sort a HashMap on Values
authors: [narendra]
tags: [java, coding, data-structure, algorithms]
date: 2015-05-25
---

# How to sort a HashMap on Values

HashMap doesn't preserve any order by default. If order is required we need to sort it explicitly according to the requirement.

In this article I have tried to explain how to sort a HasMap based on values.

## HasMap sorting by Value

in this example I have used TreeMap to sort the HashMap. unlike a HashMap, a TreeMap guarantees that its elements will be sorted in ascending key order.

### SortHashMap.java

```java
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class SortHashMap {

    public static void main(String[] args) {

        HashMap<String,Integer> map = new HashMap<String,Integer>();
        ValueComparator vcmp =  new ValueComparator(map);
        TreeMap<String,Integer> sorted_map = new TreeMap<String,Integer>(vcmp);

        map.put("naren",96);
        map.put("ram",97);
        map.put("manish",970);
        map.put("kumar",97);
        map.put("shruti",97);
        map.put("rohit",760);
        map.put("vatsal",444);

        System.out.println("unsorted map: "+map);

        sorted_map.putAll(map);

        System.out.println("results: "+sorted_map);
    }
}

class ValueComparator implements Comparator<String> {

    Map<String, Integer> base;
    public ValueComparator(Map<String, Integer> base) {
        this.base = base;
    }

    // Note: this comparator imposes orderings that are inconsistent with equals.    
    public int compare(String a, String b) {
        if (base.get(a) >= base.get(b)) {
            return -1;
        } else {
            return 1;
        } // returning 0 would merge keys
    }
}
```

### Output

```java
unsorted map: {manish=970, kumar=97, ram=97, rohit=760, shruti=97, vatsal=444, naren=96}
results: {manish=970, rohit=760, vatsal=444, shruti=97, ram=97, kumar=97, naren=96}
```
