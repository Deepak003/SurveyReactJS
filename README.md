# CRUD With React and Redux
The main goal of this was to use Redux and create a multi-user application
where users can sign in or sign up using their email-address and password. They can create,
edit,update and delete posts and view them.


UI for Creating Post and Displaying Survey Posts
---------------------------------------------------
Now that we have our basic UI in place let’s get into Redux. First thing to understand about Redux is something called the store. It’s where the entire state of your application will live. This is the first main benefit of using Redux. Instead of having to manage the state in different components we have to only manage it in one single place called the store. The store is an object which has some methods in it that allows us to get the current state of our application, subscribe to changes or update the existing state of our application. This is great because now we don’t have to pass down data from the parent component to deeply nested child components through props. So anytime a component needs data it can ask the store and the store will provide it with the data. As simple as that. With that in mind let’s create the store. In our crud-redux/src/index.js make the following changes-
------------------------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore } from 'redux';

const store = createStore();

ReactDOM.render(<App />, document.getElementById('root'));

---------------------------------------------------------------------------------------------------------
The createStore method will allow us to create the store but we are not done yet. This method needs a special argument and this argument goes by a special name called the ‘reducer’. Let’s create a separate folder called reducers. So under crud-redux/src create a folder called ‘reducers’. Inside that folder create a file called postReducer.js Add the following code for now.

-------------------------------------------------------------------------------------------
const postReducer = (state = [], action) => {

}
export default postReducer;
---------------------------------------------------------------------------------------------
We will fill in the contents of that function a bit later. Now let’s understand another important concept in Redux called actions. Actions are nothing but plain Javascript objects with a type property. This type property describes the event that is taking place in the application. This event can be anything from incrementing a counter to adding items in an array. These actions help us track the different events that are happening in our application. The structure of an action is as follows-

{
 type: 'EVENT_NAME'
}

An action can have any number of properties but it must have a type property. So an action can include data like so

{
  type:'ADD_ITEM',
  name: 'Redux'
}
In this example the event name is ‘ADD_ITEM’ and the data is the name property with a value of ‘Redux’. Now another important term that is used alongside actions is called dispatch. When we say ‘dispatch an action’ we simply mean call the dispatch method which is inside the store object with an action. Still with me?

Let’s look at the store. The store that we created using the createStore method is an object which has some methods in it. One of those methods is called dispatch. This dispatch method accepts an object as it’s argument and this object is what we call as ‘action’.


what dispatch really is
With that out of the way, let’s finally go back to that function that we wrote earlier inside postReducer.js. You see whenever we dispatch an action, this action with it’s type property is received by something called the reducer. Now what the heck is the reducer? Well it’s nothing but a function that takes the current state and an action that was dispatched as it’s parameters and returns the new state.
So next time when you see the term reducer thrown around remember that it’s just a function that gives you new state for your components.

Now the question is how does the reducer go about producing the new state for the application. Well that is pretty simple, it first checks which type of action was dispatched and based on it returns the new state. Under crud-redux/src/reducers/postReducer.js add the following lines of code.

const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      return state.concat([action.data]);
    default:
      return state;
  }
}
export default postReducer;

Now what is happening here is that we are using a ‘switch statement’ and we are switching based on the value of action.type. If the value is ‘ADD_POST’ we are returning a new array containing action.data. Basically whenever the ‘ADD_POST’ event happens we want to push some data into the state array.Now what is action.data? Well it’s nothing but an object with our individual post title and the post message. One thing to note here is that the reducer function expects a default value for the state. Here we are using ES6 default-parameter syntax to add that. The default value for the state here is an empty array. One other thing to note is that a reducer must always have the default clause inside the switch statement. In the default clause we simply return the state. This is done so that in case none of the action.type value matches any of the cases we simply return the state.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';

import postReducer from './reducers/postReducer';

const store = createStore(postReducer);
ReactDOM.render(<App />,document.getElementById('root'));

Now that we are done with the reducer. Let’s pass this store to our components. To do that let’s use the Provider component from the ‘react-redux’ library. Change crud-redux/src/index.js as follows-

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import postReducer from './reducers/postReducer';
const store = createStore(postReducer);
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById('root'));

The Provider component uses something called React Context which allows you to pass the store object to any components that needs to access it without the need to pass props. Here we are wrapping the App component which is our parent component with the Provider component so that all the child components in our app can get access to the store. The Provider component takes the store as a prop.

Let’s head back to our PostForm component and connect it to our store so that we can dispatch actions.

import React, { Component } from 'react';

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message =  this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message
    }
  }
render() {
return (
<div>
  <h1>Create Post</h1>
  <form onSubmit={this.handleSubmit}>
   <input required type="text" ref={(input)=>this.getTitle = input} 
    placeholder="Enter Post Title"/>
   <br /><br />
   <textarea required rows="5" ref={(input)=>this.getMessage = input} cols="28" 
    placeholder="Enter Post" />
   <br /><br />
   <button>Post</button>
  </form>
</div>
);
}
}
export default PostForm;
  
So in here the form element now accepts an onSubmit event. Whenever this event takes place the handleSubmit function will execute. The handleSubmit function takes one argument which is the event. Calling e.preventDefault() will prevent the page from refreshing. Next we grab the value of the title and the message from the inputs using refs and then put them inside an object called data. We also have an id property whose value is set to whatever new Date() returns. We will use this id property to perform update and delete operations.

Let’s put in some values in the title and the post fields and log it to the console. This is to make sure that the data is being captured. Add a console.log() in between like in the following-

import React, { Component } from 'react';

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message =  this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message
    }
    console.log(data)
  }
render() {
return (
<div>
  <h1>Create Post</h1>
  <form onSubmit={this.handleSubmit}>
   <input required type="text" ref={(input)=>this.getTitle = input} 
    placeholder="Enter Post Title"/>
   <br /><br />
   <textarea required rows="5" ref={(input)=>this.getMessage = input} cols="28" 
    placeholder="Enter Post" />
   <br /><br />
   <button>Post</button>
  </form>
</div>
);
}
}
export default PostForm;
  
It seems like our data is being captured properly. Great all is left now is to dispatch an action. To do that we will make use of the connect() function provided by the react-redux library. Now this is where things might get a bit tricky but I will try my best to explain it. We know that our state lives inside this object called the store and this store has it’s own set of methods for getting the current state of our application, updating the state of our application and subscribing for changes. We have already discussed one of these methods called dispatch. We need dispatch whenever we want to pass some action to the reducer to tell some sort of event has happened and then the reducer can decide what to do with the state. But to do that we need access to dispatch. Won’t it be great if we somehow got access to the dispatch method as a prop. That is what connect() allows you to do. connect() returns a function which takes in your current component as an argument and returns a new component with dispatch method as it’s prop. The main idea to remember is that connect will ultimately return a new component which has the dispatch method as a prop.The basic syntax for writing connect in your React components is as follows-

export default connect()(component-name)

So let’s use that and add it in our PostForm.js. So after that our component will look like so-

import React, { Component } from 'react';
import {connect} from 'react-redux';
class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message =  this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message
    }

  }
render() {
return (
<div>
  <h1>Create Post</h1>
  <form onSubmit={this.handleSubmit}>
   <input required type="text" ref={(input)=>this.getTitle = input} 
    placeholder="Enter Post Title"/>
   <br /><br />
   <textarea required rows="5" ref={(input)=>this.getMessage = input} cols="28" 
    placeholder="Enter Post" />
   <br /><br />
   <button>Post</button>
  </form>
</div>
);
}
}
export default connect()(PostForm);
  
With that in place we can easily access dispatch in our components so let’s use it.

import React, { Component } from 'react';
import {connect} from 'react-redux';
class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message =  this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message
    }
    this.props.dispatch({
      type:'ADD_POST',
      data});
    this.getTitle.value = '';
    this.getMessage.value = '';
  }
render() {
return (
<div>
  <h1>Create Post</h1>
  <form onSubmit={this.handleSubmit}>
   <input required type="text" ref={(input)=>this.getTitle = input} 
    placeholder="Enter Post Title"/>
   <br /><br />
   <textarea required rows="5" ref={(input)=>this.getMessage = input} cols="28" 
    placeholder="Enter Post" />
   <br /><br />
   <button>Post</button>
  </form>
</div>
);
}
}
export default connect()(PostForm);
  
Remember that connect() gives you access to dispatch as a prop. Here once we have captured the data from the form we dispatch the action using this.props.dispatch() passing in the data object with a type of ‘ADD_POST’.

Great, now we have added some data in our state but we can’t see any of those changes reflected in our application so let’s fix that. Before doing that let’s understand one more important thing about connect(). This special function provided by the react-redux library gives you access to dispatch whenever you call it wrapping the component-name as an argument to the function that is returned. We have seen this syntax which is as follows-

export default connect()(component-name)
Additionally, connect can do more. It can give you access to your state which is living inside your store object. To get access to your state, we need to use a special function called mapStateToProps. This function does exactly what it is named, map the state from the store object to the props object in your components. Let’s define this mapStateToProps function-

const mapStateToProps = (state) => {
 return {
 posts: state
 }
}
The argument to mapStateToProps is our application state. To understand this better, imagine whatever you pass inside the mapStateToProps argument is your state. Next question to ask is what is that state is it an array or an object or something else? Well that will depend on what you have defined it in your reducer. Since we have only one reducer which is the postReducer, we know that the state is an array.

Next we return an object with a key posts and the value is the state itself. The key that we use in mapStateToProps will be available to us as props inside the component.

With that in place let’s add this function as an argument to our connect. So inside crud-redux/src/AllPost.js make the following changes-

import React, { Component } from 'react';

import { connect } from 'react-redux';

class AllPost extends Component {
    render() {
        return (
            <div>
                <h1>All Posts</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(AllPost);

Now to check what we have here, we can log this.props.posts like so

import React, { Component } from 'react';

import { connect } from 'react-redux';

class AllPost extends Component {
    render() {
        return (
            <div>
                <h1>All Posts</h1>
                {console.log(this.props.posts)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(AllPost);

To test this out enter some values in the title and the message fields and check your console.

Great so we have the post. All is left is to display it in the browser. To do that let’s create another component called Post. So under crud-redux/src create a new file and call it ‘Post.js’. Now head back to AllPost.js and make the following changes-

import React, { Component } from 'react';

import { connect } from 'react-redux';

import Post from './Post';

class AllPost extends Component {
    render() {
        return (
            <div>
                <h1>All Posts</h1>
                {this.props.posts.map((post) => <Post key={post.id} post={post} />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(AllPost);

We have imported the Post component inside AllPost and used the Array.prototype.map function to loop over each of the individual posts inside this.props.posts and pass it down to the Post component with the key as post.id and the post itself. Inside crud-redux/src/Post.js add in the following-

import React, { Component } from 'react';

class Post extends Component {
  render() {
  return (
    <div>
      <h2>{this.props.post.title}</h2>
      <p>{this.props.post.message}</p>
    </div>
  );
 }
}
export default Post;

If you have got this far, great you are finally done with the C and the R part of this CRUD application as now we can create posts and can read them as well.

Before diving into the update and the delete part of this application let’s recap.

The entire state of our application lives inside an object called the store. In order to update the state we need to dispatch an action. Actions are nothing but Javascript objects with a type property which describes the event taking place. Events can be anything from updating counters to adding posts like we have seen above. Once the action has been dispatched, it is received by the reducer. The reducer takes in the current state of the application and the dispatched action and produces the next state of the application based on action.type.

For our React application to use the Redux store, we use the Provider component provided by the react-redux library and put it as the root of all the components.

In order to access our Redux store within our React components we use the special connect() function. This function gives us access to dispatch and when we pass in mapStateToProps it gives us access to the state. mapStateToProps is a function that takes in the state of our application as a parameter and returns an object with keys of that object becoming the props of the component so that whenever we use this.props.key_name we get back the state we need.

With that out of the way, let’s go back to the Post.js file and add in some buttons for Delete and Edit.

Let’s tackle the delete functionality first as it is easier. What we want to do is that whenever the user clicks the delete button it should remove the post. Now to do that we need to identify which post the user is deleting and we can do that with the post.id property that we included when we were adding the post earlier in PostForm component. So we need the following things, first we need an onClick handler so that when the user clicks the delete button we can do something. Then what we need is to dispatch an action of type say ‘DELETE_POST’. We know pretty well how to get that going and that is by using connect.

import React, { Component } from 'react';

import {connect} from 'react-redux';

class Post extends Component {
  render() {
  return (
    <div>
      <h2>{this.props.post.title}</h2>
      <p>{this.props.post.message}</p>
      <button>Edit</button>
      <button 
      onClick={()=>this.props.dispatch({type:'DELETE_POST',id:this.props.post.id})}>
      Delete</button>
    </div>
  );
 }
}
export default connect()(Post);

Here inside the onClick handler we have an arrow function that is invoked when the user clicks the delete button. Once they do, we dispatch an action of type ‘DELETE_POST’ and we also pass in the id of the given post.

To make this work we need to add this event in our reducers so let’s go back to our reducers under crud-redux/src/reducers/postReducer.js and add in the following-

const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      return state.concat([action.data]);
    case 'DELETE_POST':
      return state.filter((post)=>post.id !== action.id);
    default:
      return state;
  }
}
export default postReducer;

Here we use Array.prototype.filter to remove the post with the id that matches action.id.

Now that is in place, go back to the app and try adding some data and then click the delete button. If the post goes away then great you have successfully implemented the D of this CRUD application. The only thing that is left is the update operation.

The last and the final CRUD operation is the Update operation and this one is a bit different. All the other operations we have seen are mostly one-click operations. You click on post, the post gets added,click on delete the post gets removed. This is not the case with Update. Because to update an existing post, first the user clicks on edit and then we provide them with a way in which they can change the post title and the message. Finally when they submit the changes, we perform the necessary updates and show it in the browser. So from this we know that the update operation is a two-step operation.

One approach in doing this is to use a boolean in our data object. This boolean will be false initially when the posts are added but when the user clicks on edit, we change it’s value to true. If the value of this boolean is true then instead of rendering a regular Post component, we render a special EditComponent which will have a form with title and message fields. Once the user has made the necessary changes and hits update we go back to rendering the Post component but with the updated value. So let’s do this-

Inside crud-redux/src/PostForm.js make the following changes-

import React, { Component } from 'react';
import {connect} from 'react-redux';
class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message =  this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message,
      editing:false
    }
    this.props.dispatch({
      type:'ADD_POST',
      data});
    this.getTitle.value = '';
    this.getMessage.value = '';
  }
render() {
return (
<div>
  <h1>Create Post</h1>
  <form onSubmit={this.handleSubmit}>
   <input required type="text" ref={(input)=>this.getTitle = input} 
    placeholder="Enter Post Title"/>
   <br /><br />
   <textarea required rows="5" ref={(input)=>this.getMessage = input} cols="28" 
    placeholder="Enter Post" />
   <br /><br />
   <button>Post</button>
  </form>
</div>
);
}
}
export default connect()(PostForm);
  
Here we have added an extra property called ‘editing’ and have set its value as false. Next create a file called EditComponent.js inside the src folder. Once that is done head over to crud-redux/src/AllPost.js and make the following changes-

import React, { Component } from 'react';

import { connect } from 'react-redux';

import Post from './Post';

import EditComponent from './EditComponent';

class AllPost extends Component {
    render() {
        return (
            <div>
                <h1>All Posts</h1>
                {this.props.posts.map((post) => (
                    <div key={post.id}>
                        {post.editing ? <EditComponent post={post} key={post.id} /> :
                            <Post key={post.id} post={post} />}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(AllPost);

All that this code is doing is that it is checking the value of editing in each of the posts and if it is true then instead of rendering the Post component it is rendering the EditComponent and passing it the post as a prop.

Before going in and adding the Form in EditComponent, we need to make one more change inside Post.js so go inside crud-redux/src/Post.js and make the following change-

import React, { Component } from 'react';

import {connect} from 'react-redux';

class Post extends Component {
  render() {
  return (
    <div>
      <h2>{this.props.post.title}</h2>
      <p>{this.props.post.message}</p>
      <button
       onClick={()=>this.props.dispatch({type:'EDIT_POST',id:this.props.post.id})}>
       Edit</button>
      <button 
      onClick={()=>this.props.dispatch({type:'DELETE_POST',id:this.props.post.id})}>
      Delete</button>
    </div>
  );
 }
}
export default connect()(Post);

All we are doing is that when the user clicks the edit button we are dispatching an action of type ‘EDIT_POST’ and also passing the id of the post.

Since we have dispatched a new event, we need to make some changes in postReducer.js so head over to this file and make the following changes-

const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      return state.concat([action.data]);
    case 'DELETE_POST':
      return state.filter((post)=>post.id !== action.id);
    case 'EDIT_POST':
      return state.map((post)=>post.id === action.id ? {...post,editing:!post.editing}:post)
    default:
      return state;
  }
}
export default postReducer;

Here we are using Array.prototype.map to loop over each item and then check the id of the post with the id that was passed in the action. If there is a match then return a new object but change the value of editing to true if it was false or vice-versa. If there is no match then just return the object as it is.

Finally, let’s head over to EditComponent.js and add in the following-

import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditComponent extends Component {
handleEdit = (e) => {
  e.preventDefault();
  const newTitle = this.getTitle.value;
  const newMessage = this.getMessage.value;
  const data = {
    newTitle,
    newMessage
  }
  this.props.dispatch({ type: 'UPDATE', id: this.props.post.id, data: data })
}
render() {
return (
<div>
  <form onSubmit={this.handleEdit}>
    <input required type="text" ref={(input) => this.getTitle = input}
    defaultValue={this.props.post.title} placeholder="Enter Post Title" /><br /><br />
    <textarea required rows="5" ref={(input) => this.getMessage = input}
    defaultValue={this.props.post.message} cols="28" placeholder="Enter Post" /><br /><br />
    <button>Update</button>
  </form>
</div>
);
}
}
export default connect()(EditComponent);
  
Here we are creating another Form which has an onSubmit handler. When the form is submitted, this.handleEdit function is invoked. This function takes in the event as a parameter. e.preventDefault() stops the page from refreshing. Then we are grabbing the data from the inputs using refs and putting it inside an object.Finally we are dispatching a new action with type property as ‘UPDATE’ . We are also passing in the id of the post that needs to be updated along with the updated data. Don’t forget to use the connect function when dispatching actions.

Since we have added in a new event in our files, we need to make some changes in the reducer so head back to the reducer and make the following changes-

const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      return state.concat([action.data]);
    case 'DELETE_POST':
      return state.filter((post)=>post.id !== action.id);
    case 'EDIT_POST':
      return state.map((post)=>post.id === action.id ? {...post,editing:!post.editing}:post)
    case 'UPDATE':
      return state.map((post)=>{
        if(post.id === action.id) {
          return {
             ...post,
             title:action.data.newTitle,
             message:action.data.newMessage,
             editing: !post.editing
          }
        } else return post;
      })
    default:
      return state;
  }
}
export default postReducer;

In here all we are doing is using Array.prototype.map and looping over each posts and the post whose id matches the one with the id that was passed in the action we are returning a new object but with the updated values for title and message.Finally we are setting editing to false.

With that we are done, head over to the app, add some posts and hit the edit button.

When we hit the edit button the post changes to a form with the title and the message fields populated with the current values. Let’s make a change and hit update.

Great, so our CRUD functionality is complete. Now let’s add in some styles so that it looks good. I have written all the CSS for this application inside index.css just to keep things simple. Here is all the CSS code you need-

Please find the css code in codebase.



