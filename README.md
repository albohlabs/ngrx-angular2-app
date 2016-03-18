## ngrx/Angular 2 app using Normalizr & ImmutableJS 

This is a much reduced, edited version of meenie's [best practices ngrx store example](https://github.com/ngrx/angular2-store-example).
I've added the devtools and middleware and I used it to help me understand the best practises for developing an Angular 2 app using ngrx.



  - [Normalizr](https://github.com/gaearon/normalizr) & [ImmutableJS](https://facebook.github.io/immutable-js/)
  - ["Smart" & "Dumb" Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.d2pgf7r58)
  - [<code>AsyncPipe</code>](https://angular.io/docs/ts/latest/guide/pipes.html#!#the-stateful-asyncpipe-) to handle subscription to Observables

### Quick start

```bash
# clone the repo
git clone git@github.com:meenie/angular2-store-example.git

# change directory to our repo
cd angular2-store-example

# install the repo with npm
npm install

# start the server
npm start
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) in your browser
