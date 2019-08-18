import moxios from 'moxios';
import { getPosts } from './postActions'
import { testStore } from '../../Utils';

describe('Posts Reducer', () => {
    beforeEach(() => {
        //this helps to get response instead of hiting internet 
        moxios.install();
    })

    afterEach(() => {
        // restore axios library
        moxios.uninstall();
    })
    it('Store is update correctly', () => {
        const expectedState = [{
            userId: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            userId: 1,
            id: 3,
            title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }]


        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });


        return store.dispatch(getPosts())
            .then(() => {
                const newState = store.getState();
                // console.log(newState.postReducer.posts, "newState")
                expect(newState.postReducer.posts).toBe(expectedState)
            })
        // expect(newState).toEqual(initialState)
    })

})