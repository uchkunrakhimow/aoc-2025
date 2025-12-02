# Day 2: Gift Shop

[Problem](https://adventofcode.com/2025/day/2)

## Problem Summary

Find and sum all invalid product IDs within given ranges. Invalid IDs are numbers formed by repeating digit patterns.

**Input Format:** Comma-separated ranges `start-end`

**Example:** `11-22,95-115,998-1012,1188511880-1188511890`

### Part 1

Invalid ID: digit sequence repeated exactly twice.

**Examples:**
- `11` (1 repeated 2 times)
- `6464` (64 repeated 2 times)
- `123123` (123 repeated 2 times)

**Example ranges:**
- `11-22` has `11, 22`
- `95-115` has `99`
- `998-1012` has `1010`
- `1188511880-1188511890` has `1188511885`
- `222220-222224` has `222222`
- `446443-446449` has `446446`
- `38593856-38593862` has `38593859`

**Example sum:** 1227775554

### Part 2

Invalid ID: digit sequence repeated at least twice (2 or more times).

**Examples:**
- `11` (1 repeated 2 times)
- `111` (1 repeated 3 times)
- `12341234` (1234 repeated 2 times)
- `123123123` (123 repeated 3 times)
- `1212121212` (12 repeated 5 times)
- `1111111` (1 repeated 7 times)

**Additional matches from example:**
- `95-115` now includes `99, 111`
- `998-1012` now includes `999, 1010`
- `565653-565659` now includes `565656`
- `824824821-824824827` now includes `824824824`
- `2121212118-2121212124` now includes `2121212121`

**Example sum:** 4174379265

## Algorithm Explanation

### Part 1: Exact Two-Time Repetition

Split number string in half and check if both halves are identical.

```
"6464" → "64" === "64" → true
"123123" → "123" === "123" → true
"12345" → odd length → false
```

**Time Complexity:** O(n × m × d) where n = ranges, m = range size, d = digit count

**Space Complexity:** O(1)

### Part 2: Pattern Repetition Detection

Try all possible pattern lengths from 1 to length/2:
- Pattern length must evenly divide total length
- Check if entire number is that pattern repeated

```
"111" → pattern "1" × 3 → valid
"565656" → pattern "56" × 3 → valid
"824824824" → pattern "824" × 3 → valid
"2121212121" → pattern "21" × 5 → valid
```

**Time Complexity:** O(n × m × d²) where n = ranges, m = range size, d = digit count

**Space Complexity:** O(1)

## Answers

- Part 1: 23701357374 ⭐
- Part 2: 34284458938 ⭐
