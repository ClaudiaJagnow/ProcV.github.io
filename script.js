function proximaPagina() {
    window.location.href = "aula2.html";
}

function voltar() {
    window.location.href = "index.html";
}

function verificarResposta() {
    const resposta = document.getElementById("resposta").value.toLowerCase();
    const feedback = document.getElementById("feedback");

    if (resposta.includes("procv") && resposta.includes("103") && resposta.includes("2")) {
        feedback.style.color = "green";
        feedback.innerText = "✅ Resposta correta! Muito bem!";
    } else {
        feedback.style.color = "red";
        feedback.innerText = "❌ Ainda não está correta. Revise o exemplo acima.";
    }
}
function publicarComentario() {
    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const lista = document.getElementById("lista-comentarios");

    if (nome === "" || mensagem === "") {
        alert("Por favor, preencha seu nome e o comentário.");
        return;
    }

    const div = document.createElement("div");
    div.classList.add("comentario");

    div.innerHTML = `<strong>${nome}</strong><p>${mensagem}</p>`;

    lista.appendChild(div);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
const perguntas = [
    {
        pergunta: "Qual argumento define se o PROCV fará busca exata?",
        opcoes: ["valor_procurado", "tabela_matriz", "núm_índice_coluna", "procurar_intervalo"],
        correta: 3
    },
    {
        pergunta: "Qual função substitui o PROCV em versões mais novas do Excel?",
        opcoes: ["SE", "ÍNDICE", "PROCX (XLOOKUP)", "SOMASE"],
        correta: 2
    },
    {
        pergunta: "O PROCV busca valores em qual direção?",
        opcoes: ["Horizontal", "Vertical", "Diagonal", "Circular"],
        correta: 1
    }
];

function proximaAula3() {
    window.location.href = "aula3.html";
}

let perguntaAtual = 0;
let pontos = 0;
let tempo = 15;
let intervalo;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementsByClassName("opcao");
const feedbackEl = document.getElementById("feedback-quiz");
const btnProxima = document.getElementById("btn-proxima");

/*function carregarPergunta() {
    const p = perguntas[perguntaAtual];
    perguntaEl.innerText = p.pergunta;

    for (let i = 0; i < opcoesEl.length; i++) {
        opcoesEl[i].innerText = p.opcoes[i];
        opcoesEl[i].disabled = false;
    }

    feedbackEl.innerText = "";
    btnProxima.style.display = "none";
}*/
function carregarPergunta() {
    const p = perguntas[perguntaAtual];
    perguntaEl.innerText = p.pergunta;

    for (let i = 0; i < opcoesEl.length; i++) {
        opcoesEl[i].innerText = p.opcoes[i];
        opcoesEl[i].disabled = false;
    }

    feedbackEl.innerText = "";
    btnProxima.style.display = "none";

    iniciarTimer();
}

/*function responder(indice) {
    const correta = perguntas[perguntaAtual].correta;

    for (let btn of opcoesEl) {
        btn.disabled = true;
    }

    if (indice === correta) {
        feedbackEl.style.color = "green";
        feedbackEl.innerText = "✅ Resposta correta!";
        pontos++;
    } else {
        feedbackEl.style.color = "red";
        feedbackEl.innerText = "❌ Resposta incorreta!";
    }

    btnProxima.style.display = "inline-block";
}*/
function responder(indice) {
    clearInterval(intervalo);

    const correta = perguntas[perguntaAtual].correta;

    for (let btn of opcoesEl) {
        btn.disabled = true;
    }

    if (indice === correta) {
        feedbackEl.style.color = "green";
        feedbackEl.innerText = "✅ Resposta correta!";
        pontos++;
    } else {
        feedbackEl.style.color = "red";
        feedbackEl.innerText = "❌ Resposta incorreta!";
    }

    btnProxima.style.display = "inline-block";
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

/*function mostrarResultado() {
    perguntaEl.innerText = "Quiz finalizado 🎉";
    document.querySelector(".opcoes").style.display = "none";
    feedbackEl.style.color = "#1f7a4d";
    feedbackEl.innerText = `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
    btnProxima.style.display = "none";
}*/
function mostrarResultado() {
    clearInterval(intervalo);
    perguntaEl.innerText = "Quiz finalizado 🎉";
    document.querySelector(".opcoes").style.display = "none";
    document.querySelector(".timer").style.display = "none";
    feedbackEl.style.color = "#1f7a4d";
    feedbackEl.innerText = `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
    btnProxima.style.display = "none";
}

carregarPergunta();

function iniciarTimer() {
    clearInterval(intervalo);
    tempo = 15;
    document.getElementById("tempo").innerText = tempo;

    intervalo = setInterval(() => {
        tempo--;
        document.getElementById("tempo").innerText = tempo;

        if (tempo <= 0) {
            clearInterval(intervalo);
            bloquearResposta();
        }
    }, 1000);
}
function bloquearResposta() {
    for (let btn of opcoesEl) {
        btn.disabled = true;
    }

    feedbackEl.style.color = "red";
    feedbackEl.innerText = "⏰ Tempo esgotado!";

    btnProxima.style.display = "inline-block";
}

function voltarInicio() {
    window.location.href = "index.html";
}
function mostrarResultado() {
    clearInterval(intervalo);
    perguntaEl.innerText = "Quiz finalizado 🎉";
    document.querySelector(".opcoes").style.display = "none";
    document.querySelector(".timer").style.display = "none";
    feedbackEl.style.color = "#1f7a4d";
    feedbackEl.innerText = `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

    btnProxima.style.display = "inline-block";
    btnProxima.innerText = "Finalizar curso ➜";
    btnProxima.onclick = () => {
        window.location.href = "final.html";
    };
}