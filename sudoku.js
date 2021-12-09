var arr=[];
var board=[];
var beginning;
var sz;
var sqSize;
function solver(size){
    sz=size;
    var unit1=[],unit2=[];
    for(var i=0;i<sz;i++){
        for(var j=0;j<sz;j++){
            unit1.push(0);
            unit2.push(0);
        }
        arr.push(unit1);
        board.push(unit2);
        unit2=[],unit1=[];
    }
    sqSize=Math.floor(Math.sqrt(size));
    document.getElementById("wrong").style.visibility="hidden";
    for (var i=0;i<size;i++){
        for (var j=0;j<size;j++){
            var x=document.getElementById("r"+i.toString()+"c"+j.toString()).value.toString();
            if(isNaN(x)){
                if(x=="")
                arr[i][j]=0;
                else
                ;
            }
            arr[i][j]=Number(x);
        }
    }
    beginning=JSON.parse(JSON.stringify(arr));
    var valid=true;
    for(var i=0;i<size;i++){
        for(var j=0;j<size;j++){
            if(arr[i][j]!=0){
                valid=dup_validity(i,j,arr[i][j]);
            }
            if(valid==false)
                break;
        }
        if(valid==false)
                break;
    }
    if(valid){
        if(solve()){
            if(isValid()){
                fillBox(arr);
            }
            else{
                document.getElementById("wrong").style.visibility="visible";
                reset(sz);
            }
        }
    }
    else{
        document.getElementById("wrong").style.visibility="visible";
        reset(sz);
    }
}
function sleep(ms){
    var present=Date.now();
    do{

    }while(present-Date.now()>0);
}
function fillBox(arr){
    for(var i=0;i<sz;i++){
        for(var j=0;j<sz;j++){
            if(arr[i][j]!=beginning[i][j]){
                document.getElementById("r"+i.toString()+"c"+j.toString()).style.backgroundColor="#111d5e";
                document.getElementById("r"+i.toString()+"c"+j.toString()).style.color="#ffffff";
            }
            else
            document.getElementById("r"+i.toString()+"c"+j.toString()).style.backgroundColor="#008891";
            document.getElementById("r"+i.toString()+"c"+j.toString()).value=arr[i][j];
        }
    }
}

function dup_isInRow(row,no){
    var c=0;
    for(var i=0;i<sz;i++)
        if(arr[row][i]==no)
        c++;
    if(c>1)
    return true;
    return false;
}
// private boolean
function dup_isInCol(col,no){
    var c=0;
    for(var i=0;i<sz;i++)
        if(arr[i][col]==no)
        c++;
    if(c>1)
    return true;
    return false;
}
// private boolean 
function dup_isInBox(row,col,no){
    var r=row-row%sqSize;
    var c=col-col%sqSize;
    var cnt=0;
    for(var i=r;i<r+sqSize;i++)
        for(var j=c;j<c+sqSize;j++)
            if(arr[i][j]==no)
            cnt++;
    if(cnt>1)
    return true;
    return false;
}

// private boolean 
function dup_validity(row,col,no){
    return !dup_isInBox(row, col, no) && !dup_isInCol(col, no) && !dup_isInRow(row, no);
}
    function isInRow(row,no){
        var c=0;
        for(var i=0;i<sz;i++)
            if(arr[row][i]==no)
            return true;
        return false;
    }
    // private boolean
    function isInCol(col,no){
        var c=0;
        for(var i=0;i<sz;i++)
            if(arr[i][col]==no)
            return true;
        return false;
    }
    // private boolean 
    function isInBox(row,col,no){
        var r=row-row%sqSize;
        var c=col-col%sqSize;
        var cnt=0;
        for(var i=r;i<r+sqSize;i++)
            for(var j=c;j<c+sqSize;j++)
                if(arr[i][j]==no)
                return true;
        return false;
    }
    function isValid(){
        for(var i=0;i<sz;i++){
            for(var j=0;j<sz;j++){
                if(arr[i][j]>sz || arr[i][j]<1)
                    return false;
            }
        }
        return true;
    }
    // private boolean 
    function validity(row,col,no){
        return !isInBox(row, col, no) && !isInCol(col, no) && !isInRow(row, no);
    }
    
    function solve(){
        for(var row=0;row<sz;row++){
            for(var col=0;col<sz;col++){
                if(arr[row][col]==0){
                    for(var no=1;no<=sz;no++){
                        if (validity(row,col,no)){
                            arr[row][col]=no;

                            if(solve())return true;
                            else
                                arr[row][col]=0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
function reset(len){
    arr=[];
    board=[];
    for(var i=0;i<len;i++){
        for(var j=0;j<len;j++){
            document.getElementById("r"+i.toString()+"c"+j.toString()).style.backgroundColor="";
            document.getElementById("r"+i.toString()+"c"+j.toString()).style.caretColor="black";
            document.getElementById("r"+i.toString()+"c"+j.toString()).style.color="black";
            document.getElementById("r"+i.toString()+"c"+j.toString()).value="";
        }
    }
}
