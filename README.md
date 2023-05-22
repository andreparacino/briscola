
# Briscola

This is a **React-based Briscola application** that allows one player to play against the CPU for two rounds. The goal of the game is to reach at least 120 points within the two rounds to win.

You can access the application at this [link](https://briscola-react.netlify.app/).

## Technologies Used

This project uses **Vite** as its build tool and is built with **TypeScript**. To handle the application's logic, the project employs native technologies such as **useReducer** and multiple implementations of **useContext**.

For styling, the **SUIT naming convention** was used, with **SCSS** as the pre-processor. The project also leverages **CSS Modules** to seamlessly integrate styles with React components.

## Game Algorithms

  
The game employs a set of algorithms to determine the **winning card** and enable the CPU to make informed decisions during gameplay. Specifically, three main algorithms, namely `evaluateWinningCard`, `evaluateFirstCard`, and `evaluateResponseCard`, are used for evaluating the winning card and determining the best card for the CPU to **initiate** or **respond** to a play.

The `evaluateWinningCard` algorithm takes into account the trump suit and the `power` associated with each card. The `evaluateFirstCard` algorithm is utilized by the CPU to select the best card to play when it has to initiate the play, while the `evaluateResponseCard` algorithm is used when the CPU responds to the player's play. The latter algorithm employs `evaluateWinningCard` under the hood and compares each card in the CPU's hand with the card already played to select the most advantageous card.

For a deeper dive into the inner workings of these algorithms, check out the `algorithms.ts` file located in the `src/engine` directory.

(You will see logs of who wins each hand in the console)

## Deck Management

The game follows the same **deck management** principles as in a physical game of Briscola. The game starts with a deck of 40 cards that are ordered and shuffled using the `shuffleDeck` helper function before the game begins. To distribute the cards, six cards are removed from the shuffled deck and added to both the player and CPU's hand. Then during gameplay, the game feeds the players with one card each for each hand played.

## Game Rules

The game rules can be found on this [website](https://www.seeyouinitaly.com/italian-card-games/briscola/). In the game, points are earned based on the card score and the type of trick won. Each round continues until all cards in the deck have been used, and the player who reaches a score of at least 120 by the end of the two rounds wins the game.

## Card Structure

    {
       "id":1,
       "value":1,
       "power":10,
       "score":11,
       "suit": SUIT.DENARI,
       "alias": ALIAS.ASSO
    }

The game's deck consists of 40 cards following the structure mentioned above. It is interesting to note that in a human player's mind, the "power" property is subconsciously calculated. This property doesn't need formalization to understand how to play the game.

The cards with `value` of 2, 4, 5, 6, and 7 all have `score: 0`, while cards with `value` of 8, 9, 10, 3, and 1 have a specific value set for their `score` property. When playing, the player needs to understand which card can win **based on the score sometimes** and other times **just on the value.**

As an example, consider two cards: one with a `value` of 1 and a corresponding `score` of 11, and another with a `value` of 8 and a `score` of 2. In this case, the card with a `value` of 1 wins because it has a higher `score` than the card with a `value` of 8.

If we have two cards with a `value` of 4 and 7, both cards will have a `score` of 0. So in this case, the card with a `value` of 7 wins because it has a higher `value` than the card with a `value` of 4.

During the development of the `evaluateWinningCard` algorithm, the need for a power or strength property arose. It is easier to determine if one card beats another with the `power` property ranging from 1 to 10, as it will always tell if `card1.power > card2.power`. This property provides a quick and easy way to determine which card has a higher strength and can win the play.

## Running the Application Locally

To run the application locally, please follow these steps:

1. Clone the repository
2. Install dependencies by running `npm install`
3. Start the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application


## Contributing

I welcome contributions from developers to improve both the project and the algorithms. If you would like to contribute, please follow these steps:

1.  Fork the repository
2.  Create a new branch for your contribution
3.  Make your changes and commit them with clear and concise messages
4.  Push your changes to your forked repository
5.  Create a pull request to merge your changes into the main repository

I also encourage you to leave comments and suggestions on the existing codebase to help me improve the overall quality of the application 🙂.

If you are interested in helping me improve the algorithms used in the game, please consider sharing your insights on how to structure algorithms like these. 

Thank you for your interest in contributing to this project!
