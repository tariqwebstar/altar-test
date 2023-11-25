# Grid Generator Application

## Overview

The Grid Generator Application is a web application that dynamically generates a 10x10 grid filled with random alphabetic characters. The grid is refreshed every 2 seconds, providing a visually dynamic experience. Additionally, the application includes features such as code generation based on the system clock and grid content, as well as a bias/weighting factor input for customizing the grid.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Grid Generation:** A 10x10 grid is dynamically generated with random alphabetic characters, updated every two seconds.
- **Code/Secret Generation:** A 2-digit code is generated based on the system clock and grid content. The code is updated simultaneously with the grid refresh.
- **Bias/Weighting Factor Input:** Users can enter an alphabetic character (a-z) as a weight constant. If the character is 'z', 20% of the grid cells will be filled with 'z', while the remaining 80% will have usual random characters. Users are restricted to entering a character once every 4 seconds.

## Requirements

Make sure you have the following software installed on your system:

- Node.js (version 12.16.1)
- npm (version 6.13.4)
- Angular CLI (version 9.0.7)

## Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/tariqwebstar/altar-test.git
   cd altar-test
   ```

2. Install Dependencies:

   ```bash
   cd frontend
   npm install
   ```

   ```bash
   cd ../backend
   npm install
   ```

3. Start the Backend Server:

   ```bash
   cd backend
   npm run start
   ```

   The backend server should now be running on `http://localhost:3000` .

4. Start the Frontend Application:

   ```bash
   cd frontend
   ng serve
   ```

   The Angular application should now be accessible at `http://localhost:4200`.

5. Explore the Features:

- Click the "Generate 2D Grid" button to initiate the grid generation.
- Observe the grid refreshing every 2 seconds.
- Explore the bias/weighting factor input and see how it affects the grid content.
- View the 2-digit code generated based on the system clock and grid content.

## Contributing

We welcome contributions! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)
- [Angular CLI](https://angular.io/cli/)
