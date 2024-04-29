const PersonForm = ({newName, newPhone, handleNameChange, handlePhoneChange, onSubmit}) => {
    return (
        <div>
            <form id="phonebookForm" onSubmit={onSubmit}>
                <div>
                    name:
                    <input value={newName} onChange={({ target }) => handleNameChange(target.value)}/>
                </div>
                <div>
                    number:
                    <input value={newPhone} type="tel" onChange={({ target }) => handlePhoneChange(target.value)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )   
}

export default PersonForm