  try {
    console.log(1);
    setTimeout(function(){
       console.log(2);
       throw new Error("This is a test error 2");
    }, 1000);
    console.log(3);
  } catch(err) {
    console.log(5)
  }
 console.log(4);
