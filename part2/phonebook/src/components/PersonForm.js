const PersonForm = ({handleNameChange, handlePhoneChange, onSubmit}) => {
    return (
        <div>
            <form id="phonebookForm" onSubmit={onSubmit}>
                <div>
                    name: <input onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input type="tel" onChange={handlePhoneChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )   
}

export default PersonForm