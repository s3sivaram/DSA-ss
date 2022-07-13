function mainDebounce() {
  //  debounce...

  /*
  
      attach the script to index.html
  
      */

  //    get the element in the dom.

  const getElementbyid = (el) => {
    return document.getElementById(el);
  };

  let debouncebtn = getElementbyid("debounce");
  let throttlebtn = getElementbyid("throttle");

  debouncebtn.addEventListener("click", debounce(handleSubmit, 2000));
  throttlebtn.addEventListener("click", throttle(handleSubmit, 2000));

  function debounce(fn, delay) {
    let olddelayexist;

    return function () {
      if (olddelayexist) {
        console.log("clearing old timers", olddelayexist);
        clearTimeout(olddelayexist);
      }
      olddelayexist = setTimeout(() => {
        fn();
        olddelayexist = null;
      }, delay);
    };
  }
  function throttle(fn, delay) {
    let olddelayexist;

    return function () {
      if (olddelayexist) {
        console.log("returning back the click");
        return;
      }
      olddelayexist = setTimeout(() => {
        fn();
        olddelayexist = null;
      }, delay);
    };
  }

  function handleSubmit() {
    console.log("submit clicked");
  }
}

mainDebounce();
