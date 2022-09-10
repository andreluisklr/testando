let getUser;
let getRepositories;
let user;
let screen;

let scripts;

(async function getScript() {
    let responses = await Promise.all([
        fetch("src/scripts/services/users.js"),
        fetch('src/scripts/services/repositories.js"),
        fetch("src/scripts/objects/user.js"),
        fetch("src/scripts/objects/screen.js"),
    ]);

    scripts = await Promise.all(
        responses[0].json(),
        responses[1].json(),
        responses[2].json(),
        responses[3].json()
    );
})();
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
