
import newChatImg from '/assets/newChat.png';
import clear from '/assets/clear.png';

/**
 * History component displays a sidebar with a list of previous chat sessions
 * and controls for starting a new chat.
 */
export default function History(props) {

        function preview(chat) {

            const firstUserMessage = chat.messages.find(msg => msg.role === 'user');

            return firstUserMessage ? firstUserMessage.content.length > 28 ? firstUserMessage.content.slice(0,28)+ "..." : firstUserMessage.content: "New Chat";

        }

        const historyListItems = props.chats.map(chat => {

            const isActive = chat.id === props.currentChatId;

            return (

                <li key={chat.id}>
                    <div className="sidebar-item-wrapper">
                        <button
                            type="button"
                            className={`sidebar-item ${isActive ? "is-active" : ""}`}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => props.onSelectChat(chat.id)}
                            title={preview(chat)}
                        >
                            {preview(chat)}
                        
                        </button>

                        {isActive && <button onClick={() => props.delete(chat.id)} className="clear-btn"><img src={clear} alt="clear chat" className="icon-clear"/></button>}
                    </div>

                </li>

            );

        });

    return(

        <aside className="sidebar">

            <div className="sidebar-top">

                <button type="button" className="sidebar-new" aria-label="New Chat" onClick={()=> props.onNewChat()}><img src={newChatImg} alt="new chat" className="icon"/> New Chat</button>

            </div>

            <h2 className="sidebar-title">Chats</h2>

            
            <div className="sidebar-frame">

                <ul className="sidebar-list">

                    {historyListItems}

                </ul>
            </div>
        </aside>


    )
}