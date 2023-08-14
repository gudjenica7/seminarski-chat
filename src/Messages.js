export default function Messages({messages}){
    return <>
    <ul>
        {messages.map((m) => showMessage(m))}
    </ul>
    </>
    function showMessage(message){
        const id = message.clientId;
        const myMessage = id === message.clientId;
        const className = myMessage ? "message my-message" : "message guest-message";
    
        return (
            <li className={className} key={message.timestamp}>
                <span className="user-color" style={{ backgroundColor: message.member.clientData.color }}></span>
             <div className="message-body">
                <p className="username">{message.member.clientData.username}</p>
                <p className="message">{message.data.input}</p>
             </div>
            </li>
        )
    
    }
    }