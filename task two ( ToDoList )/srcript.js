let task=document.querySelector(".task")
let datte=document.querySelector(".date")
let add=document.querySelector(".add")
let Today=document.querySelector(".Mid")
let warning=document.querySelector(".warning")
let See=document.querySelector(".see")
let Watch=document.querySelector(".watch")
let heading=document.querySelector(".heading")
let seeAll=document.querySelector(".seeAll")




let jii=localStorage.getItem('mylist');

// take data from local storage into list[]
let list=JSON.parse(jii);
let Filter=[];

// see all tasks 
seeAll.addEventListener("click",function(){
    Show(list);
})

// see tasks of specific date
Watch.addEventListener("click",function(){
    heading.innerHTML=`Tasks of :- ${See.value}`;
    let tareek=new Date(See.value)
    tareek.setHours(0, 0, 0, 0);
   
    // filter out selected date tasks
    for(let i=0;i<list.length;i++){
        console.log(tareek);
        let newTareek=new Date(list[i].Day);
        newTareek.setHours(0, 0, 0, 0);
        console.log(newTareek);
        if(tareek.getTime() === newTareek.getTime())
        {
            Filter.push(list[i]);
        }
        
    }
    Show(Filter);
    Filter=[];
})

// Add task in the list 
add.addEventListener("click",function(){
    heading.innerHTML="All tasks";
    let input=task.value;
    task.value="";
    let day;
    // if date is not selected it takes todays date as input
    if(datte.value==""){
        day=new Date();
    }
    else{
         day=new Date(datte.value);
    }
    day.setHours(0, 0, 0, 0);
    let datee = new Date();
    datee.setHours(0, 0, 0, 0);
    let obj;
    
    // chech whether the date is valid or not
    if(day>=datee)
    {
     
        let dayy = day.getDate();
        let month = day.getMonth() + 1;
        let year = day.getFullYear();
        let currentDate = `${year}-${month}-${dayy}`;
        obj={
            Input:input,
            Day:currentDate,
        }

        if(input!="")
        {
            list.push(obj);
            localStorage.setItem('mylist', JSON.stringify(list));
            console.log(list);
            Show(list);
        }

    }
    // warning massage on selecting date before today for adding task
    else{
        warning.classList.remove("hidden")
        setTimeout(addd,3000);
    }

function addd(){
    warning.classList.add("hidden")
}

})

// show function to display tasks in the task box  

function Show(arr){

    Today.innerHTML="";
    for(let a=0;a<arr.length;a++)
    {
        let objj=arr[a];
        let value=objj.Input;
        let dayy=objj.Day;

        let ele=document.createElement("div");
        ele.classList.add("data");
        ele.innerHTML=`<p>${value}</p><p>${dayy}</p>`;
        Today.appendChild(ele);

        // Delete task by double click on the task 
        ele.addEventListener("dblclick",function(){
            Today.removeChild(ele);
            let ind=list.indexOf(objj);
            list.splice(ind,1);
            localStorage.setItem('mylist', JSON.stringify(list));

        })
 
    }
}