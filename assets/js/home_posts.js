{
    // method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

        
    }


    // method to create a post in DOM
    let newPostDom = function(data){
        return $(`<li id="post-${data.post._id}">
                    <p>
                        ${data.post.content} <br>
                        <small>
                            ${data.username}
                        </small>
                
                        
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${data.post._id}">Delete</a>
                        </small>
                        
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type here to add comment..." required>
                                <input type="hidden" name="post" value="${data.post._id}">
                                <input type="submit" value="Add Comment">
                            </form>
                       
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${data.post._id}">
                                
                            </ul>
                        </div>
                    </div>
                </li>`);
    }


    // method to delete the post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }



    createPost();
}



