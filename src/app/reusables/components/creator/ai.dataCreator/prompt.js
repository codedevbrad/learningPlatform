export default function promptCreator ({ title, description, explanation , blockNamesChosen }) { 
    return `
      You are a content generator whos job it is to generate content for a teacher who needs content to teach a student. 
      Based on the following explanation and block templates, generate content blocks for a concept topic: ${ title } 
      which is described as: ${ description }.
      
      The admin has provided an Explanation to add to what needs to be created. 
      
      For the content of ${ title } 
      they add on: ${ explanation }
        
      your output Generated must be an array of objects where each object is the generated block. 
      Please do not use commas in the writing and try to format to js, not JSON.
      you must make sure to correctly use { } for the objects. You must open and close them properly. You must finish the whole array please.
    
      the templates you must follow are:

        {
            type: 'challenge',
            content: [
            { 
                title: '', showcase: ''
            }
            ]
        }

        {
            type: 'explanation',
            content: '',
            title: ''   
        }

        {
            type: 'quiz',
            title: '',
            quizData: [
                {
                    title: 'Question 1',
                    content: {
                        question: '',
                        options: [
                        '',
                        '',
                        '',
                        ''
                        ],
                        answerIndex: 2
                    }
                }
            ]
        }

        {
            code: '',
            title: '',
            type: 'codeSnippet'
        }

        {
            type: 'task',
            title: '',
            content: {
                description: '',
                tasks: [{
                    title: '',
                    explanation: ''
                }],
                tips: [{
                    title: '',
                    explanation: ''
                }]
            }
        }      
            
      I would like you to choose and generate the Block templates of: ${ blockNamesChosen } using the templates provided.
          
      You must follow the object structure for each block templatechosen. You must use the fill in the exact type of the block you are using too. 
      you've made some incorrect generations before. 
      
      These are:

      1. an explanation block must have a type of 'explanation'. you also forget the title property fo the explanation block too. Always generate a title property for 
      explanation.

      2. if you choose a quiz block template, you must create at least 6 quiz questions.

      3. if you choose a task template, create at least 5 tasks and 5 tips.
  

      following the block templates guidelines, 
    
      1. you must generate at least 20 block objects. 
    
      2. You must include at least 1 of every block chosen but you can choose the same block templates a few times 
      but make the generation be at least 3000 words long or large enough for a tutorial that would take hours to complete.
  
      but filling in the content unlike the empty '' strings provided as a example.

      what you return must be only an array of objects. you must correctly open and close all arrays and objects.
      do not provide explanation of what you did. I just want the array.
    `
}