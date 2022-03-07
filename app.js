
// Setting up
const express=require ('express');
const app = express();
app.use(express.json());
var tweet = require('./favs.json'); 
var http=require('http')
var server = http.createServer(app)
var cors= require('cors')
app.use(cors());


app.get('/', (req,res)=>{ 
    res.send("HOME");
    });
    
//Get request that shows the entire JSON file
app.get('/tweet', (req,res)=>{ 
res.send(tweet);
}); 

//Gets all info (created_at && text) from JSON file
app.get('/tweet/created_at&&text', (req,res)=>{ 
    res.send(tweet.map(obj=>({"created_at": obj.created_at , "Text": obj.text}))) 
    //map each created_at and text fields out from the JSON file
    });

//Get all the users' ID    
app.get('/tweet/user_IDs', (req,res)=>{ 
        res.send(tweet.map(obj=>({"User ID": obj.user.id})))
    });


//Get text and created time of tweet given an ID
app.get('/tweet/:id', (req,res)=>{ 
    let tweets=tweet.find(obj=>obj.id===parseInt(req.params.id));
    res.send({"created at" : tweets.created_at, "text": tweets.text});
});

//Post, adds tweet to JSON file given an ID and text
app.post('/tweet',(req,res)=>{

const added_Tweet={
    id: req.body.id,
    text: req.body.text
};
tweet.push(added_Tweet); 
res.send(added_Tweet);   
});

//Updates screen_name given a name and new screen name
app.put('/tweet/:screen_name',(req,res)=>{
    const tweets=tweet.find(obj=>obj.user.screen_name===req.params.screen_name); //Search for Screen Name
    tweets.user.screen_name=req.params.screen_name 
    res.send(tweets.user.screen_name) 

});

//Deleting from JSON file
app.delete('/tweet/:id',(req,res)=>{

    const tweets=tweet.find(obj=>obj.id===parseInt(req.params.id)); //Search for ID

    const index =tweet.indexOf(tweets)
    tweet.splice(index,1) //Deletion
    res.send(tweets) 

});

function test_print(){

         console.log("test code")

}

// Back End should work just didnt have enough time for front end
app.listen(3000,()=> console.log("HOME"));