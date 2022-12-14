import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'

interface props {
    children: React.ReactNode
    wrapperId: string
  }
// A function is defined that generates a div with an id. That element is then attached to the document's body.
const createWrapper = (wrapperId: string) => {
    const wrapper = document.createElement('div')
    wrapper.setAttribute("id", wrapperId)
    document.body.appendChild(wrapper)
    return wrapper
}

export const Portal: React.FC<props> = ({ children, wrapperId }) => {
    const [wrapper, setWrapper] = useState<HTMLElement | null>(null)
    // If an element with the provided id does not already exist, invoke the createWrapper function to create one.
    useEffect(() => {
        let element = document.getElementById(wrapperId)
        let created = false
        if (!element) {
            created = true
            element = createWrapper(wrapperId)
        }

        setWrapper(element)
// When the Portal component is un-mounted, this will destroy the element.
        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }, [wrapperId])

    if (wrapper === null) return null
// Creates a portal to the newly generated div.
    return createPortal(children, wrapper)
}