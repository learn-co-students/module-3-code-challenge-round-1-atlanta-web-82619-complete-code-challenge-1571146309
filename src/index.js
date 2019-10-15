let imageId = 3668

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const commentList = document.querySelector('#comments');
const image = document.querySelector('#image');
const comments = document.querySelector('#comments');
const imageName = document.querySelector('#name')
const likes = document.querySelector('#likes')
const likeButton = document.querySelector('#like_button')
const form = document.querySelector('#comment_form');
const list = document.querySelector('#comments')
const commentInput = document.querySelector('#comment_input')

start();

function start() {
  fetch(imageURL)
    .then(r => r.json())
    .then(imageJSON => {
      image.src = imageJSON.url;
      image.dataset.id = imageJSON.id;

      imageName.textContent = imageJSON.name;

      likes.textContent = imageJSON.like_count;
      
      imageJSON.comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment.content;
        li.dataset.id = comment.id;
        comments.appendChild(li);

        commentRemover(li);
      })

      likeAdder();
      commentAdder();
    });
}

function likeAdder() {
  likeButton.addEventListener('click', () => {
    likes.textContent = (parseInt(likes.textContent, 10) + 1).toString();

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  })
}

function commentAdder() {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const text = commentInput.value;

    if (text !== '') {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
      form.reset();

      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: text
        })
      })
        .then(r => r.json())
        .then(commentJSON => {
          li.dataset.id = commentJSON.id;
          commentRemover(li);
        })
    }
  })
}

function commentRemover(node) {
  const commentId = node

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete';
  node.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    fetch(`${commentsURL}${node.dataset.id}`, {
      method: 'DELETE'
    })
      .then(r => r.json())
      .then(j => {
        node.remove();
      })
  })
}