---
title: "The Excel Interface and Essential Shortcuts"
duration: 16
---

## Lecture outline
- 00:00 - Hook: race the mouse. Select 2,400 rows by dragging vs one keystroke, live on screen
- 02:00 - Tour of the window: ribbon and KeyTips, Name Box, formula bar, status bar, sheet tabs
- 04:00 - The "edge of the data" rule for Ctrl+Arrow and Ctrl+Shift+Arrow, including how blanks stop the jump
- 06:30 - Editing and filling: F2, Ctrl+Enter, Ctrl+D, Ctrl+R, undo/redo, insert/delete
- 08:30 - Auditing and formatting shortcuts: Ctrl+backtick, Ctrl+[, Ctrl+1, F9
- 10:00 - Whiteboard/live demo: daily returns for a 2,400-row price series in ten keystrokes
- 13:30 - Exam and workplace traps: n prices give n − 1 returns, Ctrl+End surprises, grid vs formula bar
- 15:00 - Recap and the "three shortcuts a day" practice plan

## Slides
### Slide 1: The Excel Interface and Essential Shortcuts
- Goal: move through any workbook without the mouse
- Faster and more precise than dragging
- Foundation for every later lesson in this course

### Slide 2: Anatomy of the Window
- Ribbon tabs and KeyTips (press Alt)
- Name Box: shows and jumps to addresses
- Formula bar: what the cell really contains
- Status bar: Sum, Average, Count of a selection

### Slide 3: Grid vs Formula Bar
- The grid shows formatted output
- The formula bar shows the formula or constant
- A displayed 5.0% may be a formula or a typed number
- Always audit in the formula bar

### Slide 4: The Edge-of-Data Rule
- Ctrl+Arrow: jump to the last filled cell before a blank
- From an empty cell: jump to the next filled cell
- Add Shift to select along the way
- An early stop signals a gap in the data

### Slide 5: Navigation Shortcuts
- Ctrl+Home, Ctrl+End
- Ctrl+PgUp / Ctrl+PgDn to switch sheets
- F5 or Ctrl+G for Go To and Go To Special
- Type an address in the Name Box

### Slide 6: Selection Shortcuts
- Ctrl+Shift+Arrow to the edge of data
- Shift+Space (row), Ctrl+Space (column)
- Ctrl+A selects the current region

### Slide 7: Editing and Filling
- F2 edit in cell; Alt+Enter line break
- Ctrl+Enter fills every selected cell
- Ctrl+D down, Ctrl+R right
- Ctrl+Z / Ctrl+Y; Ctrl+Shift+Plus / Ctrl+Minus

### Slide 8: Formula and Audit Shortcuts
- Alt+= AutoSum; F4 lock references
- Ctrl+backtick shows all formulas
- Ctrl+[ jumps to precedents
- F9 recalculates or evaluates a highlighted piece

### Slide 9: Data and Format Shortcuts
- Ctrl+1 Format Cells
- Ctrl+T Table, Ctrl+Shift+L filters
- Ctrl+F / Ctrl+H find and replace

### Slide 10: Live Example - Daily Returns
- 2,400 prices in C2:C2401
- First return in D3: =C3/C2-1
- Select D3:D2401 with Ctrl+Shift+Up from D2401
- Status bar Count: 2,399 returns

### Slide 11: Traps
- n prices produce n − 1 returns
- Ctrl+End finds the last used cell, not the last data row
- Enter vs Ctrl+Enter in a multi-cell selection
- Hard-coded numbers hiding in formula columns

## Whiteboard examples
**Example 1 - Counting returns.** Prices sit in C2:C2401 with a header in C1. Number of prices = 2401 − 2 + 1 = 2,400. Returns start in D3 (each needs the prior price) and end in D2401. Number of returns = 2401 − 3 + 1 = 2,399. Show the status bar Count confirming 2,399.

**Example 2 - Where does the jump land?** Column A has values in A2:A50, a blank in A51 and values in A52:A90. Starting at A2: `Ctrl+Down` lands on A50 (last filled before the blank). Press again: A52 (next filled after the blank). Press again: A90. Press again: the last row of the sheet (A1048576). Lesson: three presses to cross one gap; the first stop revealed the gap.

**Example 3 - Ctrl+Enter.** Select B2:B10, type `=A2*2`, press `Ctrl+Enter`. Every cell gets the formula with relative rows (B10 holds `=A10*2`). Pressing Enter instead fills only B2.

## Questions to ask students
- What is the difference between what the grid shows and what the formula bar shows? (The grid shows the formatted result; the formula bar shows the actual content, formula or constant.)
- You press Ctrl+Down from A2 and stop at A50, but you know the data runs to A90. Why? (A51 is blank; the jump stops at the edge of contiguous data.)
- How many returns do 1,260 daily prices produce? (1,259.)
- How do you check the sum of a range without writing a formula? (Select it and read the status bar.)
- Which shortcut reveals every formula on the sheet at once? (Ctrl+backtick.)

## Analogies
- Ctrl+Arrow is a lift that only stops at floors where something changes: it skips all the identical floors in between and halts at the first blank.
- The formula bar is the ingredient list; the grid is the photo on the packet. Auditors read the ingredients.
- Learning shortcuts is like learning to touch-type: slower for a week, permanently faster afterwards.

## Recording tips
- Show a keystroke overlay on screen (many free tools display pressed keys) so viewers can follow every shortcut.
- Do the drag-vs-keystroke race at real speed; overshooting with the mouse is the most persuasive moment of the lesson.
- Mention Mac equivalents briefly (Cmd for Ctrl in most cases, Fn for function keys on laptops) without derailing the flow.
