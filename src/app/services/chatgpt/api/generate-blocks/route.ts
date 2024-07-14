import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    // Make a request to OpenAI's API
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'user', content: prompt }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 4096, // Adjust based on your needs
      temperature: 0.7, // Adjust based on your needs
    });

    const generatedBlocks = chatCompletion.choices[0].message.content.trim();

    const generatedData = {
      message: 'Blocks generated successfully!',
      generatedBlocks,
      status: 200
    };

    return new Response(JSON.stringify( generatedData ), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } 

  catch (error) {
    console.error('Error generating blocks:', error);

    return new Response(JSON.stringify({ error: 'Error generating blocks', status: 500 }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

/* 

    /// implementation attempt 1:

    I think i need to add a feature in the prompt where the admin asking the question can set
    what is the most important subject you want taught. If you specify lots of languages, 
    you should provide a weight on how much of one subject to
    talk about. Like:
        i mentioned learning fetch in React But I dont want the generator to explain react and learning react too much.
        Its a language we're using for Fetch, but it's not the core subject.

    /// implementation attempt 2:

    I think i'm getting a generation word limit.   

    // implementation attempt 3:

    i had this issue trying to convert the string of the array of objects to an array. The problem is 
    i couldn't parse this. instead i had to do something i've never seen before

    const dataArray = new Function(`return ${dataString}`)();

    // implementation attemt 4: 

    Yayy, chatGpt now generates the blocks in the correct structure and I can pass the blocks to be saved and displayed.
    for some reason though, the explanation blocks ignores the title property.
    when i paste the block templates directly in the prompt that seems to generate correctly. 
    
    but if i do

    the templates you must follow are:
      ${ explanationObject } ,
      ${ quizObject } , 
      ${ codeSnippetObject } , 
      ${ ChallengeComponentObject } , 
      ${ taskObject } , 
      ${ videoBlockObject }
       
    so instead i eed to do 
    {
      title: '', 
      type: 'explanaion',
      content: ''
    }

    // implementation attempt 5:
    I seem to be hitting a limit with the generation word count returned.
    seems i need to increase the max_tokens. I als tried chat-gpt-4 but the generation time was longer and it produced less blocks than asked for.
/*

/*
   I want to teach my students Fetch using ReactJs. Specifically async await vs promises vs callbacks. 
   talk about nested hell. Please don't focus too much on learning ReactJs. 
   The students should know reactJs at this stage.


*/
