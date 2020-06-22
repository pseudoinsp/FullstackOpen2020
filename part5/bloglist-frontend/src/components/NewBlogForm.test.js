import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
// import { act } from 'react-dom/test-utils'

test('<NewBlogForm /> calls create blog handler with the correct parameters', () => {

    let component
    let createBlogMock = jest.fn()

    // act(() => {
    component = render(
        <NewBlogForm createNewBlog={createBlogMock} />)
    // )})

    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    // act(() => {
    fireEvent.change(titleInput, {
        target: { value: 'aTitle' }
    })
    fireEvent.change(authorInput, {
        target: { value: 'anAuthor' }
    })
    fireEvent.change(urlInput, {
        target: { value: 'anUrl.com' }
    })
    fireEvent.submit(form)
    // })

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0]['title']).toBe('aTitle')
    expect(createBlogMock.mock.calls[0][0]['author']).toBe('anAuthor')
    expect(createBlogMock.mock.calls[0][0]['url']).toBe('anUrl.com')
})

