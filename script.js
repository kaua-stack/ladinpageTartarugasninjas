// Espera o DOM ser completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // ANIMAÇÃO DA TAMPA DE ESGOTO
    // ==========================================
    
    // Seleciona o elemento da tampa de esgoto
    const sewerCover = document.getElementById('sewer-cover');
    
    // Após 1 segundo, move a tampa para cima (fora da tela)
    setTimeout(() => {
        sewerCover.style.transform = 'translateY(-100%)';
    }, 1000);
    
    // ==========================================
    // NAVEGAÇÃO RESPONSIVA
    // ==========================================
    
    // Seleciona elementos do menu de navegação
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Adiciona evento de clique ao botão de menu (hambúrguer)
    burger.addEventListener('click', () => {
        // Alterna a classe para mostrar/ocultar o menu
        nav.classList.toggle('nav-active');
        
        // Anima cada link do menu com um atraso progressivo
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                // Aplica a animação com atraso baseado na posição do link
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Anima o botão de menu (transforma em X)
        burger.classList.toggle('toggle');
    });
    
    // Fecha o menu móvel ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // ==========================================
    // ALTERNÂNCIA DE TEMA (MODO ESCURO)
    // ==========================================
    
    // Seleciona o botão de alternar tema
    const themeButton = document.getElementById('theme-button');
    const themeIcon = themeButton.querySelector('i');
    
    // Adiciona evento de clique ao botão de tema
    themeButton.addEventListener('click', () => {
        // Alterna a classe dark-mode no body
        document.body.classList.toggle('dark-mode');
        
        // Atualiza o texto e ícone do botão
        if (document.body.classList.contains('dark-mode')) {
            themeButton.innerHTML = '<i class="fas fa-lightbulb"></i> Modo Normal';
        } else {
            themeButton.innerHTML = '<i class="fas fa-moon"></i> Modo Esgoto';
        }
    });
    
    // ==========================================
    // EFEITO SONORO "COWABUNGA"
    // ==========================================
    
    // Seleciona elementos relacionados ao efeito sonoro
    const cowabungaBtn = document.getElementById('cowabunga-btn');
    const cowabungaSound = document.getElementById('cowabunga-sound');
    const cowabungaText = document.getElementById('cowabunga-text');
    
    // Adiciona evento de clique ao botão Cowabunga
    cowabungaBtn.addEventListener('click', () => {
        // Toca o som
        cowabungaSound.play();
        
        // Anima o texto
        cowabungaText.style.transform = 'scale(1.2)';
        cowabungaText.style.color = '#ff9800';
        
        // Retorna o texto ao normal após 500ms
        setTimeout(() => {
            cowabungaText.style.transform = 'scale(1)';
            cowabungaText.style.color = 'white';
        }, 500);
    });
    
    // ==========================================
    // CARROSSEL DE PERSONAGENS
    // ==========================================
    
    // Seleciona elementos do carrossel
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const prevBtn = document.getElementById('prev-character');
    const nextBtn = document.getElementById('next-character');
    const indicators = document.querySelectorAll('.indicator');
    
    // Índice do personagem atual
    let currentCharacter = 0;
    
    // Função para mostrar um personagem específico
    function showCharacter(index) {
        // Remove a classe active de todos os itens
        showcaseItems.forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'translateX(100%)';
            item.style.opacity = '0';
            item.style.visibility = 'hidden';
        });
        
        // Remove a classe active de todos os indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Adiciona a classe active ao item atual
        showcaseItems[index].classList.add('active');
        showcaseItems[index].style.transform = 'translateX(0)';
        showcaseItems[index].style.opacity = '1';
        showcaseItems[index].style.visibility = 'visible';
        
        // Adiciona a classe active ao indicador atual
        indicators[index].classList.add('active');
        
        // Atualiza o índice atual
        currentCharacter = index;
    }
    
    // Inicializa o carrossel mostrando o primeiro personagem
    showCharacter(0);
    
    // Evento de clique para o botão "anterior"
    prevBtn.addEventListener('click', () => {
        // Calcula o índice anterior (com loop)
        let prevIndex = currentCharacter - 1;
        if (prevIndex < 0) {
            prevIndex = showcaseItems.length - 1;
        }
        
        showCharacter(prevIndex);
    });
    
    // Evento de clique para o botão "próximo"
    nextBtn.addEventListener('click', () => {
        // Calcula o próximo índice (com loop)
        let nextIndex = currentCharacter + 1;
        if (nextIndex >= showcaseItems.length) {
            nextIndex = 0;
        }
        
        showCharacter(nextIndex);
    });
    
    // Adiciona eventos de clique aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showCharacter(index);
        });
    });
    
    // Rotação automática do carrossel a cada 5 segundos
    setInterval(() => {
        let nextIndex = currentCharacter + 1;
        if (nextIndex >= showcaseItems.length) {
            nextIndex = 0;
        }
        
        showCharacter(nextIndex);
    }, 5000);
    
    // ==========================================
    // FUNCIONALIDADE DO QUIZ
    // ==========================================
    
    // Seleciona elementos do quiz
    const startQuizBtn = document.getElementById('start-quiz');
    const submitQuizBtn = document.getElementById('submit-quiz');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    const quizStart = document.getElementById('quiz-start');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResult = document.getElementById('quiz-result');
    
    // Evento para iniciar o quiz
    startQuizBtn.addEventListener('click', () => {
        quizStart.style.display = 'none';
        quizQuestions.style.display = 'block';
    });
    
    // Evento para enviar respostas e calcular resultado
    submitQuizBtn.addEventListener('click', () => {
        // Objeto para contar pontos de cada tartaruga
        const results = {
            leonardo: 0,
            raphael: 0,
            michelangelo: 0,
            donatello: 0
        };
        
        // Obtém todas as respostas selecionadas
        for (let i = 1; i <= 5; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            
            // Se uma opção foi selecionada, adiciona um ponto para a tartaruga correspondente
            if (selectedOption) {
                results[selectedOption.value]++;
            }
        }
        
        // Encontra a tartaruga com maior pontuação
        let maxScore = 0;
        let resultTurtle = 'leonardo'; // Valor padrão
        
        for (const turtle in results) {
            if (results[turtle] > maxScore) {
                maxScore = results[turtle];
                resultTurtle = turtle;
            }
        }
        
        // Configura o conteúdo do resultado
        const resultName = document.getElementById('result-name');
        const resultImage = document.getElementById('result-image');
        const resultDescription = document.getElementById('result-description');
        
        // Informações de cada tartaruga
        const turtleInfo = {
            leonardo: {
                name: 'Leonardo',
                image: src='img/azulLeo.png',
                description: 'Você é um líder nato! Como Leonardo, você é disciplinado, estratégico e sempre coloca a equipe em primeiro lugar. Sua lealdade e senso de responsabilidade são admiráveis. Você sempre pensa antes de agir e valoriza a tradição e o treinamento.'
            },
            raphael: {
                name: 'Raphael',
                image: src='img/vermelhorafa.png',
                description: 'Você tem um espírito forte e apaixonado! Como Raphael, você é intenso, protetor e não tem medo de enfrentar desafios. Sua coragem é admirável, mesmo que às vezes você seja um pouco temperamental. Você sempre defende aqueles que ama, não importa o custo.'
            },
            michelangelo: {
                name: 'Michelangelo',
                image: src="img/amareloMiche.png",
                description: 'Você é a alma da festa! Como Michelangelo, você é criativo, divertido e sabe como aproveitar a vida. Seu otimismo é contagiante e você sempre encontra maneiras de animar os outros. Você valoriza a diversão e a amizade acima de tudo - e provavelmente adora pizza!'
            },
            donatello: {
                name: 'Donatello',
                image: src="img/roxoDona.png",
                description: 'Você é um verdadeiro gênio! Como Donatello, você é inteligente, inovador e sempre busca soluções criativas para os problemas. Sua curiosidade e sede de conhecimento são admiráveis. Você prefere resolver conflitos com a mente em vez da força.'
            }
        };
        
        // Atualiza os elementos com as informações da tartaruga correspondente
        resultName.textContent = turtleInfo[resultTurtle].name;
        resultImage.src = turtleInfo[resultTurtle].image;
        resultDescription.textContent = turtleInfo[resultTurtle].description;
        
        // Mostra a tela de resultado
        quizQuestions.style.display = 'none';
        quizResult.style.display = 'block';
    });
    
    // Evento para refazer o quiz
    retakeQuizBtn.addEventListener('click', () => {
        // Limpa todas as seleções
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
        
        // Volta para a tela de perguntas
        quizResult.style.display = 'none';
        quizQuestions.style.display = 'block';
    });
    
    // ==========================================
    // CITAÇÕES DO MESTRE SPLINTER
    // ==========================================
    
    // Seleciona elementos relacionados às citações
    const newQuoteBtn = document.getElementById('new-quote');
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;
    
    // Evento para mostrar nova citação
    newQuoteBtn.addEventListener('click', () => {
        // Oculta a citação atual
        quotes[currentQuote].style.display = 'none';
        
        // Avança para a próxima citação (com loop)
        currentQuote = (currentQuote + 1) % quotes.length;
        
        // Mostra a nova citação
        quotes[currentQuote].style.display = 'block';
        
        // Adiciona animação de fade in
        quotes[currentQuote].style.animation = 'fadeIn 0.5s';
    });
    
    // ==========================================
    // ROLAGEM SUAVE PARA LINKS DE NAVEGAÇÃO
    // ==========================================
    
    // Seleciona todos os links que apontam para âncoras na página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtém o ID do alvo a partir do atributo href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Se o elemento existir, rola até ele
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para a barra de navegação
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // ANIMAÇÃO DA PIZZA
    // ==========================================
    
    // Seleciona a imagem da pizza
    const pizzaImg = document.querySelector('.pizza-img');
    
    if (pizzaImg) {
        // Acelera a rotação ao passar o mouse
        pizzaImg.addEventListener('mouseover', () => {
            pizzaImg.style.animation = 'spin 2s linear infinite';
        });
        
        // Retorna à velocidade normal ao remover o mouse
        pizzaImg.addEventListener('mouseout', () => {
            pizzaImg.style.animation = 'spin 10s linear infinite';
        });
    }
});
