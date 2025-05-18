type quiz={
    "question":string,
    answers:{
        answer_a:string,
        answer_b:string,
        answer_c:string,
        answer_d:string,
        answer_e:string,
        answer_f:string
    },
    "multiple_correct_answers":boolean,
    "correct_answers":{
        answer_a_correct:string,
        answer_b_correct:string,
        answer_c_correct:string,
        answer_d_correct:string,
        answer_e_correct:string,
        answer_f_correct:string
    },
    "explanation":string,
}

type quizzes={
    question:string,
    options:{
        id:string,
        value:string,
        correct:string
    }[],
    explanation:string,
    multiple_correct_answers:boolean
}[]



async function getQuiz ():Promise<quizzes> {
    let quizzes:quizzes = [];

    let sessionFetch = sessionStorage.getItem("quizzes");

    if(sessionFetch){
        quizzes = JSON.parse(sessionFetch);
        // console.log(quizzes)
        return quizzes;
    }
    
    await fetch("https://quizapi.io/api/v1/questions?apiKey=VUiLhgvbHIE2mug8alIqEPXiNQB7pjpnGXfRzhIw&category=react&difficulty=Easy&limit=10&tags=React")
    .then((response) => response.json())
    .then(data=>{
        // console.log("Touching")
     
        quizzes = data.map((quiz:quiz)=>{
            let question:string = quiz.question;
            let options = [
                {id:"option_a", value: quiz.answers.answer_a, correct: quiz.correct_answers.answer_a_correct},
                {id:"option_b", value: quiz.answers.answer_b, correct: quiz.correct_answers.answer_b_correct},
                {id:"option_c", value: quiz.answers.answer_c, correct: quiz.correct_answers.answer_c_correct},
                {id:"option_d", value: quiz.answers.answer_d, correct: quiz.correct_answers.answer_d_correct},
                {id:"option_e", value: quiz.answers.answer_e, correct: quiz.correct_answers.answer_e_correct},
                {id:"option_f", value: quiz.answers.answer_f, correct: quiz.correct_answers.answer_f_correct}
            ];
            let explanation:string = quiz.explanation;
            let multiple_correct_answers:boolean = quiz.multiple_correct_answers;

            return {
                question:question,
                options:options,
                explanation:explanation,
                multiple_correct_answers:multiple_correct_answers
            }
        })

        sessionStorage.setItem("quizzes", JSON.stringify(quizzes));
    })
    
    return quizzes;
}


const quizContainer = document.getElementById("main-container");
let quizzes = await getQuiz();
quizzes = quizzes;

let answers:string[] = [];
let index = 0; 
let maxIndex = quizzes.length - 1;
//show the first quiz by adding

function renderQuiz(index:number = 0){
    if(index <= maxIndex){
        if(quizContainer){
            quizContainer.innerHTML = `
                <article class="quiz-container">
                    <p class="question"><span class="q">Q${index+1}:</span> <span>${quizzes[index].question}</span></p>
                    <form id="form">
                        <div class="options">
                            ${
                                quizzes[index].options.map((option) => {
                                    if(option.value){
                                        return `
                                            <div class="option">
                                                <input type="radio" name="question" value="${option.id}"/>
                                                <label>${option.value}</label>
                                            </div>
                                        `    
                                    }
                                }).join("")
                            }
                        </div>
                        <button type="button" id="btn" class="btn">
                            Next
                        </button>
                    </form>
                    </article>
            `;
        }

        
        

       
    }

    const btn = document.getElementById("btn");
    const form = document.getElementById("form");

    if(btn && form){
        btn.addEventListener("click", (e:Event)=>{
            let optionPicked = form.querySelector('input[name="question"]:checked') as HTMLInputElement;

            if(optionPicked){
                if(index < maxIndex){
                    let answer = optionPicked?.value;
                    answers.push(answer);
                    
                    index++;
                    renderQuiz(index);
                }
                else{
                    let answer = optionPicked?.value;
                    answers.push(answer);
                    console.log("show result")
                    renderResult();
                }
              
            }else{
                console.log("Nothing picked");
            }

        })

        if(index === maxIndex){
            //make the button say "Finish"
            btn.classList.add("finish");
            btn.innerHTML = "Finish"
            console.log("End of quiz");
        }
    }



}

renderQuiz(index);

function renderResult(){
    let scores: number = 0;
    let total: number = quizzes.length

    answers.forEach((answer:string, quizOrAnswerIndex:number)=>{
        let selectedOption = quizzes[quizOrAnswerIndex].options.find(option => option.id===answer)

        console.log(selectedOption)
        if(selectedOption?.correct === "true"){
            scores++;
        }
    })

    if(quizContainer){
        
        quizContainer.innerHTML = `
            <article class="result-container">
                <p class="result-title">Quiz Completed!</p>
                <p class="result-score">You scored ${scores} out of ${total}</p>
            </article>
        `
    }
    
}


// await getQuiz();