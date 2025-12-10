// ===============================
// SALVAR NOVO USUÁRIO
// ===============================
export function cadastrarUser(key, novoUser) {

    let usuarios = localStorage.getItem(key);

    if (usuarios === null) {
        usuarios = [];
    } else {
        usuarios = JSON.parse(usuarios);
    }

    // Verificar se já existe (ignora maiúsculas/minúsculas)
    const existe = usuarios.some(
        u => u.usuario.toLowerCase() === novoUser.usuario.toLowerCase()
    );

    if (existe) {
        return { sucesso: false, mensagem: "Usuário já existe!" };
    }

    usuarios.push(novoUser);

    localStorage.setItem(key, JSON.stringify(usuarios));

    return { sucesso: true, mensagem: "Usuário cadastrado com sucesso!" };
}



// ===============================
// CONSULTAR USUÁRIO (LOGIN)
// ===============================
export function consultarUser(key, credenciais) {

    let usuarios = localStorage.getItem(key);

    if (usuarios === null) {
        return { sucesso: false, mensagem: "Nenhum usuário cadastrado!" };
    }

    usuarios = JSON.parse(usuarios);

    const existe = usuarios.some(u =>
        u.usuario === credenciais.usuario &&
        u.senha === credenciais.senha
    );

    if (!existe) {
        return { sucesso: false, mensagem: "Credenciais inválidas!" };
    }


    return { sucesso: true, mensagem: "Login realizado com sucesso!" };
    
}
