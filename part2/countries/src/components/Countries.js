
const Countries = ({ listOfCountries, handleClick }) => {
    return (
        <div>
            {listOfCountries.map(c => <p key={c.name.common}>{c.name.common}<button onClick={handleClick(c.name.common)}>show</button></p>)}
        </div>
    )
}

export default Countries