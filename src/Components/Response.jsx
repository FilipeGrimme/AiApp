
import ReactMarkdown from "react-markdown";

/**
 * Response component displays the user messages styled with a bubble, and the
 * ai responses.
 */

export default function Response(props) {

    const messageListItems = props.messages.map((message,index) => (

        <li key={index} className={`chat-msg ${message.role}`}>

            {message.role === 'user'

                ? <div className="chat-bubble">{message.content}</div>

                : <div className="ai-style"><ReactMarkdown>{message.content}</ReactMarkdown></div>}

        </li>

    ));

    return(

        <div className="chat">

            <ul className="chat-list">
                {messageListItems}
            </ul>

        </div>


    )
}