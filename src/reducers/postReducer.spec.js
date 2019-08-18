import postReducer, { initialState } from './postReducer'
describe('Posts Reducer', () => {
    it('should render default state', () => {
        const newState = postReducer(undefined, initialState);
        expect(newState).toEqual(initialState)
    })

    it('LOADERENABLE::should receive new state if receiving type', () => {
        const loader = { ...initialState, loader: true }
        const newState = postReducer(initialState, {
            type: 'LOADERENABLE'
        });
        expect(newState).toEqual(loader)
    })

    it('LOADERDISABLE::should receive new state if receiving type', () => {
        const loader = { ...initialState, loader: false }
        const newState = postReducer(initialState, {
            type: 'LOADERDISABLE'
        });
        expect(newState).toEqual(loader)
    })

    // it('GET_POSTS::should receive new state if receiving type', () => {
    //     const loader = { ...initialState, loader: false }
    //     const newState = postReducer(initialState, {
    //         type: 'LOADERDISABLE'
    //     });
    //     expect(newState).toEqual(loader)
    // })
})

