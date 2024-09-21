/* remove all users and their work associations */

/* remove all user work */

/* remove just user messages and sessions */

/* remove all tags */


function runScript ( firstArg , secondArg ) {
    console.log(`run, ${ firstArg} - ${ secondArg }`);
}

const firstArg  = process.argv[2] || null; 
const secondArg = process.argv[3] || null;  


runScript( firstArg , secondArg );