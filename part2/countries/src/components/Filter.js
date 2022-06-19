const Filter = (props) => {
    return (
        <div>
        <form>
          <div>
            find countries <input value={props.filter} onChange={props.handleFilterChange} />
          </div>
        </form>
      </div>
    )
}

export default Filter