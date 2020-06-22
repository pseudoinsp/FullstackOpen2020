import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let mockIncrementLike

    beforeEach(() => {
        const blog = {
            id: '4a422aa71b54a676234d17f3',
            title: 'Lord of the Rings',
            author: 'Tolkien',
            url: 'http://www.amazon.com',
            likes: 70,
        }

        mockIncrementLike = jest.fn()
        const removeEnabled = jest.fn()
        const remove = jest.fn()

        component = render(
            <Blog blog={blog} incrementLike={mockIncrementLike} removeEnabled={removeEnabled} remove={remove}/>
        )
    })

    test('renders only author and title when undetailed', () => {
        expect(component.container).toHaveTextContent('Tolkien')
        expect(component.container).toHaveTextContent('Lord of the Rings')
        expect(component.container).not.toHaveTextContent('http://www.amazon.com')
        expect(component.container).not.toHaveTextContent('70')
    })

    test('renders every data when detailed', () => {
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        expect(component.container).toHaveTextContent('Tolkien')
        expect(component.container).toHaveTextContent('Lord of the Rings')
        expect(component.container).toHaveTextContent('http://www.amazon.com')
        expect(component.container).toHaveTextContent('70')
    })

    test('invokes like handler twice when clicked twice', () => {
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockIncrementLike.mock.calls).toHaveLength(2)
    })
})