// console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')


const imageId = 3662 //Enter the id from the fetched image here
let myUuid = `https://randopic.herokuapp.com/images/3662`

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`



document.addEventListener('DOMContentLoaded', function() {
  // fetch(myUuid).then(res => res.json()).then (res => 
  get(myUuid).then(res => {
    getImage(res)
    getLike(res)
    getComment(res)

  })})

  function get(path){
    return fetch(path).then(res => res.json())
  }

function getImage(data){
 const image =  document.querySelector('#image')
 image.src = data.url
 console.log(image)
}

function getLike(data){
  
  let btn = document.querySelector('#like_button')
  let like = document.querySelector('#likes')
  like.innerHTML = data.like_count
  btn.addEventListener("click", function(){
    like.innerHTML = parseInt(like.innerHTML) + 1;
    // console.log(like.innerHTML)
    showLike(data.id)
  })
} //end getlike

function getLikes(data){
  return{
    'image_id': data
  }
}

function showLike(data){
  return fetch(likeURL, {
    method: "POST",
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify(getLikes(data)),
  }).then(response => response.json());
}


function getComment(data){
  let form = document.querySelector('#comment_form')
  let ul = document.querySelector('#comments')
  data.comments.forEach(function(comment){
    ul.append(showComment(comment))
  })
    
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      let comment = e.target.querySelector("#comment_input")
      // let comment = li.value
      postComment(data,comment.value).then(res => {
      ul.appendChild(showComment(res))
    }
    )
    comment.value = ''
  }
  )
  function showComment(comment){
    let li = document.createElement("li")
    li.innerHTML = `${comment.content} <button>x</button>`
  
    let delBtn = li.querySelector("button")
    delBtn.style.color = 'red'
    delBtn.addEventListener("click",()=>{
      li.parentElement.removeChild(li)
      deleteComment(comment)
    })
    return li
  }


    function getCommentData(data, content){
      return{
        'image_id': data.id,
        'content': content
      }
    }

    function postComment(data, content){
      return fetch(commentsURL, {
        method: "POST",
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        },
        body: JSON.stringify(getCommentData(data, content)),
      }).then(response => response.json());
    }}