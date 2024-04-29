const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }
    
    return (
        <div className={`message ${notification.type}`}>
            {notification.message}
        </div>
    )
}

export default Notification