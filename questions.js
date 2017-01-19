CSS
****
box model
what is specificity
what does !important
absolute vs relative
media queries
tellme what flexbox is.
inlne-block vs block
Does margin-top or margin-bottom has effect on inline element?



DOM
***
what is event bubbling 
evt.preventDefault()  evt.stopPropagation()
differnce between DOM and BOM. The BOM consists of the objects navigator , history , screen , location and document which are children of window . 
Attribute vs property. what the difference



JS
***
Explain the execution context in JS
What is hoisting;
What is a closure? Give an example of why would you use one?
Difference between setTimeout and setInterval
Differnt ways to invoke a function : call and apply 
Why would you use call or apply to invoke a function
How can i invoke a function with a differnt context apart from using call and apply : (bind)
Difference between == and ===
Tell me how to convert a JS object to json object:  JSON.stringify()
Can you tell me what JSONP is and why we use it : JSONP is a method commonly used to bypass the cross-domain policies in web
Difference betwween making a request for JSON and a JSONP request
Can you tell me two importnant concepts of functional programming: Pure Functions (imutability), Avoid side-effects.(stateless)
Can you tell me the difference between object composition over class inheritance
What is the difference between var, let and const
What does a fat arrow do in ES6?

What is the difference between classical inheritance and prototypal inheritance?
*********************************************************************************
Class Inheritance: 
instances inherit from classes (like a blueprint — a description of the class), 
and create sub-class relationships: hierarchical class taxonomies. Instances are 
typically instantiated via constructor functions with the `new` keyword. Class 
inheritance may or may not use the `class` keyword from ES6.

Prototypal 
Inheritance: instances inherit directly from other objects. Instances are typically 
instantiated via factory functions or `Object.create()`. Instances may be composed 
from many different objects, allowing for easy selective inheritance.







ANGULAR
*******
#does angular support valid namespacing?
No. there is one injector per app and services with the same name override each other.
angular.module('some.module.first').service('helloworld');
angular.module('some.module.second').service('helloworld');


types of services
*********************
constant
value
service
factory
provider (provider can be configured in app.config)


#explain what scope and rootscope are
******************************************
$rootScope is the parent object of all $scope Angular objects created in a web page.


tell me the following scope bindings on a directive
*************************************************
= two-way
& method
@ string
< one-way


#What are the ways to communicate between modules of your application using core AngularJS functionality? Name three ways.
***********************************************************************************************************************
Using services
Using events
Using $scope.apply() to call methods on scopes further up the chain (bad)
By assigning models on $rootScope (bad);
Directly between controllers, using $parent, nextSibling, (bad)
Directly between controllers, using ControllerAs, "require"


#Tell me whats new in Angular 1.5
***********************************
Lifestyle hooks (http://blog.thoughtram.io/angularjs/2016/03/29/exploring-angular-1.5-lifecycle-hooks.html)
Component definition
Multiple slot transclusion
ng-animate-swap (rotating banner)
Lazy transclusion (performance boost)



#When a scope is terminated, two destroy events are emitted. one is on the scope, can you tell me the other.
*********************************************************************************************************
scope.$on(‘$destroy’);
element.on(‘$destroy’);


#how do you remove a watch
****************************
var deregisterWatchFn = $rootScope.$watch()
deregisterWatchFn()


#What are the phases of a directive
***********************************
First, the “$compile()” function is executed which returns two link functions, preLink and postLink.
That function is executed for every directive, starting from parent, then child, then grandchild.
You almost never need to use the prelink.
Secondly, two functions are executed for every directive: the controller and the prelink function. 
The order of execution again starts with the parent element, then child, then grandchild, etc.
The last function postLink (or link)is executed in the inverse order. That is, it is first executed for grandchild, then child, then parent.


#Explain the differences
****************************
- The compile function allows the directive to manipulate the DOM before it is compiled and 
  linked, thereby allowing it to add/remove/change directives, as well as, add/remove/change other DOM elements.
- The controller function facilitates directive communication. Sibling and child directives can 
  request the controller of their siblings and parents to communicate information.
- The pre-link function allows for private $scope manipulation before the post-link process begins.
- The post-link (or just link) method is the primary workhorse method of the directive.



what is the digest loop. how does it work?
*************************************************
In a nutshell, on every dom event the digest cycle all scope models are compared against their previous values.
That is dirty checking. If change is detected, the watches set on that model are fired.
Then another digest cycle executes, and so on until all models are stable.


#whats the difference betwween $digest and $apply.
*************************************************
When $scope.$apply() is called, it kicks the entire application into the $digest loop and in turn runs $rootScope.$digest();
$scope.$digest, which runs the exact same $digest loop, but is executed from the current $scope downwards through its children, a much less costly venture.


differntLevels of watch
****************************
$watch(), $watch(…, …, true); $watchCollection, $watchGroup


#how to speed up angular app
****************************
$compileProvider.debugInfoEnabled(false);
$httpProvider.useApplyAsync(true);
Reduced watchers
One-time binding syntax {{ ::value }}
$scope.$apply() versus $scope.$digest()
Avoid ng-repeat where possible;
Limit DOM filters or use stateless filters
Reduce data with limitTo (pagination)


#watch vs $observe
******************
Use $observe when you need to watch a DOM attribute that contains interpolation (i.e., {{}}'s).
Use $watch for everything else.
