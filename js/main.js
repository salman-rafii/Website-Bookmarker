//listen for form Submit
document.getElementById('myform').addEventListener('submit',saveBookmark);
//save Bookmark
function saveBookmark(e){
  // console.log('it works');
//get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

if(!siteName || !siteUrl){
  alert('please fill in the form');
  return false;
}

var bookmark = {

  name:siteName,
  url:siteUrl
}
// console.log(bookmark);

//prevent form from submitting
  

  // localStorage.setItem('test','hello world'); // use to make
  // console.log(localStorage.getItem('test')); //   used to get 
  // localStorage.removeItem('test');//used to remove

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [] ;
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }else{
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //re set back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }

//clear form

document.getElementById('myForm').reset();

//refetch bookmarks

fetchbookMarks();
  e.preventDefault();
}

//Delete Bookmarks

function deleteBookmark(url){
  // get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop through bookmarks
for(var i = 0 ; i < bookmarks.length ; i++){
  if(bookmarks[i].url == url){
    bookmarks.splice(i,1);
  }
}

localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

//refetch bookmarks

fetchbookMarks();

  
}



//fetch bookmarks

function fetchbookMarks(){
//get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id 
var bookMarksResults = document.getElementById('bookmarksResults');

  bookMarksResults.innerHTML = '';
    
  for(var i = 0 ; i < bookmarks.length ; i++)
  {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookMarksResults.innerHTML += "<div class='card card-body bg-light' >"+
     "<h3>"+ 
     name +
     "<a class = 'btn btn-light' target='_blank' href='"+url+"'>Visit</a>" +
     "<a onclick='deleteBookmark(\""+url+"\")' class = 'btn btn-danger' href='#'>Delete</a>" +
     "</h3>"+ 
     "</div>";

  }


}
