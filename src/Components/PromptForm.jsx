
import { useFormStatus } from "react-dom";
import arrowUp from "/assets/arrowUp.png";
import { useState } from "react";

/**
 * PromptForm component holds the prompt box and haldnes the form submission.
 */


function PromptField(props) {

    const { pending } = useFormStatus();

    return (

        <textarea
        className="prompt-field"
        name="prompt"
        aria-label="Add prompt"
        placeholder={pending ? "Thinking..." : "Write a prompt"}
        disabled={pending}
        value={!pending ? props.text : "Thinking..."}
        onChange={(e) => props.setText(e.target.value)}
        />

    );

}

function SubmitButton() {

    const { pending } = useFormStatus();

    return (

        <button
        type="submit"
        className="prompt-submit"
        aria-label="Submit"
        disabled={pending}
        >

        <img src={arrowUp} alt="Submit" />

        </button>

    );

}

export default function PromptForm({ action }) {

    const [text, setText] = useState("");

    return (

        <div className="prompt">

            <form 
                action={async (formData) => {
                    await action(formData);
                    setText("");
                }} 
                className="prompt-form"
                aria-busy={undefined}
            >
                
            <PromptField text={text} setText={setText} />

            <SubmitButton />

            </form>
            
        </div>
    );
}
