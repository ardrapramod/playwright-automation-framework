function reverseSentence(){

    let string1="I love India";
    let words:string[]=string1.split(" ");
    let rev=" ";

    for( let i=words.length-1;i>=0;i--){
        rev=rev+" "+words[i];


    }

    console.log(rev)
}
reverseSentence();