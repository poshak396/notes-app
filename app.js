const notes=require('./Notes.js');
// console.log(getNotes());

const yargs=require('yargs');
// builder-->to take the argments...



//add,remove,list,read
yargs.command({
    command:'add',
    describe:'this command is used to add data.',
    builder:{
        title:{
             describe:'Title of the data',
             demandOption:true
        },
        body:{
            describe:'Body of the given data',
            demandOption:true
        }
    },
    handler(argv){
        notes.addNotes(argv.title,argv.body);
    }
})

yargs.command({
    command:'remove',
    describe:'this command is to remove the data from the database',
    builder:{
        title:{
            describe:'title of the data which has to removed',
            demandOption:true,
            // type:'string'
        },
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})


yargs.command({
    command:'list',
    describe:'To read all the notes',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command:'read',
    describe:'this command is used to read the data',
    builder:{
        title:{
            describe:'title name of the body',
            demandOption:true
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse();
// console.log(yargs.argv);