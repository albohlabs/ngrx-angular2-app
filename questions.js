1) output?

(function() {
        console.log(1); 
                                    setTimeout(function(){console.log(2)}, 1000); 
                                    setTimeout(function(){console.log(3)}, 0); 
                                    console.log(4);
                                })();


2)
function test() {
                                   console.log(a);
                                   console.log(foo());
                                   
                                   var a = 1;
                                   function foo() {
                                      return 2;
                                   }
                                }
                                test();


3) output?

                [4,0,"","test","false",null, {}, []].forEach(function(item){
                                if (item){
                                                console.log("true")
                                } else {
                                                console.log("false")
                                }
                });

4) code

                write code so that you get the following output:

                var personOne = new Person("John", "Dow");
    var personTwo = new Person("Name", "Test");
    personOne.sayName();            // ==> John Dow
    personTwo.sayName();            // ==> Name Test

    //first implementation
    console.log(personOne.sayName === personTwo.sayName); ==> false

    //second implementation
    console.log(personOne.sayName === personTwo.sayName); ==> true



5) on a directive declaration what is the difference:

                scope: {
        option1: '&',
        option2:'=',
        option3:'@',
    }

    how to make optional?

6) write a function to determine whether all of the opening brackets have a closing one "(())()()((()))()((()))("
                )( this fails
                ()() this passes
                (()) this passes



                test("(())()()((()))()((()))(");
                test(")(");
                test("(())(");
                test("((())");
                test("(())");
