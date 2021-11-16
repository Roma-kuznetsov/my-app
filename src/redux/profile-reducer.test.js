import profileReducer, { addPostActionCreator } from "./profile-reducer";




it('renders profile-reducer', () => {
    let action = addPostActionCreator("new-post")
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Im, slut', likesCount: 111 },
        ],
    }
    let newtest = profileReducer(state, action);
    // 3. expect 
    expect(newtest.posts.length).toBe(4);
});
