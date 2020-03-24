const fs=require('fs');
const chalk=require('chalk');

const addNotes=function(title,body){
    const notes=loadNotes();   //array of objects...

    //REMEMBER THIS FUNCTION....(IT WILL GIVE ALL THE DUPLICATES....)
    // const duplicatesnotes=notes.filter(function(note){
    //     if(note.title===title)
    //     return 1;
    // })

    // find() -->if this function find duplicates then it will return 1 and
    // searching process get break..therefore it is more efficient then filter...

    const duplicatesnote=notes.find((note)=>{
        if(note.title === title)
        return 1;
    })
    
    if(duplicatesnote === undefined)
    {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('Data get saved..'));
    }
    else
    {
        console.log(chalk.red.inverse('Title has been taken...'));
    }
    
}

const saveNotes=function(notes){
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}


const loadNotes = function(){
    try{
        const stringdata=fs.readFileSync('notes.json').toString();//returns the string of all objects...
        const data=JSON.parse(stringdata);//array of the objects...
        return data;
    }
    catch(e){
        return [];
    }
 
}


const removeNote=function(title){
    const notes=loadNotes();
    const newdata=notes.filter(function(note){
        if(note.title!=title)
        return 1;
        else
        return 0;
    })
    saveNotes(newdata);

    if(notes.length !== newdata.length)
    console.log(chalk.green.inverse('Note removes!'));
    else
    console.log(chalk.red.inverse('No note found!'));
}


const listNotes=function(){
    const notes=loadNotes();
    console.log(chalk.blueBright.bold('Your notes...'));
    notes.forEach((note)=>{
        console.log(note.title);
    })
}

const readNote=function(title){
    const notes=loadNotes();

    const duplicatesNote=notes.find((note)=>{
        if(note.title===title)
        return 1;
    })
    
    if(duplicatesNote){
        console.log(chalk.bold.yellowBright(duplicatesNote.title));
        console.log(duplicatesNote.body);
    }
    else{
        console.log(chalk.bold.red('ERROR:Title not found...'));
    }
}

module.exports ={
    addNotes:addNotes,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}
