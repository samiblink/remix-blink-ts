import { useState } from "react"
import { Dialog } from "@headlessui/react"

function HeadlessModal() {
    let [isOpen, setIsOpen] = useState(true)

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                setIsOpen(false)}}
            className="relative z-50"
        >
        {/*backdrop rendered as a fixed sibling to panel container*/}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                <Dialog.Title>Give Some Kudos</Dialog.Title>
                <Dialog.Description>Click deets</Dialog.Description>
                <p> Testataan Modaalia </p>

                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button onClick={() => setIsOpen(false)}>Yes</button>
            </Dialog.Panel>
        </div>
        </Dialog>    
    )
}
export default HeadlessModal