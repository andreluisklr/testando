 const moduleSpecifier = './scripts/services/users.js';
  import(moduleSpecifier)
    .then((module) => {
    
      // → logs 'Hi from the default export!'
  
      // → logs 'Doing stuff…'
      console.log(module);
    });



document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (valideteEmptyImput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    if (e.key === 'Enter') {
        if (valideteEmptyImput(userName)) return
        getUserData(userName)
    }
})

function valideteEmptyImput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com um nome de usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}
