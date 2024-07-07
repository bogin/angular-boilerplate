# About

This is my Angular boilerplate. It contains frontend and backend folders - the focus here is on Angular (for now), where I have implemented concepts that I favor.

This app began as a homework assignment for Wix. The objective was to write the Mines game. I decided to take it a step further and allow the user to control the game parameters and appearance.

On the home page, you can find the Mines game, and in the top bar, there is a link to the configuration page.

Please configure the game, appearance, and language as you prefer.



# Frontend

Run `cd frontend`, then `npm install` and finally `npm run start` for starting the angular app. 
The application will automatically reload if you change any of the source files.

Navigate to `http://localhost:4200/configurations/mines-configurations` and change any configuration you like.

Then, please use the top bar to navigate to the game.




## Components:

### board.component:


This component connects the HTML to the JavaScript that runs the game.
The board loads with board config input. For that, the component will:

1. Create a CellsArray class that represents the game functionality and state.(Base on configurations)
2. Create an HTML cell 'mines-cell.component' for each cell of the array.(Base on configurations)

This component outputs notifications when the game is done or when the bomb counter needs to be updated.




### cells-array.class.ts:


This class is used by the Board component and holds all the code responsible for the mines game logic, including initialization.




### configurations-views:


For now, it has only one configuration, but it supports multiple configuration forms for future use.



#### mines-config:


This component holds a configuration form for the game with the init and submit methods. I recommend you use it.




### form.component:


This is a very generic component.
It receives a configuration and displays a form. It has no logic and its only purpose is to maintain the same form appearance everywhere.
For now the component AppInput and AppSingleSelect are not created - when Ill have more pleaces in my app that I need to use input/single select ill create the components and use them here.



### home-page.component:


For now, it's just holding the game.


### mines-cell.component:


This is a very generic component. It displays HTML based on state and notifies on clicks.


## app.configurations:


Holds the basic app config and top bar configuration.


## translate-http-loader.factory:


A Translate factory to load the ngx-translate module.



## integer.validator:


A validator that the form component uses if the control is configured with error validator.



## mines.manager:


Manages HTTP observables to retrieve and save the game configuration from the server.



## Pages:


### configurations-page.component:


Responsible for loading the data, merging it with the UI configurations, and passing it to the children.



### mines-page:


Responsible for loading the data, merging it with the UI configurations, and passing it to the children.


# Backend system:

OPen a new terminal, and run `cd backend`, then `npm install`, and finally `npm run start` to start the node server. 
The application will automatically reload if you change any of the source files.
Changes to configuration won't be saved if any changes applied.

This is a basic "Hello World" boilerplate I have for interviews.
For this assignment, I just added a router, controller, and service for the Mines game,
all of them pointing to a JSON file that is saved in memory.