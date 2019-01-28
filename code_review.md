---
layout: default
title: TTT Review | Harbortop
---

# Tic Tac Toe Code Review (Ruby)

Hi,

I will be reviewing your code today. [Tic Tac Toe code can be found here.](https://github.com/8thlight/legacy_code_examples/blob/master/ruby/game.rb)

If you are unfamiliar with a code review I want to assure you the purpose is not to find fault or pass judgement. A code review is useful as a way to offer an alternative perspective on what is often a complex problem with numerous viable paths to its' solution. The goal is to stimulate thought and discussion on how to proceed to the desired outcome. Ideally, the code review is beneficial to both the reviewer(s) and reviewee(s).

Following is the breakdown of the requested  outcomes for the Tic Tac Toe game.

**Tic Tac Toe desired outcomes:**
- Game executes without "crashes".
- Two player game, player one: a human, second player: the computer.
- Game play should be "pleasant".
  - Assumes the human player understands the rules and objectives of the Tic Tac Toe game and that providing explicit rules pertaining to such is unnecessary.
  -  Assumes an interface that visually represents the tic tac toe board and its' current state. In other words, the human player should not need to "imagine" the state of the board in their head.
  -  Assumes that interfaces, both inputs and outputs, shall be properly titled and/or labeled as to indicate their purpose, state, or requirements as necessary.
- Game play should be forgiving.
  - Assumes an allowance for human player input that isn't relative to the play of the game.
- Player represented by computer should be unbeatable.
- Production ready version of the Tic Tac Toe game.

---

**GAMEPLAY**

The core functionality of the tic tac toe game works as expected. The game proceeds until a player wins or there is a draw.

*Concerns:*
- Is it *consistently* apparent when the player should enter their move?
  - Examine `ln 11`. Would relocation to a position where it is executed for each expectation of input by the player be beneficial?
- What happens if the player makes an entry other than 0 - 8?
  - Examine `ln 26`. What value is `spot` assigned to? If the input is "a"? If the input is 9? What affect does that have on the conditional beginning on `ln 27`?
  - Would "validating" the input resolve any unexpected behaviors in `ln 26` and `ln 27`?

*Considerations:*
- Could the player input prompt be clearer? More descriptive? All on one line?
  - `print "==> Please choose a square [0-8]: "`
- As the game progresses, the number of "boards" on the screen might be confusing to some players, consider "clearing" the terminal screen with each output of the board's state.
  - `system('clear') || system('cls')`
- The player is not explicitly made aware of what marker is theirs. In other words, they need to deduce their marker by examining the board after their first move. Would there be a way of improving playability by explicitly conveying the mark of the player and the computer?
- Note who's turn it currently is. (See Further Exploration)

*Further Exploration:*
- Humans don't "instinctively" count from zero (0). What would the ramifications be of numbering the squares on the board 1 - 9?
- To differentiate Human turn from Computer turn, consider introducing an "pause" into the game.

*Code example of game pause:*

```ruby
  def eval_board
    thinking
    spot = nil
    # code removed for brevity
  end

  def thinking
    puts 'Computer thinking...'
    sleep 1
  end
```

- Consider additional features to game
  - Identify the human by name.
  - Convey the outcome of each game upon its completion.
  - Continue play after each game.
  - Keep score if multiple games are played.
  - Choose your opponent, computers of varying ability or another human.

- How might the design of the current code and its data structures benefit from change if some or all of the "Further Exploration" features were added?
  - Would the game benefit from the creation of more classes?

---

**STYLE**

Coding style is consistent.

*Considerations:*
- Variable and method naming IS challenging for everyone. Consider the following:
  - `start_game` method. Does a loop in this method suggest more than just the "start" of the game? How about that `start_game` is the only method called on the "game" object? Does the method only "start" the game or is there a process of playing the game as well as an end to the game?  Would `play_game` be more indicative of start, process, and end?
  - Consider using "full" variable names such as `evaluate_board`.
  - Consider naming methods that return a boolean or "truthy" values with a "?" such as `game_is_over?` and `tie?`
  - Is the `b` parameter name descriptive? `ln 85`, `ln 97`. Will you remember what it refers to in the future? What if the call isn't only 17 lines away in the future?
- Consider running a linter to check code against suggested styling and coding best practices.
- Possible areas for review from running a linting process:
  - `ln 3` Use a (% literal) `@board = %w[0 1 2 3 4 5 6 7 8]` for an array of strings.
  - Consider single-quoted strings unless string interpolation is needed.
  - Consider the length of a line. Example `ln 10`.
  - Reconsider `get_` prefix as a method name. `ln 23` and `ln 52`. This may cause confusion as to the "purpose" of the method. Is it a "getter" method? Maybe `obtain_human_move` and `obtain_best_move`?
  - `ln 86` Extra empty line.
  - `ln 88` thru `ln 94` 2 space indentation (not 0) for expression spanning multiple lines.

Example of `ln 85 - ln 95` restyled:

```ruby
  def game_is_over(b)
    [b[0], b[1], b[2]].uniq.length == 1 ||
      [b[3], b[4], b[5]].uniq.length == 1 ||
      [b[6], b[7], b[8]].uniq.length == 1 ||
      [b[0], b[3], b[6]].uniq.length == 1 ||
      [b[1], b[4], b[7]].uniq.length == 1 ||
      [b[2], b[5], b[8]].uniq.length == 1 ||
      [b[0], b[4], b[8]].uniq.length == 1 ||
      [b[2], b[4], b[6]].uniq.length == 1
  end
```

---
**CODE**

*Concerns*
- Is it possinble to narrow the focus of the following methods? Can these methods be refactored to a single responsibility?
  - `start_game` (ln 10 & ln 18) Extract the drawing of the board to its own method. Benefit: DRY. Any future changes to the board can now be done in one place.
  - `get_human_spot` (ln 23) Extract the validation of an open square to its own method. As mentioned prior (Gameplay concerns), the game would benefit from validating if the chosen sqaure is in the range of the board (0- 8). Validate if the move is in range, if so, validate if the square is available.

`get_human_spot` refactored:

```ruby
  def get_human_spot
    print "\n==> Please choose a square [0-8]: "
    spot = validate_move(gets.chomp)
    board[spot] = hum
  end

  def validate_move(spot)
    loop do
      break if valid_move?(spot) && valid_open_square?(spot.to_i)
      print '??? - Please choose a valid square: '
      spot = gets.chomp
    end
    spot.to_i
  end

  def valid_move?(spot)
    spot.between?('0', '8')
  end
```

  - `eval_board` Extract the "strategies" to their own methods. This may be come more critical as the need to meet the game objective of "undefeatable" computer is addressed. Will you atempt to create a hierarchy of ordered strategies or use an algorithm such as "minimax"? (Considering the arguments being passed from `eval_board` and the parameters being accepted by `get_best_move`, it looks like "minimax".)

  - `ln 42` Is there a need to pass the `@com` argument? It does not appear so at this point in the development/functionality of the game. The same question for `ln 52`. `next_player`, `depth`, and `best_score`.
  -

*Considerations*
- Hide instance variables, consider "getters" and/or "setters" for instance variables.
  - `attr_reader :board, :com, :hum`
- Consider referencing squares by player rather than markers. Easier updates if changes are made to markers. `ln 27`, `ln 43`, `ln 56` and `ln 98`.
  - `if @board[spot] != com && @board[spot] != hum` (Code as written assumes `attr_reader :com, :hum`)
- Consider `get_best_move`
  - Are all the parameters necessary? Specifically are they all being used?
  - Consider if `best_move` is necessary.
  - Consider if logic for implicit return is necessary. (ln 77 - ln 82)
  - consider extracting out methods for "win" and "block".
- Consider attempting to refactor `get_best_move` and `game_over` methods to simplify logic.

---
**OVERALL**

The game has generally met the objectives set forth. The two immediate needs to satisfy the games desired outcomes are: address input that falls outside the choices for choosing a move, and make the computer unbeatable.

As one of the objectives is to to be "production-ready", it is worth considering what additional functionality might be desired for the game and if the current design would easily facilitate any future changes. (Some of that additional functionality was outlined in "Gameplay".)

The current design does utilize `class Game` as a "game engine", but as noted in "**CODE**", single responsibility principles should be considered. Both the single class and many of the defined methods might benefit from examination to consider if their focus might be narrowed. Would it be rewarding to examine narrowing the responsibility of many of the defined methods as well as creating classes for the players as well as the board? It very well may for a "production ready" version of the game.
