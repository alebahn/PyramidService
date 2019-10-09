import express from "express";
const app = express();
const port = process.env.PORT || 3000;

function isPyramid(word : string) : boolean
{
    const letters=word.split("");
    const lettersCount:{[index:string] : number} = {};
    for (let letter of letters) {
        if (letter in lettersCount) {
            lettersCount[letter]++;
        }
        else {
            lettersCount[letter]=1;
        }
    }
    const ranks : string[] = [];
    let rankCount=0;
    let maxRank=0;
    for (let letter in lettersCount) {
        const rank = lettersCount[letter];
        if (rank in ranks) {
            //duplicate is not pyramid
            return false; 
        }
        else {
            ranks[rank] = letter;
            rankCount++;
            if (rank>maxRank)
            {
                maxRank=rank;
            }
        }
    }
    //if the bigest rank is the same as the number of ranks, there must be no gaps
    return maxRank===rankCount;
}

app.get("/", (req, res) => {
    let word=req.query.word;
    if (typeof word == "string")
    {
        res.send(isPyramid(word));
    }
    else
    {
        res.status(400).send("expected string parameter \"word\"");
    }
} );

app.listen(port, () => {
    console.log('pyramid service started on: ' + port);
} );
