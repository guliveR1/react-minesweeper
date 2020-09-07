# React MineSweeper

This is a minesweeper app written with react.  
This app is using react-window in order to render large boards.

## Installation

There is a live demo of this application [here](https://guliver1.github.io/react-minesweeper/),

You can also run a local envrionment:  
use npm to install dependencies

```
npm i
```

You can update the config.json file on the src folder to control the defaults

```javascript
{
    "defaultWidth": 15, // The default width of the board
    "defaultHeight": 15, // The default height of the board
    "defaultNumOfMines": 30, // The default number of mines to place
    "virtualizeAfter": 1600 // The board will be virtualized when the number of cells go above that number
}
```

## Usage

You can run the application with the following command:

```
npm start
```

## Testing

Use npm run to run the tests

```
npm run test
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)