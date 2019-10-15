


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  let imageId = 3659 //Enter the id from the fetched image here
  
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  
  
  renderImage();
  
}) // end of DOMContentLoaded listener


const title = document.querySelector('#name');
const img = document.querySelector('#image');
const likes = document.querySelector('#likes');
const commentList = document.querySelector('#comments');

const likeBtn = document.querySelector('#like_button');
likeBtn.addEventListener('click', (e)=> {
  like();
})

const form = document.querySelector('#comment_form');
form.addEventListener('submit', (e)=> {
  comment();
})

const input = document.querySelector('#comment_input');

function fetchImage(){
  return fetch('https://randopic.herokuapp.com/images/3659')
  .then(response => response.json())
}

function renderImage(){
  fetchImage()
  .then(image => {
    title.textContent = image.name
    img.src = image.url
    likes.textContent = image.like_count
    image.comments.forEach(function(comment){
      const li = document.createElement('li');
      li.textContent = comment.content;
      const deleteButt = document.createElement('button');
      deleteButt.textContent = '❌';
      deleteButt.id = `${comment.id}`
      deleteButt.addEventListener('click', (e)=>{
      byebyeComment(e.target.id);
      deleteButt.parentElement.remove();
      })
      li.appendChild(deleteButt);
      commentList.appendChild(li);
    })
    
  })
}

function like(){
  let number = parseInt(likes.textContent)
  number += 1
  likes.textContent = number
  
  fetch('https://randopic.herokuapp.com/likes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      image_id: 3659
    })
  })
}

function comment(){
  // debugger;
  // console.log(input.value)
  const le = document.createElement('li');
  le.textContent = input.value;
  commentList.appendChild(le);
  
  fetch ('https://randopic.herokuapp.com/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      image_id: 3659,
      content: input.value
    })
  })
}

function byebyeComment(commentId){
  // debugger;
  
  fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {method: 'Delete'})
    

}