// {
    
//     let createComment = function(){
//         let newCommentForms = $('.post-comments>form');
//         let i = 0;
        
//         // for(newCommentForm of newCommentForms){
            
//             newCommentForms.submit(function(e){
//                 e.preventDefault();
                
//                 $.ajax({
//                     type: 'post',
//                     url: '/comments/create',
//                     data: newCommentForms.serialize(),
//                     success: function(data){
//                         // console.log(data);
//                         let commentContainer = $(`#post-comments-${data.data.post._id}`);
//                         addCommentDOM(commentContainer, data);
//                     }, error: function(error){
//                         console.log(error.responseText);
//                     }
//                 });
//             });
//         // }
//     }

//     let addCommentDOM = function(commentContainer, data){
//         commentContainer.prepend(`
//         <li>
//             <p>
//                 ${data.data.comment.content} 
//                 <br>
//                 <small>
//                     ${data.data.username}
//                 </small>

                
//                 <small>
//                     <a href="/comments/destroy/${data.data.comment.id}">Delete</a>
//                 </small>
                
//             </p>
//         </li>
//         `);

//         return;
//     }
    


//     createComment();
// }