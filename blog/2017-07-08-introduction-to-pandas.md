---
slug: introduction-to-pandas
title: Introduction To Pandas
authors: [narendra]
tags: [python, machine-learning, data-science, pandas]
date: 2017-07-08
---

# Introduction To Pandas

**Pandas** is one of the widely used Python libraries for working with data. it is built on libraries like Matplotlib and NumPy. Pandas is great for data manipulation, data analysis, and data visualization.

In this tutorial we will see how pandas makes life really easy for a data analysis. Pandas can read and write data from and to CSV files or even databases easily.

## Data Structures in Pandas

### Series

A series is a one-dimensional object, like an array, list or could be understood as a column in table. similar to the array or list index each element in a series is assigned with a labeled index. By default, each item is given an numerical index label from 0 to N, where N is the length of the Series minus one.

#### How to create Series
The basic method to create a Series is to call `.Series()`

```python
# import pandas
import pandas as pd

# create a Series with an arbitrary list
X1 = pd.Series([7, 'develbyte', 3.14, 'Happy Learnning'])
X1
```

    0                  7
    1          develbyte
    2               3.14
    3    Happy Learnning
    dtype: object

**Note:-** when the Series contains elements of multiple different datatypes the dtype of the series will be the higher datatype

`int32 > int64 > flot64 >.....>object`  

```python
X2 = pd.Series([7, 5, 4, 3])
print(X2)

X3 = pd.Series([7, 5, 4., 3.])
print(X3)
```

    0    7
    1    5
    2    4
    3    3
    dtype: int64
    0    7.0
    1    5.0
    2    4.0
    3    3.0
    dtype: float64

#### Creating a series with index
index of the series elements can also be changes by simply passing a list of indexes, the list of elements and the list of indexes should be of same length or you will end up with error

```python
X1 = pd.Series([7, 'develbyte', 3.14, 'Happy Learnning'],
              index=['A', 'B', 'C', 'D'])

print(X1)
```

    A                  7
    B          develbyte
    C               3.14
    D    Happy Learnning
    dtype: object

### DataFrame

DataFrame is a two-dimensional labeled data structures with columns of same or different data types. Similar to tables in a database the DataFrame can hold multiple columns with multiple data types. You can also think of a DataFrame as a group of Series objects that share an index.

#### How to import Data in Dataframe

```python
# Importing the dataset
dataset = pd.read_csv('/data/introduction-to-panda-1.csv')
dataset
```

This would display a table with Country, Age, Salary, and Purchased columns.

#### How to inspect Data in Dataframe

Very first information what we would like to know in a dataframe are:
- number of columns
- number of records
- attribute names
- datatype of each attribute    

we can get all these information by calling just one function `info()` it will give Concise summary of a DataFrame

```python
dataset.info()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10 entries, 0 to 9
Data columns (total 4 columns):
Country      10 non-null object
Age          9 non-null float64
Salary       9 non-null float64
Purchased    10 non-null object
dtypes: float64(2), object(2)
memory usage: 392.0+ bytes
```

we can also use `dtypes` to get the datatypes of each attribute

```python
dataset.dtypes
```

    Country       object
    Age          float64
    Salary       float64
    Purchased     object
    dtype: object

for just getting the column names in a dataframe use `dataset.columns`

```python
# columns.values gives the column names in the DataFrame
dataset.columns.values
```

    array(['Country', 'Age', 'Salary', 'Purchased'], dtype=object)

similarly for index values

```python
# index.values gives the list of row indices
dataset.index.values
```

    array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

Probably the most useful function for inspecting a data set in a DataFrame is `describe()` it will return basic statistics about the dataset's numeric columns

```python
dataset.describe()
```

This would show count, mean, std, min, 25%, 50%, 75%, and max for numeric columns.

For take a look at the actual data `head()` and `tail()` are the most useful function:
- head method shows first n rows from the DataFrame, default value of n is 5
- tail method shows last n rows from the DataFrame, default value of n is 5

```python
dataset.head()
dataset.tail()
```

## Select and Index in DataFrames

There are three main options in pandas, which allows us to access the data in DataFrame, these are based on index and location of the rows and column, these options could be confusing for beginners but its quite simple once understood.

The selection methods are:

- Selecting data by row numbers called integer-location based indexing/selection (`.iloc`)
- Selecting data by label or by a conditional statement (`.loc`)
- Selecting in a hybrid approach(`.ix`)

### Single selections using iloc and DataFrame

#### Rows:

```python
R1 = dataset.iloc[0] # first row of data frame - Note a Series data type output.
R2 = dataset.iloc[1] # second row of data frame
R3 = dataset.iloc[-1] # last row of data frame
```

#### Columns:

```python
C1 = dataset.iloc[:,0] # first column of data frame (first_name)
C2 = dataset.iloc[:,1] # second column of data frame (last_name)
C3 = dataset.iloc[:,-1] # last column of data frame (id)
```

### Multiple row and column selections using `iloc` and `DataFrame`

```python
MR1 = dataset.iloc[0:5] # first five rows of dataframe
MR2 = dataset.iloc[:, 0:2] # first two columns of data frame with all rows
MR3 = dataset.iloc[[0, 3, 6, 9], [0, 3]] # 1st, 4th, 7th, 9th row + 1st 3th 4th columns.
MR4 = dataset.iloc[0:5, 1:3] # first 5 rows and 4th, 5th columns of data frame.
```

`.iloc` returns a Pandas Series when one only row or Column is selected

`.iloc` returns a Pandas DataFrame when multiple rows or Columns are selected

`.iloc` returns a Pandas Series when multiple rows are selected with only one column

above output could easily converted to Pandas `DataFrame` by passing a single-valued list as column index

```python
print(type(dataset.iloc[1:2, [3]]))
```

### Selecting pandas data using `loc`:

The Pandas `loc` indexer can be used with DataFrames in two different scenarios:

a.) Selecting rows by label/index
b.) Selecting rows with a Boolean/conditional lookup

The `loc` indexer is used with the same syntax as `iloc: data.loc[<row selection>, <column selection>]`

Index can be in a DataFrame by using `set_index()` method

```python
dataset.set_index("Country", inplace=True)
dataset
```

Selecting rows by index

```python
dataset.loc['France']
```

Selecting rows by label/index

```python
dataset.loc[['France', 'Spain'], ['Age', 'Salary']]
```

Selecting rows with a Boolean/conditional lookup

```python
dataset.loc[dataset['Country'] == 'France', ['Country', 'Salary']]
```

Selections can be achieved outside of the main `.loc` for clarity
Form a separate variable with your selections:

```python
idx = dataset['Country'].apply(lambda x: x.lower() == 'france')
dataset.loc[idx, ['Country', 'Salary']]
```

### Selecting pandas data using `ix`:

- `ix[]` indexer is a hybrid of `.loc` and `.iloc`,
- `ix` is label based indexer, it behave just like `.loc`, it also supports integer based indexing like `.iloc`
- `ix` indexing works just the same as `.loc` when passed strings

```python
dataset.ix[['Country']] == dataset.loc[['Country']]
```

`ix` indexing works the same as `.iloc` when passed integers

```python
dataset.reset_index(inplace=True)
dataset.ix[[2]] == dataset.iloc[[2]]
```

## Add and Delete in DataFrame

### Adding row in DataFrame

Note:- General recommendation for adding a row is to use `.loc` to insert rows in DataFrame
If you would use `.ix`, you might try to reference a numerically valued index with the index value and accidentally overwrite an existing row of your DataFrame.

```python
dataset.loc[10] = ['India', 27, 65000, 'Yes']
dataset.ix[11] = ['India', 26, 60000, 'Yes']
dataset
```

### Adding column in DataFrame

Columns in DataFrame is basically a series,so adding a column in a DataFrame is as simple as assigning a new column to a DataFrame

```python
column = pd.Series(range(1,13), dtype=float)
column

#adding column in DataFrame
dataset['id'] = column
dataset
```

### Delete a column from DataFrame by column name

```python
df = dataset.drop('Purchased', axis=1)
df
```

### Delete a column from DataFrame by row index

one thing to be noted here is if the in-place is set to be True the deleting happens the the existing dataframe
by default in-place is False, which creates new DataFrame with deleted rows

```python
dataset.drop(dataset.index[2:7], inplace=True)
dataset
```
