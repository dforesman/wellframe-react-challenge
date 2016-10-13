
# Hacker News API via React + Redux

## About

Replicates the functionality of the Hacker News homepage utilizing React + Redux on the HackerNews API. Allows display of 'Top', 'Best', and 'New' stories, displayed 30 per page. Articles are cached by endpoint, and article contents are cached by ID. Individual Story components each manage their own loading via Redux.

Utilizes Webpack and Babel for ES2015 Javascript. utilizes Gulp for SCSS compilation, asset copying, and triggering webpack build.

## Install

`$ npm install`

## Build

`$ gulp`

Gulp will automatically trigger the webpack build.

## Run

`$ http-server` or your simple static HTML server of choice, in the project directory. `index.html` will load built assets and scripts
