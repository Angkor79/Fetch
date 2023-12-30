const userList = document.querySelector('.user-list');
const postList = document.querySelector('.post-list');

function makeElement(tag, attr_n, attr_v, content) {
  let output = document.createElement(tag);
  (!!attr_n) && output.setAttribute(attr_n, attr_v);
  output.textContent = content;
  return output;
}


function displayUserPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(resp => resp.json())
    .then(data => {
      postList.innerHTML = ''; 
      for (let post of data) {
        const li = makeElement('li', '', '', post.title);
        postList.append(li);
      }
    });
}


fetch('https://jsonplaceholder.typicode.com/users')
  .then(resp => resp.json())
  .then(data => {
    for (let user of data) {
      const li = makeElement('li', 'data-user-id', user.id, `${user.name} / ${user.email}`);
      li.addEventListener('click', () => displayUserPosts(user.id));
      userList.append(li);
    }
  });
