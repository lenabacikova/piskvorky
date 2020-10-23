"use strict"
console.log("funguju")




let whoPlays = "circle"
const field = document.querySelectorAll(".field")


for (let i = 0; i < field.length; i++) {
  const buttonElm = field[i]

  buttonElm.addEventListener ("click", (e) => {
    if (whoPlays === "circle") {
      e.target.classList.toggle("board__field--circle")
      document.querySelector('.player').src = 'images/cross.svg'; 
      whoPlays = "cross"
      e.target.setAttribute("disabled", true)


    } else if (whoPlays === "cross") {
      e.target.classList.toggle("board__field--cross")
      document.querySelector('.player').src = 'images/circle.svg'; 
      whoPlays = "circle"
      e.target.setAttribute("disabled", true)
    }
  })


}

