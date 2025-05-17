function getQuiz ():{question:string[], answer:string}{
    let questionsAndOptions:string[] = [];
    fetch("https://quizapi.io/api/v1/questions?apiKey=VUiLhgvbHIE2mug8alIqEPXiNQB7pjpnGXfRzhIw&category=react&difficulty=Easy&limit=10&tags=React")
    .then((response) => response.json())
    .then(data=>{
        let questionsAndOptions = data.map((item:{question:{}})=>{
            let question = item.question;
            let options = 
        })
        //loop through, the question would be a key and value
        //the options would be a key and value and value would be a key pair of the id and the option
        //then 
    })
    
    return{
        question:[],
        answer:""
    }
}

getQuiz();